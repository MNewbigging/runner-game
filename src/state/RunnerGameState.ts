import { action, observable } from 'mobx';
import { PlayerState } from './PlayerState';
import { keyboardManager, KeyName } from '../utils/KeyboardManager';
import { ObstacleState } from './ObstacleState';

export enum GameScreen {
  START_SCREEN = 'start-screen',
  PLAY_SCREEN = 'play-screen',
  PAUSE_SCREEN = 'pause-screen',
  GAME_OVER_SCREEN = 'game-over-screen',
}

export class RunnerGameState {
  public player = new PlayerState();
  @observable public obstacles: ObstacleState[] = [];
  @observable public status = GameScreen.START_SCREEN;
  @observable public startScreenOpen = true;
  @observable public pauseScreenOpen = false;

  constructor() {
    keyboardManager.registerKeyListener(this.onKeyPress);

    window.addEventListener('blur', this.pauseGame);
  }

  @action public startGame = () => {
    this.startScreenOpen = false;

    this.addObstacle();
    this.checkCollisions();
  };

  @action public resumeGame = () => {
    this.pauseScreenOpen = false;

    this.unpauseObstacleAnimations();
  };

  private onKeyPress = (key: string) => {
    switch (key) {
      case KeyName.SPACE:
        this.player.jump();
        break;
      case KeyName.P:
        if (!this.pauseScreenOpen) {
          this.pauseGame();
        }
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

  @action private pauseGame = () => {
    this.pauseScreenOpen = true;

    // Stop all animations
    this.pauseObstacleAnimations();
  };

  private pauseObstacleAnimations() {
    // Pause obstacle anims
    this.obstacles.forEach((obs) => obs.pause());
  }

  private unpauseObstacleAnimations() {
    this.obstacles.forEach((obs) => obs.unpause());
  }
}
