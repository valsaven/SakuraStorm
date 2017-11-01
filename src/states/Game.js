/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init () {}
  preload () {
    this.game.load.image('bulletPlayer', './assets/images/player-bullet.png')
    this.game.load.image('bulletEnemy', './assets/images/enemy-bullet.png')
  }

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

    // Input
    this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP)
    this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)

    // Focusing
    this.focusKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT)
    // Shoot
    this.fireKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z)
    // Bomb
    this.bombKey = this.game.input.keyboard.addKey(Phaser.Keyboard.X)

    // Speed
    this.speed = 4

    //  Creates 30 bullets, using the 'bullet' graphic
    this.weapon = this.game.add.weapon(30, 'bulletPlayer')

    //  The bullet will be automatically killed when it leaves the world bounds
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS

    //  The speed at which the bullet is fired
    this.weapon.bulletSpeed = 600

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.weapon.fireRate = 100

    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    this.weapon.trackSprite(this.mushroom, 0, 0, false)
  }

  update () {
    const player = this.mushroom
    const playerSpeed = this.focusKey.isDown ? this.speed / 2 : this.speed

    if (this.fireKey.isDown) {
      this.weapon.fire()
    }

    if (this.bombKey.isDown) {
      console.log('Boom!')
    }

    if (this.upKey.isDown) {
      player.y -= playerSpeed
    } else if (this.downKey.isDown) {
      player.y += playerSpeed
    }

    if (this.leftKey.isDown) {
      player.x -= playerSpeed
      player.angle = -15
    } else if (this.rightKey.isDown) {
      player.x += playerSpeed
      player.angle = +15
    } else {
      player.rotation = 0
    }
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
