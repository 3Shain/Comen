import { Message, RichTextMessage, RichTextNode } from '@comen/common';
import { identity } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComenConfiguration } from '../config';

const EMOJI_START_TOKEN = ['(', '（'];
const EMOJI_END_TOKEN = [')', '）', ',', '，', '.', ' ', '。', '/', '\\',
    '$', '¥', '-', '+', '*', '#', '@', '!', '~', '?', '=', '_', ';', '"', '“', '”', '|']

function emojiExpressionToken(charArr: string[]): [string, string] {
    let constructed = '';
    //eslint-disable-next-line
    while (true) {
        if (charArr.length == 0) {
            return [constructed, ''];
        }
        const next = charArr.shift();
        if (EMOJI_START_TOKEN.includes(next)) {
            charArr.unshift(next);
            return [constructed, ''];
        }
        if (EMOJI_END_TOKEN.includes(next)) {
            return [constructed, next];
        } else {
            constructed += next;
        }
    }
}

export function emojiExpressionLexer(dict: (token: string) => string | null, content: string): RichTextNode[] {
    if (content.length == 0) {
        return [{ type: 'text', content: '' }];
    }
    const nodes: RichTextNode[] = [];
    const charArr = Array.from(content);
    let constructedText = '';
    //eslint-disable-next-line
    while (true) {
        if (charArr.length == 0) {
            constructedText && nodes.push({
                type: 'text',
                content: constructedText
            });
            break;
        }
        const next = charArr.shift();
        if (EMOJI_START_TOKEN.includes(next)) {
            const [token, tokenEnd] = emojiExpressionToken(charArr);
            const url = dict(token);
            if (url != null) { //has emoji
                constructedText && nodes.push({
                    type: 'text',
                    content: constructedText
                });
                nodes.push({
                    type: 'emoji',
                    url: url
                });
                if (tokenEnd == ')' || tokenEnd == '）') {
                    constructedText = '';
                } else {
                    constructedText = tokenEnd;
                }
            } else {
                constructedText += (next + token + tokenEnd);
            }
        } else {
            constructedText += next;
        }
    }
    return nodes;
}

function emojiMap(message: Message) {
    if (message.type == 'text') {
        const ret = emojiExpressionLexer((token) => {
            return EMOJI_MAP[token];
        }, message.content);
        if (ret.some(x => x.type == 'emoji')) {
            return {
                ...message,
                type: 'richtext',
                richtext: {
                    nodes: ret
                }
            } as RichTextMessage;
        }
        return message;
    } else {
        return message;
    }
}

export const emojiFilter = (config: ComenConfiguration) => {
    if (config.platform == 'bilibili') {
        return map(emojiMap);
    }
    return identity;
};

/**
 * TODO: configurable emojis
 */
