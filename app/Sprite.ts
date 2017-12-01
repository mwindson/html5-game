import Behavior from "Behavior";
import SpriteArtist from "SpriteArtist";

export default class Sprite {
  runAnimationRate: number;
  visible: boolean;
  ay: number;
  ax: number;
  vy: number;
  vx: number;
  xOffset: number;
  left: number;
  top: number;
  opacity: number;
  height: number;
  width: number;
  behaviors: Behavior[];
  type: string;
  artist: SpriteArtist;
  constructor(type: string, artist: SpriteArtist, behaviors: Behavior[] = []) {
    this.artist = artist //
    this.type = type // sprite类型
    this.behaviors = behaviors
    this.runAnimationRate = 0
    // 位置信息
    this.xOffset = 0
    this.left = 0
    this.top = 0
    this.width = 10
    this.height = 10
    this.opacity = 1.0
    this.visible = true // 若为false，则不会更新和绘制
    // 运动信息
    this.vx = 0
    this.vy = 0
    this.ax = 0
    this.ay = 0
  }

  draw(ctx: CanvasRenderingContext2D) {
    // 保存当前画面
    ctx.save()
    ctx.globalAlpha = this.opacity
    // 如果可见且有对应的绘制对象
    if (this.visible && this.artist) {
      this.artist.draw(this, ctx)
    }
    // 保存当前绘制的结果
    ctx.restore()
  }

  update(now: number, fps: number, ctx: CanvasRenderingContext2D, lastAnimationFrameTime: number) {
    for (const behavior of this.behaviors) {
      behavior.execute(this, now, fps, ctx, lastAnimationFrameTime)
    }
  }
}
