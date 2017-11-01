/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const bannerText = 'Phaser + ES6 + Webpack'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)

    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    this.mushroom = new Mushroom({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    })

    this.game.add.existing(this.mushroom)
  }

  update() {
    const player = this.mushroom

    // Input
    const upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP)
    const downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    const leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    const rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)

    // Focusing
    const shiftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT)
    // Shoot
    const zKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z)
    // Bomb
    const xKey = this.game.input.keyboard.addKey(Phaser.Keyboard.X)

    // Speed
    const speed = 4
    const playerSpeed = shiftKey.isDown ? speed / 2 : speed

    if (upKey.isDown) {
      player.y -= playerSpeed
    } else if (downKey.isDown) {
      player.y += playerSpeed
    }

    if (leftKey.isDown) {
      player.x -= playerSpeed
      player.angle = -15
    } else if (rightKey.isDown) {
      player.x += playerSpeed
      player.angle = +15
    } else {
      player.rotation = 0
    }

    // if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    //   this.mushroom.x -= speed
    //   this.mushroom.angle = -15
    //   // leftBtn.alpha = 0.6
    // } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    //   this.mushroom.x += speed
    //   this.mushroom.angle = 15
    //   // rightBtn.alpha = 0.6
    // } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    //   this.mushroom.y -= speed
    //   console.log('up')
    // } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    //   this.mushroom.y += speed
    //   console.log('down')
    // } else {
    //   this.mushroom.rotation = 0
    //   // leftBtn.alpha = rightBtn.alpha = 0
    // }
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
