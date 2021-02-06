/**
 * 写个蛇皮anyscript
 */

import { SafeAny } from "./utils";

export interface PropertySchema {
    type: "number" | "text" | "color" | "background" | "margin" | "border" | "range" | "switch" | "font" | "outline" | "radius" | "shadow";
    displayName: string;
    "x-icon"?: string;
    defaultVisible?: boolean;
    defaultValue: any;
    dependsOn?: string[];
    exclusive?: string[];
    validation?: any;
    extra?: SafeAny;
}

export interface ConfigurationSection {
    displayName: string;
    previewSelector?: string;
    level: number; // use flat layout other than object.
    "x-icon"?: string;
    properties: {
        [key: string]: PropertySchema
    };
    variantProperties?: SafeAny[];
}

export interface ComenAddonConfiguration {
    displayName: string;
    preset?: {
        viewport?: {
            width: number;
            height: number;
        }
    },
    sections: {
        [key: string]: ConfigurationSection
    };
}

export namespace Configs {
    interface Font {

        size: number;
        weight: string;
        letterSpacing: number;
        lineHeight: number;
        italic: boolean;
        underline: boolean;
    }
}