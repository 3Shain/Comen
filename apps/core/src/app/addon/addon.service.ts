import { ComponentType } from '@angular/cdk/portal';
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import {
    ComenAddonMetadata,
    ComenInitFunction,
    Message,
    SafeAny,
} from '@comen/common';
import { noop, Observable } from 'rxjs';

@Injectable()
export class AddonService {
    private registeredOverlay: {
        [key: string]: {
            metadata: ComenAddonMetadata;
            factory?: ComenInitFunction;
            ngComponent?: ComponentType<SafeAny>;
            resolver?: ComponentFactoryResolver;
        };
    } = {};

    private registeredSource: {
        [key: string]: {
            connect(meta: SafeAny): Observable<Message>;
        };
    } = {};

    constructor() {
        window['registerOverlay'] = this.registerOverlay.bind(this);
        window['registerSource'] = this.registerSource.bind(this);

        this.registerOverlay(
            {
                name: 'null',
                displayName: 'N/A',
                editable: false,
                configuration: {
                    displayName: 'N/A',
                    sections: {},
                },
            },
            () => {
                console.log('empty!');
                return noop;
            }
        );
    }

    registerBuiltinOverlay(
        metadata: ComenAddonMetadata,
        component: ComponentType<SafeAny>,
        resolver?: ComponentFactoryResolver
    ) {
        if (this.registeredOverlay[metadata.name]) {
            throw 'REGISTERED';
        }
        this.registeredOverlay[metadata.name] = {
            metadata: metadata,
            ngComponent: component,
            resolver: resolver,
        };
    }

    registerBuiltinSource(name: string, service: SafeAny) {
        if (this.registeredSource[name]) {
            throw 'REGISTERED';
        }
        this.registeredSource[name] = service;
    }

    registerOverlay(metadata: ComenAddonMetadata, init: ComenInitFunction) {
        if (this.registeredOverlay[metadata.name]) {
            throw 'REGISTERED';
        }
        this.registeredOverlay[metadata.name] = {
            metadata: metadata,
            factory: init,
        };
    }

    registerSource() {
        // stub
    }

    getOverlayAddon(name: string) {
        return this.registeredOverlay[name];
    }

    getOverlayAddonMetadata(name: string) {
        return this.registeredOverlay[name]?.metadata;
    }

    isOverylayExist(name: string) {
        return name in this.registeredOverlay;
    }

    isSourceExist(name: string) {
        return name in this.registeredSource;
    }

    connectSource(name: string, meta: SafeAny) {
        return this.registeredSource[name].connect(meta);
    }
}
