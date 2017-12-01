import Behavior from "behaviors/Behavior";
import Sprite from "Sprite";
import { RUN_MAX_SPEED, RUN_ANIMATION_RATE, WALK_MAX_SPEED, gameWindowWidth } from "utils/global";

export default class RunBehavior extends Behavior {
  lastAdvanceTime: number;
  constructor() {
    super()
    this.lastAdvanceTime = 0
  }
  execute(sprite: Sprite, now: number, fps: number, ctx: CanvasRenderingContext2D, lastAnimationFrameTime: number) {
    // 没有跑动
    if (sprite.ax === 0) {
      return
    }
    // 第一次

    if (this.lastAdvanceTime === 0) {
      sprite.left = Math.min(Math.max(sprite.left + sprite.vx, 0), gameWindowWidth - 16)
      sprite.vx = Math.min(WALK_MAX_SPEED, Math.max(sprite.vx + sprite.ax, -WALK_MAX_SPEED))
      sprite.runAnimationRate = sprite.vx
      this.lastAdvanceTime = now
      // 进行更新
    } else if ((now - this.lastAdvanceTime) > 1000 / (20 * sprite.runAnimationRate)) {
      sprite.artist.advance()
      if (sprite.vx < WALK_MAX_SPEED) {
        sprite.vx = Math.min(WALK_MAX_SPEED, Math.max(sprite.vx + sprite.ax, -WALK_MAX_SPEED))
        sprite.left = Math.min(Math.max(sprite.left + sprite.vx, 0), gameWindowWidth - 16)
        sprite.runAnimationRate = sprite.vx
      }
      this.lastAdvanceTime = now
    }
  }
}
