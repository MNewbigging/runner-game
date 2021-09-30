import { observer } from 'mobx-react';
import React from 'react';

import { PlayerState } from '../../state/PlayerState';

import './player.scss';

interface Props {
  playerState: PlayerState;
}

@observer
export class Player extends React.Component<Props> {
  public render() {
    const { playerState } = this.props;

    const playerClasses = ['player', playerState.status];

    return (
      <div
        id={'player'}
        className={playerClasses.join(' ')}
        onAnimationEnd={playerState.onAnimEnd}
      ></div>
    );
  }
}
