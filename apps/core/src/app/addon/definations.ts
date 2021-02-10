import { Type } from "@angular/core";

export interface BuiltinOverlayModule {
    entry: Type<any>;
    metadata: any;
}

export interface BuiltinSourceModule {
    source: Type<any>;
}