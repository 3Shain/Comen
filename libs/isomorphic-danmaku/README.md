# 📖 isomorphic-danmaku

[![version](https://img.shields.io/npm/v/isomorphic-danmaku.svg)](https://www.npmjs.com/package/isomorphic-danmaku)
[![MIT License](https://img.shields.io/npm/l/isomorphic-danmaku.svg)](https://github.com/3Shain/isomorphic-danmaku/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

browser/nodejs 同构的直播平台弹幕获取

**此package仍在活跃开发阶段，接口规范尚未确定，请注意后续可能产生的breaking change**

## 💻 支持平台(字母排序)

- acfun
- bilibili

> 暂不对数据二次封装，需自行处理消息的解析。_之后可能会有计划提出并封装为一种标准格式并提供一个 pure function pipe_

## 📖 安装

```shell
npm install isomorphic-danmaku
```

## 🍥 食用方法

### 建立连接

1. 预获取房间信息（bilibili可省略，acfun必须）
```ts
// 以esmodule导入为例子，nodejs下也可以使用require()
import { getAcfunRoomInfo, getBilibiliRoomInfo } from 'isomorphic-danmaku-server'; //注意后面的-server

// 获取对应房间信息

const acinfo = await getAcfunRoomInfo(123456);

const biliinfo = await getBilibiliRoomInfo(123456);


```

> 此步骤只能运行在nodejs上，因为浏览器无法跨域请求。如果你想在浏览器上直接连接（ws默认不禁止跨域），则需要有一个服务端为其提供这些预请求房间信息。

2. 连接房间并获取弹幕

```ts

import { connectBilibiliLiveWs } from 'isomorphic-danmaku';
// 对于acfun
import { connectAcfunLiveWs } from 'isomorphic-danmaku';

for await (let msg of connectBilibiliLiveWs({ roomId: 123456 })){
    // 直接处理msg
    console.log(msg);
    // 跳过continue,停止处理则可使用break
}

```

Acfun需要的参数信息
```ts
{
    roomId: number; //房间号
    //以下字段均从上述接口获取
    acSecurity: string;
    serviceToken: string;
    tickets: string[];
    liveId: string;
    userId: stirng;
    enterRoomAttach: string;
}
```
Bilibili需要的参数信息
```ts
{
    roomId: number; // 房间号
    host?: string; // 连接的服务器，是一个域名
    token?: string; // 可从roominfo接口获取
}
```

`scripts/`文件夹内有nodejs的例子。

### 在浏览器上使用(连接ws的部分)

在 package.json 里添加以下字段

```json
"browser": {
    "@peculiar/webcrypto": false
}
```

这是为了告诉 bundler(如 webpack,rollup 此类)忽略这些包的导入（大多是node环境独有的包）。

暂不提供 umd 打包格式，即无法直接通过添加一个`<script>`标签的形式引入


## 📃 TODO

* **acfun返回内容的细化(搬砖)**
* 添加测试
* 标准化信息，标准的制定，pure function pipe

## ❓ 常见问题

### Q: 'Can't resolve module 'xxx' ....
A: 这是使用webpack等打包浏览器端时经常出现的问题。原因往往是引入的包引入的包引入的包...总之在某一层引入了只能运行于node环境的包，**即使实际逻辑根本不会用到那个包**。可以通过上述package.json中的browser字段添加那个包以解决。

<!-- ### Q:为什么使用 AsyncGenerator 而不是事件机制

A: 如果你会使用这个库，我断定你的代码是想在收到一条需要的信息时对他做一些操作：或输出，或储存，或抛弃。所以让你自己在需要处理新消息的时候主动去拉取，相比于我迫不及待地去调用你的 event handler 不更好吗。另外尝试接受 ES 新语法`for await`会让你的代码更紧凑，特别是在 js 已经有强大闭包支持的情况下。_我觉得不会有人问：这样代码不会阻塞吗？<del>但凡知道 promise 是什么都不会问出这个问题</del>_。当然如果你实在想用事件机制，用 js/ts 改造它不要太容易！ -->