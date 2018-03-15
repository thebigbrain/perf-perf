import { ReactElement, Component, ReactNode, ReactPortal } from 'react';
import { renderRoot } from './renderer';

export default {
  render(element: ReactElement<any>, container: Element, callback?: Function): Component | null {
    return renderRoot(element, container, callback);
  },
  hydrate(element: ReactElement<any>, container: Element, callback?: Function): Component | null {
    return null;
  },
  unmountComponentAtNode(container: Element): boolean {
    return true;
  },
  findDOMNode(component: Component): Element {
    return new Element();
  },
  createPortal(child: ReactNode, container: HTMLElement): ReactPortal {
    return { key: null, children: child };
  }
};
