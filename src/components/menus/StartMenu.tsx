import { observer } from 'mobx-react';
import React from 'react';

import { Dialog } from '../common/Dialog';

import './start-menu.scss';

interface Props {
  open: boolean;
  onStart: () => void;
}

@observer
export class StartMenu extends React.Component<Props> {
  public render() {
    const { open } = this.props;

    return (
      <Dialog open={open}>
        <div className={'start-menu'}>
          <p>Press Space to jump!</p>
          <button onClick={() => this.props.onStart()}>Start game</button>
        </div>
      </Dialog>
    );
  }
}
