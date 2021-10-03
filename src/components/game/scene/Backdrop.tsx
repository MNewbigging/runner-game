import { observer } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { GameUtils } from '../../../utils/GameUtils';

import './backdrop.scss';

interface Props {
  playerSpeed?: number;
}

@observer
export class Backdrop extends React.Component<Props> {
  public render() {
    const { playerSpeed } = this.props;

    const speed = playerSpeed ? GameUtils.getScrollSpeed(playerSpeed) : 0;

    console.log('speed: ', speed);

    const bgStle: CSSProperties = {
      animationDuration: speed + 's',
    };

    return (
      <>
        <div className={'backdrop'}>
          <div className={'bg-image bg1'} style={bgStle}></div>
        </div>
        <div className={'backdrop'}>
          <div className={'bg-image bg2'} style={bgStle}></div>
        </div>
        <div className={'backdrop'}>
          <div className={'bg-image bg3'} style={bgStle}></div>
        </div>
        <div className={'backdrop'}>
          <div className={'bg-image bg4'} style={bgStle}></div>
        </div>
        <div className={'backdrop'}>
          <div className={'bg-image bg5'} style={bgStle}></div>
        </div>
      </>
    );
  }
}
