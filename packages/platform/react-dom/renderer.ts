let context: any = null;
let updater: any = {};

import {
  ReactElement,
  Component
} from 'react';
import { requestRenderRootJob } from '../../reconciler';
import setInnerHTML from './setInnerHTML';

function renderProps(props: any): any {
  let attrs = [], children: Array<Element> = [];
  for (let p in props) {
    if (p === 'children') {
      if (Array.isArray(props[p])) {
        children = props[p].map((c: ReactElement<any>) => doRender(c));
      } else if (typeof children === 'string'){
        continue;
      } else {
        console.log('unknow children', children);
      }
    } else {
      attrs.push(`${p}=${props[p]}`);
    }
  }
  return { attrs, children };
}

function renderTree(element: ReactElement<any>): string {
  let tag = element.type;
  let props = element.props;
  let { attrs, innerText } = renderProps(props);
  let html = `<${tag} ${attrs}>${innerText}</${tag}>`;
  return html;
}

function doRender(element: ReactElement<any>): string {
  let html = '';
  if (typeof element.type == 'function') {
    let cc: any = element.type;
    html = renderTree(new cc().render());
  } else if (typeof element.type == 'string') {
    html = renderTree(element);
  } else if (typeof element == 'string') {
    html = element;
  } else {
    console.log(typeof element, element);
  }
  return html;
}

export function renderRoot(element: ReactElement<any>, container: Element, callback?: Function): Component | null {
  requestRenderRootJob(() => {
    let html = doRender(element);
    setInnerHTML(container, html);
    if (callback) callback();
  });
  return null;
}
