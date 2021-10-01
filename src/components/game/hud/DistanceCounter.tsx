import { observer } from 'mobx-react';
import React from 'react';

import './distance-counter.scss';

interface Props {
  distance: number;
}

@observer
export class DistanceCounter extends React.Component<Props> {
  public render() {
    const { distance } = this.props;

    return <div className={'distance-counter'}>{distance}m</div>;
  }
}
