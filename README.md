# Comen

[![MIT License](https://img.shields.io/npm/l/isomorphic-danmaku.svg)](https://github.com/3Shain/isomorphic-danmaku/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

**当前仍在活跃开发中，代码结构可能尚未稳定，并行开发请注意代码的破坏更新** , 原项目【bilichat】请查看[bilichat](https://github.com/3Shain/Comen/tree/bilichat)分支

Comen是一个主要用于在网络直播中向观众展示当前直播间实时评论流的工具。

### 主要特性
* 多平台支持：默认提供了Acfun与Bilibili的接入实现。合理的抽象低耦合设计使得新平台的接入也很容易。
* 高可靠性：不只是一个爱好项目。原项目已运行两年的时间，积累了各种对用户体验和异常处理的优化。
* 兼容Youtube评论栏样式，只需修改URL就能迁移。
* <span style="color:#7f7f7f">高度自定义 (计划中,TBD)</span>
* <span style="color:#006c91">作为原项目的延续，提供用户几乎无感知的兼容。</span>


### 贡献代码

本项目主要技术栈为前端Angular+后端Nestjs,即完全使用TypeScript(JavaScript)实现。

本项目使用到了nx workspace作为管理代码的工具。本项目是一个monorepo的结构，所以任何本项目开源的部分都能在此仓库找到。

**代码结构**
```
- apps
    - core    --- 前端项目
    - node-backend    --- 后端的node(cli)包装
- libs
    - backend-core    --- 后端的可嵌入式实现
    - common          --- 公共代码库
    - editor          --- 样式编辑器(Angular)
    - gamma           --- 兼容Youtube样式表的评论栏渲染器(Angular)
    - isomorphic-danmaku            --- 同构弹幕，实现了acfun、bilibili的ws连接
    - isomprphic-danmaku-server     --- 同构弹幕，服务端only部分
```

**调试运行**
拉取仓库后，首先安装项目依赖
```sh
npm install
```

然后分别打开前端与后端的dev-server
```
nx serve core
nx serve node-backend
```

现在可以对代码进行更改了。任何有关代码更改都会触发自动刷新。