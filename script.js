var config = {
  type: Phaser.AUTO,
  width: 900,
  height: 600,
  scene: {
      preload: preload,
      create: create,
      update: update
  },
  pixelArt: true,
};

var game = new Phaser.Game(config);

function preload ()
{
  this.load.image('oceanBg', 'assets/ocean.png');
  /*this.load.spritesheet('dude',
      'assets/dude.png',
  { frameWidth: 32, frameHeight: 48 }
);*/
}

function create ()
{
  this.add.image(400, 300, 'oceanBg').setScale(3);

}

function update ()
{
}