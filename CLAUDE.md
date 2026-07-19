# CLAUDE.md — JT M&C 官网规范

给未来在这个仓库里干活的 Claude(或人)看的项目规范。改代码 / 写文案 / 加作品页之前先过一遍。

## 设计系统

- 色板:`--ink #0C0906`(暖黑,背景)/ `--ember #FF5A1E`(余烬橙,强调/hover)/ `--amber #FFA85C`(琥珀,次强调)
- 中文/多语言正文标题:思源宋体(`Noto Serif SC` / 对应语言的 Serif),字重 900
- 英文标签、导航、按钮、eyebrow 小字:Space Grotesk(`--grot`)
- 母题:logo 的双弧 = 环抱 = "陪伴"。新增视觉元素时优先复用这个双弧意象,不要引入无关母题

## 排版规则

- 四语(en/zh/ms/ta)文案里,一句话一行的地方用 `<br>` 手动断行,不要指望浏览器自动换行对齐语感
- 英文文案只用直引号 `'` `"`,不用弯引号 `' '` `" "`
- 箭头(→ ⟵ ⟶)和破折号(—)前面加不换行空格(`&nbsp;` / ` `),避免行尾孤立符号
- 板块标题(`.sect-head` 及其子元素)统一居中(`text-align:center`),这是现有 `.sect-head,.sect-head .eyebrow,.sect-head .display-2,.sect-head p{text-align:center}` 规则,新板块沿用即可

## 多语言规则

- 四语字典 `I18N` 集中在 `app.js` 顶部,key 依次是 `en` / `zh` / `ms` / `ta`
- 任何文案改动(新增、修改、删除)必须四语同步,不能只改一种语言就提交
- 新增可翻译文本一律用 `data-i18n="xxx_key"` 挂到元素上,再去四语字典里各加一条,不要在 HTML 里直接写死某一语言的文案

## 作品页规范(Film Lab)

- 首页 `#lab` 板块里的 `<div class="strip" id="strip">` 是作品橱窗,每张卡片是一个 `<figure class="frame" data-video="gen/xxx.mp4">`
- 独立作品页放在 `films/` 目录下,新增作品时复制一份现有作品页改内容,不要从零重写页面结构 / 样式
- 新增作品页后,要同步在主站的 `#strip` 里加一张对应卡片,并给卡片加 `data-href` 指向新作品页,两边缺一不可

## 安全规则

- `.env`(OpenAI / Kling 的 key)永远不进 git 仓库,`.gitignore` 里已经有 `.env`,新建脚本 / 配置文件涉及密钥时先确认走的是 `.env` 而不是硬编码
- key 只在本机被脚本读取,不要以任何形式(包括粘贴进对话、写进注释)外泄

## 推送规范

- commit 信息用英文,简洁说明这次改了什么(参考历史:`Redesign: The Embrace`、`Mobile portrait hero`、`Compress portrait hero video`)
- 推送前先 `git status` 确认没有 `.env`、`.DS_Store` 或其他不该进仓库的敏感 / 临时文件被 stage 进去
