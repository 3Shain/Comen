import { InjectionToken } from '@angular/core';
import {
  ComenAddonConfiguration,
  ComenAddonMetadata,
  Message,
  SafeAny,
} from '@comen/common';
import { Identifier } from 'kairo';
import { Observable } from 'rxjs';

export interface EditorAssetStorage {
  getUrl(id: string): string;
  store(blob: Blob): string;
  remove(id: string): void;
}

export const EDITOR_ASSET_STORAGE = new InjectionToken<EditorAssetStorage>(
  'editor asset storage'
);

export const COMEN_ADDON_METADATA = Identifier.of<ComenAddonMetadata>(
  'ComenAddonMetadata'
);
