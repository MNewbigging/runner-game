import { observer } from 'mobx-react';
import React from 'react';

import { Dialog } from '../common/Dialog';

import './pause-menu.scss';

interface Props {
  open: boolean;
  onUnpause: () => void;
}

@observer
export class PauseMenu extends React.Component<Props> {
  public render() {
    const { open, onUnpause } = this.props;

    return (
      <Dialog open={open}>
        <div className={'pause-menu'}>
          <button onClick={() => onUnpause()}>Resume game</button>
        </div>
      </Dialog>
    );
  }
}
