let playerInfo = {
  playerSpeed: 2,
  playerVerticalSpeed: 450,
  ogPlayerSpeed: 2,
  isBoosting: false,
  goldLoopSpawnInterval: 5000,
  silverLoopSpawnInterval: 500,
  score: 0,
  currLane: 0,
  finishedLaneSwitching: true,
  octoHitBoxBound: undefined,
  octoHitBox: undefined,
  scoreText: undefined,
  playerContainer: undefined,
  player: undefined,
  playerBound: undefined,
  distanceTraveled: 0,
  distanceTraveledRounded: 0,
  distanceTraveledText: undefined,
  prevDistanceTraveledRounded: 0,
  silverLoopSpawnDistanceRate: 1,
}

export {playerInfo}