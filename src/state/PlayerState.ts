import { action, observable } from 'mobx';

export enum PlayerStatus {
  RUNNING = 'running',
  JUMPING = 'jumping',
}

export class PlayerState {
  @observable public status = PlayerStatus.RUNNING;
  public playerElement: HTMLDivElement;

  public setPlayerElement(div: HTMLDivElement) {
    this.playerElement = div;
  }

  public getBounds(): DOMRect {
    return this.playerElement.getBoundingClientRect();
  }

  @action public jump() {
    this.status = PlayerStatus.JUMPING;
  }

  public onAnimEnd = () => {
    if (this.status === PlayerStatus.JUMPING) {
      this.status = PlayerStatus.RUNNING;
    }
  };
}
