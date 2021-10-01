import React from 'react';

import './backdrop.scss';

export class Backdrop extends React.Component {
  public render() {
    return (
      <>
        <div className={'backdrop bg1'}></div>
        <div className={'backdrop bg2'}></div>
        <div className={'backdrop bg3'}></div>
        <div className={'backdrop bg4'}></div>
        <div className={'backdrop bg5'}></div>
      </>
    );
  }
}
