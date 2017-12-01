import { gameWindowHeight, gameWindowWidth } from "utils/global";
import GameManager from "GameManager";
import { start } from "repl";

let fps
let game: GameManager
let now = 0
let lastAnimationFrameTime = 0
function gameLoop() {
  // fps = calculateFps(now)
  game.ctx.clearRect(0, 0, gameWindowWidth, gameWindowHeight)
  lastAnimationFrameTime = now
  game.lastAnimationFrameTime = lastAnimationFrameTime
  now = performance.now()
  game.setBackgroundOffset(now)
  game.drawBackgroud()
  game.drawSprites()
  game.updateSprites(now)
  requestAnimationFrame(gameLoop)
}

function startGame(sprite: HTMLImageElement, backgroud: HTMLImageElement, ctx: CanvasRenderingContext2D) {
  game = new GameManager(sprite, backgroud, ctx)
  window.addEventListener('keydown', (e) => {
    const keyCode = e.keyCode
    if (keyCode === 39) {
      game.turnRight()
    } else if (keyCode === 37) {
      game.turnLeft()
    }
  })
  window.addEventListener('keyup', (e) => {
    const keyCode = e.keyCode
    game.stop()
  })
  gameLoop()
}

function InitializeImage() {
  const canvas = document.getElementById('window') as HTMLCanvasElement
  const ctx = canvas.getContext('2d')
  const backgroud = new Image()
  backgroud.src = 'app/static/sprites/1-1.png'
  canvas.setAttribute('width', (String)(gameWindowWidth))
  canvas.setAttribute('height', (String)(gameWindowHeight))
  const sprite = new Image()
  sprite.src = 'app/static/sprites/player.png'
  backgroud.onload = function () {
    startGame(sprite, backgroud, ctx)
  }
}

InitializeImage()
