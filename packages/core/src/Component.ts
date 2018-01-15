import { VirtualElement } from './Element'

export class Component {
  public props: Object;
  public state: Object;

  constructor () {}

  public setState (partialState: Object = {}): void {
    console.log(partialState);
  }
}
