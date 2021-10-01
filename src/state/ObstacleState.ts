import { action, observable } from 'mobx';

export class ObstacleState {
  public readonly id: string;
  @observable public paused = false;
  public nearPlayer = false;
  public element: HTMLDivElement;

  constructor(id: string) {
    this.id = id;
  }

  public setElement(div: HTMLDivElement) {
    this.element = div;
  }

  public getBounds(): DOMRect {
    return this.element.getBoundingClientRect();
  }

  public enterPlayerArea() {
    this.nearPlayer = true;
  }

  public exitScreen() {
    this.nearPlayer = false;
  }

  @action public pause() {
    this.paused = true;
  }

  @action public unpause() {
    this.paused = false;
  }
}
