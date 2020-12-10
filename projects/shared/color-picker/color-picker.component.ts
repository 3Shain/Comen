import { animate, style, transition, trigger } from '@angular/animations';
import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, ElementRef, HostListener, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ColorEvent } from 'ngx-color';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    template: `<div id="block" [ngStyle]="{'background-color':currentColor|async}"></div>
    <ng-template #temp>
        <div [@inout]>
        <color-chrome [color]="currentColor | async" (onChange)="handleChange($event)" ></color-chrome>
    </div>
        </ng-template>`,
    selector: 'comen-color-picker',
    styles: [
        `
        #block {
            display: block;
            height: 1.5em;
            width: 1.5em;
            border: solid 3px #eeeeee;
            border-radius: 6px;
            cursor: pointer;
        }
        `
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: CMColorPickerComponent
        }
    ],
    animations: [
        trigger('inout', [
            transition(':enter', [
                style({
                    opacity: 0,
                    transform: 'scale3d(0.95,0.95,0.95)'
                }),
                animate(30, style({
                    opacity: 1,
                    transform: 'scale3d(1,1,1)'
                }))
            ]),
            transition(':leave', [
                style({
                    opacity: 1,
                    transform: 'scale3d(1,1,1)'
                }),
                animate(30, style({
                    opacity: 0,
                    transform: 'scale3d(0.95,0.95,0.95)'
                }))
            ])
        ])
    ]
})
export class CMColorPickerComponent implements ControlValueAccessor {

    @ViewChild('temp') temp: TemplateRef<any>;

    currentColor: BehaviorSubject<string> = new BehaviorSubject("#cccccc");

    constructor(private overlay: Overlay, private ele: ElementRef, private vc: ViewContainerRef) { }
    ref = this.overlay.create({
        hasBackdrop: true,
        backdropClass: 'cdk-backdrop-transparent',
        positionStrategy: this.overlay.position().flexibleConnectedTo(this.ele).withPositions([{
            offsetX: 40,
            offsetY: 0,
            overlayX: 'start',
            overlayY: 'center',
            originX: 'start',
            originY: 'center'
        },
        {
            offsetX: 40,
            offsetY: 0,
            overlayX: 'start',
            overlayY: 'top',
            originX: 'start',
            originY: 'center'
        }, {
            offsetX: 40,
            offsetY: 0,
            overlayX: 'start',
            overlayY: 'bottom',
            originX: 'start',
            originY: 'center'
        }]),
        scrollStrategy: this.overlay.scrollStrategies.close()
    });

    handleChange(e: ColorEvent) {
        this.currentColor.next(e.color.hex);
        this.changeFn?.(e.color.hex);
        this.touchFn?.();
    }

    @HostListener('click')
    click() {
        this.ref.attach(new TemplatePortal(this.temp, this.vc));
        this.ref.backdropClick().pipe(take(1)).subscribe(() => {
            this.ref.detach();
        });
    }


    writeValue(obj: any): void {
        console.log(obj);
        this.currentColor.next(obj);
    }

    changeFn: any;

    registerOnChange(fn: any): void {
        this.changeFn = fn;
    }

    touchFn: any;
    registerOnTouched(fn: any): void {
        this.touchFn = fn;
    }

}