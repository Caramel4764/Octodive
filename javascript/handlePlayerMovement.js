import { playerInfo } from "./data/playerInfo.js";
import { gameInfo } from "./data/gameInfo.js";
import { handleSpeedBoost } from "./handleSpeedBoost.js";
let change = 0;

function handlePlayerMovement() {
  console.log(playerInfo.isUpDown)
  if (playerInfo.isDownDown == true && playerInfo.currLane<gameInfo.maxLane) {
    playerInfo.finishedLaneSwitching = false;
    playerInfo.playerContainer.body.setVelocityY(playerInfo.playerVerticalSpeed);
    change = 1;
    playerInfo.currLane = playerInfo.currLane+change;
  }
  if (playerInfo.isUpDown == true && playerInfo.finishedLaneSwitching && playerInfo.currLane>0) {
    playerInfo.finishedLaneSwitching = false;
    playerInfo.playerContainer.body.setVelocityY(-playerInfo.playerVerticalSpeed);
    change = -1;
    playerInfo.currLane = playerInfo.currLane+change;
  }
  if (change > 0) {
    playerInfo.playerBound = playerInfo.player.getBounds();
    if (playerInfo.playerBound.y >= playerInfo.currLane*gameInfo.laneHeight) {
      playerInfo.finishedLaneSwitching = true;
      playerInfo.playerContainer.body.setVelocityY(0);
      change = 0;
    }
  } else if (change < 0) {
    playerInfo.playerBound = playerInfo.player.getBounds();

    if (playerInfo.playerBound.y <= playerInfo.currLane*gameInfo.laneHeight) {
      playerInfo.finishedLaneSwitching = true;
      playerInfo.playerContainer.body.setVelocityY(0);
      change = 0;
    }
  }

  /*if (gameInfo.cursors.right.isDown) {
    console.log("r down")
    if (playerInfo.isBoosting == false) {
      handleSpeedBoost(5, 1000);
    }
  }*/
}

export {handlePlayerMovement}