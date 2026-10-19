---
name: "小鸭合唱团 · MicroDuck Singing"
description: "Inherited enamel arcade controls around four seated robot voices on a warm wooden rehearsal stage."
colors:
  paper: "#fff7e7"
  ink: "#203746"
  muted: "#566971"
  coral: "#bd4930"
  line: "#d7d3c3"
  selected-marine: "#263f50"
  coral-hover: "#9e3824"
  hover-paper: "#eee5d1"
  soft-action: "#f7d8bb"
  soft-action-ink: "#873a27"
  error: "#a33e2b"
  rehearsal-mint: "#afc9c3"
  voice-muted: "#dce6dc"
  selected-caption: "#c8d6d9"
  voice-lilac: "#846dba"
  voice-graphite: "#444b54"
  voice-sky: "#44829b"
  voice-gold: "#9a7525"
  shell-lilac: "#b19bd5"
  shell-sky: "#97c6e3"
  shell-ivory: "#eee9db"
  floor-wood: "#b58a60"
typography:
  brand:
    fontFamily: "Bungee, sans-serif"
    fontSize: "35px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "\"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "20px"
    fontWeight: 700
    letterSpacing: "-0.025em"
  title:
    fontFamily: "\"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "16px"
    fontWeight: 800
  track:
    fontFamily: "\"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "14px"
    fontWeight: 800
  voice:
    fontFamily: "\"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "13px"
    fontWeight: 800
  control:
    fontFamily: "\"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "12px"
    fontWeight: 750
  body:
    fontFamily: "\"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "12px"
    lineHeight: 1.85
  caption:
    fontFamily: "\"PingFang SC\", \"Microsoft YaHei\", sans-serif"
    fontSize: "10px"
rounded:
  progress: "3px"
  field: "9px"
  primary: "10px"
  banner: "12px"
  dock: "13px"
  panel: "14px"
  dot: "50%"
spacing:
  programme-gap: "6px"
  voice-gap: "8px"
  primary-inset: "15px 23px"
  quiet-inset: "12px 14px"
  piece-inset: "17px 10px"
  voice-inset: "12px 17px"
  programme-inset: "24px 15px 16px"
  transport-inset: "16px 24px"
  about-inset: "22px 25px"
  desktop-edge: "28px"
  mobile-edge: "16px"
components:
  button-primary:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.paper}"
    rounded: "{rounded.primary}"
    padding: "{spacing.primary-inset}"
    typography: "{typography.track}"
  button-primary-hover:
    backgroundColor: "{colors.coral-hover}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "{spacing.quiet-inset}"
    typography: "{typography.control}"
  button-quiet-hover:
    backgroundColor: "{colors.hover-paper}"
  programme:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "{spacing.programme-inset}"
    width: "264px"
  piece:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "{spacing.piece-inset}"
    width: "100%"
  piece-selected:
    backgroundColor: "{colors.selected-marine}"
    textColor: "{colors.paper}"
  voice:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.primary}"
    padding: "{spacing.voice-inset}"
  voice-selected:
    backgroundColor: "{colors.selected-marine}"
    textColor: "{colors.paper}"
  voice-muted:
    backgroundColor: "{colors.voice-muted}"
    textColor: "{colors.ink}"
  volume:
    textColor: "{colors.ink}"
    width: "80px"
    height: "24px"
  progress:
    backgroundColor: "{colors.line}"
    rounded: "{rounded.progress}"
    width: "100%"
    height: "4px"
  progress-fill:
    backgroundColor: "{colors.coral}"
  playback-transport:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "{spacing.transport-inset}"
  about-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "{spacing.about-inset}"
---

# Design System: 小鸭合唱团

## Overview

**Creative North Star: "奶油搪瓷街机 · Enamel Toy Sports Arcade"**

奶油操作件、海蓝文字与珊瑚动作色继承 MicroDuck Arcade 的玩具街机身份。合唱团把同一套搪瓷语法移到安静的排练空间：薄荷色环境、圆形木地板、四只保持真实模型比例的坐姿机器鸭。Bungee 字标带来熟悉的游戏感，中文系统字体让操作直接可读。

这是独立合唱应用当前实现的设计记录。三维演员承担表现力，节目单、试听声部与播放条承担清晰的操作层级。温暖日光、材质与投影建立舞台深度；界面保持不透明、紧凑、可触摸。

**Key Characteristics:**

- 暖奶油操作件、海蓝文字与选中态、珊瑚主要操作，延续现有街机身份。
- Bungee 仅用于 DUCK! 字标；曲名、说明与交互标签使用中文系统无衬线。
- 薄荷背景上的圆形木质舞台，淡紫、石墨、天蓝与象牙四色坐姿小鸭。
- 桌面控件围绕舞台，手机依次堆叠舞台、节目单、声部与播放条。

## Colors

