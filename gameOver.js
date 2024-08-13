import { config } from "./script.js";
import { playerInfo } from "./javascript/data/playerInfo.js";
import { generateFunFact } from "./javascript/generateFunFact.js";
import { gameInfo } from "./javascript/data/gameInfo.js";

let gameOverMenu;
let gameOverText;
let restartText;
let scoreText;
let distanceText;
let funFactDiv;
let didYouKnowText;
let funFactText;
export default class GameOver extends Phaser.Scene {
  constructor() {
      super({ key: 'GameOver' });
  }
  preload() {
    this.load.image('gameOver', 'assets/gameOverMenu.png');
    this.load.image('funFactDiv', 'assets/funFactDiv.png');
  }
  create() {
    let gameOverInfoWidth = config.width/3.5;
    gameOverMenu = this.add.image(0, 0, 'gameOver').setOrigin(0, 0).setScale(7.7);
    gameOverText = this.add.text(0, 0, 'Game Over', { font:'80px Georgia', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setOrigin(0.5, 0.5).setDepth(3);
    gameOverText.setPosition(gameOverInfoWidth, config.height/2-150);
    scoreText = this.add.text(0, 0, `Score: ${playerInfo.score}`, { font:'40px Georgia', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setOrigin(0.5, 0.5).setDepth(3);
    scoreText.setPosition(gameOverInfoWidth, config.height/2-30);
    distanceText = this.add.text(0, 0, `Distance: ${playerInfo.distanceTraveled}`, { font:'40px Georgia', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setOrigin(0.5, 0.5).setDepth(3);
    distanceText.setPosition(gameOverInfoWidth, config.height/2+30);
    restartText = this.add.text(0, 0, 'Press "R" to restart', { font:'50px Georgia', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fill: 'yellow'}).setOrigin(0.5, 0.5).setDepth(3);
    restartText.setPosition(gameOverInfoWidth, config.height/2+150);
    funFactDiv = this.add.image(config.width/2+60, config.height/2, 'funFactDiv').setOrigin(0,0.5).setScale(9);
    funFactDiv = this.add.image(config.width/2+60, config.height/2, 'funFactDiv').setOrigin(0,0.5).setScale(9);
    didYouKnowText = this.add.text(funFactDiv.getBounds().x+funFactDiv.getBounds().width/2, funFactDiv.getBounds().y+40, 'Did You Know?:', { font:'40px Georgia', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fill:'00008B' }).setOrigin(0.5,0);
    funFactText = this.add.text(funFactDiv.getBounds().x+funFactDiv.getBounds().width/2, funFactDiv.getBounds().y+200, `Fun fact goes here`, { font:'40px Georgia', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', align: 'center', wordWrap: { width: 300, useAdvancedWrap: true }}).setOrigin(0.5, 0.5).setDepth(3);
    gameInfo.funFactText = funFactText;
    generateFunFact();
  }
  update() {
  }
}