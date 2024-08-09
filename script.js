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

var game = new Phaser.Game(config);
let player;
let cursor;
let currLane = 1;

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
  this.add.image(400, 300, 'oceanBg').setScale(3);
  player = this.physics.add.sprite(100, 0, 'octopus');
  player.setCollideWorldBounds(true);
  //cursor
  cursors = this.input.keyboard.createCursorKeys();
}

function update ()
{
  if (cursors.down.isDown) {
      player.setVelocityY(160);
  }
  if (cursors.up.isDown) {
    player.setVelocityY(-160);
}
}