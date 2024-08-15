import { gameInfo } from "../../data/gameInfo.js";
import { entity } from "../../data/entity.js";
let goldRingBoundTest;
let loops = entity.loops.ref;
let silverLoops = entity.silverLoops.ref;
function spawnGoldHoop() {
  let x = gameInfo.laneWidth;
  let lane = Math.floor(Math.random() * 4);
  let y = lane*gameInfo.laneHeight;
  let goldRingBack = gameInfo.gameRef.add.sprite(x, y, 'goldLoopBack').setOrigin(0, 0).setScale(4.7);
  goldRingBack.setDepth(0)
  let goldRingFront = gameInfo.gameRef.add.sprite(x, y, 'goldLoopFront').setOrigin(0, 0).setScale(4.7);
  goldRingFront.setDepth(3)
  let goldRingBound = goldRingBack.getBounds();
  let goldRingInfo = {
    back: goldRingBack,
    front: goldRingFront,
    bound: goldRingBound,
    lane: lane,
    hasGivenPoint: false,
  }
  loops.push(goldRingInfo);
  goldRingBoundTest = goldRingBound;
}

function spawnSilverHoop(x, lane) {
  let y = lane*gameInfo.laneHeight;
  let silverRingBack = gameInfo.gameRef.add.sprite(x, y, 'silverLoopBack').setOrigin(0, 0).setScale(4.7);
  silverRingBack.setDepth(0)
  let silverRingFront = gameInfo.gameRef.add.sprite(x, y, 'silverLoopFront').setOrigin(0, 0).setScale(4.7);
  silverRingFront.setDepth(3)
  let silverRingBound = silverRingBack.getBounds();
  let silverRingInfo = {
    back: silverRingBack,
    front: silverRingFront,
    bound: silverRingBound,
    lane: lane,
    hasGivenPoint: false,
  }
  silverLoops.push(silverRingInfo);
}

export {spawnGoldHoop, spawnSilverHoop}