import { ObstacleState } from '../state/ObstacleState';
import { PlayerState } from '../state/PlayerState';

export class GameUtils {
  public static obstacleCollidesWithPlayer(obs: ObstacleState, player: PlayerState) {
    const pRect = player.getBounds();
    const oRect = obs.getBounds();

    // Allowed to overlap on left side by this much
    const allowed = 20;
    const collides = !(
      pRect.right < oRect.left ||
      pRect.left > oRect.right - allowed ||
      pRect.bottom < oRect.top ||
      pRect.top > oRect.bottom
    );

    return collides;
  }
}
