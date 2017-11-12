/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'

export default class extends Phaser.State {
  init () {}
  preload () {
    this.game.load.image('bulletPlayer', './assets/images/player-bullet.png')
    this.game.load.image('bulletEnemy', './assets/images/enemy-bullet.png')
    this.game.load.image('enemy', './assets/images/enemy.png')
  }
  create () {
    const bannerText = 'SakuraStorm'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)

    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: 600,
      asset: 'player'
    })

    this.game.add.existing(this.player)

    this.player.input = new PlayerInput(Phaser, this.game)

    // Speed
    this.player.speed = 4

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
    this.weapon.trackSprite(this.player, 0, 0, false)

    var Enemy = function (game, x, y) {
      Phaser.Sprite.call(this, game, x, y, 'enemy')
    }
    Enemy.prototype = Object.create(Phaser.Sprite.prototype)
    Enemy.prototype.constructor = Enemy

    // Level 1
    setTimeout(function () {
      console.log(123)
      this.enemy = new Enemy(this.game, 200, 300)
      this.game.add.existing(this.enemy)
    }, 1000)
  }
  update () {
    listenPlayerInput.call(this, this.player.input)
  }
  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
    }
  }
}

/**
 PlayerInput - Creates object with player's input keys.

 @class PlayerInput
 @type {Object}

 @param {Object} Phaser
 @param {Object} game - this.game

 @property {Object} cursors - Arrows.
 @property {Object} focusKey - Focusing.
 @property {Object} fireKey - Fire.
 @property {Object} bombKey - Bomb.
 */
function PlayerInput (Phaser, game) {
  return {
    cursors: game.input.keyboard.createCursorKeys(),
    focusKey: game.input.keyboard.addKey(Phaser.Keyboard.SHIFT),
    fireKey: game.input.keyboard.addKey(Phaser.Keyboard.Z),
    bombKey: game.input.keyboard.addKey(Phaser.Keyboard.X)
  }
}

/**
 listenPlayerInput - listen player's input.
 Should be called with 'this'.

 @param {this.player.input} input - this.player.input
 */
function listenPlayerInput (input) {
  const playerSpeed = input.focusKey.isDown ? this.player.speed / 2 : this.player.speed

  if (input.fireKey.isDown) {
    this.weapon.fire()
  }

  if (input.bombKey.isDown) {
    console.log('Boom!')
  }

  if (input.cursors.up.isDown) {
    this.player.y -= playerSpeed
  } else if (input.cursors.down.isDown) {
    this.player.y += playerSpeed
  }

  if (input.cursors.left.isDown) {
    this.player.x -= playerSpeed
    this.player.angle = -15
  } else if (input.cursors.right.isDown) {
    this.player.x += playerSpeed
    this.player.angle = +15
  } else {
    this.player.rotation = 0
  }
}
