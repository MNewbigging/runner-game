import React from 'react';

import './foreground.scss';

interface Props {
  paused: boolean;
  playerSpeed?: number;
}

export class Foreground extends React.Component<Props> {
  public render() {
    const { paused, playerSpeed } = this.props;

    return (
      <div className={'foreground'}>
        <div className={'top-row tiles'}></div>
        <div className={'bot-row big-tiles'}></div>
        <div className={'bot-row big-tiles'}></div>
      </div>
    );
  }

  private getScrollSpeed(playerSpeed: number) {}
}
