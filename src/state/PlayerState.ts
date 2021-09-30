import { action, observable } from 'mobx';

export enum PlayerStatus {
  RUNNING = 'running',
  JUMPING = 'jumping',
}

export class PlayerState {
  @observable public state = PlayerStatus.RUNNING;

  @action public jump() {
    this.state = PlayerStatus.JUMPING;
    console.log('jumping');
  }
}
