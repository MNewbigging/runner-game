import { observer } from 'mobx-react';
import React from 'react';

import { PlayerState } from '../../state/PlayerState';

import './player.scss';

interface Props {
  playerState: PlayerState;
}

@observer
export class Player extends React.Component<Props> {
  private readonly ref = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.ref.current) {
      this.props.playerState.setPlayerElement(this.ref.current);
    }
  }

  public render() {
    const { playerState } = this.props;

    const playerClasses = ['player', playerState.status];

    return (
      <div
        ref={this.ref}
        id={'player'}
        className={playerClasses.join(' ')}
        onAnimationEnd={playerState.onAnimEnd}
      ></div>
    );
  }
}
