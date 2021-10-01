import { ObstacleState } from '../state/ObstacleState';
import { RandomUtils } from './RandomUtils';

export class ObstacleFactory {
  public static buildObstacle(onRemove: (id: string) => void) {
    return new ObstacleState(RandomUtils.getRandomId(4), onRemove);
  }
}
