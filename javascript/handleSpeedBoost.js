import { gameInfo } from "./data/gameInfo.js";
import { playerInfo } from "./data/playerInfo.js";

function handleSpeedBoost(speedboost, time) {
    playerInfo.playerSpeed += speedboost;
    playerInfo.isBoosting = true;
    playerInfo.boostSpeed = speedboost,

    playerInfo.boostTimeEvent.push(gameInfo.gameRef.time.addEvent({
      delay: playerInfo.restartDelay,
      callback: function () {
        playerInfo.playerSpeed -= speedboost;
        playerInfo.isBoosting = false;
        for (let i = 0; i < playerInfo.boostTimeEvent.length; i++) {
          playerInfo.boostTimeEvent[i].remove(false);
        }
      },
      callbackScope: gameInfo.ref,
      loop: false
    }))
}

export {handleSpeedBoost}