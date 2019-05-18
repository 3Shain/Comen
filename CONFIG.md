# 🔬 **[实验性功能|EXPERIMENTAL]** 本地配置文件

由于使用URL参数仍有诸多限制(比如长度限制,数据结构单一,特殊字符串需转义),所以**本地部署版本**提供了更为灵活的**配置文件**。

首先,在**运行BILICHAT的目录(PWD)**新建一个 `config.json`文件  
> 如果你使用npm发布包,你可以将此文件放在任何目录,只要你在当前所在目录执行bilichat命令就可以

如果你希望为特定用户提供特定的配置参数,将文件名改为 `config.<用户ID>.json`即可。如`config.4331384.json`

一个*典型*的配置文件格式应当是这样的
```json
{
    "displayMode": 3,
    "loadAvatar": true,
    "levelFilter": 0,
    "wordFilter": [],
    "showGift": true,
    "hideGiftDanmaku": false,
    "groupSimilar": true,
    "customEmotions": [
        {
            "command": "理解理解",
            "source": "rikairikai.jpg"
        }
    ],
    "giftLevel": [
        {
            "value": 50,
            "color": "3F3F3F"
        }
    ],
    ...更多配置项
}
```
下面将解释各配置项的作用

## loadAvatar : boolean
是否从api服务器拉取头像,默认true  
设置为false时将全部显示B站默认头像

## levelFilter : number
设置最低发言等级(UL等级),默认0(不屏蔽)  
用户等级低于该值将不会显示

## wordFilter : string[]
屏蔽关键字,当用户发言包含这些关键字时会被屏蔽。
> 正确格式是 `['关键字1','关键字2','...']`

## showGift : boolean
是否显示礼物赠送信息,默认`true`

## hideGiftDanmaku : boolean
是否屏蔽礼物弹幕(如抽奖弹幕,节奏风暴),默认`true  `
**这不是礼物赠送信息**

## groupSimilar : boolean
堆叠相似弹幕,并显示相似弹幕数量,默认`true`

## groupSimilarWindow : number
检测相似弹幕的窗口大小,默认`5`(检测最近5条)

## maxDanmakuNum : number
渲染弹幕的最大数量,默认`100`  
此项会影响渲染性能

## displayMode : enum
显示控制微码,默认`3`  
```
0   什么都不显示
1   只显示弹幕
2   只显示礼物
3   都显示
```
> showGift优先于displayMode

## blackList : number[]
UID黑名单。

## minGiftValue : number
最低会显示的礼物价值,默认20

## customGiftLevel : Array<{ value:number , color:string }>
设置礼物弹幕的不同等级及其颜色,默认值
```json
[
    { value: 1245, color: "#e62117" },
    { value: 450, color: "#c2185b" },
    { value: 300, color: "#e65110" },
    { value: 100, color: "#ffca28" },
    { value: 50, color: "#00bfa5" },
    { value: 0, color: "#00b8d4" }
]
```
value表示该等级的最低价值(RMB),color为对应hex颜色值(注意#符号)

## silverGiftRatio : number
银瓜子价值换算为金瓜子的比例,默认`0`,即任何数量银瓜子*0=0金瓜子,等于不显示任何银瓜子礼物。  
设置为`1`即为金瓜子银瓜子等效。  
可以设置一个恰当的小数,如`0.1`即10银瓜子=1金瓜子

## customEmotions: Array<{ command:string , source:string }>
设置礼物弹幕的不同等级及其颜色,默认值为空数组
**触发机制为全文匹配**  
例:
```json
[
    {
        "command": "理解理解",
        "source": "https://image.domain/.../rikairikai.jpg"
    },
    ...更多配置项
 ]
```
当弹幕内容等于某个command时,会自动替换为source的图片。