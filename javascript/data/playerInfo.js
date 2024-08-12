let playerInfo = {
  playerSpeed: 3,
  playerVerticalSpeed: 480,
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
  life: 3,
  heartEntity : [],
}

export {playerInfo}