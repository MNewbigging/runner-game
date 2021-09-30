export class ObstacleState {
  public onScreen = false;

  public enterScreen() {
    this.onScreen = true;
  }

  public exitScreen() {
    this.onScreen = false;
  }
}
