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
    const { open, onStart } = this.props;

    return <Dialog open={open} body={this.renderStartMenu()} />;
  }

  private renderStartMenu() {
    return (
      <div className={'start-menu'}>
        <button onClick={this.click}>Start game</button>
      </div>
    );
  }

  private click = () => {
    this.props.onStart();
  };
}
