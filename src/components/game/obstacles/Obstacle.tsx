import { observer } from 'mobx-react';
import React, { createRef, CSSProperties } from 'react';

import { ObstacleState } from '../../../state/ObstacleState';
import { RandomUtils } from '../../../utils/RandomUtils';

import './obstacle.scss';

interface Props {
  obstacleState: ObstacleState;
  playerSpeed: number;
}

@observer
export class Obstacle extends React.Component<Props> {
  private observer: IntersectionObserver;
  private readonly innerRef = createRef<HTMLDivElement>();
  private readonly containerRef = createRef<HTMLDivElement>();

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

    if (this.innerRef.current && this.containerRef.current) {
      this.observer?.observe(this.innerRef.current);
      this.props.obstacleState.setElements(this.containerRef.current, this.innerRef.current);
    }
  }

  public render() {
    const { obstacleState, playerSpeed } = this.props;

    const obsClasses = ['obstacle', obstacleState.dogType, obstacleState.currentAction];

    const speed = this.getMoveSpeed(playerSpeed);

    const style: CSSProperties = {
      animationDuration: `${speed}s`,
    };

    return (
      <div ref={this.containerRef} className={'obstacle-container'} style={style}>
        <div ref={this.innerRef} className={obsClasses.join(' ')}></div>
      </div>
    );
  }

  private getMoveSpeed(playerSpeed: number) {
    const base = 10;

    return base - playerSpeed;
  }
}
