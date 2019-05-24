# <img src="https://raw.githubusercontent.com/3Shain/BiliChat/master/src/favicon.ico" width="48" style="vertical-align:text-bottom"> BILICHAT 
![fubuki!](https://raw.githubusercontent.com/3Shain/BiliChat/master/doc/fubuki.jpg)
> 第一次就实装在小狐狸的b站限定直播我能吹一年(虽然中途因压力过大服务器被干掉两次，果然还是膨胀了)



<p align="center"><a href="https://github.com/3Shain/BiliChat"><img alt="star this repo" src="http://githubbadges.com/star.svg?user=3Shain&amp;repo=BiliChat&amp;style=flat"/></a>
<a href="https://github.com/3Shain/BiliChat/fork"><img alt="fork this repo" src="http://githubbadges.com/fork.svg?user=3Shain&amp;repo=BiliChat&amp;style=flat"/></a>
<a href="https://npmjs.org/package/bilichat"><img alt="NPM" src="https://nodei.co/npm/bilichat.png?compact=true"/></a>
<a href="https://github.com/ellerbrock/typescript-badges/"><img alt="TypeScript" src="https://badges.frapsoft.com/typescript/version/typescript-next.svg?v=101"/></a>
<a href="https://github.com/ellerbrock/open-source-badges/"><img alt="Open Source Love" src="https://badges.frapsoft.com/os/v2/open-source.png?v=103"/></a>
<a href="https://opensource.org/licenses/GPL-3.0/"><img alt="GPL Licence" src="https://badges.frapsoft.com/os/gpl/gpl.svg?v=103"/></a>
<a href="http://makeapullrequest.com"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square"/></a>
</p>

表面上似乎是个弹幕姬  
实际上是youtube chatbox的高仿(指样式表直接照搬)实现，不过把内容换成了b站直播弹幕2333  
**所以在OBS中对于youtube livechat的自定义CSS代码可以直接copy**  
自豪地使用好文明Angular 7  
感谢logo提供者:[@Afanyiyu](https://github.com/Afanyiyu)

## 本地部署版下载
可以在[Release]()获取压缩包(bilichat-\*.*.zip)

或者直接使用npm下载
```
npm install -g bilichat
bilichat
```

## 🌟如何在OBS中使用

![1](https://user-images.githubusercontent.com/20179549/57980507-17b91c80-7a5f-11e9-9033-621c2eecfa9c.gif)

1. 在场景中新建浏览器源
2. 在URL处填写 ` https://bilichat.3shain.com/alpha/<你的直播间ID> `  
如果是本地运行的服务,替换上面的域名即可,如  ` http://localhost:5000/alpha/<你的直播间ID> `  
到这一步就已经基本完成了。此时的样式与youtube网页直播间的chatbox完 全 一 致
3. 设置自定义CSS参数  
你可以从Google上搜索  ` youtube livechat css ` 找现成的代码  
也有专门的样式生成器网站 [Chat v2](https://chatv2.septapus.com/) / [Chat v2 JP](http://www.geocities.jp/css4obs/) / [Chat v2 CN](https://bilichat.3shain.com/css4obs/)

### 字体问题  
你有可能发现，使用了别人的CSS代码之后，发现中文全是宋体或者只有一部分正常渲染（总之不太好看）。这时候你可以把代码复制到一个编辑器如Notepad++，VSCode，按`ctrl+f`替换字体的名字。请注意这个字体必须已经安装在推流软件所在的电脑上。不建议使用网络在线字体，可能会出现字体闪烁。

## 🍥URL参数  
在url后面添加query参数可以自定义效果  
* `loadAvatar` true/false 控制是否从api获取头像  默认true
    >这个设置不等于不显示头像，而是只显示默认头像。若需要去掉头像可以在css中设置。  
* `levelFilter` 一个数字 用户等级(UL)低于该值的弹幕不会被显示  默认0
* `hideGiftDanmaku` true/false 控制是否隐藏礼物抽奖弹幕(节奏风暴/摩天楼/小电视的效果) 默认true  
* `showGift` true/false 控制是否展示礼物信息 默认true  
    > 价值与颜色对应信息如果需要自定义，请参考本地配置文件。
* `wordFilter` 以半角逗号分隔的字符串 所有包含关键词的弹幕都会被屏蔽  
    > 有一部分词语已经被默认屏蔽，若需解除请自行修改。
* `giftOnly` 只显示礼物信息 默认false
* `groupSimilar` 堆叠同类弹幕 默认true
* `pure` 是否忽略api服务器 设置为true时只显示默认头像 并且不支持短房间号 默认false
* `blackList` 以半角逗号分隔的数字UID字符串,对应用户的弹幕将会被屏蔽  
* `minGiftValue` 最低显示礼物价值,默认20
* `silverGiftRatio` 银瓜子折算金瓜子价值比例,默认0,即不显示任何银瓜子礼物

例子: https://your.domain/alpha/114514?loadAvatar=false&levelFilter=20&showGift=false&wordFilter=屏蔽词1,屏蔽词2

## 🔬 **[实验性功能|EXPERIMENTAL]** 本地配置文件

参见[本地配置文件教程](https://github.com/3Shain/BiliChat/blob/master/CONFIG.md)

## 💲捐助
捐助表示您对我这个项目的认可，所得的钱将用于维护公共服务器，也能激励我继续开发更多好的项目
* 微信  
<img src="https://raw.githubusercontent.com/3Shain/BiliChat/master/doc/wx.png" width="256">  

* 支付宝  
<img src="https://raw.githubusercontent.com/3Shain/BiliChat/master/doc/zfb.jpg" width="256">

