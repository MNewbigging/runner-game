import { action, observable } from 'mobx';
import { PlayerState } from './PlayerState';
import { keyboardManager } from '../utils/KeyboardManager';
import { ObstacleState } from './ObstacleState';

export class RunnerGameState {
  public player = new PlayerState();
  @observable public obstacles: ObstacleState[] = [];

  constructor() {
    keyboardManager.registerKeyListener(this.onKeyPress);

    this.addObstacle();

    this.checkCollisions();
  }

  private onKeyPress = (key: string) => {
    console.log('key', key);

    switch (key) {
      case 'Space':
        this.player.jump();
        break;
    }
  };

  @action private addObstacle() {
    this.obstacles.push(new ObstacleState());
  }

  private checkCollisions = () => {
    window.requestAnimationFrame(this.checkCollisions);

    // Get all onscreen obstacles
    const onScreenObstacles = this.obstacles.filter((ob) => ob.onScreen);
    if (!onScreenObstacles.length) {
      return;
    }

    // Are they colliding with the player
  };
}
