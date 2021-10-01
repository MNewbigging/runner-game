import { observer } from 'mobx-react';
import React from 'react';

import './dialog.scss';

interface Props {
  open: boolean;
}

@observer
export class Dialog extends React.Component<Props> {
  public render() {
    const openClass = this.props.open ? 'open' : 'closed';

    return <div className={'dialog ' + openClass}>{this.props.children}</div>;
  }
}
