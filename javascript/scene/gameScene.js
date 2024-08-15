import {playerInfo} from "../data/playerInfo.js";
import { entity } from "../data/entity.js";
import { background } from "../data/background.js";
import {handleMovingForward} from "../function/movement/handleMovingForward.js";
import { gameInfo } from "../data/gameInfo.js";
import { handlePlayerMovement } from "../function/movement/handlePlayerMovement.js";
import { createHeart } from "../function/UIUpdate/createHeart.js";
import { moveToCenterOfMenu } from "../function/UIUpdate/moveToCenterOfMenu.js";
import { config } from "../../script.js";
import { handleSpeedBoost } from "../function/movement/handleSpeedBoost.js";

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
      this.load.image('inkBottleFull', 'assets/ink-bottle/inkBottle1.png');
      this.load.image('inkBottleHalf', 'assets/ink-bottle/inkBottle3.png');
      this.load.image('inkBottleEmpty', 'assets/ink-bottle/inkBottle5.png');
      this.load.image('swordfish', 'assets/enemy/swordFish.png');
      this.load.image('plasticRing', 'assets/enemy/plasticRing.png');
      this.load.image('plasticBag', 'assets/enemy/plasticBag.png');
      this.load.image('bottle', 'assets/enemy/bottle.png');
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
    playerInfo.inkBar = this.add.image(0, 0, 'inkBottleFull').setScale(1.5).setOrigin(0, 0).setDepth(10);
    moveToCenterOfMenu(playerInfo.inkBar, 360);
    //currently invisible hitbox
    playerInfo.octoHitBox = this.add.image(90, 34, 'octoHitBox').setScale(1.3).setOrigin(0, 0).setVisible(false);
    playerInfo.octoHitBoxBound = playerInfo.octoHitBox.getBounds();

    playerInfo.octoDangerHitBox = this.physics.add.sprite(150, 34, 'octoDangerHitBox').setScale(0.5).setOrigin(0.5, 0.5).setVisible(false);
    playerInfo.octoDangerHitBoxBound = playerInfo.octoDangerHitBox.getBounds();
    this.anims.create({
      key: 'swim',
      frames: this.anims.generateFrameNumbers('octopus', { start: 0, end: 20 }),
      frameRate: 13,
      repeat: -1
    });
    playerInfo.player.anims.play('swim', true);

    playerInfo.playerContainer = this.add.container(0, playerInfo.currLane*gameInfo.laneHeight).setScale(1.5).setDepth(2);
    playerInfo.playerContainer.add(playerInfo.player);
    playerInfo.playerContainer.add(playerInfo.octoHitBox);
    playerInfo.playerContainer.add(playerInfo.octoDangerHitBox);
    this.physics.world.enable(playerInfo.playerContainer);

    this.time.addEvent({
      delay: entity.goldLoops.goldLoopSpawnInterval,
      callback: entity.goldLoops.spawnFunction,
      callbackScope: this,
      loop: true
    })
    this.time.addEvent({
      delay: 200,
      callback: updateDistance,
      callbackScope: this,
      loop: true
    });

    gameInfo.cursors = this.input.keyboard.createCursorKeys();
    moveToCenterOfMenu(playerInfo.scoreText,15)
    moveToCenterOfMenu(playerInfo.distanceTraveledText,62)
    playerInfo.playerSpeed = playerInfo.ogPlayerSpeed;
    playerInfo.rightKey = this.input.keyboard.on('keydown_RIGHT', function (event) {
      if (playerInfo.isBoosting == false && playerInfo.inkBarAmount > 0) {
        handleSpeedBoost(5, playerInfo.boostDuration);
        playerInfo.isInvincible = true;
      }
    }, this);
    this.input.keyboard.on('keyup_UP', function (event) {
      playerInfo.isUpDown = false;
    }, this);
    this.input.keyboard.on('keyup_DOWN', function (event) {
      playerInfo.isDownDown = false;
    }, this);
    this.input.keyboard.on('keydown_UP', function (event) {
      playerInfo.isUpDown = true;
    }, this);

    this.input.keyboard.on('keydown_DOWN', function (event) {
      playerInfo.isDownDown = true
    }, this);
  }

  update() {
      // Game loop logic
      handleMovingForward();
      handlePlayerMovement();
      if (playerInfo.distanceTraveledRounded-playerInfo.prevDistanceTraveledRounded >= playerInfo.silverLoopSpawnDistanceRate) {
        playerInfo.prevDistanceTraveledRounded = playerInfo.distanceTraveledRounded;
        entity.silverLoops.spawnFunction();
      }
      if (playerInfo.distanceTraveledRounded-entity.pufferfish.prevDistanceTraveledRounded >= entity.pufferfish.spawnDistanceRate) {
        entity.pufferfish.prevDistanceTraveledRounded = playerInfo.distanceTraveledRounded;
        entity.pufferfish.spawnFunction();
      }
      if (playerInfo.distanceTraveledRounded-entity.swordfish.prevDistanceTraveledRounded >= entity.swordfish.spawnDistanceRate) {
        entity.swordfish.prevDistanceTraveledRounded = playerInfo.distanceTraveledRounded;
        entity.swordfish.spawnFunction();
      }
  }
}