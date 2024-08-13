import {playerInfo} from "./javascript/data/playerInfo.js";
import { moveLoopBack } from "./javascript/moveLoopBack.js";
import { entity } from "./javascript/data/entity.js";
import { background } from "./javascript/data/background.js";
import {handleMovingForward} from "./javascript/handleMovingForward.js";
import { spawnGoldHoop } from "./javascript/spawnRing.js";
import { spawnSilverHoop } from "./javascript/spawnRing.js";
import { gameInfo } from "./javascript/data/gameInfo.js";
import {spawnPufferfish} from "./javascript/spawnPufferfish.js";
import { handlePlayerMovement } from "./javascript/handlePlayerMovement.js";
import { createHeart } from "./javascript/createHeart.js";
import { moveToCenterOfMenu } from "./javascript/moveToCenterOfMenu.js";
import { config } from "./script.js";

function updateDistance() {
  playerInfo.distanceTraveled += playerInfo.playerSpeed/5;
  playerInfo.distanceTraveledRounded = Math.floor(playerInfo.distanceTraveled);
  playerInfo.distanceTraveledText.setText(`${playerInfo.distanceTraveledRounded}m`);
  moveToCenterOfMenu(playerInfo.distanceTraveledText,62)
}

export default class GameScene extends Phaser.Scene {
  constructor() {
      super({ key: 'GameScene' });
  }

  preload() {
      this.load.image('oceanBg', 'assets/ocean.png');
      this.load.image('oceanBgGreen', 'assets/ocean-green-test.png');
      this.load.image('goldLoopBack', 'assets/gold-ring/gold-ring-back.png');
      this.load.image('goldLoopFront', 'assets/gold-ring/gold-ring-front.png');
      this.load.image('silverLoopBack', 'assets/silver-ring/silver-ring-back.png');
      this.load.image('silverLoopFront', 'assets/silver-ring/silver-ring-front.png');
      this.load.image('octoHitBox', 'assets/octopus/octoHitBox.png');
      this.load.image('heart', 'assets/oceanHeart.png');
      this.load.image('heartEmpty', 'assets/oceanHeartEmpty.png');
      this.load.image('sandGround', 'assets/sandyGround.png');
      this.load.image('sidebarMenuBg', 'assets/sidebarMenuBg.png');
      this.load.image('octoDangerHitBox', 'assets/octoDangerHitBox.png');
      this.load.spritesheet('octopus',
        'assets/octopus/octopus.png',
      { frameWidth: 125, frameHeight: 100 }
    );
    this.load.spritesheet('pufferfish',
      'assets/pufferfish.png',
      { frameWidth: 70, frameHeight: 70 }
    );
  }

  create() {
    gameInfo.laneHeight = config.height/4;
    gameInfo.laneWidth = config.width;
    gameInfo.gameRef = this;
    //ocean
    playerInfo.scoreText = this.add.text(920, 14, `${playerInfo.score}`, { font:'40px Georgia', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setDepth(11);
    playerInfo.distanceTraveledText = this.add.text(920, 60, `${playerInfo.distanceTraveledRounded}`, { font:'40px Georgia', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setDepth(11);
    background.oceanBg = this.add.image(0, 0, 'oceanBg').setScale(3).setOrigin(0, 0);
    background.oceanBgBound = background.oceanBg.getBounds();
    background.oceanBg2 = this.add.image(900, 0, 'oceanBg').setScale(3).setOrigin(0, 0);
    background.oceanBgBound2 = background.oceanBg2.getBounds();
    playerInfo.player = this.physics.add.sprite(0, 0, 'octopus').setOrigin(0, 0).setDepth(2);
    playerInfo.playerBound = playerInfo.player.getBounds();
    gameInfo.sidebarMenuBg = this.add.image(0,0, 'sidebarMenuBg').setScale(6).setOrigin(0, 0).setDepth(10);
    gameInfo.sidebarMenuBg.setPosition(config.width-gameInfo.sidebarMenuBg.getBounds().width, 0);
    createHeart(130);
    createHeart(200);
    createHeart(270);

    //currently invisible hitbox
    playerInfo.octoHitBox = this.add.image(90, 34, 'octoHitBox').setScale(1.3).setOrigin(0, 0).setVisible(false);
    playerInfo.octoHitBoxBound = playerInfo.octoHitBox.getBounds();


    playerInfo.octoDangerHitBox = this.physics.add.sprite(17, 34, 'octoDangerHitBox').setScale(4).setOrigin(0, 0).setVisible(false);
    playerInfo.octoDangerHitBoxBound = playerInfo.octoDangerHitBox.getBounds();
    spawnPufferfish(2);
    this.anims.create({
      key: 'swim',
      frames: this.anims.generateFrameNumbers('octopus', { start: 0, end: 20 }),
      frameRate: 13,
      repeat: -1
    });
    playerInfo.player.anims.play('swim', true);

    playerInfo.playerContainer = this.add.container(0, 0).setScale(1.5).setDepth(2);
    playerInfo.playerContainer.add(playerInfo.player);
    playerInfo.playerContainer.add(playerInfo.octoHitBox);
    playerInfo.playerContainer.add(playerInfo.octoDangerHitBox);
    this.physics.world.enable(playerInfo.playerContainer);

    this.time.addEvent({
      delay: playerInfo.goldLoopSpawnInterval,
      callback: spawnGoldHoop,
      callbackScope: this,
      loop: true
    })
    this.time.addEvent({
      delay: 200,
      callback: updateDistance,
      callbackScope: this,
      loop: true
    });
    this.time.addEvent({
      delay: 1000,
      callback: spawnPufferfish,
      loop: true
    });

    gameInfo.cursors = this.input.keyboard.createCursorKeys();
    moveToCenterOfMenu(playerInfo.scoreText,15)
    moveToCenterOfMenu(playerInfo.distanceTraveledText,62)
  }

  update() {
      // Game loop logic
      handleMovingForward();
      handlePlayerMovement();
      if (playerInfo.distanceTraveledRounded-playerInfo.prevDistanceTraveledRounded >= playerInfo.silverLoopSpawnDistanceRate) {
        playerInfo.prevDistanceTraveledRounded = playerInfo.distanceTraveledRounded;
        spawnSilverHoop(config.width, Math.floor(Math.random() * 4));
      }
  }
}