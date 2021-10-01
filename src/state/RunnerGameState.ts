import { action, observable } from 'mobx';

import { PlayerState } from './PlayerState';
import { keyboardManager, KeyName } from '../utils/KeyboardManager';
import { ObstacleState } from './ObstacleState';
import { RandomUtils } from '../utils/RandomUtils';
import { GameUtils } from '../utils/GameUtils';

export enum GameScreen {
  START_SCREEN = 'start-screen',
  PLAY_SCREEN = 'play-screen',
  PAUSE_SCREEN = 'pause-screen',
  GAME_OVER_SCREEN = 'game-over-screen',
}

export class RunnerGameState {
  @observable public player: PlayerState;
  @observable public obstacles: ObstacleState[] = [];
  @observable public screen = GameScreen.START_SCREEN;
  @observable public distanceRun = 0;
  private clockInterval: number;

  constructor() {
    keyboardManager.registerKeyListener(this.onKeyPress);

    window.addEventListener('blur', this.pauseGame);
  }

  public isActiveScreen(screen: GameScreen) {
    return this.screen === screen;
  }

  @action public startGame = () => {
    this.screen = GameScreen.PLAY_SCREEN;
    this.player = new PlayerState(RandomUtils.getRandomId(4));

    this.addObstacle();
    this.startClock();
    this.update();
  };

  @action public restartGame = () => {
    this.obstacles = [];
    this.distanceRun = 0;

    this.startGame();
  };

  @action public resumeGame = () => {
    this.screen = GameScreen.PLAY_SCREEN;

    this.startClock();

    this.unpauseAnimations();
  };

  private onKeyPress = (key: string) => {
    // Only listen for keys during game
    if (this.screen !== GameScreen.PLAY_SCREEN) {
      return;
    }

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
    this.obstacles.push(new ObstacleState(RandomUtils.getRandomId(4)));
  }

  private update = () => {
    window.requestAnimationFrame(this.update);

    // Get all onscreen obstacles
    const onScreenObstacles = this.obstacles.filter((ob) => ob.nearPlayer);
    if (!onScreenObstacles.length) {
      return;
    }

    // Are they colliding with the player
    for (const obs of onScreenObstacles) {
      if (GameUtils.obstacleCollidesWithPlayer(obs, this.player)) {
        // Game over
        this.endGame();
        break;
      }
    }
  };

  @action private endGame() {
    this.screen = GameScreen.GAME_OVER_SCREEN;

    this.stopClock();

    this.pauseAnimations();
  }

  @action private pauseGame = () => {
    // Ensure we can actually pause the game
    if (this.screen !== GameScreen.PLAY_SCREEN) {
      return;
    }

    this.screen = GameScreen.PAUSE_SCREEN;

    this.stopClock();

    // Stop all animations
    this.pauseAnimations();
  };

  private pauseAnimations() {
    // Pause obstacle anims
    this.obstacles.forEach((obs) => obs.pause());

    // Pause player anims
    this.player.pause();
  }

  private unpauseAnimations() {
    this.obstacles.forEach((obs) => obs.unpause());
    this.player.unpause();
  }

  @action private clockTick = () => {
    // Called every second
    // Calculate distance run based on player speed
    this.distanceRun += this.player.speed;
  };

  private startClock() {
    this.clockInterval = window.setInterval(this.clockTick, 1000);
  }

  private stopClock() {
    clearInterval(this.clockInterval);
  }
}
