import { observer } from 'mobx-react';
import React from 'react';

import { Dialog } from '../common/Dialog';

import './game-over-menu.scss';

interface Props {
  open: boolean;
  onRestart: () => void;
}

@observer
export class GameOverMenu extends React.Component<Props> {
  public render() {
    const { open, onRestart } = this.props;

    return (
      <Dialog open={open}>
        <div className={'game-over-menu'}>
          <button onClick={() => onRestart()}>Replay</button>
        </div>
      </Dialog>
    );
  }
}
