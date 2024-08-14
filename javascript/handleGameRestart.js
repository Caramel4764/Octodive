import { playerInfo } from "./data/playerInfo.js";

function handleGameRestart() {
  playerInfo.isGameOver = false;
  if (playerInfo.boostTimeEvent) {
    //playerInfo.boostTimeEvent.destroy();
  }
  playerInfo.score = 0;
  playerInfo.distanceTraveled = 0;
  playerInfo.distanceTraveledRounded = 0;
  playerInfo.life = 3;
  playerInfo.heartEntity = [];
  playerInfo.currLane = 0;
  playerInfo.finishedLaneSwitching = true;
  playerInfo.playerSpeed = playerInfo.ogPlayerSpeed;
  console.log(playerInfo.playerSpeed)
  playerInfo.isBoosting = true;
  this.scene.stop('GameOver').launch('GameScene');
}

export {handleGameRestart}