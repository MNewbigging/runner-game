import { action, observable } from 'mobx';
import { PlayerState } from './PlayerState';
import { keyboardManager } from '../utils/KeyboardManager';
import { ObstacleState } from './ObstacleState';

export class RunnerGameState {
  public player = new PlayerState();
  @observable public obstacles: ObstacleState[] = [];

  constructor() {
    keyboardManager.registerKeyListener(this.onKeyPress);

    window.addEventListener('blur', this.pauseGame);
    window.addEventListener('focus', this.resumeGame);

    // Add starting obstacles
    this.addObstacle();
    // Start game
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
    const onScreenObstacles = this.obstacles.filter((ob) => ob.nearPlayer);
    if (!onScreenObstacles.length) {
      return;
    }

    // Are they colliding with the player
    for (const obs of onScreenObstacles) {
      if (this.obstacleCollidesWithPlayer(obs)) {
        // Game over
        this.endGame();
        break;
      }
    }
  };

  private obstacleCollidesWithPlayer(obs: ObstacleState) {
    const pRect = this.player.getBounds();
    const oRect = obs.getBounds();

    return !(
      pRect.right < oRect.left ||
      pRect.left > oRect.right ||
      pRect.bottom < oRect.top ||
      pRect.top > oRect.bottom
    );
  }

  private endGame() {
    this.pauseObstacleAnimations();
  }

  private pauseGame = () => {
    // Stop all animations
    this.pauseObstacleAnimations();
  };

  private resumeGame = () => {
    this.unpauseObstacleAnimations();
  };

  private pauseObstacleAnimations() {
    // Pause obstacle anims
    this.obstacles.forEach((obs) => obs.pause());
  }

  private unpauseObstacleAnimations() {
    this.obstacles.forEach((obs) => obs.unpause());
  }
}
