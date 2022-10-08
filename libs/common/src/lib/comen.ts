import { Observable } from 'rxjs';
import { ComenAddonConfiguration } from './config';
import { Message } from './message';

// eslint-disable-next-line
export type SafeAny = any;

export type ComenAddonMetadata = {
  name: string;
  displayName: string;
  editable: boolean;
  description: string;
  configuration: ComenAddonConfiguration;
};

export interface ComenAddonInstance {
  message(): Observable<Message>;
  config(section: string): SafeAny;
  variantPipe(section: string): CalculateVariant;
  rootElement: SafeAny;
}

export type ComenOverlayEntry = (instance: ComenAddonInstance) => Function;

declare global {
  export function registerOverlay(
    metadata: ComenAddonMetadata,
    entry: ComenOverlayEntry
  ): void;
}

type CalculateVariant = (context: SafeAny) => SafeAny;

export abstract class ComenEnvironmentHost implements ComenAddonInstance {
  abstract message(): Observable<Message>;
  abstract config(section: string): SafeAny;
  abstract variantPipe(section: string): CalculateVariant;
  abstract assetUrl(id: string): string;
  abstract rootElement: SafeAny;
}

export interface ComenDataItem {
  name: string;
  type: string;
  body: Uint8Array;
}

export interface ComenOverlayConfig {
  [key: string]: {
    default: SafeAny;
    variantsPipe?: string;
  };
}

export interface ComenSerializedData {
  config: ComenOverlayConfig;
  data: ComenDataItem[];
}
