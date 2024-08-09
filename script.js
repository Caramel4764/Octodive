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

let settings = {
  playerSpeed: 2,
  playerVerticalSpeed: 320,
  ogPlayerSpeed: 2,
}
var game = new Phaser.Game(config);
let player;
let cursor;
let currLane = 1;
let oceanBg;
let oceanBgBound;
let oceanBg2;
let oceanBgBound2;
function preload ()
{
  this.load.image('oceanBg', 'assets/ocean.png');
  this.load.spritesheet('octopus',
      'assets/octopus.png',
  { frameWidth: 125, frameHeight: 100 }
);
//this.load.image('octopus', 'assets/octopus.png');

}

function create ()
{
  //ocean
  oceanBg = this.add.image(0, 0, 'oceanBg').setScale(3).setOrigin(0, 0);
  oceanBgBound = oceanBg.getBounds();
  oceanBg2 = this.add.image(900, 0, 'oceanBg').setScale(3).setOrigin(0, 0);
  oceanBgBound2 = oceanBg2.getBounds();

  player = this.physics.add.sprite(100, 0, 'octopus').setScale(1.4);
  player.setCollideWorldBounds(true);
  //cursor
  cursors = this.input.keyboard.createCursorKeys();
}

function speedBoost(speedboost, time) {
  settings.playerSpeed += speedboost;
  setTimeout(() => {
    settings.playerSpeed -= speedboost;
  }, time); 
}

function handleMovement() {
  if (cursors.down.isDown) {
    player.setVelocityY(settings.playerVerticalSpeed);
  }
  if (cursors.up.isDown) {
    player.setVelocityY(-settings.playerVerticalSpeed);
  }
  if (cursors.right.isDown) {
    speedBoost(0.5, 500);
  }
}

let test = 2;
function handleMovingForward() {
  if (oceanBg.x <= -oceanBgBound.width) {
    oceanBgBound.x = oceanBgBound.width-settings.playerSpeed;
    
  } else {
    oceanBgBound.x-=settings.playerSpeed;
  }
  oceanBg.setPosition([oceanBgBound.x], [0])

  if (oceanBg2.x <= -oceanBgBound2.width) {
    oceanBgBound2.x = oceanBgBound2.width-settings.playerSpeed;
  } else {
    oceanBgBound2.x-=settings.playerSpeed;
  }
  oceanBg2.setPosition([oceanBgBound2.x], [0])
}

function update ()
{
  handleMovement();
  handleMovingForward();
}