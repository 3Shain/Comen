import { Directive, ViewContainerRef, ComponentFactoryResolver, ElementRef, NgZone, Component } from "@angular/core";
import { ComenEnvironmentHost } from "@comen/common";
import { AddonService } from "./addon.service";

@Directive({
    selector: '[overlay-container]',
    exportAs: 'overlayContainer'
})
export class OverlayContainerDirective {

    constructor(private addon: AddonService,
        private vcr: ViewContainerRef,
        private cfr: ComponentFactoryResolver,
        private zone: NgZone) {
    }

    bootstrap(addonName: string) {
        const addon = this.addon.getOverlayAddon(addonName);
        if (!addon) {
            throw 'NOT_FOUND';
        }
        if (addon.ngComponent) {
            const ref = this.vcr.createComponent(
                this.cfr.resolveComponentFactory(addon.ngComponent),
                0, this.vcr.injector);
            return ref.injector.get(ElementRef).nativeElement;
        } else {
            const host = this.vcr.injector.get(ComenEnvironmentHost);
            const component = this.vcr.createComponent(this.cfr.resolveComponentFactory(DummyComponent), 0);
            this.zone.runOutsideAngular(() => {
                addon.factory({
                    message: host.message.bind(host),
                    variantPipe: host.variantPipe.bind(host),
                    config: host.config.bind(host),
                    rootElement: component.instance.element.nativeElement
                })
            });
            return component.instance.element.nativeElement;
        }
    }
}

@Component({
    // eslint-disable-next-line
    selector: 'div',
    template: ''
})
class DummyComponent {
    constructor(public element: ElementRef<HTMLDivElement>) { }
}