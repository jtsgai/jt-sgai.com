#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JT M&C 网站素材生成脚本
========================
在你自己的电脑上运行(key 不离开本机):

    cd 网站目录
    python3 generate_assets.py --env /Users/apple/RFP_Auto_Studio_2.0/.env

流程:
  1. 用 OpenAI gpt-image-1 生成 10 张海报(1 张首屏 + 9 张卡片),存到 assets/
  2. 用 Kling 图生视频,把每张海报变成 5 秒循环短片,存到 gen/
  3. 网页会自动检测 gen/*.mp4:文件存在则 hover 播放,不存在则显示静态海报

只依赖 requests:  pip3 install requests
可选参数:
  --images-only     只生成图片
  --videos-only     只生成视频(用已有海报)
  --skip-existing   跳过已存在的文件(默认开启)
"""

import argparse, base64, os, sys, time
from pathlib import Path

try:
    import requests
except ImportError:
    sys.exit("请先安装 requests:  pip3 install requests")

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / "assets"
GEN = ROOT / "gen"

# ---------------------------------------------------------------- config
# Kling 模型名与接口地址按你的账号情况调整。
# 常见模型名: kling-v1-6 / kling-v2-master / kling-v2-5-turbo(即 2.5 Omni 系列,以控制台为准)
KLING_BASE = os.environ.get("KLING_BASE_URL", "https://api-singapore.klingai.com")
KLING_MODEL = os.environ.get("KLING_MODEL", "kling-v3")  # image2video, image 字段接受 base64
VIDEO_SECONDS = "5"          # 卡片视频时长
HERO_SECONDS = "10"          # 首屏视频时长

STYLE = ("Cinematic still, warm ember palette: deep warm charcoal black background "
         "(#0C0906) with glowing amber-orange light (#FF5A1E to #FFA85C), soft rim "
         "lighting, gentle film grain, shallow depth of field, high-end sci-fi warmth, "
         "no text, no watermark, no logo.")

# name -> (poster file, orientation, image prompt, motion prompt for Kling)
SHOTS = {
    "hero": (
        "ph_hero.jpg", "1536x1024",
        f"{STYLE} Wide shot: a graceful humanoid robot and an elderly person sitting "
        "together by a large window at dusk, city lights of Singapore far below, warm "
        "lamp glow between them, quiet intimacy, silhouettes half in shadow.",
        "Animate this exact image. Extremely subtle motion only: slow gentle camera "
        "push-in, dust motes drifting in the warm light, faint breathing of the two "
        "figures, city lights twinkling in the distance. Do not change the composition, "
        "characters, colors or lighting. Seamless loop."
    ),
    "companion": (
        "ph_companion.jpg", "1024x1536",
        f"{STYLE} A soft-featured companion robot gently holding an elderly woman's "
        "hand in a cozy living room, warm lamplight, knitted blanket textures.",
        "Very slow orbit around the pair, lamplight flickering softly, fabric moving slightly."
    ),
    "warmth": (
        "ph_warmth.jpg", "1536x1024",
        f"{STYLE} A family dinner table seen from a doorway, one warm pendant lamp, "
        "steam rising from bowls, a small robot's silhouette watching from the edge of frame.",
        "Steam rising slowly, lamp glow breathing, slight handheld drift. Warm and quiet. "
        "Keep all wall surfaces plain and empty. Absolutely no text, letters or characters "
        "may appear anywhere."
    ),
    "assistant": (
        "ph_assistant.jpg", "1024x1536",
        f"{STYLE} A translucent holographic voice interface blooming above a kitchen "
        "counter like an amber flower of light, hands of a person mid-gesture.",
        "Hologram petals of light slowly rotating and pulsing, particles floating upward."
    ),
    "nebula": (
        "ph_nebula.jpg", "1536x1024",
        f"{STYLE} A vast amber-and-orange nebula swirling in deep space, forming two "
        "interlocking arcs like an embrace, tiny spacecraft for scale.",
        "Nebula gas slowly swirling, stars twinkling, imperceptible camera drift forward."
    ),
    "data": (
        "ph_data.jpg", "1024x1536",
        f"{STYLE} An abstract landscape of glowing data: rivers of amber light "
        "flowing through a dark canyon of black glass towers, one analyst silhouette overlooking.",
        "Data rivers flowing steadily, occasional pulses of brighter light traveling through."
    ),
    "flow": (
        "ph_flow.jpg", "1536x1024",
        f"{STYLE} Macro shot of luminous orange threads weaving themselves into "
        "fabric in darkness, like fiber optics becoming textile.",
        "Threads weaving in slow motion, light traveling along each fiber, hypnotic loop."
    ),
    "universe": (
        "ph_universe.jpg", "1024x1536",
        f"{STYLE} A living room where the ceiling has dissolved into a realistic "
        "galaxy, a child reaching up toward a ringed planet, VR ambience, warm floor lamp anchor.",
        "Galaxy slowly rotating overhead, planet rings shimmering, child's hair moving gently."
    ),
    "interaction": (
        "ph_dialogue.jpg", "1536x1024",
        f"{STYLE} Extreme close-up: a human hand and a robot hand almost touching, "
        "a thread of warm light arcing between fingertips, dark background.",
        "The light thread flickering alive between fingertips, slow pulse, micro camera drift."
    ),
    "abstract": (
        "ph_abstract.jpg", "1536x1024",
        f"{STYLE} Two interlocking arcs of molten amber glass suspended in dark "
        "space, echoing a swirl logo, refractions and caustics on unseen floor.",
        "Arcs slowly rotating around a shared center, molten glass surface flowing, caustics dancing."
    ),
}

# 部分镜头需要额外的负面提示词(接口若支持 negative_prompt 则生效)
NEGATIVE_PROMPTS = {
    "warmth": "text, watermark, letters, characters, writing, subtitles",
}

# ---------------------------------------------------------------- helpers
def load_env(path: Path) -> dict:
    env = {}
    for line in path.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, _, v = line.partition("=")
            env[k.strip()] = v.strip().strip('"').strip("'")
    return env

def gen_image(api_key: str, prompt: str, size: str, out: Path):
    print(f"  [image] {out.name} …", flush=True)
    r = requests.post(
        "https://api.openai.com/v1/images/generations",
        headers={"Authorization": f"Bearer {api_key}"},
        json={"model": "gpt-image-2", "prompt": prompt, "size": size, "quality": "high"},
        timeout=600,
    )
    r.raise_for_status()
    b64_data = r.json()["data"][0]["b64_json"]
    out.write_bytes(base64.b64decode(b64_data))
    print(f"  [image] {out.name} ✓")

def gen_video(api_key: str, poster: Path, motion: str, seconds: str, out: Path, negative_prompt: str = None):
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    img_b64 = base64.b64encode(poster.read_bytes()).decode()
    print(f"  [video] {out.name}: 提交任务 …", flush=True)
    # 图生视频:image 字段直接接受 base64,首帧即传入的海报图
    # 注意:不要用 omni-video + first_frame,该接口会静默接受这个字段但实际忽略图片,
    # 退化成纯文生视频(已用 ph_hero.jpg 实测验证过)。
    payload = {
        "model_name": KLING_MODEL,
        "image": img_b64,
        "prompt": motion,
        "mode": "std",
        "duration": seconds,
    }
    if negative_prompt:
        payload["negative_prompt"] = negative_prompt
    r = requests.post(
        f"{KLING_BASE}/v1/videos/image2video",
        headers=headers,
        json=payload,
        timeout=120,
    )
    r.raise_for_status()
    body = r.json()
    if body.get("code") != 0:
        raise RuntimeError(f"Kling 返回错误: {body}")
    task_id = body["data"]["task_id"]

    for _ in range(120):  # 最多轮询 20 分钟
        time.sleep(10)
        q = requests.get(f"{KLING_BASE}/v1/videos/image2video/{task_id}",
                         headers={"Authorization": f"Bearer {api_key}"},
                         timeout=60)
        q.raise_for_status()
        data = q.json().get("data", {})
        status = data.get("task_status")
        if status == "succeed":
            url = data["task_result"]["videos"][0]["url"]
            out.write_bytes(requests.get(url, timeout=600).content)
            print(f"  [video] {out.name} ✓")
            return
        if status == "failed":
            raise RuntimeError(f"Kling 任务失败: {data.get('task_status_msg')}")
        print(f"  [video] {out.name}: {status} …", flush=True)
    raise TimeoutError(f"{out.name} 超时")

# ---------------------------------------------------------------- main
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--env", default=str(ROOT / ".env"), help=".env 文件路径")
    ap.add_argument("--images-only", action="store_true")
    ap.add_argument("--videos-only", action="store_true")
    ap.add_argument("--force", action="store_true", help="覆盖已存在文件")
    ap.add_argument("--only", default="", help="只处理指定条目,逗号分隔,如: warmth,flow")
    args = ap.parse_args()

    env_path = Path(args.env).expanduser()
    if not env_path.exists():
        sys.exit(f"找不到 .env: {env_path}")
    env = load_env(env_path)

    openai_key = env.get("OPENAI_API_KEY")
    kling_key = env.get("KLING_API_KEY")

    ASSETS.mkdir(exist_ok=True)
    GEN.mkdir(exist_ok=True)

    # 1) images
    if not args.videos_only:
        if not openai_key:
            sys.exit(".env 缺少 OPENAI_API_KEY")
        print("== 生成海报图片 ==")
        only = {x.strip() for x in args.only.split(",") if x.strip()}
        for name, (poster, size, img_prompt, _) in SHOTS.items():
            if only and name not in only:
                continue
            out = ASSETS / poster
            if out.exists() and not args.force:
                print(f"  [image] {out.name} 已存在,跳过")
                continue
            try:
                gen_image(openai_key, img_prompt, size, out)
            except Exception as e:
                print(f"  [image] {out.name} 失败: {e}")

    # 2) videos
    if not args.images_only:
        if not kling_key:
            sys.exit(".env 缺少 KLING_API_KEY")
        print("== 生成视频 ==")
        only = {x.strip() for x in args.only.split(",") if x.strip()}
        for name, (poster, _, _, motion) in SHOTS.items():
            if only and name not in only:
                continue
            out = GEN / f"{name}.mp4"
            if out.exists() and not args.force:
                print(f"  [video] {out.name} 已存在,跳过")
                continue
            src = ASSETS / poster
            if not src.exists():
                print(f"  [video] 缺少海报 {src.name},跳过")
                continue
            seconds = HERO_SECONDS if name == "hero" else VIDEO_SECONDS
            negative = NEGATIVE_PROMPTS.get(name)
            try:
                gen_video(kling_key, src, motion, seconds, out, negative)
            except Exception as e:
                print(f"  [video] {out.name} 失败: {e}")

    print("\n完成。用浏览器打开 index.html 检查效果。")

if __name__ == "__main__":
    main()
