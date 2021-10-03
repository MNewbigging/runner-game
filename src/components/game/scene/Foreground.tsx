import React from 'react';

import './foreground.scss';

export class Foreground extends React.Component {
  public render() {
    return (
      <div className={'foreground'}>
        <div className={'top-row tiles'}></div>
        <div className={'bot-row big-tiles'}></div>
        <div className={'bot-row big-tiles'}></div>
      </div>
    );
  }
}
