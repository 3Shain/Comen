import { Directive, ElementRef, Input, OnDestroy, OnInit } from "@angular/core";
import { ComenEnvironmentHost, SafeAny } from "@comen/common";
import { Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";

@Directive({
    selector: '*[gmStyleDriver]'
})
export class StyleDriverDirective implements OnInit, OnDestroy {

    @Input() configSection: string;

    @Input() context: SafeAny = null;

    destroy$ = new Subject<void>();

    constructor(private host: ComenEnvironmentHost,
        private element: ElementRef<HTMLElement>) {

    }

    e = this.element.nativeElement;

    ngOnInit() {
        (this.context != null ?
            this.host.variantPipe(this.configSection).pipe(map(fn => fn(this.context)))
            : this.host.config(this.configSection))
            .pipe(takeUntil(this.destroy$)).subscribe(config => {
                if (config.font) {
                    this.e.style.fontSize = config.font.size + 'px';
                    this.e.style.fontFamily = config.font.font;
                    this.e.style.fontWeight = config.font.weight;
                    this.e.style.lineHeight = config.font.lineHeight;
                    this.e.style.textAlign = config.font.textAlign;
                    this.e.style.letterSpacing = config.font.space;
                    this.e.style.fontStyle = config.font.italic?'italic':'';
                    this.e.style.textDecoration = `${config.font.underline?'underline':''} ${config.font.strike?'line-through':''}`.trim();
                } else {
                    this.e.style.fontSize = '';
                    this.e.style.fontFamily = '';
                    this.e.style.fontWeight = '';
                    this.e.style.lineHeight = '';
                    this.e.style.textAlign = '';
                    this.e.style.letterSpacing = '';
                    this.e.style.fontStyle = '';
                    this.e.style.textDecoration = '';
                }
                if (config.outline&&config.outline.width>0) {
                    const shadow = [], size = config.outline.width, color = config.outline.color;
                    for (var x = -size; x <= size; x += Math.ceil(size / 4)) {
                        for (var y = -size; y <= size; y += Math.ceil(size / 4)) {
                            shadow.push(textShadow(x, y, color))
                        }
                    }
                    this.e.style.textShadow = shadow.join(',');
                } else {
                    this.e.style.textShadow = '';
                }
                if(config.opacity!=undefined){
                    this.e.style.opacity = config.opacity;
                } else {
                    this.e.style.opacity = '';
                }
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

const textShadow = function (x, y, color) {
    return x + 'px ' + y + 'px ' + color;
};