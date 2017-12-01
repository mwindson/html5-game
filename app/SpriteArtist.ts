import Sprite from "Sprite";
interface Cell { left: number, top: number, width: number, height: number }

export default class SpriteArtist {
  cells: Cell[];
  cellIndex: number;
  spriteSheet: HTMLImageElement;
  constructor(spriteSheet: HTMLImageElement, cells: Cell[]) {
    this.cells = cells
    this.spriteSheet = spriteSheet
    this.cellIndex = 0 // 当前显示的图像索引
  }
  draw(sprite: Sprite, ctx: CanvasRenderingContext2D) {
    const cell = this.cells[this.cellIndex]
    ctx.drawImage(this.spriteSheet, cell.left, cell.top, cell.width, cell.height, sprite.left, sprite.top, cell.width, cell.height)
  }
  advance() {
    this.cellIndex = this.cellIndex === this.cells.length - 1 ? 1 : this.cellIndex + 1
  }
}
