import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#edeec9',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true // TODO: Remove
    }
  },
  scale: {
    width: 400,
    height: 640,
    // mode: Phaser.Scale.FIT, // TODO: Remove
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};
