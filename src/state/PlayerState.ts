import { action, observable } from 'mobx';
import { CSSProperties } from 'react';

export enum PlayerStatus {
  RUNNING = 'running',
  JUMPING = 'jumping',
  DEAD = 'dead',
}

export class PlayerState {
  public readonly id: string;
  @observable public status = PlayerStatus.RUNNING;
  public speed = 1; // meters per second
  public playerElement: HTMLDivElement;

  constructor(id: string) {
    this.id = id;
  }

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
    } else if (this.status === PlayerStatus.DEAD) {
      // this.playerElement.style.backgroundPosition = '-192px';
    }
  };

  public die() {
    this.status = PlayerStatus.DEAD;
  }

  public pause() {
    this.playerElement.style.animationPlayState = 'paused';
  }

  public unpause() {
    this.playerElement.style.animationPlayState = '';
  }
}
