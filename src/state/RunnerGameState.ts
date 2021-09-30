import { PlayerState } from '../state/Player';
import { keyboardManager } from '../utils/KeyboardManager';

export class RunnerGameState {
  public player = new PlayerState();

  constructor() {
    keyboardManager.registerKeyListener(this.onKeyPress);
  }

  public onHitPlayer = () => {
    console.log('hit player');
  };

  private onKeyPress = (key: string) => {
    console.log('key', key);

    switch (key) {
      case 'Space':
        this.player.jump();
        break;
    }
  };
}
