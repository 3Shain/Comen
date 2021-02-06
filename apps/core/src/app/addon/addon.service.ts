import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { ComenAddonMetadata, ComenInitFunction, SafeAny } from '@comen/common';

@Injectable()
export class AddonService {

    private registeredOverlayAddon: {
        [key: string]: {
            metadata: ComenAddonMetadata,
            factory?: ComenInitFunction,
            ngComponent?: ComponentType<SafeAny>
        }
    } = {};

    constructor() {
        window['registerOverlay'] = this.registerOverlay.bind(this);
    }

    registerBuiltinOverlay(metadata: ComenAddonMetadata, component: ComponentType<SafeAny>) {
        if (this.registeredOverlayAddon[metadata.name]) {
            throw 'REGISTERED';
        }
        this.registeredOverlayAddon[metadata.name] = {
            metadata: metadata,
            ngComponent: component
        };
    }

    registerOverlay(metadata: ComenAddonMetadata, init: ComenInitFunction) {
        if (this.registeredOverlayAddon[metadata.name]) {
            throw 'REGISTERED';
        }
        this.registeredOverlayAddon[metadata.name] = {
            metadata: metadata,
            factory: init
        };
    }

    registerSource() {
        // stub
    }

    registerFilter() {
        //stub
    }

    getOverlayAddon(name: string) {
        return this.registeredOverlayAddon[name];
    }

    getOverlayAddonMetadata(name: string) {
        return this.registeredOverlayAddon[name]?.metadata;
    }
}
