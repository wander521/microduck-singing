# 小鸭合唱团 · MicroDuck Singing

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

延续足球赛与环岛赛的 Three.js / Vite，Web Audio 本地四声部合成。

## Product Purpose

用户可观看四只 MicroDuck 坐姿合唱，在四首完整曲目之间切换，并播放、暂停、重唱和单独试听声部。

## Users

现有小鸭足球赛、环岛赛的用户，通过桌面或手机浏览器观看和聆听合唱。

## Brand Commitments

继承 MicroDuck Arcade 的真实机器人模型、奶油色面板、珊瑚色主操作、Bungee 字标。用户提供的视频是四色小鸭围坐合唱，头部与嘴部表达为核心。

## Capabilities and Constraints

- 已确认曲目：官方 Wistful、Duck Strut，本项目《月球嘎嘎进行曲》、改编《欢乐颂》。
- 乐谱、Web Audio 与口型共用 AudioContext 时钟；不依赖外部音频服务。
- 这是坐姿运动学演示，头部表达改编自官方逻辑；不声称物理仿真、强化学习、硬件或 BLE 同步。
- 播放需用户点击解锁音频；后台自动暂停。曲目结束停止发声，显式重唱。
- 独立目录和依赖，可构建为静态站点，不改足球或环岛赛。

## Evidence on Hand

- 用户参考视频：https://www.youtube.com/watch?v=ZsSoyMcggpU
- 用户参考说明：https://iagai.cn/reference/commands/chorale/index.html
- 上游代码与乐谱固定版本：reference/source-lock.json。
- 许可证与改编声明：THIRD_PARTY.md、public/licenses/。
