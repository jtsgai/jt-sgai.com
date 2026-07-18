# JT M&C 官网重设计 — 「环抱 The Embrace」

暖黑 × 余烬橙,双弧母题,暗色瀑布流,hover 播放 AI 生成视频。
纯静态站点,零构建、零依赖,直接部署 GitHub Pages。

## 目录结构

```
site/
├── index.html          主页(中文默认,右上角切换 EN)
├── styles.css          样式
├── app.js              交互(双语 / 滚动显现 / hover 播放视频)
├── generate_assets.py  素材生成脚本(在你本地跑)
├── assets/             海报图片 + logo(当前为旧站图片占位)
└── gen/                生成的视频(脚本输出,mp4)
```

## 一、本地预览

直接双击 `index.html`,或:

```bash
cd site && python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

没有视频时,卡片显示静态海报——网站本身是完整可用的。

## 二、生成 AI 素材(在你的 Mac 上)

```bash
pip3 install requests
cd site
python3 generate_assets.py --env /Users/apple/RFP_Auto_Studio_2.0/.env
```

- 第一步用 OpenAI `gpt-image-2` 生成 10 张统一暖橙色调的海报(覆盖 assets/ 里的占位图)
- 第二步用 Kling 图生视频,输出到 `gen/`,网页自动检测并 hover 播放
- Kling 模型默认 `kling-v3-omni`,如你账号里的 Omni 模型名不同,
  改环境变量即可:`KLING_MODEL=你的模型名 python3 generate_assets.py ...`
- 接口默认新加坡节点,大陆账号可设 `KLING_BASE_URL=https://api-beijing.klingai.com`
- 单独重跑:`--images-only` / `--videos-only`,覆盖重生成加 `--force`

生成有随机性,不满意的单张可删掉对应文件后重跑(默认跳过已存在的)。

## 三、部署到 GitHub Pages

```bash
# 在 jt-sgai.com 仓库里,清空旧文件(保留 CNAME),拷入 site/ 的全部内容
git rm -r _next locales images video_ideas index.txt more-info.* products.* 404.html index.html
cp -r /path/to/site/* .
echo jt-sgai.com > CNAME
git add -A && git commit -m "Redesign: The Embrace" && git push
```

已移除全部 manus.space 关联,canonical 指向 https://jt-sgai.com/。

## 四、安全提醒

- `.env` 里的 key 只在你本机被脚本读取,不要提交进 git 仓库
  (在仓库加一行 `.gitignore`:`.env`)
- 你曾把 `.env` 上传到对话里,建议到各服务商后台把 key 轮换一次

## 设计要点(方便你以后自己改)

- 色板:`--ink #0C0906` 暖黑 / `--ember #FF5A1E` / `--amber #FFA85C`
- 中文标题:思源宋体 900;英文与标签:Space Grotesk
- 母题:logo 的双弧 = 环抱 = "陪伴"。首屏光环、星云卡、抽象卡都在重复这个意象
- 改文案:全部集中在 `app.js` 顶部的 `I18N` 字典,中英各一份
