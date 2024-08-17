import { gameInfo } from "../../data/gameInfo.js";
import { entity } from "../../data/entity.js";
import { placeCenterOfLane } from "./placeCenterOfLane.js";
function spawnEntity(name) {
  let lane = Math.floor(Math.random() * 4);
  let entityBody = gameInfo.gameRef.physics.add.sprite(gameInfo.laneWidth, lane*gameInfo.laneHeight, name).setOrigin(0, 0).setDepth(0).setScale(2.3);

  if (entity[name].src) {
    entityBody.setTexture(entity[name].src[Math.floor(Math.random() * entity[name].src.length)]);
  }
  let entityInfo = {
    entityBody: entityBody,
    lane: lane,
    hasBeenHit: false,
    isMoving: false,
  }
  entity[name].ref.push(entityInfo);
  placeCenterOfLane(entityBody, lane)
}

export {spawnEntity}