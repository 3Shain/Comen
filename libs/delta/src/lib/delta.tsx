import React from 'react';
import ReactDom from 'react-dom';
import { withConcern } from '@kairo/react';
import DeltaView from './view';
// @ts-ignore
import css from '!!to-string-loader!css-loader?esModule=false!sass-loader!./styles.scss';
import { Concern } from 'kairo';

export function setupDelta(root: ShadowRoot, concern: Concern) {
  const container = root
    .querySelector('body')
    .appendChild(document.createElement('delta-root'));
  const styleElement = document.createElement('style');
  styleElement.textContent = css;
  root.querySelector('head').appendChild(styleElement);
  const DIDeltaView = withConcern(concern)(DeltaView);
  ReactDom.render(<DIDeltaView></DIDeltaView>, container);

  return () => ReactDom.unmountComponentAtNode(container);
}
