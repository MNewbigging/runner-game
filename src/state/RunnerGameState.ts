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
  @observable public screen = GameScreen.START_SCREEN;

  constructor() {
    keyboardManager.registerKeyListener(this.onKeyPress);

    window.addEventListener('blur', this.pauseGame);
  }

  @action public startGame = () => {
    this.screen = GameScreen.PLAY_SCREEN;

    this.addObstacle();
    this.checkCollisions();
  };

  @action public restartGame = () => {
    this.player = new PlayerState();
    this.obstacles = [];

    this.startGame();
  };

  @action public resumeGame = () => {
    this.screen = GameScreen.PLAY_SCREEN;

    this.unpauseObstacleAnimations();
  };

  private onKeyPress = (key: string) => {
    switch (key) {
      case KeyName.SPACE:
        this.player.jump();
        break;
      case KeyName.P:
        this.pauseGame();
        break;
    }
  };

  @action private addObstacle() {
    console.log('added obstacle');
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

  @action private endGame() {
    this.screen = GameScreen.GAME_OVER_SCREEN;

    this.pauseObstacleAnimations();
  }

  @action private pauseGame = () => {
    // Ensure we can actually pause the game
    if (this.screen !== GameScreen.PLAY_SCREEN) {
      return;
    }

    this.screen = GameScreen.PAUSE_SCREEN;

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
