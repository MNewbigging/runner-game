import { action, observable } from 'mobx';
import { RandomUtils } from '../utils/RandomUtils';

export enum ObstacleAction {
  IDLE = 'idle',
  ATTACK = 'attacking',
  RUNNING = 'running',
}

export class ObstacleState {
  @observable public currentAction = ObstacleAction.IDLE;
  public readonly id: string;
  public dogType: string;
  public nearPlayer = false;
  public element: HTMLDivElement;

  private onRemove: (id: string) => void;

  constructor(id: string, onRemove: (id: string) => void) {
    this.id = id;
    this.onRemove = onRemove;

    this.dogType = RandomUtils.coinToss() ? 'dog1' : 'dog2';
  }

  public setElement(div: HTMLDivElement) {
    this.element = div;
  }

  public getBounds(): DOMRect {
    return this.element.getBoundingClientRect();
  }

  @action public enterPlayerArea() {
    this.nearPlayer = true;
    this.currentAction = ObstacleAction.ATTACK;
  }

  public exitScreen() {
    if (this.nearPlayer) {
      this.nearPlayer = false;
      this.onRemove(this.id);
    }
  }

  @action public pause() {
    this.element.style.animationPlayState = 'paused, running';
  }

  @action public unpause() {
    this.element.style.animationPlayState = '';
  }
}
