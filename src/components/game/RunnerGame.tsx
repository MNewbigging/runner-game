import { observer } from 'mobx-react';
import React from 'react';

import { GameScreen, RunnerGameState } from '../../state/RunnerGameState';
import { GameOverMenu } from '../menus/GameOverMenu';
import { PauseMenu } from '../menus/PauseMenu';
import { StartMenu } from '../menus/StartMenu';
import { DistanceCounter } from './hud/DistanceCounter';
import { Obstacle } from './obstacles/Obstacle';
import { ObstaclesWrapper } from './obstacles/ObstaclesWrapper';
import { Player } from './player/Player';
import { Backdrop } from './scene/Backdrop';

import './runner-game.scss';
import { Foreground } from './scene/Foreground';

@observer
export class RunnerGame extends React.Component {
  private readonly runnerState = new RunnerGameState();

  public render() {
    const showDistance = !this.runnerState.isActiveScreen(GameScreen.START_SCREEN);
    const pauseAnims = !this.runnerState.isActiveScreen(GameScreen.PLAY_SCREEN);

    return (
      <div className={'runner-game'}>
        {this.renderMenus()}

        {showDistance && <DistanceCounter distance={this.runnerState.distanceRan} />}

        <div className={'background'}>
          <Backdrop playerSpeed={this.runnerState.player?.speed} paused={pauseAnims} />

          {this.runnerState.player && (
            <Player key={this.runnerState.player.id} playerState={this.runnerState.player} />
          )}
          {this.renderObstacles()}
        </div>

        <div className={'foreground'}>
          <Foreground playerSpeed={this.runnerState.player?.speed} paused={pauseAnims} />
        </div>
      </div>
    );
  }

  private renderObstacles() {
    return (
      <ObstaclesWrapper>
        {this.runnerState.obstacles.map((ob) => (
          <Obstacle key={ob.id} obstacleState={ob} />
        ))}
      </ObstaclesWrapper>
    );
  }

  private renderMenus() {
    return (
      <>
        <StartMenu
          open={this.runnerState.isActiveScreen(GameScreen.START_SCREEN)}
          onStart={this.runnerState.startGame}
        />
        <PauseMenu
          open={this.runnerState.isActiveScreen(GameScreen.PAUSE_SCREEN)}
          onUnpause={this.runnerState.resumeGame}
        />
        <GameOverMenu
          open={this.runnerState.isActiveScreen(GameScreen.GAME_OVER_SCREEN)}
          onRestart={this.runnerState.restartGame}
          distance={this.runnerState.distanceRan}
        />
      </>
    );
  }
}
