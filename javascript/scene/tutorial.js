import { config } from "../../script.js";
import { playerInfo } from "../data/playerInfo.js";
export default class GameOver extends Phaser.Scene {
  constructor() {
      super({ key: 'TutorialScene' });
  }
  preload() {
    this.load.image('downArrow', 'assets/titleScreen/downArrow.png');
    this.load.image('upArrow', 'assets/titleScreen/upArrow.png');
    this.load.image('rightArrow', 'assets/titleScreen/rightArrow.png');
    this.load.image('menuBg', 'assets/gameOverMenu.png');

    this.load.image('swordfish', 'assets/enemy/swordFish.png');
    this.load.image('plasticRing', 'assets/enemy/plasticRing.png');
    this.load.image('jellyfish', 'assets/enemy/jellyfishSingle.png');
  }
  create() {
    let currentPage = 2;
    let keyXPos = 250;
    let keyYPos = 80;
    this.add.image(0, 0, 'menuBg').setOrigin(0, 0).setScale(7.7);
    let pages = []
    let upArrowImg;
    let controllerPage = this.add.container(0, 0, [
      upArrowImg = this.add.image(keyXPos, keyYPos, 'upArrow').setOrigin(0, 0).setScale(7.7),
      this.add.image(keyXPos, keyYPos+140, 'downArrow').setOrigin(0, 0).setScale(7.7),
      this.add.image(keyXPos, keyYPos+140*2, 'rightArrow').setOrigin(0, 0).setScale(7.7),
      this.add.text(keyXPos + upArrowImg.getBounds().width+50, keyYPos+20, 'Up Arrow to move up', { font:'bold 40px Open Sans', fontFamily: 'Open Sans, sans-serif', fontStyle: 'bold'}).setOrigin(0, 0).setDepth(3),
      this.add.text(keyXPos + upArrowImg.getBounds().width+50, keyYPos+140+20, 'Down Arrow to move down', { font:'bold 40px Open Sans', fontFamily: 'Open Sans, sans-serif', fontStyle: 'bold'}).setOrigin(0, 0).setDepth(3),
      this.add.text(keyXPos + upArrowImg.getBounds().width+50, keyYPos+140*2+20, 'Right Arrow to dash', { font:'bold 40px Open Sans', fontFamily: 'Open Sans, sans-serif', fontStyle: 'bold'}).setOrigin(0, 0).setDepth(3),
    ])
    pages.push(controllerPage);
    let enemyPage = this.add.container(0, 0, [
      this.add.text(keyXPos + upArrowImg.getBounds().width+50, keyYPos+20, 'Dodge enemies', { font:'bold 40px Open Sans', fontFamily: 'Open Sans, sans-serif', fontStyle: 'bold'}).setOrigin(0, 0).setDepth(3),
      this.add.image(keyXPos, keyYPos+140*2, 'swordfish').setOrigin(0.5, 0.5).setScale(4),
      this.add.image(keyXPos*2+50, keyYPos+140*2, 'plasticRing').setOrigin(0.5, 0.5).setScale(4),
      this.add.image(keyXPos*3+50, keyYPos+140*2, 'jellyfish').setOrigin(0.5, 0.5).setScale(4),
    ])
    pages.push(enemyPage);

    let objectivePage = this.add.container(0, 0, [
      this.add.text(config.width/2, keyYPos+20, 'Go through loops for points', { font:'bold 40px Open Sans', fontFamily: 'Open Sans, sans-serif', fontStyle: 'bold'}).setOrigin(0.5, 0).setDepth(3),
      this.add.text(config.width/2, keyYPos+70, 'Smaller text', { font:'bold 30px Open Sans', fontFamily: 'Open Sans, sans-serif', fontStyle: 'bold'}).setOrigin(0.5, 0).setDepth(3),

      this.add.image(keyXPos, keyYPos+140*2, 'swordfish').setOrigin(0.5, 0.5).setScale(4),
      this.add.image(keyXPos*2+50, keyYPos+140*2, 'plasticRing').setOrigin(0.5, 0.5).setScale(4),
      this.add.image(keyXPos*3+50, keyYPos+140*2, 'jellyfish').setOrigin(0.5, 0.5).setScale(4),
    ])
    pages.push(objectivePage);

    this.add.text(config.width/2, 530, 'Press "Z" to continue or Press "X" to return to the menu', { font:'bold 28px Open Sans', fontFamily: 'Open Sans, sans-serif', fontStyle: 'bold', fill: 'yellow'}).setOrigin(0.5, 0.5).setDepth(3);

    for (let i = 0; i < pages.length; i++) {
      pages[i].setVisible(false);
      if (i == currentPage) {
        pages[i].setVisible(true);
      }
    }

    playerInfo.zKeyTutorial = this.input.keyboard.on('keydown_Z', function () {
      currentPage++;
      for (let i = 0; i < pages.length; i++) {
        pages[i].setVisible(false);
        if (i == currentPage) {
          pages[i].setVisible(true);
        }
      }
    }, this);
    playerInfo.xKeyTutorial = this.input.keyboard.on('keydown_X', function () {
      this.scene.stop('TutorialScene').launch('StartMenu');
    }, this);
  }
  update() {
  }
}