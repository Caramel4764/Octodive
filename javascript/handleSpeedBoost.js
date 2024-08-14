import { gameInfo } from "./data/gameInfo.js";
import { playerInfo } from "./data/playerInfo.js";

function handleSpeedBoost(speedboost, time) {
  playerInfo.playerSpeed += speedboost;
  playerInfo.isBoosting = true;
  playerInfo.boostTimeEvent = gameInfo.gameRef.time.delayedCall(time, () => {
    playerInfo.playerSpeed -= speedboost;
    console.log('end')
    playerInfo.isBoosting = false;
  });
}

export {handleSpeedBoost}