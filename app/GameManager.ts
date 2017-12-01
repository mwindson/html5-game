import Sprite from "Sprite";
import SpriteArtist from "SpriteArtist";
import { marioRunCellsRight, marioRunCellsLeft } from "resource/marioCells";
import { playerData } from "resource/positionData";
import RunBehavior from "behaviors/RunBehavior";
import { RUN_ANIMATION_RATE, BACKGROUD_VELOCITY, gameWindowWidth, RUN_ACC, WALK_ACC } from "utils/global";

interface SpriteData { left: number, top: number }
export default class GameManager {
  bgVelocity: number;
  backgroundOffset: number;
  background: HTMLImageElement;
  player: Sprite;
  lastAnimationFrameTime: any;
  fps: number;
  sprites: Sprite[];
  ctx: CanvasRenderingContext2D;
  spriteSheet: HTMLImageElement;
  players: Sprite[];
  paused: boolean;
  sceneVelocity: number;
  now: number;
  constructor(spriteSheet: HTMLImageElement, background: HTMLImageElement, ctx: CanvasRenderingContext2D) {
    this.now = 0 // 当前时间帧
    this.sceneVelocity = 0 // 场景滚动速度（正：从左往右，负：从右往左）
    this.paused = false // 是否暂停
    this.players = []
    this.player = null
    this.spriteSheet = spriteSheet
    this.background = background
    this.ctx = ctx
    this.fps = 60
    this.lastAnimationFrameTime = 0
    this.sprites = []
    this.backgroundOffset = 0
    this.bgVelocity = 0
    this.createSprites()
    this.addAllSprites()
  }
  drawBackgroud() {
    this.ctx.translate(-this.backgroundOffset, 0)
    this.ctx.drawImage(this.background, 0, 0)
    this.ctx.drawImage(this.background, this.background.width, 0)
    this.ctx.translate(this.backgroundOffset, 0)
  }
  setBackgroundOffset(now: number) {
    this.backgroundOffset += this.bgVelocity * (now - this.lastAnimationFrameTime) / 1000
    if (this.backgroundOffset < 0 || this.backgroundOffset > this.background.width) {
      this.backgroundOffset = 0
    }
  }

  createSprites() {
    this.createPlayerSprite()
    this.initalizeSprites()
    this.addAllSprites()
  }
  addAllSprites() {
    const addSprite = (sprites: Sprite[]) => {
      for (const sprite of sprites)
        this.sprites.push(sprite)
    }
    addSprite(this.players)
  }
  createPlayerSprite() {
    for (const pos of playerData) {
      const player = new Sprite('palyer', new SpriteArtist(this.spriteSheet, marioRunCellsRight), [new RunBehavior()])
      this.players.push(player)
    }
    this.player = this.players[0]
  }
  initalizeSprites() {
    // 初始化所有sprites的位置信息
    this.positionSprites(this.players, playerData)
  }
  positionSprites(sprite: Sprite[], spriteData: SpriteData[]) {
    for (let i = 0; i < spriteData.length; i += 1) {
      sprite[i].left = spriteData[i].left
      sprite[i].top = spriteData[i].top
    }
  }
  drawSprites() {
    for (const sprite of this.sprites) {
      // todo 添加绘制判断
      if (sprite.visible) {
        this.ctx.translate(-sprite.xOffset, 0)
        sprite.draw(this.ctx)
        this.ctx.translate(sprite.xOffset, 0)
      }
    }
  }
  updateSprites(now: number) {
    for (const sprite of this.sprites) {
      // todo 添加绘制判断
      if (sprite.visible) {
        sprite.update(now, this.fps, this.ctx, this.lastAnimationFrameTime)
      }
    }
  }
  turnLeft() {
    this.bgVelocity = 0
    this.player.ax = -WALK_ACC
    this.player.artist.cells = marioRunCellsLeft
  }
  stop() {
    this.bgVelocity = 0
    this.player.vx = 0
    this.player.ax = 0
    this.player.artist.cellIndex = 0
  }
  turnRight() {
    if (this.player.left > gameWindowWidth * 0.4) {
      this.bgVelocity = BACKGROUD_VELOCITY
    }
    this.player.ax = WALK_ACC
    this.player.artist.cells = marioRunCellsRight
  }
}
