import { serializeConfiguration, parseConfiguration } from './config';

describe('configuration', () => {

    beforeAll(() => {
        // 测试体验极差🤮
        if (typeof TextEncoder === 'undefined') {
            (global as any).TextEncoder = require('util').TextEncoder;
            (global as any).TextDecoder = require('util').TextDecoder;
        }
    })

    it('should be serialized and deserialized correctly', () => {
        const conf = {
            var1: 0,
            var2: 'test',
            var3: false,
            var4: {
                var5: 1,
                var6: {
                    var7: 'test2',
                    '!!!': '???'
                }
            }
        };

        const serialized = serializeConfiguration(conf);
        const ret = parseConfiguration<typeof conf>(serialized, null);

        expect(ret).toEqual(conf);
    });

    it('should work with blob attachments',()=>{
        const conf = {
            blob: new Uint8Array(16).fill(0x99),
            nested: {
                blob2: new Uint8Array(32).fill(0x86)
            }
        };

        const serialized = serializeConfiguration(conf);
        console.log(serialized);
        const ret = parseConfiguration<any>(serialized,{});
        
        expect(ret).toEqual(conf);
    })
})