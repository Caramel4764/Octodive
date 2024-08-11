import { playerInfo } from "./data/playerInfo.js";
import { gameInfo } from "./data/gameInfo.js";
function spawnPufferfish(lane) {
  let pufferfish = gameInfo.gameRef.physics.add.sprite(gameInfo.laneWidth-100, lane*gameInfo.laneHeight, 'pufferfish').setOrigin(0, 0).setDepth(1).setScale(3.9);
  
}

export {spawnPufferfish}