import { gameInfo } from "../data/gameInfo.js";
import { config } from "../../script.js";
export default class GameOver extends Phaser.Scene {
  constructor() {
      super({ key: 'StartMenu' });
  }
  preload() {
    this.load.image('downArrow', 'assets/titleScreen/downArrow.png');
    this.load.image('upArrow', 'assets/titleScreen/upArrow.png');
    this.load.image('rightArrow', 'assets/titleScreen/rightArrow.png');
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
    console.log('gameInfo', config.width)
    title.setPosition(config.width/4-title.getBounds().width/2+70, 120)




  }
  update() {
  }
}