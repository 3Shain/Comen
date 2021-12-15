import { InjectionToken } from '@angular/core';
import { ComenAddonConfiguration, ComenAddonMetadata, Message, SafeAny } from '@comen/common';
import { Identifier } from 'kairo';
import { Observable } from 'rxjs';

export interface EditorRealtimeMessageProvider {
    /**
     * [IMPORTANT]: the returned observable may not (and should not) in zone environment
     * @param options 
     */
    connect(options: SafeAny): Observable<Message>;
}

export const EDITOR_REALTIME_MESSAGE_PROVIDER = new InjectionToken<EditorRealtimeMessageProvider>('editor realtime message provider');

export interface EditorAssetStorage {
    getUrl(id: string): string;
    store(blob: Blob): string;
    remove(id: string): void;
}

export const EDITOR_ASSET_STORAGE = new InjectionToken<EditorAssetStorage>('editor asset storage');

export const COMEN_ADDON_METADATA = Identifier.of<ComenAddonMetadata>("ComenAddonMetadata");