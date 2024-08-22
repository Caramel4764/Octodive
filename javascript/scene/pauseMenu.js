import { gameInfo } from "../data/gameInfo.js";
import { playerInfo } from "../data/playerInfo.js";

export default class PauseMenu extends Phaser.Scene {
  constructor() {
      super({ key: 'PauseMenu' });
  }
  preload() {
  }
  create() {
    this.scene.bringToTop();
    this.add.text(100, 100, 'Up Arrow to move up', { font:'bold 40px Open Sans', fontFamily: 'Open Sans, sans-serif', fontStyle: 'bold'}).setOrigin(0, 0).setDepth(10);
    playerInfo.zKeyPause = this.input.keyboard.on('keydown_Z', function () {
      //this.sound.add('pageFlip').play();
      if (gameInfo.isGamePaused==true) {
        gameInfo.isGamePaused = false;
        console.log('trigger')
        this.scene.pause("PauseMenu");
        this.scene.resume("GameScene");
      }
    }, this);
  }

  update() {
  }
}