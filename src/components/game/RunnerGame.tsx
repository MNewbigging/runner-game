import { observer } from 'mobx-react';
import React from 'react';

import { GameScreen, RunnerGameState } from '../../state/RunnerGameState';
import { GameOverMenu } from '../menus/GameOverMenu';
import { PauseMenu } from '../menus/PauseMenu';
import { StartMenu } from '../menus/StartMenu';
import { Obstacle } from './obstacles/Obstacle';
import { ObstaclesWrapper } from './obstacles/ObstaclesWrapper';
import { Player } from './player/Player';

import './runner-game.scss';

@observer
export class RunnerGame extends React.Component {
  private readonly runnerState = new RunnerGameState();

  public render() {
    return (
      <div className={'runner-game'}>
        {this.renderMenus()}

        <div className={'background'}>
          {this.runnerState.player && (
            <Player key={this.runnerState.player.id} playerState={this.runnerState.player} />
          )}
          {this.renderObstacles()}
        </div>

        <div className={'foreground'}></div>
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
    const isScreenOpen = (screen: GameScreen) => {
      return this.runnerState.screen === screen;
    };

    return (
      <>
        <StartMenu
          open={isScreenOpen(GameScreen.START_SCREEN)}
          onStart={this.runnerState.startGame}
        />
        <PauseMenu
          open={isScreenOpen(GameScreen.PAUSE_SCREEN)}
          onUnpause={this.runnerState.resumeGame}
        />
        <GameOverMenu
          open={isScreenOpen(GameScreen.GAME_OVER_SCREEN)}
          onRestart={this.runnerState.restartGame}
        />
      </>
    );
  }
}
