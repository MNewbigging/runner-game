export class ObstacleState {
  public nearPlayer = false;

  public enterPlayerArea() {
    this.nearPlayer = true;
    console.log('onscreen');
  }

  public exitScreen() {
    this.nearPlayer = false;
    console.log('offscreen');
  }
}
