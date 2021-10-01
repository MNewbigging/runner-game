import { action, observable } from 'mobx';

export class ObstacleState {
  public readonly id: string;
  public nearPlayer = false;
  public element: HTMLDivElement;

  private onRemove: (id: string) => void;

  constructor(id: string, onRemove: (id: string) => void) {
    this.id = id;
    this.onRemove = onRemove;
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
    if (this.nearPlayer) {
      this.nearPlayer = false;
      this.onRemove(this.id);
    }
  }

  @action public pause() {
    this.element.style.animationPlayState = 'paused';
  }

  @action public unpause() {
    this.element.style.animationPlayState = '';
  }
}
