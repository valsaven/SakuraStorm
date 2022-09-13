import Phaser, { Scene } from 'phaser';

// let player: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
let keyFire: Phaser.Input.Keyboard.Key;
let keyBomb: Phaser.Input.Keyboard.Key;

let lastFired: number = 0;

class BulletGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene: Scene) {
    // Call the super constructor, passing in a world and a scene
    super(scene.physics.world, scene);

    // Initialize the group
    this.createMultiple({
      classType: Bullet, // This is the class we create just below
      frameQuantity: 30, // Create 30 instances in the pool
      active: false,
      visible: false,
      key: 'bullet'
    })
  }

  // ...
  fireBullet(x: number, y: number) {
    // Get the first available sprite in the group
    const laser = this.getFirstDead(false);
    if (laser) {
      laser.fire(x, y);
    }
  }

}

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'bullet');
  }

  fire(x: number, y: number) {
    this.body.reset(x, y);

    this.setActive(true);
    this.setVisible(true);

    this.setVelocityY(-1000);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    if (this.y <= 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}

export default class SakuraStorm extends Phaser.Scene {
  constructor() {
    super('GameScene');

    this.player;
    this.bulletGroup;
  }

  player: any;
  bulletGroup: any;

  preload() {
    this.load.image('player', 'assets/player.png')
    this.load.image('bullet', 'assets/player-bullet.png')

    this.load.image('enemy', 'assets/enemy.png')
    this.load.image('bulletEnemy', 'assets/enemy-bullet.png')
  }

  setTitle() {
    const bottom = this.cameras.main.height - 140;

    this.add.text(80, bottom, 'SakuraStorm', {
      fontFamily: 'Bangers',
      padding: {
        x: 16,
        y: 16
      },
      fontSize: '40px',
      color: '#77BFA3',
    });
  }

  addPlayer() {
    const centerX = this.cameras.main.width / 2;
    const bottom = this.cameras.main.height - 40;

    this.player = this.physics.add.image(centerX, bottom, 'player');
    this.player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();
    keyFire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    keyBomb = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
  }

  shootBullet() {
    this.bulletGroup.fireBullet(this.player.x, this.player.y - 20);
  }

  checkPlayerInput(time: number) {
    if (cursors.left.isDown) {
      this.player.setVelocityX(-300);
    }

    if (cursors.right.isDown) {
      this.player.setVelocityX(300);
    }

    if (cursors.up.isDown) {
      this.player.setVelocityY(-300);
    }

    if (cursors.down.isDown) {
      this.player.setVelocityY(300);
    }

    if (keyFire.isDown && time > lastFired) {
      console.log('fire');
      this.shootBullet();
    }

    if (keyBomb.isDown) {
      console.log('Boom!');
    }
  }

  create() {
    // Set title
    this.setTitle();

    // Set player
    this.addPlayer();

    // Set bullets
    this.bulletGroup = new BulletGroup(this);
  }

  update(time: number) {
    this.player.setVelocity(0);

    this.checkPlayerInput(time);
  }
}

