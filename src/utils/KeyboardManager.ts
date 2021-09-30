type KeyListener = (key: string) => void;

class KeyboardManager {
  private pressedKeys = new Set<string>();
  private listeners: KeyListener[] = [];

  constructor() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  public registerKeyListener(listener: KeyListener) {
    this.listeners.push(listener);
  }

  private onKeyDown = (e: KeyboardEvent) => {
    // Ensure listeners are only called once
    if (this.pressedKeys.has(e.code)) {
      return;
    }

    this.pressedKeys.add(e.code);
    this.listeners.forEach((listener) => listener(e.code));
  };

  private onKeyUp = (e: KeyboardEvent) => {
    this.pressedKeys.delete(e.code);
  };
}

export const keyboardManager = new KeyboardManager();
