import React from 'react';

import { RunnerGameState } from '../state/RunnerGameState';
import { Obstacle } from './obstacles/Obstacle';
import { Player } from './player/Player';

import './runner-game.scss';

export class RunnerGame extends React.Component {
  private readonly runnerState = new RunnerGameState();

  public render() {
    return (
      <div className={'runner-game'}>
        <div className={'background'}></div>

        <div className={'play-area'}>
          <Player>
            <Obstacle onCollide={this.runnerState.onHitPlayer} />
          </Player>
        </div>

        <div className={'foreground'}></div>
      </div>
    );
  }
}
