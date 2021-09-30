import React, { createRef } from 'react';

import './obstacle.scss';

interface Props {
  onCollide: () => void;
}

export class Obstacle extends React.Component<Props> {
  private observer: IntersectionObserver;
  private readonly ref = createRef<HTMLDivElement>();

  componentDidMount() {
    const intProps: IntersectionObserverInit = {
      root: document.getElementById('player'),
      rootMargin: '0px',
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.props.onCollide();
        }
      });
    }, intProps);

    if (this.ref.current) {
      this.observer?.observe(this.ref.current);
    }
  }

  public render() {
    return <div ref={this.ref} className={'obstacle'}></div>;
  }
}
