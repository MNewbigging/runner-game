import React from 'react';

import './obstacles-wrapper.scss';

export class ObstaclesWrapper extends React.Component {
  public render() {
    return (
      <div id={'obstacle-target'} className={'obstacles-wrapper'}>
        {this.props.children}
      </div>
    );
  }
}
