import { action, observable } from 'mobx';

import { PlayerState } from './PlayerState';
import { keyboardManager, KeyName } from '../utils/KeyboardManager';
import { ObstacleState } from './ObstacleState';
import { RandomUtils } from '../utils/RandomUtils';
import { GameUtils } from '../utils/GameUtils';
import { ObstacleFactory } from '../utils/ObstacleFactory';

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
  @observable public distanceRan = 0;
  private elapsedTime = 0;
  private lastUpdate: number;
  private updateLoop: number;

  // Spacing number is measured in seconds between groups
  private obstacleGroupSpacing = 2;
  private timeSinceLastObstacle = 0;

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

    this.startUpdateLoop();
  };

  @action public restartGame = () => {
    this.obstacles = [];
    this.distanceRan = 0;
    this.elapsedTime = 0;
    this.timeSinceLastObstacle = 0;

    this.startGame();
  };

  @action public resumeGame = () => {
    this.screen = GameScreen.PLAY_SCREEN;

    this.unpauseAnimations();

    this.startUpdateLoop();
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
    this.obstacles.push(ObstacleFactory.buildObstacle(this.removeOffscreenObstacle));
  }

  private removeOffscreenObstacle = (id: string) => {
    this.obstacles = this.obstacles.filter((obs) => obs.id !== id);
  };

  private startUpdateLoop() {
    this.lastUpdate = new Date().getTime();
    this.update();
  }

  private update = () => {
    this.updateLoop = window.requestAnimationFrame(this.update);

    // Timers
    const currentTime = new Date().getTime();
    const deltaTime = (currentTime - this.lastUpdate) / 1000;
    this.lastUpdate = currentTime;
    this.elapsedTime += deltaTime;

    this.updateDistanceRan();

    this.checkObstacleCollisions();

    this.addNewObstacles(deltaTime);
  };

  private updateDistanceRan() {
    // Calculate distance
    this.distanceRan = Math.floor(this.elapsedTime * this.player.speed);

    // Update player speed based on distance
    //this.player.speed = 1 + this.distanceRan / 100;
  }

  private checkObstacleCollisions() {
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
  }

  private addNewObstacles(deltaTime: number) {
    // Increment obs placement timer
    this.timeSinceLastObstacle += deltaTime;

    // TODO Update the group spacing as time goes on

    // Add a new obstacle every n seconds, where n is group spacing
    if (this.timeSinceLastObstacle < this.obstacleGroupSpacing) {
      return;
    }

    this.addObstacle();
    this.timeSinceLastObstacle = 0;
  }

  @action private endGame() {
    this.screen = GameScreen.GAME_OVER_SCREEN;

    window.cancelAnimationFrame(this.updateLoop);

    // Stop first animation on obstacles
    this.obstacles.forEach((obs) => (obs.container.style.animationPlayState = 'paused'));

    // Player had died
    this.player.die();
  }

  @action private pauseGame = () => {
    // Ensure we can actually pause the game
    if (this.screen !== GameScreen.PLAY_SCREEN) {
      return;
    }

    this.screen = GameScreen.PAUSE_SCREEN;

    window.cancelAnimationFrame(this.updateLoop);

    // Stop all animations
    this.obstacles.forEach((obs) => obs.pause());
    this.player.playerElement.style.animationPlayState = 'paused';
  };

  private unpauseAnimations() {
    this.obstacles.forEach((obs) => obs.unpause());
    this.player.unpause();
  }
}
