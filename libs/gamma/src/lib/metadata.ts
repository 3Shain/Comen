import {
    ComenAddonConfiguration,
    VariantProperty,
    ComenControlTypes,
} from '@comen/common';

const BASE_VARIANT_PROPERTIES = [
    {
        type: 'text',
        name: 'username',
        displayName: '用户名',
        defaultValue: '',
    },
    {
        type: 'number',
        name: 'platformUserId',
        displayName: 'UID',
        defaultValue: 0,
    },
];

const TEXT_MESSAGE_VARIANT_PROPERTIES = [
    ...BASE_VARIANT_PROPERTIES,
] as VariantProperty[];

const PAID_MESSAGE_VARIANT_PROPERTIES = [
    {
        type: 'number',
        name: 'price',
        displayName: '价值',
        defaultValue: 0,
    },
    ...BASE_VARIANT_PROPERTIES,
] as VariantProperty[];

const MEMBER_MESSAGE_VARIANT_PROPERTIES = [...BASE_VARIANT_PROPERTIES];

const STICKER_MESSAGE_VARIANT_PROPERTIES = [...BASE_VARIANT_PROPERTIES];

const COMMENT_CONFIGURATION: ComenAddonConfiguration = {
    displayName: '233',
    sections: {
        global: {
            displayName: '全局设置',
            'x-icon': 'global',
            level: 0,
            previewSelector: 'yt-live-chat-renderer',
            properties: {
                opacity: {
                    defaultValue: 1,
                    displayName: '透明度',
                    'x-icon': 'bulb',
                    type: 'range',
                    extra: {
                        min: 0,
                        max: 1,
                    },
                },
                font: {
                    defaultValue: null,
                    displayName: '字体',
                    'x-icon': 'font-size',
                    type: 'font',
                },

                color: {
                    defaultValue: 'rgba(0,0,0,1)',
                    displayName: '字体颜色',
                    'x-icon': 'font-colors',
                    type: 'color',
                },
                outline: {
                    'x-icon': 'border',
                    displayName: '字体描边',
                    type: 'outline',
                    defaultValue: {
                        color: 'rgba(255,255,255,1)',
                        width: 2,
                    },
                    extra: {},
                },
                shadow: {
                    displayName: '阴影',
                    type: 'shadow',
                    defaultValue: {},
                },
            },
            defaultValue: {},
        },
        theme: {
            displayName: '主题',
            // 'x-icon'
            level: 0,
            variantProperties: [],
            properties: {
                themeColor: {
                    defaultValue: '#ffffff',
                    displayName: '主题颜色',
                    type: 'color',
                },
            },
            defaultValue: {},
        },
        textMessage: {
            displayName: '文本消息',
            'x-icon': 'border-outer',
            level: 0,
            variantProperties: TEXT_MESSAGE_VARIANT_PROPERTIES,
            previewSelector: 'yt-live-chat-text-message-renderer',
            properties: {
                font: {
                    defaultValue: ComenControlTypes.DEFAULT_FONT,
                    displayName: '字体',
                    type: 'font',
                    extra: {},
                },
            },
            defaultValue: {},
        },
        'textMessage.avatar': {
            displayName: '头像框',
            'x-icon': 'smile',
            level: 1,
            variantProperties: TEXT_MESSAGE_VARIANT_PROPERTIES,
            previewSelector:
                'yt-live-chat-text-message-renderer > #author-photo',
            properties: {},
            defaultValue: {},
        },
        'textMessage.box': {
            displayName: '消息块',
            'x-icon': 'border-outer',
            level: 1,
            variantProperties: TEXT_MESSAGE_VARIANT_PROPERTIES,
            previewSelector: 'yt-live-chat-text-message-renderer > #content',
            properties: {
                font: {
                    defaultValue: ComenControlTypes.DEFAULT_FONT,
                    displayName: '字体',
                    type: 'font',
                    extra: {},
                },
            },
            defaultValue: {},
        },
        'textMessage.box.timestamp': {
            displayName: '时间',
            'x-icon': 'field-string',
            level: 2,
            variantProperties: TEXT_MESSAGE_VARIANT_PROPERTIES,
            previewSelector:
                'yt-live-chat-text-message-renderer > #content > #timestamp',
            properties: {
                font: {
                    defaultValue: ComenControlTypes.DEFAULT_FONT,
                    displayName: '字体',
                    type: 'font',
                    extra: {},
                },
                show: {
                    displayName: '显示',
                    type: 'switch',
                    defaultValue: true,
                    extra: {
                        description: '显示内容',
                    },
                },
            },
            defaultValue: {},
        },
        'textMessage.box.authorName': {
            displayName: '用户名',
            'x-icon': 'user',
            level: 2,
            variantProperties: TEXT_MESSAGE_VARIANT_PROPERTIES,
            previewSelector:
                'yt-live-chat-text-message-renderer > #content > yt-live-chat-author-chip',
            properties: {
                font: {
                    defaultValue: ComenControlTypes.DEFAULT_FONT,
                    displayName: '字体',
                    type: 'font',
                    extra: {},
                },
                show: {
                    displayName: '显示',
                    type: 'switch',
                    defaultValue: true,
                    extra: {
                        description: '显示内容',
                    },
                },
            },
            defaultValue: {},
        },
        'textMessage.box.message': {
            displayName: '消息内容',
            'x-icon': 'field-string',
            level: 2,
            variantProperties: TEXT_MESSAGE_VARIANT_PROPERTIES,
            previewSelector:
                'yt-live-chat-text-message-renderer > #content > #message',
            properties: {
                font: {
                    defaultValue: ComenControlTypes.DEFAULT_FONT,
                    displayName: '字体',
                    type: 'font',
                    extra: {},
                },
            },
            defaultValue: {},
        },
        /* sc message */
        paidMessage: {
            displayName: '醒目留言',
            level: 0,
            previewSelector: 'yt-live-chat-paid-message-renderer',
            variantProperties: PAID_MESSAGE_VARIANT_PROPERTIES,
            properties: {
                font: {
                    defaultValue: ComenControlTypes.DEFAULT_FONT,
                    displayName: '字体',
                    type: 'font',
                    extra: {},
                },
            },
            defaultValue: {},
        },
        'paidMessage.card': {
            displayName: '卡片',
            level: 1,
            previewSelector: 'yt-live-chat-paid-message-renderer > #card',
            variantProperties: PAID_MESSAGE_VARIANT_PROPERTIES,
            properties: {
                radius: {
                    defaultValue: null,
                    displayName: '圆角',
                    'x-icon': 'radius-setting',
                    type: 'radius',
                    extra: {},
                },
            },
            defaultValue: {},
        },
        'paidMessage.top': {
            displayName: '用户信息',
            level: 1,
            previewSelector:
                'yt-live-chat-paid-message-renderer > #card > #header',
            variantProperties: PAID_MESSAGE_VARIANT_PROPERTIES,
            properties: {},
            defaultValue: {},
        },
        'paidMessage.top.avatar': {
            displayName: '头像',
            'x-icon': 'smile',
            previewSelector:
                'yt-live-chat-paid-message-renderer > #card > #header > #author-photo',
            variantProperties: PAID_MESSAGE_VARIANT_PROPERTIES,
            level: 2,
            properties: {},
            defaultValue: {},
        },
        'paidMessage.top.username': {
            displayName: '用户名',
            level: 2,
            variantProperties: PAID_MESSAGE_VARIANT_PROPERTIES,
            properties: {},
            defaultValue: {},
        },
        'paidMessage.top.amount': {
            displayName: '价值信息',
            level: 2,
            variantProperties: PAID_MESSAGE_VARIANT_PROPERTIES,
            properties: {},
            defaultValue: {},
        },
        'paidMessage.bottom': {
            displayName: '消息',
            level: 1,
            previewSelector:
                'yt-live-chat-paid-message-renderer > #card > #content',
            variantProperties: PAID_MESSAGE_VARIANT_PROPERTIES,
            properties: {},
            defaultValue: {},
        },
        'paidMessage.bottom.content': {
            displayName: '消息内容',
            level: 2,
            variantProperties: PAID_MESSAGE_VARIANT_PROPERTIES,
            properties: {},
            defaultValue: {},
        },
        /* member message */
        memberMessage: {
            displayName: '新会员加入消息',
            level: 0,
            variantProperties: MEMBER_MESSAGE_VARIANT_PROPERTIES,
            properties: {},
            defaultValue: {},
        },
        /* sticker message */
        stickerMessage: {
            displayName: '礼物消息',
            level: 0,
            variantProperties: STICKER_MESSAGE_VARIANT_PROPERTIES,
            properties: {},
            defaultValue: {},
        },
        'stickerMessage.avatar': {
            displayName: '头像',
            'x-icon': 'smile',
            level: 1,
            variantProperties: STICKER_MESSAGE_VARIANT_PROPERTIES,
            properties: {},
            defaultValue: {},
        },
        'stickerMessage.username': {
            displayName: '用户名',
            level: 1,
            variantProperties: STICKER_MESSAGE_VARIANT_PROPERTIES,
            properties: {},
            defaultValue: {},
        },
        'stickerMessage.amount': {
            displayName: '礼物信息',
            level: 1,
            variantProperties: STICKER_MESSAGE_VARIANT_PROPERTIES,
            properties: {},
            defaultValue: {},
        },
        'stickerMessage.sticker': {
            displayName: '礼物贴纸',
            level: 1,
            variantProperties: STICKER_MESSAGE_VARIANT_PROPERTIES,
            properties: {},
            defaultValue: {},
        },
    },
};

export { COMMENT_CONFIGURATION };
