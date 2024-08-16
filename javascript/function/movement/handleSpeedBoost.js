import { gameInfo } from "../../data/gameInfo.js";
import { playerInfo } from "../../data/playerInfo.js";
import { updateInkBar } from "../UIUpdate/updateInkBar.js";
function handleSpeedBoost(speedboost, time) {
    playerInfo.playerSpeed += speedboost;
    playerInfo.isBoosting = true;
    playerInfo.boostSpeed = speedboost,
    playerInfo.boostTimeEvent.push(gameInfo.gameRef.time.addEvent({
      delay: time,
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

    gameInfo.gameRef.time.addEvent({
      delay: time+playerInfo.BoostExtraInvincibleTime,
      callback: function () {
        playerInfo.isInvincible = false;
      },
      callbackScope: gameInfo.ref,
      loop: false
    })

    playerInfo.inkBarAmount -= 1;
    updateInkBar();
}

export {handleSpeedBoost}