import { VirtualElement, ElementProps } from './Element';
import { Component } from './Component';

export function createElement (
  et: Component,
  config: ElementProps | null,
  ...children: Array<VirtualElement>
): VirtualElement {
  let ve: VirtualElement = {
    props: {},
    children,
    instance: et
  };
  return ve;
}
