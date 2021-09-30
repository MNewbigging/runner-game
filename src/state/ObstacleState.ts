import { action, observable } from 'mobx';

export class ObstacleState {
  @observable public paused = false;

  public nearPlayer = false;
  public element: HTMLDivElement;

  public setElement(div: HTMLDivElement) {
    this.element = div;
  }

  public getBounds(): DOMRect {
    return this.element.getBoundingClientRect();
  }

  public enterPlayerArea() {
    this.nearPlayer = true;
    console.log('onscreen');
  }

  public exitScreen() {
    this.nearPlayer = false;
    console.log('offscreen');
  }

  @action public pause() {
    this.paused = true;
  }

  @action public unpause() {
    this.paused = false;
  }
}
