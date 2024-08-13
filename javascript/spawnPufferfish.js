import { playerInfo } from "./data/playerInfo.js";
import { gameInfo } from "./data/gameInfo.js";
import { entity } from "./data/entity.js";

function spawnPufferfish() {
  let lane = Math.floor(Math.random() * 4);
  let pufferfish = gameInfo.gameRef.physics.add.sprite(gameInfo.laneWidth, lane*gameInfo.laneHeight, 'pufferfish').setOrigin(0, 0).setDepth(0).setScale(3.9);
  let pufferfishInfo = {
    pufferfish: pufferfish,
    lane: lane,
    hasBeenHit: false,
  }
  entity.pufferfish.push(pufferfishInfo);
}

export {spawnPufferfish}