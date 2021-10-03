import { observer } from 'mobx-react';
import React, { CSSProperties } from 'react';

import './foreground.scss';

interface Props {
  paused: boolean;
  playerSpeed?: number;
}

@observer
export class Foreground extends React.Component<Props> {
  public render() {
    const { paused, playerSpeed } = this.props;

    const speed = playerSpeed ? this.getScrollSpeed(playerSpeed) : 0;

    const tileStyle: CSSProperties = {
      animationDuration: speed + 's',
      animationPlayState: paused ? 'paused' : 'running',
    };

    const bigTileStyle: CSSProperties = {
      animationDuration: speed * 2 + 's',
      animationPlayState: paused ? 'paused' : 'running',
    };

    return (
      <div className={'foreground'}>
        <div className={'top-row tiles'} style={tileStyle}></div>
        <div className={'bot-row big-tiles'} style={bigTileStyle}></div>
        <div className={'bot-row big-tiles'} style={bigTileStyle}></div>
      </div>
    );
  }

  private getScrollSpeed(playerSpeed: number) {
    return playerSpeed / 2;
  }
}
