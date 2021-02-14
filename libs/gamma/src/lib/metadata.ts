import { ComenAddonConfiguration } from '@comen/common';



const COMMENT_CONFIGURATION: ComenAddonConfiguration = {
    displayName: '233',
    sections: {
        global: {
            displayName: '全局设置',
            'x-icon': 'global',
            level: 0,
            previewSelector: 'yt-live-chat-renderer',
            properties: {
                margin: {
                    displayName: '外边距',
                    'x-icon':'border',
                    defaultVisible: true,
                    defaultValue: null,
                    type: 'margin'
                },
                opacity: {
                    defaultValue: 1,
                    defaultVisible: true,
                    displayName: '透明度',
                    'x-icon':'bulb',
                    type: 'range',
                    extra: {
                        min: 0,
                        max: 1
                    }
                },
                font: {
                    defaultValue: null,
                    defaultVisible: true,
                    displayName: '字体',
                    'x-icon':'font-size',
                    type: 'font',
                    extra: {

                    }
                },

                color: {
                    defaultValue: null,
                    defaultVisible: true,
                    displayName: '字体颜色',
                    'x-icon':'font-colors',
                    type: 'color'
                },
                outline: {
                    defaultValue: null,
                    defaultVisible: true,
                    'x-icon':'border',
                    displayName: '字体描边',
                    type: 'outline',
                    extra: {

                    }
                },
                shadow:{
                    defaultValue: null,
                    defaultVisible: true,
                    displayName: '阴影',
                    type: 'shadow'
                }
            }
        },
        textMessage: {
            displayName: '文本消息',
            'x-icon': 'border-outer',
            level: 0,
            variantProperties: [],
            previewSelector: 'yt-live-chat-text-message-renderer',
            properties: {
                font: {
                    defaultValue: null,
                    defaultVisible: true,
                    displayName: '字体',
                    type: 'font',
                    extra: {

                    }
                }
            }
        },
        'textMessage.avatar': {
            displayName: '头像框',
            'x-icon': 'smile',
            level: 1,
            variantProperties: [],
            previewSelector: 'yt-live-chat-text-message-renderer > #author-photo',
            properties: {

            }
        },
        'textMessage.box': {
            displayName: '消息块',
            'x-icon': 'border-outer',
            level: 1,
            variantProperties: [],
            previewSelector: 'yt-live-chat-text-message-renderer > #content',
            properties: {

            }
        },
        'textMessage.box.timestamp': {
            displayName: '时间',
            'x-icon': 'field-string',
            level: 2,
            variantProperties: [],
            previewSelector: 'yt-live-chat-text-message-renderer > #content > #timestamp',
            properties: {

            }
        },
        'textMessage.box.authorName': {
            displayName: '用户名',
            'x-icon': 'user',
            level: 2,
            variantProperties: [],
            previewSelector: 'yt-live-chat-text-message-renderer > #content > yt-live-chat-author-chip',
            properties: {

            }
        },
        'textMessage.box.message': {
            displayName: '消息内容',
            'x-icon': 'field-string',
            level: 2,
            variantProperties: [],
            previewSelector: 'yt-live-chat-text-message-renderer > #content > #message',
            properties: {

            }
        },
        /* sc message */
        paidMessage: {
            displayName: '醒目留言',
            level: 0,
            previewSelector: 'yt-live-chat-paid-message-renderer',
            properties: {

            }
        },
        'paidMessage.card': {
            displayName: '卡片',
            level: 1,
            previewSelector: 'yt-live-chat-paid-message-renderer > #card',
            properties: {
                radius: {
                    defaultValue: null,
                    defaultVisible: true,
                    displayName: '圆角',
                    'x-icon':'radius-setting',
                    type: 'radius',
                    extra: {

                    }
                }
            }
        },
        'paidMessage.top': {
            displayName: '用户信息',
            level: 1,
            previewSelector: 'yt-live-chat-paid-message-renderer > #card > #header',
            properties: {

            }
        },
        'paidMessage.top.avatar': {
            displayName: '头像',
            'x-icon': 'smile',
            previewSelector: 'yt-live-chat-paid-message-renderer > #card > #header > #author-photo',
            level: 2,
            properties: {

            }
        },
        'paidMessage.top.username': {
            displayName: '用户名',
            level: 2,
            properties: {

            }
        },
        'paidMessage.top.amount': {
            displayName: '价值信息',
            level: 2,
            properties: {

            }
        },
        'paidMessage.bottom': {
            displayName: '消息',
            level: 1,
            previewSelector: 'yt-live-chat-paid-message-renderer > #card > #content',
            properties: {

            }
        }, 'paidMessage.bottom.content': {
            displayName: '消息内容',
            level: 2,
            properties: {

            }
        }
        /* member message */
        ,
        memberMessage: {
            displayName: '新会员加入消息',
            level: 0,
            properties: {

            }
        }
        /* sticker message */
        ,
        stickerMessage: {
            displayName: '礼物消息',
            level: 0,
            properties: {

            }
        },
        'stickerMessage.avatar': {
            displayName: '头像',
            'x-icon': 'smile',
            level: 1,
            properties: {

            }
        },
        'stickerMessage.username': {
            displayName: '用户名',
            level: 1,
            properties: {

            }
        },
        'stickerMessage.amount': {
            displayName: '礼物信息',
            level: 1,
            properties: {

            }
        },
        'stickerMessage.sticker': {
            displayName: '礼物贴纸',
            level: 1,
            properties: {

            }
        }
    }
};

export { COMMENT_CONFIGURATION };
