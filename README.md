# BILICHAT
![fubuki!](https://raw.githubusercontent.com/3Shain/BiliChat/master/doc/fubuki.jpg)
> 第一次就实装在小狐狸的b站限定直播我能吹一年(虽然中途因压力过大服务器被干掉两次，果然还是膨胀了)

表面上似乎是个弹幕姬  
实际上是youtube chatbox的高仿(指样式表直接照搬)实现，不过把内容换成了b站直播弹幕2333  
自豪地使用好文明Angular 7

## 🌟如何在OBS中使用
1. 在场景中新建浏览器源
2. 在URL处填写 ` https://bilichat.3shain.com/alpha/<你的直播间ID> `  
到这一步就已经基本完成了。此时的样式与youtube网页直播间的chatbox完 全 一 致
3. 设置自定义CSS参数  
你可以从Google上搜索  ` youtube livechat css ` 找现成的代码  
也有专门的样式生成器网站 [Chat v2](https://chatv2.septapus.com/) / [Chat v2 JP](http://www.geocities.jp/css4obs/) / 很可惜现在还没有针对中文的 

### 字体问题  
你有可能发现，使用了别人的CSS代码之后，发现中文全是宋体或者只有一部分正常渲染（总之不太好看）。这时候你可以把代码复制到一个编辑器如Notepad++，VSCode，按`ctrl+f`替换字体的名字。请注意这个字体必须已经安装在推流软件所在的电脑上。不建议使用网络在线字体，可能会出现字体闪烁。

## ⚽如何自行搭建服务
0. 安装nodejs和npm软件包管理器
1. 克隆此项目
2. 恢复项目包
     ```
    npm init
    ```
3. 设置`src/environment.ts`内的`api_server`字段为后端服务器  
`environment.prod.ts`是Production编译目标的配置文件  
4. 编译项目，然后运行
    ```
    npm run build
    node bilichat
    ```
    默认5000端口运行(本地可通过浏览器`127.0.0.1:5000`访问)。本项目仅提供了一个简单的后端请求转发实现(目的是解决跨域问题)，在并发量高的情况下建议自行实现缓存之类的功能  
本项目可编译为docker镜像，仅配置angular服务端渲染，并没有提供后端转发实现。默认Production编译目标

## 💲捐助
捐助表示您对我这个项目的认可，所得的钱将用于维护公共服务器，也能激励我继续开发更多好的项目
* 微信  
<img src="https://raw.githubusercontent.com/3Shain/BiliChat/master/doc/wx.jpg" width="256">  

* 支付宝  
<img src="https://raw.githubusercontent.com/3Shain/BiliChat/master/doc/zfb.jpg" width="256">

## ✨TODO  
* 增加不显示头像的参数noface
* 增加自定义屏蔽参数filter

## 👀为什么那天的直播弹幕姬两度自闭

![噔 噔 咚](https://raw.githubusercontent.com/3Shain/BiliChat/master/doc/zibi.png)  
那是因为缓存头像服务器Redis把内存给撑爆了  
毕竟人数也太多了  
(所以快给我打钱加内存啊(明示

