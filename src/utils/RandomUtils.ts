export class RandomUtils {
  private static characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  public static getRandomId(length: number) {
    let id = '';
    const charLength = this.characters.length;
    for (let i = 0; i < length; i++) {
      id += this.characters.charAt(Math.floor(Math.random() * length));
    }

    return id;
  }

  public static coinToss() {
    return Math.random() < 0.5;
  }
}
