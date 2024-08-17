import { playerInfo } from "../../data/playerInfo.js";
import { entity } from "../../data/entity.js";
import { gameInfo } from "../../data/gameInfo.js";

function handleGameRestart() {
  playerInfo.isGameOver = false;
  for (let i = 0; i < playerInfo.boostTimeEvent; i++) {
    playerInfo.boostTimeEvent[i].destroy();
  }
  gameInfo.bgMusic.play();
  playerInfo.boostTimeEvent = [];
  playerInfo.score = 0;
  playerInfo.distanceTraveled = 0;
  playerInfo.distanceTraveledRounded = 0;
  playerInfo.life = 3;
  playerInfo.inkGenCounter = 0;
  playerInfo.prevDistanceTraveledRounded = 0;
  playerInfo.heartEntity = [];
  playerInfo.currLane = 0;
  playerInfo.isInvincible = false;
  playerInfo.finishedLaneSwitching = true;
  playerInfo.playerSpeed = playerInfo.ogPlayerSpeed;
  playerInfo.isBoosting = false;
  playerInfo.isDownDown = false;
  playerInfo.isUpDown = false;
  playerInfo.inkBarAmount = 4,
  playerInfo.playerSpeed -= playerInfo.speedboost;
  Object.keys(entity).forEach(singleEntity => {
    entity[singleEntity].prevDistanceTraveledRounded = 0;
  });
  this.scene.stop('GameOver').launch('GameScene');
}

export {handleGameRestart}