import {playerInfo} from "./javascript/data/playerInfo.js";
import { moveLoopBack } from "./javascript/moveLoopBack.js";
import { entity } from "./javascript/data/entity.js";
import { background } from "./javascript/data/background.js";
import {handleMovingForward} from "./javascript/handleMovingForward.js";
import { spawnGoldHoop } from "./javascript/spawnRing.js";
import { spawnSilverHoop } from "./javascript/spawnRing.js";
import { gameInfo } from "./javascript/data/gameInfo.js";
import { handlePlayerMovement } from "./javascript/handlePlayerMovement.js";
let config = {
  type: Phaser.AUTO,
  width: 900,
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
  pixelArt: true,
};
let game = new Phaser.Game(config);

function preload ()
{
  this.load.image('oceanBg', 'assets/ocean.png');
  this.load.image('oceanBgGreen', 'assets/ocean-green-test.png');
  this.load.image('goldLoopBack', 'assets/gold-ring/gold-ring-back.png');
  this.load.image('goldLoopFront', 'assets/gold-ring/gold-ring-front.png');
  this.load.image('silverLoopBack', 'assets/silver-ring/silver-ring-back.png');
  this.load.image('silverLoopFront', 'assets/silver-ring/silver-ring-front.png');
  this.load.image('octoHitBox', 'assets/octopus/octoHitBox.png');
  this.load.spritesheet('octopus',
      'assets/octopus/octopus.png',
  { frameWidth: 125, frameHeight: 100 }
);
}

function create () {
  gameInfo.gameRef = this;
  //ocean
  playerInfo.scoreText = this.add.text(845, 0, `${playerInfo.score}`, { font:'30px Georgia', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setDepth(10);
  background.oceanBg = this.add.image(0, 0, 'oceanBg').setScale(3).setOrigin(0, 0);
  background.oceanBgBound = background.oceanBg.getBounds();
  background.oceanBg2 = this.add.image(900, 0, 'oceanBg').setScale(3).setOrigin(0, 0);
  background.oceanBgBound2 = background.oceanBg2.getBounds();
  playerInfo.player = this.physics.add.sprite(0, 0, 'octopus').setOrigin(0, 0).setDepth(2);
  playerInfo.playerBound = playerInfo.player.getBounds();
  //currently invisible hitbox
  playerInfo.octoHitBox = this.add.image(90, 34, 'octoHitBox').setScale(1.3).setOrigin(0, 0).setVisible(false);
  playerInfo.octoHitBoxBound = playerInfo.octoHitBox.getBounds();
  playerInfo.playerContainer = this.add.container(0, 0).setScale(1.5).setDepth(2);

  this.anims.create({
    key: 'swim',
    frames: this.anims.generateFrameNumbers('octopus', { start: 0, end: 20 }),
    frameRate: 13,
    repeat: -1
  });
  playerInfo.player.anims.play('swim', true);

  playerInfo.playerContainer.add(playerInfo.player);
  playerInfo.playerContainer.add(playerInfo.octoHitBox);
  this.physics.world.enable(playerInfo.playerContainer);
  setInterval(() => {
    let randomLane = Math.floor(Math.random() * 4);
    spawnGoldHoop(config.width, randomLane);
  }, playerInfo.goldLoopSpawnInterval);

  setInterval(() => {
    let randomLane = Math.floor(Math.random() * 4);
    spawnSilverHoop(config.width, randomLane);
  }, playerInfo.silverLoopSpawnInterval);
  //
  //cursor
  gameInfo.cursors = this.input.keyboard.createCursorKeys();

}

function speedBoost(speedboost, time) {
  playerInfo.playerSpeed += speedboost;
  playerInfo.isBoosting = true;
  setTimeout(() => {
    playerInfo.playerSpeed -= speedboost;
    playerInfo.isBoosting = false;
  }, time); 
}

function update (){
  handlePlayerMovement();
  handleMovingForward();
}