暖奶油表面衬托冷海蓝文字，珊瑚色引导播放动作；薄荷环境与四鸭配色属于三维舞台。数值以 frontmatter 为规范，来源为 `src/style.css` 与 `src/stage.js`。

### Primary

- **珊瑚动作色** (`coral`)：播放、暂停与再次演唱共用的主要按钮，原生音量控件和进度填充也使用它；悬停使用 `coral-hover`。可见焦点同样沿用珊瑚。

### Secondary

- **海蓝搪瓷** (`selected-marine`)：当前节目和独唱声部的选中底色，搭配奶油文字；选中声部的英文辅文使用 `selected-caption`。
- **四色声部** (`voice-lilac`、`voice-graphite`、`voice-sky`、`voice-gold`)：低音、次中音、中音、高音的标记点，配合中英文名称识别。界面标记比浅色模型外壳更深，维持小尺寸可读性。
- **舞台材质** (`rehearsal-mint`、`shell-lilac`、`voice-graphite`、`shell-sky`、`shell-ivory`、`floor-wood`)：薄荷环境、四色外壳和木台基底；木板深浅变化与金黄嘴部由场景源码定义。

### Neutral

- **奶油纸面** (`paper`)：节目单、声部按钮、播放条、说明卡和右上操作 dock 的不透明底色。
- **海蓝文字** (`ink`) 与 **灰蓝辅文** (`muted`)：标题、操作与次要说明分层；时长和进度时间使用等宽数字。
- **纸面反馈** (`hover-paper`、`voice-muted`、`line`)：普通按钮悬停、独唱时其他声部的退后态、进度轨道。
- **暖色辅助** (`soft-action`、`soft-action-ink`、`error`)：文本选择底、来源链接与加载/音频失败提示。错误有可读文案和 alert 语义。

**The Meaningful Accent Rule.** 珊瑚表示播放主操作；海蓝表示当前曲目和独唱声部，状态同时用文字与 aria-pressed 表达。

## Typography

**Display Font:** 自托管 `Bungee`，后备 sans-serif。字体文件 `/assets/fonts/Bungee-Regular.ttf`；无远程字体请求。

**Body Font:** `"PingFang SC", "Microsoft YaHei", sans-serif`。中文依靠字号和字重建立层级。

- **Brand**：桌面字标（35px/1、400、-0.03em）；中等桌面（30px）；手机（26px），极窄屏（23px）。
- **Headline**：节目单标题（20px、700、-0.025em），手机（16px）。品牌中文名（16px、800），手机（13px），极窄屏（12px）。
- **Track / Playback title**：节目名与主按钮（14px、800），当前曲目（15px、800）；手机分别（12px、12px、13px）。
- **Voice**：声部中文（13px、800），英文（8px、0.06em）；手机分别（11px、7px、正常字距）。
- **Controls / Body**：安静操作（12px、750）；关于正文（12px/1.85）。节目英文名、来源和提示多用（10–11px）；手机时长与节目英文名降至（9px）。

**The Display Role Rule.** Bungee 保留给 DUCK! 字标，中文标题和交互标签使用系统字体。

## Layout

桌面采用固定视口舞台，页面不滚动。页头离左右边（28px）、顶部（24px）；左侧节目单宽（264px）、顶部（110px）。舞台位于左侧节目单右方，默认 inset（76px 0 170px 265px）；状态与声部按钮按舞台中心而非整个屏幕居中。底部播放条离两侧（28px）、底部（45px），网格依次放曲目、播放操作、进度与音量，内边距（16px 24px）、列间距（30px）。说明卡从右上展开。

- **宽度 ≥1600px**：舞台 inset（90px 20px 170px 292px），节目单垂直位置按视口居中调整。
- **761–1150px**：侧边距缩为（22px），节目单宽（240px），播放条改三列并隐藏音量；声部按钮收紧。
- **桌面高度 ≤740px**：节目单、曲目行与播放条缩短，舞台上下范围调整，声部行移至距底（133px）。
- **宽度 ≤760px**：页面自然滚动；页头进入文档流，舞台高（340px），节目单在其下方以两列展示四首曲目。各操作区离侧边（16px），四个声部等分一行。播放条为两列，进度与音量各自跨整行；保留音量。手机面板和声部按钮去掉阴影。提示在文档末尾，带底部 safe-area padding。
- **宽度 ≤370px**：进一步缩小字标与按钮，节目时长隐藏，当前曲目来源允许窄行换行。

**The Stage Rule.** 把持续操作放在演员周围，让四只小鸭的头部与嘴部保持可见；窄屏通过文档堆叠容纳操作。

## Elevation & Depth

不透明的奶油操作件通过柔和短投影浮在薄荷环境上。常规面板阴影（`0 8px 28px #264b4520`），声部按钮使用更浅的阴影（`0 4px 14px #264b4510`），说明卡略高（`0 16px 50px #264b4530`）。手机的节目单、声部和播放条取消阴影，以留白和实色表面区分。

