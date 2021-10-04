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

    const bg1Style: CSSProperties = {
      animationDuration: speed + 's',
      animationPlayState: paused ? 'paused' : 'running',
    };

    const bg2Style: CSSProperties = {
      animationDuration: speed * 0.9 + 's',
      animationPlayState: paused ? 'paused' : 'running',
    };

    const bg3Style: CSSProperties = {
      animationDuration: speed * 0.8 + 's',
      animationPlayState: paused ? 'paused' : 'running',
    };

    const bg4Style: CSSProperties = {
      animationDuration: speed * 0.6 + 's',
      animationPlayState: paused ? 'paused' : 'running',
    };

    const bg5Style: CSSProperties = {
      animationDuration: speed * 0.5 + 's',
      animationPlayState: paused ? 'paused' : 'running',
    };

    return (
      <>
        <div className={'backdrop'}>
          <div className={'bg-image bg1'} style={bg1Style}></div>
        </div>
        <div className={'backdrop'}>
          <div className={'bg-image bg2'} style={bg2Style}></div>
        </div>
        <div className={'backdrop'}>
          <div className={'bg-image bg3'} style={bg3Style}></div>
        </div>
        <div className={'backdrop'}>
          <div className={'bg-image bg4'} style={bg4Style}></div>
        </div>
        <div className={'backdrop'}>
          <div className={'bg-image bg5'} style={bg5Style}></div>
        </div>
      </>
    );
  }

  private getScrollSpeed(playerSpeed: number) {
    // As player speed increases, animation duration decreases
    const base = 25;

    return base - playerSpeed;
  }
}
