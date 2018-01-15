import { Component } from './Component';

export interface ElementProps {}

export type VirtualElement = {
    props: Object;
    children: Array<VirtualElement> | null,
    instance: Component
};