export const EMOJI_MAP = {
    2021: 'http://i0.hdslb.com/bfs/emote/14d8996128d46dabd3a2ed6c172c8af918d7a5d2.png',
    微笑: 'http://i0.hdslb.com/bfs/emote/685612eadc33f6bc233776c6241813385844f182.png',
    OK: 'http://i0.hdslb.com/bfs/emote/4683fd9ffc925fa6423110979d7dcac5eda297f4.png',
    星星眼: 'http://i0.hdslb.com/bfs/emote/63c9d1a31c0da745b61cdb35e0ecb28635675db2.png',
    doge: 'http://i0.hdslb.com/bfs/emote/bba7c12aa51fed0199c241465560dfc2714c593e.png',
    狗头: 'http://i0.hdslb.com/bfs/emote/bba7c12aa51fed0199c241465560dfc2714c593e.png',
    妙啊: 'http://i0.hdslb.com/bfs/emote/b4cb77159d58614a9b787b91b1cd22a81f383535.png',
    吃瓜: 'http://i0.hdslb.com/bfs/emote/4191ce3c44c2b3df8fd97c33f85d3ab15f4f3c84.png',
    辣眼睛: 'http://i0.hdslb.com/bfs/emote/35d62c496d1e4ea9e091243fa812866f5fecc101.png',
    滑稽: 'http://i0.hdslb.com/bfs/emote/d15121545a99ac46774f1f4465b895fe2d1411c3.png',
    笑哭: 'http://i0.hdslb.com/bfs/emote/c3043ba94babf824dea03ce500d0e73763bf4f40.png',
    呲牙: 'http://i0.hdslb.com/bfs/emote/b5a5898491944a4268360f2e7a84623149672eb6.png',
    打call: 'http://i0.hdslb.com/bfs/emote/431432c43da3ee5aab5b0e4f8931953e649e9975.png',
    歪嘴: 'http://i0.hdslb.com/bfs/emote/4384050fbab0586259acdd170b510fe262f08a17.png',
    嫌弃: 'http://i0.hdslb.com/bfs/emote/de4c0783aaa60ec03de0a2b90858927bfad7154b.png',
    喜欢: 'http://i0.hdslb.com/bfs/emote/8a10a4d73a89f665feff3d46ca56e83dc68f9eb8.png',
    哦呼: 'http://i0.hdslb.com/bfs/emote/362bded07ea5434886271d23fa25f5d85d8af06c.png',
    酸了: 'http://i0.hdslb.com/bfs/emote/92b1c8cbceea3ae0e8e32253ea414783e8ba7806.png',
    大哭: 'http://i0.hdslb.com/bfs/emote/2caafee2e5db4db72104650d87810cc2c123fc86.png',
    害羞: 'http://i0.hdslb.com/bfs/emote/9d2ec4e1fbd6cb1b4d12d2bbbdd124ccb83ddfda.png',
    疑惑: 'http://i0.hdslb.com/bfs/emote/b7840db4b1f9f4726b7cb23c0972720c1698d661.png',
    调皮: 'http://i0.hdslb.com/bfs/emote/8290b7308325e3179d2154327c85640af1528617.png',
    喜极而泣: 'http://i0.hdslb.com/bfs/emote/485a7e0c01c2d70707daae53bee4a9e2e31ef1ed.png',
    奸笑: 'http://i0.hdslb.com/bfs/emote/bb84906573472f0a84cebad1e9000eb6164a6f5a.png',
    笑: 'http://i0.hdslb.com/bfs/emote/81edf17314cea3b48674312b4364df44d5c01f17.png',
    偷笑: 'http://i0.hdslb.com/bfs/emote/6c49d226e76c42cd8002abc47b3112bc5a92f66a.png',
    惊讶: 'http://i0.hdslb.com/bfs/emote/f8e9a59cad52ae1a19622805696a35f0a0d853f3.png',
    捂脸: 'http://i0.hdslb.com/bfs/emote/6921bb43f0c634870b92f4a8ad41dada94a5296d.png',
    阴险: 'http://i0.hdslb.com/bfs/emote/ba8d5f8e7d136d59aab52c40fd3b8a43419eb03c.png',
    囧: 'http://i0.hdslb.com/bfs/emote/12e41d357a9807cc80ef1e1ed258127fcc791424.png',
    呆: 'http://i0.hdslb.com/bfs/emote/33ad6000d9f9f168a0976bc60937786f239e5d8c.png',
    抠鼻: 'http://i0.hdslb.com/bfs/emote/cb89184c97e3f6d50acfd7961c313ce50360d70f.png',
    大笑: 'http://i0.hdslb.com/bfs/emote/ca94ad1c7e6dac895eb5b33b7836b634c614d1c0.png',
    惊喜: 'http://i0.hdslb.com/bfs/emote/0afecaf3a3499479af946f29749e1a6c285b6f65.png',
    无语: 'http://i0.hdslb.com/bfs/emote/44667b7d9349957e903b1b62cb91fb9b13720f04.png',
    鼓掌: 'http://i0.hdslb.com/bfs/emote/895d1fc616b4b6c830cf96012880818c0e1de00d.png',
    点赞: 'http://i0.hdslb.com/bfs/emote/1a67265993913f4c35d15a6028a30724e83e7d35.png',
    尴尬: 'http://i0.hdslb.com/bfs/emote/cb321684ed5ce6eacdc2699092ab8fe7679e4fda.png',
    灵魂出窍: 'http://i0.hdslb.com/bfs/emote/43d3db7d97343c01b47e22cfabeca84b4251f35a.png',
    委屈: 'http://i0.hdslb.com/bfs/emote/d2f26cbdd6c96960320af03f5514c5b524990840.png',
    傲娇: 'http://i0.hdslb.com/bfs/emote/010540d0f61220a0db4922e4a679a1d8eca94f4e.png',
    冷: 'http://i0.hdslb.com/bfs/emote/cb0ebbd0668640f07ebfc0e03f7a18a8cd00b4ed.png',
    疼: 'http://i0.hdslb.com/bfs/emote/905fd9a99ec316e353b9bd4ecd49a5f0a301eabf.png',
    吓: 'http://i0.hdslb.com/bfs/emote/9c10c5ebc7bef27ec641b8a1877674e0c65fea5d.png',
    生病: 'http://i0.hdslb.com/bfs/emote/0f25ce04ae1d7baf98650986454c634f6612cb76.png',
    吐: 'http://i0.hdslb.com/bfs/emote/06946bfe71ac48a6078a0b662181bb5cad09decc.png',
    捂眼: 'http://i0.hdslb.com/bfs/emote/c5c6d6982e1e53e478daae554b239f2b227b172b.png',
    嘘声: 'http://i0.hdslb.com/bfs/emote/e64af664d20716e090f10411496998095f62f844.png',
    思考: 'http://i0.hdslb.com/bfs/emote/cfa9b7e89e4bfe04bbcd34ccb1b0df37f4fa905c.png',
    再见: 'http://i0.hdslb.com/bfs/emote/fc510306bae26c9aec7e287cdf201ded27b065b9.png',
    翻白眼: 'http://i0.hdslb.com/bfs/emote/eba54707c7168925b18f6f8b1f48d532fe08c2b1.png',
    哈欠: 'http://i0.hdslb.com/bfs/emote/888d877729cbec444ddbd1cf4c9af155a7a06086.png',
    奋斗: 'http://i0.hdslb.com/bfs/emote/bb2060c15dba7d3fd731c35079d1617f1afe3376.png',
    墨镜: 'http://i0.hdslb.com/bfs/emote/3a03aebfc06339d86a68c2d893303b46f4b85771.png',
    难过: 'http://i0.hdslb.com/bfs/emote/a651db36701610aa70a781fa98c07c9789b11543.png',
    撇嘴: 'http://i0.hdslb.com/bfs/emote/531863568e5668c5ac181d395508a0eeb1f0cda4.png',
    抓狂: 'http://i0.hdslb.com/bfs/emote/4c87afff88c22439c45b79e9d2035d21d5622eba.png',
    生气: 'http://i0.hdslb.com/bfs/emote/3195714219c4b582a4fb02033dd1519913d0246d.png',
    口罩: 'http://i0.hdslb.com/bfs/emote/3ad2f66b151496d2a5fb0a8ea75f32265d778dd3.png',
    鸡腿: 'http://i0.hdslb.com/bfs/emote/c7860392815d345fa69c4f00ef18d67dccfbd574.png',
    月饼: 'http://i0.hdslb.com/bfs/emote/89b19c5730e08d6f12fadf6996de5bc2e52f81fe.png',
    雪花: 'http://i0.hdslb.com/bfs/emote/a41813c4edf8782047e172c884ebd4507ce5e449.png',
    视频卫星: 'http://i0.hdslb.com/bfs/emote/dce6fc7d6dfeafff01241924db60f8251cca5307.png',
    '11周年': 'http://i0.hdslb.com/bfs/emote/d3b2d5dc028c75ae4df379f4c3afbe186d0f6f9b.png',
    干杯: 'http://i0.hdslb.com/bfs/emote/8da12d5f55a2c7e9778dcc05b40571979fe208e6.png',
    爱心: 'http://i0.hdslb.com/bfs/emote/ed04066ea7124106d17ffcaf75600700e5442f5c.png',
    锦鲤: 'http://i0.hdslb.com/bfs/emote/643d6c19c8164ffd89e3e9cdf093cf5d773d979c.png',
    胜利: 'http://i0.hdslb.com/bfs/emote/b49fa9f4b1e7c3477918153b82c60b114d87347c.png',
    加油: 'http://i0.hdslb.com/bfs/emote/c7aaeacb21e107292d3bb053e5abde4a4459ed30.png',
    抱拳: 'http://i0.hdslb.com/bfs/emote/89516218158dbea18ab78e8873060bf95d33bbbe.png',
    响指: 'http://i0.hdslb.com/bfs/emote/1b5c53cf14336903e1d2ae3527ca380a1256a077.png',
    保佑: 'http://i0.hdslb.com/bfs/emote/fafe8d3de0dc139ebe995491d2dac458a865fb30.png',
    支持: 'http://i0.hdslb.com/bfs/emote/3c210366a5585706c09d4c686a9d942b39feeb50.png',
    拥抱: 'http://i0.hdslb.com/bfs/emote/41780a4254750cdaaccb20735730a36044e98ef3.png',
    跪了: 'http://i0.hdslb.com/bfs/emote/f2b3aee7e521de7799d4e3aa379b01be032698ac.png',
    怪我咯: 'http://i0.hdslb.com/bfs/emote/07cc6077f7f7d75b8d2c722dd9d9828a9fb9e46d.png',
    黑洞: 'http://i0.hdslb.com/bfs/emote/e90ec4c799010f25391179118ccd9f66b3b279ba.png',
    老鼠: 'http://i0.hdslb.com/bfs/emote/8e6fb491eb1bb0d5862e7ec8ccf9a3da12b6c155.png',
    福到了: 'http://i0.hdslb.com/bfs/emote/5de5373d354c373cf1617b6b836f3a8d53c5a655.png',
    'W-哈哈': 'http://i0.hdslb.com/bfs/emote/83d527303c8f62f494e6971c48836487e7d87b1b.png',
    '凛冬-生气': 'http://i0.hdslb.com/bfs/emote/d90bd2fbc13a3cb8d313f6d675f20caf109f60a7.png',
    '霜叶-疑问': 'http://i0.hdslb.com/bfs/emote/ada3aea8594e724511c1daad15fb3b23900d8e24.png',
    '煌-震撼': 'http://i0.hdslb.com/bfs/emote/7bb39ac289bc97fe52af047020a9bf324ecdebe1.png',
    哭泣: 'http://i0.hdslb.com/bfs/emote/a61abafb8c39defc323b045f30072198007b1c89.png',
    哈哈: 'http://i0.hdslb.com/bfs/emote/e6449b0bae13b8c97cc65976ff8cdc2c16be0015.png',
    狗子: 'http://i0.hdslb.com/bfs/emote/6a997106af5bf490f22c80a7acf3be813ee755fc.png',
    羞羞: 'http://i0.hdslb.com/bfs/emote/f4f9171e4d8c3f30827a8b96ea1ce1beb825ad50.png',
    亲亲: 'http://i0.hdslb.com/bfs/emote/2f72bae7b834d499f259c833f7011d5ed8748fd1.png',
    耍帅: 'http://i0.hdslb.com/bfs/emote/d7a38b08d1f1cc35b19c35041f29ffcc48808e87.png',
    气愤: 'http://i0.hdslb.com/bfs/emote/069b029d17a086ab475fd331697a649e234850bb.png',
    高兴: 'http://i0.hdslb.com/bfs/emote/416570a8aca7be12fb2c36e4b846906653f6d294.png',

    知识增加: 'http://i0.hdslb.com/bfs/emote/142409b595982b8210b2958f3d340f3b47942645.png',
    爷青回: 'http://i0.hdslb.com/bfs/emote/a26189ff1e681bddef7f6533f9aabe7604731a3e.png',
    好家伙: 'http://i0.hdslb.com/bfs/emote/63ec80dea3066bd9f449ba999ba531fa61f7b4eb.png',
    芜湖起飞: 'http://i0.hdslb.com/bfs/emote/78d04c6ce78a613c90d510cd45fe7e25c57ba00b.png',
    梦幻联动: 'http://i0.hdslb.com/bfs/emote/4809416be5ca787c2ec3e897e4fd022a58da6e0e.png',
    泪目: 'http://i0.hdslb.com/bfs/emote/bba3703ab90b7d16fe9dbcb85ed949db687f8331.png',
    保护: 'http://i0.hdslb.com/bfs/emote/55f8f6445ca7c3170cdfc5b16036abf639ce9b57.png',
    害怕: 'http://i0.hdslb.com/bfs/emote/d77e2de26da143249f0c0ad7a608c27152c985bf.png',
    爱了爱了: 'http://i0.hdslb.com/bfs/emote/2a165b555ba20391316366c664ed7891883dc5aa.png',
    吹爆: 'http://i0.hdslb.com/bfs/emote/b528220f9c37256ed6a37f05bf118e44b08b81e5.png',
    三连: 'http://i0.hdslb.com/bfs/emote/21f15fe11b7a84d2f2121c16dec50a4e4556f865.png',
    可以: 'http://i0.hdslb.com/bfs/emote/e08543c71202b36c590094417fcfbb80c3506cd8.png',
    希望没事: 'http://i0.hdslb.com/bfs/emote/6c0d2e6c486d1ba5afd6204a96e102652464a01d.png',
    打卡: 'http://i0.hdslb.com/bfs/emote/a9cf77c78e1b9b40aa3ed4862402fba008ee2f51.png',
    skr: 'http://i0.hdslb.com/bfs/emote/bd285ff94db16ad52557c3effe930d64663e8375.png',
    battle: 'http://i0.hdslb.com/bfs/emote/f2f81c8e47db6252becd633a5d1ee14e15df2ea8.png',
    DNA: 'http://i0.hdslb.com/bfs/emote/f6eb74f8230588f61a298af89061a7d75c5762e5.png',
    // "妙啊":"http://i0.hdslb.com/bfs/emote/0e98299d7decf5eaffad854977946075c3e91cb8.png",
    这次一定: 'http://i0.hdslb.com/bfs/emote/a01ca28923daa7cc896c42f27deb4914e20dd572.png',
    AWSL: 'http://i0.hdslb.com/bfs/emote/c37f88cf799f9badf9d84b7671dc3dd98c0fc0c2.png',
    递话筒: 'http://i0.hdslb.com/bfs/emote/98e6950e39fbb4dd1c576042063ca632074070ba.png',
    你细品: 'http://i0.hdslb.com/bfs/emote/535e00658e7e47966f154d3a167fa2365ebc4321.png',
    咕咕: 'http://i0.hdslb.com/bfs/emote/d8065c2e7ce48c929317a94553499a46fecc262a.png',
    标准结局: 'http://i0.hdslb.com/bfs/emote/3de98174b510cf7dc5fd1bd08c5d881065e79137.png',
    危: 'http://i0.hdslb.com/bfs/emote/5cc6c3357c4df544dd8de9d5c5c0cec97c7c9a56.png',
    张三: 'http://i0.hdslb.com/bfs/emote/255a938f39cea625032b6650036b31aa26c50a3c.png',
    害: 'http://i0.hdslb.com/bfs/emote/cbe798a194612958537c5282fcca7c3bcd2aa15c.png',
    我裂开了: 'http://i0.hdslb.com/bfs/emote/29bd57ec4e8952880fea6c9e47aee924e91f10c4.png',
    有内味了: 'http://i0.hdslb.com/bfs/emote/7ca61680a905b5b6e2e335c630e725b648b03b4d.png',
    猛男必看: 'http://i0.hdslb.com/bfs/emote/c97064450528a0e45c7e7c365a15fbb13fd61d8c.png',
    奥力给: 'http://i0.hdslb.com/bfs/emote/c9b8683827ec6c00fea5327c9bec14f581cef2aa.png',
    问号: 'http://i0.hdslb.com/bfs/emote/c1d1e76c12180adc8558f47006fe0e7ded4154bb.png',
    我哭了: 'http://i0.hdslb.com/bfs/emote/9e0b3877d649aaf6538fbdd3f937e240a9d808e4.png',
    高产: 'http://i0.hdslb.com/bfs/emote/9db817cba4a7f4a42398f3b2ec7c0a8e0c247c42.png',
    我酸了: 'http://i0.hdslb.com/bfs/emote/a8cbf3f6b8cd9377eeb15b9172f3cd683b2e4650.png',
    真香: 'http://i0.hdslb.com/bfs/emote/e68497c775feaac1c3b1a6cd63a50cfb11b767c4.png',
    我全都要: 'http://i0.hdslb.com/bfs/emote/d424d1ad8d14c1c9b8367842bc68c658b9229bc1.png',
    神仙UP: 'http://i0.hdslb.com/bfs/emote/a49e0d0db1e7d35a0f7411be13208951ab448f03.png',
    你币有了: 'http://i0.hdslb.com/bfs/emote/84820c2b147a8ca02f3c4006b63f76c6313cbfa0.png',
    不愧是你: 'http://i0.hdslb.com/bfs/emote/9ff2e356797c57ee3b1675ade0883d2d2247be9b.png',
    锤: 'http://i0.hdslb.com/bfs/emote/35668cc12ae25b9545420e4a85bf21a0bfc03e5d.png',
    秀: 'http://i0.hdslb.com/bfs/emote/50782fbf5d9b7f48f9467b5c53932981e321eedc.png',
    爷关更: 'http://i0.hdslb.com/bfs/emote/faad40c56447f1f8abcb4045c17ce159d113d1fd.png',
    有生之年: 'http://i0.hdslb.com/bfs/emote/f41fdafe2d0fbb8e8bc1598d2cf37e355560103a.png',
    镇站之宝: 'http://i0.hdslb.com/bfs/emote/24e7a6a6e6383c987215fb905e3ee070aca259b5.png',
    我太南了: 'http://i0.hdslb.com/bfs/emote/a523f3e4c63e4db1232365765d0ec452f83be97e.png',
    完结撒花: 'http://i0.hdslb.com/bfs/emote/ea9db62ff5bca8e069cd70c4233353a802835422.png',
    大师球: 'http://i0.hdslb.com/bfs/emote/f30089248dd137c568edabcb07cf67e0f6e98cf3.png',
    知识盲区: 'http://i0.hdslb.com/bfs/emote/ccc94600b321a28116081e49ecedaa4ee8728312.png',
    狼火: 'http://i0.hdslb.com/bfs/emote/33ccd3617bfa89e9d1498b13b7542b63f163e5de.png',
    你可真星: 'http://i0.hdslb.com/bfs/emote/54c8ddff400abfe388060cabfbb579280fdea1be.png'
}