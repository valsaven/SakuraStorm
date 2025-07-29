import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/Game';

import './styles.css';

new Phaser.Game(
  Object.assign(config, {
    scene: [GameScene]
  })
);
