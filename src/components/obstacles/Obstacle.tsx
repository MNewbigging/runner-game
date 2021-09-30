import React, { createRef } from 'react';

import { ObstacleState } from '../../state/ObstacleState';

import './obstacle.scss';

interface Props {
  obstacleState: ObstacleState;
}

export class Obstacle extends React.Component<Props> {
  private observer: IntersectionObserver;
  private readonly ref = createRef<HTMLDivElement>();

  componentDidMount() {
    // TODO - test against parent next to player
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
    }
  }

  public render() {
    return <div ref={this.ref} className={'obstacle'}></div>;
  }
}
