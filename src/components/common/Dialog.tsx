import { observer } from 'mobx-react';
import React from 'react';

import './dialog.scss';

interface Props {
  open: boolean;
  body: JSX.Element;
}

@observer
export class Dialog extends React.Component<Props> {
  public render() {
    const openClass = this.props.open ? 'open' : 'closed';

    return (
      <div className={'dialog ' + openClass} onClick={() => console.log('clicked dialog')}>
        {this.props.body}
      </div>
    );
  }
}
