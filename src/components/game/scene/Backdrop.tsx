import { observer } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { GameUtils } from '../../../utils/GameUtils';

import './backdrop.scss';

interface Props {
  playerSpeed?: number;
  paused: boolean;
}

@observer
export class Backdrop extends React.Component<Props> {
  public render() {
    const { playerSpeed, paused } = this.props;

    const speed = playerSpeed ? this.getScrollSpeed(playerSpeed) : 0;

    const bgStyle: CSSProperties = {
      animationDuration: speed + 's',
      animationPlayState: paused ? 'paused' : 'running',
    };

    return (
      <>
        <div className={'backdrop'}>
          <div className={'bg-image bg1'} style={bgStyle}></div>
        </div>
        <div className={'backdrop'}>
          <div className={'bg-image bg2'} style={bgStyle}></div>
        </div>
        <div className={'backdrop'}>
          <div className={'bg-image bg3'} style={bgStyle}></div>
        </div>
        <div className={'backdrop'}>
          <div className={'bg-image bg4'} style={bgStyle}></div>
        </div>
        <div className={'backdrop'}>
          <div className={'bg-image bg5'} style={bgStyle}></div>
        </div>
      </>
    );
  }

  private getScrollSpeed(playerSpeed: number) {
    // As player speed increases, animation duration decreases
    const base = 30;

    return base - playerSpeed;
  }
}
