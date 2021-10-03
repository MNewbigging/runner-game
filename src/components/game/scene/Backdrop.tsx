import { observer } from 'mobx-react';
import React from 'react';

import './backdrop.scss';

interface Props {
  playerSpeed?: number;
}

@observer
export class Backdrop extends React.Component<Props> {
  public render() {
    return (
      <>
        <div className={'backdrop'}>
          <div className={'bg-image bg1'}></div>
        </div>
        <div className={'backdrop'}>
          <div className={'bg-image bg2'}></div>
        </div>
        <div className={'backdrop'}>
          <div className={'bg-image bg3'}></div>
        </div>
        <div className={'backdrop'}>
          <div className={'bg-image bg4'}></div>
        </div>
        <div className={'backdrop'}>
          <div className={'bg-image bg5'}></div>
        </div>
      </>
    );
  }
}
