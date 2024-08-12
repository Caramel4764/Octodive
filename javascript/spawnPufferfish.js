import { playerInfo } from "./data/playerInfo.js";
import { gameInfo } from "./data/gameInfo.js";
import { entity } from "./data/entity.js";

function spawnPufferfish(lane) {
  let pufferfish = gameInfo.gameRef.physics.add.sprite(gameInfo.laneWidth-400, lane*gameInfo.laneHeight, 'pufferfish').setOrigin(0, 0).setDepth(0).setScale(3.9);
  entity.pufferfish.push(pufferfish);
}

export {spawnPufferfish}