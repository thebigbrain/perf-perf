let context: any = null;
let updater: any = {};

import * as React from 'react';
import {
  ReactElement,
  Component
} from 'react';
import { requestRenderRootJob } from '../../reconciler';
import setInnerHTML from './setInnerHTML';
import { createElement, createTextNode, setAttribute } from './dom';
import { render } from 'react-dom';

function renderChildren(children: any): Array<Node> {
  let ret: Array<Node> = [];
  if (Array.isArray(children)) {
    ret = children.map((c: ReactElement<any>) => doRender(c));
  } else if (typeof children === 'string') {
    ret.push(createTextNode(children));
  } else {
    throw SyntaxError(`unknow children ${children}`);
  }
  return ret;
}

function renderProps(ele: HTMLElement, props: any): HTMLElement {
  for (let p in props) {
    if (p === 'children') {
      renderChildren(props[p]).forEach(child => {
        ele.appendChild(child);
      });
    } else {
      setAttribute(ele, p, props[p]);
    }
  }
  return ele;
}

function renderTreeWithTag(element: ReactElement<any>, tag: string): Element {
  let props = element.props;
  let ele = createElement(tag);
  return renderProps(ele, props);
}

function doRender(element: ReactElement<any>): Node {
  console.log(element)
  let node: Node;
  if (typeof element.type == 'function') {
    let cc: any = element.type;
    let comp = new cc();
    node = doRender(comp.render());
  } else if (typeof element.type == 'string') {
    node = renderTreeWithTag(element, element.type);
  } else if (typeof element == 'string') {
    node = createTextNode(element);
  } else {
    throw SyntaxError(`invalid element ${element}`);
  }
  return node;
}

export function renderRoot(element: ReactElement<any>, container: Element, callback?: Function): Component | null {
  requestRenderRootJob(() => {
    let root = doRender(element);
    container.appendChild(root);
    if (callback) callback();
  });
  return null;
}
