var config = {
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
let funFactList = [
  'Octopuses have three hearts',
  'The blue ring octopus is extremely venomous',
  'Octopuses have no bones',
  'Octopuses are highly intelligent and able to use tools',
  'Most octopuses are able to shoot ink at some point in their life to distract predators',
]
let calculation = {
  laneHeight: config.height/4,
  maxLane: 3,
}
let playerInfo = {
  playerSpeed: 2,
  playerVerticalSpeed: 400,
  ogPlayerSpeed: 2,
  isBoosting: false,
  loopSpawnInterval: 2000,
  score: 0,
  currLane: 0,
  finishedLaneSwitching: true,
}
var game = new Phaser.Game(config);
let player;
let cursor;
let oceanBg;
let oceanBgBound;
let oceanBg2;
let oceanBgBound2;
let goldRing;
let gameRef;
let loops = [];

function preload ()
{
  this.load.image('oceanBg', 'assets/ocean.png');
  this.load.image('oceanBgGreen', 'assets/ocean-green-test.png');
  this.load.image('goldLoopBack', 'assets/gold-ring/gold-ring-back.png');
  this.load.image('goldLoopFront', 'assets/gold-ring/gold-ring-front.png');
  this.load.spritesheet('octopus',
      'assets/octopus.png',
  { frameWidth: 125, frameHeight: 100 }
);
}

function spawnLoop(x, y) {
  let goldRingBack = gameRef.add.sprite(x, y, 'goldLoopBack').setOrigin(0, 0).setScale(4.7);
  goldRingBack.setDepth(0)
  let goldRingFront = gameRef.add.sprite(x, y, 'goldLoopFront').setOrigin(0, 0).setScale(4.7);
  goldRingFront.setDepth(3)
  let goldRingBound = goldRingBack.getBounds();
  let goldRingInfo = {
    back: goldRingBack,
    front: goldRingFront,
    bound: goldRingBound,
  }
  loops.push(goldRingInfo);
}

let playerBound;
function create () {
  gameRef = this;
  //ocean
  oceanBg = this.add.image(0, 0, 'oceanBg').setScale(3).setOrigin(0, 0);
  oceanBgBound = oceanBg.getBounds();
  oceanBg2 = this.add.image(900, 0, 'oceanBg').setScale(3).setOrigin(0, 0);
  oceanBgBound2 = oceanBg2.getBounds();

  player = this.physics.add.sprite(100, 0, 'octopus').setScale(1.5);
  player.setCollideWorldBounds(true);
  player.setDepth(2);
  playerBound = player.getBounds();
  
  setInterval(() => {
    let randomLane = Math.floor(Math.random() * 4);
    spawnLoop(config.width, randomLane*calculation.laneHeight);
  }, playerInfo.loopSpawnInterval);
  //cursor
  cursors = this.input.keyboard.createCursorKeys();

}


function speedBoost(speedboost, time) {
  playerInfo.playerSpeed += speedboost;
  playerInfo.isBoosting = true;
  setTimeout(() => {
    playerInfo.playerSpeed -= speedboost;
    playerInfo.isBoosting = false;
  }, time); 
}
let change = 0;
function handleMovement() {
 // let change = 0;
  if (cursors.down.isDown && playerInfo.finishedLaneSwitching && playerInfo.currLane<calculation.maxLane) {
    player.setVelocityY(playerInfo.playerVerticalSpeed);
    playerInfo.finishedLaneSwitching = false;
    change = 1;
    playerInfo.currLane = playerInfo.currLane+change;
  }
  if (cursors.up.isDown && playerInfo.finishedLaneSwitching && playerInfo.currLane>0) {
    player.setVelocityY(-playerInfo.playerVerticalSpeed);
    playerInfo.finishedLaneSwitching = false;
    change = -1;
    playerInfo.currLane = playerInfo.currLane+change;
  }

  if (change > 0) {
    playerBound = player.getBounds();
    if (playerBound.y >= playerInfo.currLane*calculation.laneHeight) {
      console.log(playerInfo.currLane)
      player.setVelocityY(0);
      change = 0;
      playerInfo.finishedLaneSwitching = true;
    }
  } else if (change < 0) {
    playerBound = player.getBounds();
    if (playerBound.y <= playerInfo.currLane*calculation.laneHeight) {
      console.log(playerInfo.currLane)
      player.setVelocityY(0);
      change = 0;
      playerInfo.finishedLaneSwitching = true;
    }
  }

  if (cursors.right.isDown) {
    if (!playerInfo.isBoosting) {
      speedBoost(5, 700);
    }
  }
}

function handleMovingForward() {
  if (oceanBg.x-playerInfo.playerSpeed <= -oceanBgBound.width) {
    oceanBgBound.x = oceanBgBound2.x-playerInfo.playerSpeed+oceanBgBound2.width;
  } else {
    oceanBgBound.x-=playerInfo.playerSpeed;
  }
  oceanBg.setPosition([oceanBgBound.x], [0])

  if (oceanBg2.x-playerInfo.playerSpeed <= -oceanBgBound2.width) {
    oceanBgBound2.x = oceanBgBound2.width-playerInfo.playerSpeed;
  } else {
    oceanBgBound2.x-=playerInfo.playerSpeed;
  }
  oceanBg2.setPosition([oceanBgBound2.x], [0]);

  //loops
  for (let i = 0; i < loops.length; i++) {
    if (loops[i].bound.x-playerInfo.playerSpeed <= -loops[i].bound.width-playerInfo.playerSpeed) {
      loops[i].front.destroy();
      loops[i].back.destroy();
      return loops.shift();
    } else {
      loops[i].bound.x-=playerInfo.playerSpeed;
    }
    loops[i].back.setPosition([loops[i].bound.x], [loops[i].bound.y]);
    loops[i].front.setPosition([loops[i].bound.x], [loops[i].bound.y]);

  }
}

function update (){
  handleMovement();
  handleMovingForward();
}
