
import GameScene from './gameScene.js';
import GameOver from './gameOver.js';
import {funFactList} from "./javascript/data/funfact.js";
let config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  scene: {
      preload: preload,
      create: create,
      update: update
  },
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 0 },
        debug: false
    }
  },
  fps: {
    target: 60,
    forceSetTimeOut: true
  },
  pixelArt: true,
  scene: [GameScene, GameOver]
};

let game = new Phaser.Game(config);

function preload (){
}

function create () {
  gameInfo.game = game;
}

function update (time, delta) {
}

export {config}