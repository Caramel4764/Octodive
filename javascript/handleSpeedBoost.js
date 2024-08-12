import { gameInfo } from "./data/gameInfo.js";
import { playerInfo } from "./data/playerInfo.js";

function handleSpeedBoost(speedboost, time) {
  playerInfo.playerSpeed += speedboost;
  playerInfo.isBoosting = true;
  gameInfo.gameRef.time.delayedCall(time, () => {
    playerInfo.playerSpeed -= speedboost;
    playerInfo.isBoosting = false;
  });
}

export {handleSpeedBoost}