Three.js 使用暖色主光、冷色补光、半球光、真实几何与软阴影。木板排列在圆形浅色基座上，两只小花盆做舞台边缘陪衬；空间感来自场景，操作件保持平整。一般 HUD 在画布上方，说明卡高于 HUD，错误提示最高。

## Shapes

延续搪瓷街机的圆角形态：曲目和安静按钮（9px）、主按钮与声部按钮（10px）、错误提示（12px）、右上 dock（13px）、节目单/播放条/说明卡（14px）。小圆点表达状态和声部身份，细进度条（4px 高、3px 圆角）。圆形木台与小鸭保留实体模型轮廓。

图标使用内联 SVG，无填色、统一（1.8px）描边、圆端点和圆转角；普通按钮图标（21px），播放图标（18px），默认图标按钮（44px）见方。

## Components

### Primary / Quiet buttons

主要按钮珊瑚底、奶油字，最小尺寸（147px × 52px）、内边距（15px 23px）；手机最小（105px × 46px）。它在入座、准备声音、开始、暂停、继续与再次演唱之间更新真实文案。资源或音频准备中 disabled，透明度（.65），wait 光标。普通操作透明底、悬停浅奶油。所有启用按钮悬停还应用 brightness（.96），源码未定义通用 transition 或 active 位移。按钮、链接、输入的键盘焦点为珊瑚轮廓（3px、4px 偏移）。

### Programme / Piece selection

奶油节目单内四个原生按钮按序号、中文名、英文名与时长排列。曲目行最小高（76px）、内边距（17px 10px），选中行海蓝底配奶油字，通过 `aria-pressed` 表达选中。演唱时当前行时长换成三条暖色动态音柱。手机为两列，最小高（65px）。四首曲目为 Wistful、Duck Strut、Moon Quack March 与 Ode to Joy，文案与来源以乐谱数据为准。

### Voice audition

四只小鸭各有一个带颜色点、中英文名和三条音柱的按钮。默认奶油底，独唱选中为海蓝底，其他声部退后为 `voice-muted`；`aria-pressed` 与可访问名称同步更新。再次点击或“恢复四声部”退出独唱。默认最小尺寸（122px × 58px）、内边距（12px 17px）；手机四等分，不显示音柱。音柱反映声部音符，不作为唯一声音状态。

### Transport / Progress / Volume

播放条把曲名和来源、重唱、播放/暂停、下一首、已过时间、总时长、进度和音量组织成一层奶油操作台。进度为原生 `progress`，仅展示进度；音量为有名称的原生 range（0–100，默认 70），旁边显示百分比。桌面滑条宽（80px），手机（100px）；系统原生轨道样式以珊瑚 accent-color 着色。Space 在非表单与非按钮目标上控制播放/暂停。

### Stage / Status

四只坐姿机器鸭以淡紫、石墨、天蓝、象牙外壳区分，头部与嘴部随音频时钟表达。用户拖动环顾，右上按钮恢复初始视角；画布有描述性的 img 语义。准备、演唱、暂停、结束有文字状态和色点，文字使用 status 语义。准备期间显示入座文案，WebGL 或音频失败显示 alert。减少动态效果偏好关闭 CSS 音柱动画，并停止额外头部摆动，保留嘴部的发声表达。

### About / Source links

奶油说明卡放在右上操作下方，提供紧凑的标题、两段说明、来源链接与有名称的关闭按钮。它是非模态说明区域；Escape 关闭并把焦点还给“关于合唱”。卡片默认最大宽（410px）、内边距（22px 25px）；手机两侧（16px），宽度随容器。链接使用暖棕文字、清晰下划线与同一焦点轮廓。

## Do's and Don'ts

### Do

- Do 延续奶油操作件、海蓝选中态与珊瑚主要操作，沿用当前字体、圆角和间距。
- Do 让节目单和声部通过文字、可见焦点与 aria-pressed 共同表达状态。
- Do 在手机上保留清晰的四鸭舞台，并让节目单、试听和播放控制自然向下滚动。
- Do 让声部指示、嘴部与头部表现跟随同一音频时钟，并尊重减少动态效果偏好。

### Don't

- Don't 让帮助说明或持久面板覆盖四只小鸭的头部与嘴部。
- Don't 把声部身份仅交给颜色；保留低音、次中音、中音、高音和英文标签。
- Don't 给普通控件混用字符箭头或图标字体；沿用内联 SVG 的统一描边。
- Don't 把舞台的木质和小鸭配色扩散成操作面板的新皮肤；共享的搪瓷语法保持稳定。


默认镜头采用小鸭主体近景，桌面收紧并抬高构图，恢复视角回到同一取景。场景宽度不超过 760px 时使用独立的稍远镜头及 48° 视野，完整容纳四只小鸭；桌面使用 32°。
