import React from 'react';

import { RunnerGameState } from '../state/RunnerGameState';
import { Obstacle } from './obstacles/Obstacle';
import { ObstaclesWrapper } from './obstacles/ObstaclesWrapper';
import { Player } from './player/Player';

import './runner-game.scss';

export class RunnerGame extends React.Component {
  private readonly runnerState = new RunnerGameState();

  public render() {
    return (
      <div className={'runner-game'}>
        <div className={'background'}>
          <Player playerState={this.runnerState.player} />
          {this.renderObstacles()}
        </div>

        <div className={'foreground'}></div>
      </div>
    );
  }

  private renderObstacles() {
    return (
      <ObstaclesWrapper>
        {this.runnerState.obstacles.map((ob, i) => (
          <Obstacle key={'obs-' + i} obstacleState={ob} />
        ))}
      </ObstaclesWrapper>
    );
  }
}
