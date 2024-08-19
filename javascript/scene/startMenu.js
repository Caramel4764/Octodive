import { gameInfo } from "../data/gameInfo.js";
import { config } from "../../script.js";
import { playerInfo } from "../data/playerInfo.js";

export default class GameOver extends Phaser.Scene {
  constructor() {
      super({ key: 'StartMenu' });
  }
  preload() {
    this.load.image('title1', 'assets/titleScreen/octodiveTitle1.png');
    this.load.image('title2', 'assets/titleScreen/octodiveTitle2.png');
    this.load.image('gameOver', 'assets/gameOverMenu.png');
  }
  create() {
    this.add.image(0, 0, 'gameOver').setOrigin(0, 0).setScale(7.7);
    let title = this.add.container(0, 0, [
      this.add.image(80, 120, 'title2').setOrigin(0, 0).setScale(8),
      this.add.image(0, 0, 'title1').setOrigin(0, 0).setScale(7),
    ])
    title.setPosition(config.width/2-title.getBounds().width/2, 60)

    this.add.text(config.width/2, 420, 'Press "Z" to start', { font:'bold 40px Open Sans', fontFamily: 'Open Sans, sans-serif', fontStyle: 'bold'}).setOrigin(0.5, 0.5).setDepth(3);
    this.add.text(config.width/2, 500, 'Press "X" for instructions', { font:'bold 40px Open Sans', fontFamily: 'Open Sans, sans-serif', fontStyle: 'bold'}).setOrigin(0.5, 0.5).setDepth(3);
    playerInfo.zKey = this.input.keyboard.on('keydown_Z', function () {
      this.scene.stop('StartMenu').launch('GameScene');
    }, this);
    playerInfo.xKey = this.input.keyboard.on('keydown_X', function () {
      this.scene.stop('StartMenu').launch('TutorialScene');
    }, this);

  }

  update() {
  }
}