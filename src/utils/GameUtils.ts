import { ObstacleState } from '../state/ObstacleState';
import { PlayerState } from '../state/PlayerState';

export class GameUtils {
  public static obstacleCollidesWithPlayer(obs: ObstacleState, player: PlayerState) {
    const pRect = player.getBounds();
    const oRect = obs.getBounds();

    return !(
      pRect.right < oRect.left ||
      pRect.left > oRect.right ||
      pRect.bottom < oRect.top ||
      pRect.top > oRect.bottom
    );
  }
}
