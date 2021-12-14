import React from 'react';
import ReactDom from 'react-dom';
import { withConcern } from '@kairo/react';
import DeltaView from './view';
import css from '!!to-string-loader!css-loader?esModule=false!sass-loader!./styles.scss';
import { Concern } from 'kairo';

export function setupDelta(root: ShadowRoot, diInit: Concern) {
    const container = root
        .querySelector('body')
        .appendChild(document.createElement('delta-root'));
    const styleElement = document.createElement('style');
    styleElement.textContent = css;
    root.querySelector('head').appendChild(styleElement);
    const DIRoot = withConcern(diInit)(DeltaView);
    ReactDom.render(<DIRoot></DIRoot>, container);

    return () => ReactDom.unmountComponentAtNode(container);
}
