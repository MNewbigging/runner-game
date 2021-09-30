import React from 'react';

import './player.scss';

export class Player extends React.Component {
  public render() {
    return (
      <div id={'player'} className={'player'}>
        {this.props.children}
      </div>
    );
  }
}
