import Sprite from "Sprite";

export default abstract class Behavior {
  abstract execute(sprite: Sprite, now: number, fps: number, ctx: CanvasRenderingContext2D, lastAnimationFrame: number): void
}
