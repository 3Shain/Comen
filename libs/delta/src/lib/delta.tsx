import React from 'react';
import ReactDom from 'react-dom';
import { KairoApp } from '@kairo/react';
import View from './view';

export function setupDelta(hostElement: HTMLElement, diInit: () => void) {
    ReactDom.render(
        <KairoApp globalSetup={diInit}>
            <View />
        </KairoApp>,
        hostElement
    );
}
