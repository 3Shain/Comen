import { emojiExpressionLexer } from './emoji';

const TEXT_MAP = {
    狗头: 'goutou',
    猫头: 'maotou'
}

describe('emoji', () => {


    it.each([
        ['总之测试一下（狗头', [
            {
                type: 'text',
                content: '总之测试一下'
            },
            {
                type: 'emoji',
                url: 'goutou'
            }
        ]],
        ['总之测试一下(猫头', [
            {
                type: 'text',
                content: '总之测试一下'
            },
            {
                type: 'emoji',
                url: 'maotou'
            }
        ]],
        ['总之测试一下（狗头)', [
            {
                type: 'text',
                content: '总之测试一下'
            },
            {
                type: 'emoji',
                url: 'goutou'
            }
        ]],
        ['总之测试一下（狗头)233', [
            {
                type: 'text',
                content: '总之测试一下'
            },
            {
                type: 'emoji',
                url: 'goutou'
            },
            {
                type: 'text',
                content: '233'
            }
        ]],
        ['总之测试一下（狗头 233', [
            {
                type: 'text',
                content: '总之测试一下'
            },
            {
                type: 'emoji',
                url: 'goutou'
            },
            {
                type: 'text',
                content: ' 233'
            }
        ]],
        ['总之测试一下（狗头 233', [
            {
                type: 'text',
                content: '总之测试一下'
            },
            {
                type: 'emoji',
                url: 'goutou'
            },
            {
                type: 'text',
                content: ' 233'
            }]
        ],
        ['（狗头)（(（= =）（（（（（', [
            {
                type: 'emoji',
                url: 'goutou'
            },
            {
                type: 'text',
                content: '（(（= =）（（（（（'
            }
        ]]
    ])('should parse %s', (a, b) => {

        const ret = emojiExpressionLexer((s) => TEXT_MAP[s], a);
        expect(ret).toEqual(b)
    })
})