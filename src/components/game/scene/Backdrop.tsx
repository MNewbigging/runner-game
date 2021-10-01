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
        {/* <div className={'backdrop bg1'}></div>
        <div className={'backdrop bg2'}></div>
        <div className={'backdrop bg3'}></div>
        <div className={'backdrop bg4'}></div> */}
        <div className={'backdrop'}>
          <div className={'bg5'}></div>
        </div>
      </>
    );
  }
}
