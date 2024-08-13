import { playerInfo } from "./data/playerInfo.js";
import { gameInfo } from "./data/gameInfo.js";
import { entity } from "./data/entity.js";
import { changeLife } from "./changeLife.js";

function spawnPufferfish() {
  let lane = Math.floor(Math.random() * 4);
  let pufferfish = gameInfo.gameRef.physics.add.sprite(gameInfo.laneWidth, lane*gameInfo.laneHeight, 'pufferfish').setOrigin(0, 0).setDepth(0).setScale(3.9);
  let pufferfishInfo = {
    pufferfish: pufferfish,
    lane: lane,
    hasBeenHit: false,
  }

  //gameInfo.gameRef.physics.add.collider(pufferfish, playerInfo.octoDangerHitBox);
  gameInfo.gameRef.physics.add.overlap(pufferfish, playerInfo.octoDangerHitBox, function () {
    if (pufferfishInfo.hasBeenHit == false) {
      console.log('log')
      pufferfishInfo.hasBeenHit = true;
      changeLife(-1)
      //alert('test')
    }
  }, null, gameInfo.gameRef);

  entity.pufferfish.push(pufferfishInfo);
}

export {spawnPufferfish}