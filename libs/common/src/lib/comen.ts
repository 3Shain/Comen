import { Observable } from "rxjs";
import { ComenAddonConfiguration } from "./config";
import { Message } from "./message";
import { SafeAny } from "./utils";

export type ComenAddonMetadata = {
    name: string;
    displayName: string;
    editable: boolean;
    configuration: ComenAddonConfiguration;
};

export interface ComenAddonInstance {
    message(): Observable<Message>;
    config(section: string): Observable<SafeAny>;
    variantPipe(section: string): Observable<SafeAny>;
    rootElement: SafeAny;
}

export type ComenInitFunction = (instance: ComenAddonInstance) => Function | PromiseLike<Function>;

export declare function registerAddon(metadata: ComenAddonMetadata, init: ComenInitFunction): void;

export abstract class ComenEnvironmentHost {
    abstract message(): Observable<Message>;
    abstract config(section: string): Observable<SafeAny>;
    abstract variantPipe(section: string): Observable<SafeAny>;
    abstract assetUrl(id:string): string;
}