import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { GammaApp } from './gamma.app';
import { TextMessageComponent } from './text-message/text-message';
import { PaidMessage } from './paid-message/paid-message';
import { MembershipMessage } from './membership-message/membership-message';
import { StickerMessage } from './sticker-message/sticker-message';
import { StickerSponsorItem } from './ticker-sponsor-item/sticker-sponsor-item';
import { StickerPaidItem } from './ticker-paid-item/sticker-paid-item';
import { TickerPaidSticker } from './ticker-paid-sticker/ticker-paid-sticker';

@NgModule({
    declarations: [GammaApp, TextMessageComponent, PaidMessage, MembershipMessage, StickerMessage, StickerSponsorItem, StickerPaidItem, TickerPaidSticker],
    imports: [
        CommonModule
    ],
    exports: [GammaApp],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GammaModule {

}