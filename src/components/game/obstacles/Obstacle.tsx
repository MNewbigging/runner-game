import { observer } from 'mobx-react';
import React, { createRef } from 'react';

import { ObstacleState } from '../../../state/ObstacleState';
import { RandomUtils } from '../../../utils/RandomUtils';

import './obstacle.scss';

interface Props {
  obstacleState: ObstacleState;
}

@observer
export class Obstacle extends React.Component<Props> {
  private observer: IntersectionObserver;
  private readonly ref = createRef<HTMLDivElement>();

  componentDidMount() {
    // Setup intersection observer
    const intProps: IntersectionObserverInit = {
      root: document.getElementById('obstacle-target'),
      rootMargin: '0px 0px 0px 250px',
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.props.obstacleState.enterPlayerArea();
      } else {
        this.props.obstacleState.exitScreen();
      }
    }, intProps);

    if (this.ref.current) {
      this.observer?.observe(this.ref.current);
      this.props.obstacleState.setElement(this.ref.current);
    }
  }

  public render() {
    const dogType = RandomUtils.coinToss() ? 'dog1' : 'dog2';

    const obsClasses = ['obstacle', dogType, 'attacking'];

    return <div ref={this.ref} className={obsClasses.join(' ')}></div>;
  }
}
