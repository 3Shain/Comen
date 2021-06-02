import React from 'react';
import ReactDom from 'react-dom';
import { KairoApp } from '@kairo/react';
import View from './view';

export function setupDelta(root: ShadowRoot, diInit: () => void) {

    const container = root.querySelector('body').appendChild(document.createElement('div'));

    ReactDom.render(
        <KairoApp globalSetup={diInit}>
            <View />
        </KairoApp>,
        container
    );

    return ()=>ReactDom.unmountComponentAtNode(container);
}
