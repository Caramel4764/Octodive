import { playerInfo } from "./data/playerInfo.js";

function handleGameRestart() {
  playerInfo.isGameOver = false;
  for (let i = 0; i < playerInfo.boostTimeEvent; i++) {
    playerInfo.boostTimeEvent[i].destroy();
  }
  playerInfo.boostTimeEvent = [];
  playerInfo.score = 0;
  playerInfo.distanceTraveled = 0;
  playerInfo.distanceTraveledRounded = 0;
  playerInfo.life = 3;
  playerInfo.prevDistanceTraveledRounded = 0;
  playerInfo.heartEntity = [];
  playerInfo.currLane = 0;
  playerInfo.finishedLaneSwitching = true;
  playerInfo.playerSpeed = playerInfo.ogPlayerSpeed;
  playerInfo.isBoosting = false;
  playerInfo.isDownDown = false;
  playerInfo.isUpDown = false;
  playerInfo.inkBarAmount = 2,
  playerInfo.playerSpeed -= playerInfo.speedboost;
  this.scene.stop('GameOver').launch('GameScene');
}

export {handleGameRestart}