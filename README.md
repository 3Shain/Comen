# BILICHAT
![fubuki!](https://raw.githubusercontent.com/3Shain/BiliChat/master/doc/fubuki.jpg)
> 第一次就实装在小狐狸的b站限定直播我能吹一年(虽然中途因压力过大服务器被干掉两次，果然还是膨胀了)

表面上似乎是个弹幕姬  
实际上是youtube chatbox的高仿(指样式表直接照搬)实现，不过把内容换成了b站直播弹幕2333  
**所以在OBS中对于youtube livechat的自定义CSS代码可以直接copy**  
自豪地使用好文明Angular 7

## 🌟如何在OBS中使用(本地部署服务)
0. 下载[Releases](https://github.com/3Shain/BiliChat/releases)中的最新版,然后运行。一切正常的话控制台会输出服务运行的地址。
1. 在场景中新建浏览器源
2. 在URL处填写 ` http://localhost:5000/alpha/<你的直播间ID> `  
到这一步就已经基本完成了。此时的样式与youtube网页直播间的chatbox完 全 一 致
3. 设置自定义CSS参数  
你可以从Google上搜索  ` youtube livechat css ` 找现成的代码  
也有专门的样式生成器网站 [Chat v2](https://chatv2.septapus.com/) / [Chat v2 JP](http://www.geocities.jp/css4obs/) / [Chat v2 CN](https://bilichat.3shain.com/css4obs/)

### 字体问题  
你有可能发现，使用了别人的CSS代码之后，发现中文全是宋体或者只有一部分正常渲染（总之不太好看）。这时候你可以把代码复制到一个编辑器如Notepad++，VSCode，按`ctrl+f`替换字体的名字。请注意这个字体必须已经安装在推流软件所在的电脑上。不建议使用网络在线字体，可能会出现字体闪烁。

## 🍥自定义参数  
在url后面添加query参数可以自定义效果  
* `loadAvatar` true/false 控制是否从api获取头像  默认true
    >这个设置不等于不显示头像，而是只显示默认头像。若需要去掉头像可以在css中设置。  
* `levelFilter` 一个数字 用户等级(UL)低于该值的弹幕不会被显示  默认0
* `hideGiftDanmaku` true/false 控制是否隐藏礼物抽奖弹幕(节奏风暴/摩天楼/小电视的效果) 默认true  
* `showGift` true/false 控制是否展示礼物信息 默认true  
    > 有个内部设定是只有金瓜子价格大于50000的会显示出来。且价值与颜色对应信息也是直接由代码常量定义的。如果需要自定义，仍需自行修改代码。
* `wordFilter` 以半角逗号分隔的字符串 所有包含关键词的弹幕都会被屏蔽  
    > 有一部分词语已经被默认屏蔽，若需解除请自行修改。
* `giftOnly` 只显示礼物信息。

例子: https://your.domain/alpha/114514?loadAvatar=false&levelFilter=20&showGift=false&wordFilter=屏蔽词1,屏蔽词2

## 💲捐助
捐助表示您对我这个项目的认可，所得的钱将用于维护公共服务器，也能激励我继续开发更多好的项目
* 微信  
<img src="https://raw.githubusercontent.com/3Shain/BiliChat/master/doc/wx.png" width="256">  

* 支付宝  
<img src="https://raw.githubusercontent.com/3Shain/BiliChat/master/doc/zfb.jpg" width="256">

