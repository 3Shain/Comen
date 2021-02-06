import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector:'comen-shadow-host',
    template:'<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.ShadowDom
})
export class ShadowHostComponent {

}