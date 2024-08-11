function spawnGoldHoop(x, lane) {
  let y = lane*calculation.laneHeight;
  let goldRingBack = gameRef.add.sprite(x, y, 'goldLoopBack').setOrigin(0, 0).setScale(4.7);
  goldRingBack.setDepth(0)
  let goldRingFront = gameRef.add.sprite(x, y, 'goldLoopFront').setOrigin(0, 0).setScale(4.7);
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
}

function spawnSilverHoop(x, lane) {
  let y = lane*calculation.laneHeight;
  let silverRingBack = gameRef.add.sprite(x, y, 'silverLoopBack').setOrigin(0, 0).setScale(4.7);
  silverRingBack.setDepth(0)
  let silverRingFront = gameRef.add.sprite(x, y, 'silverLoopFront').setOrigin(0, 0).setScale(4.7);
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