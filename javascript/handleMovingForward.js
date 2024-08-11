import { moveLoopBack } from "./moveLoopBack.js";
import { playerInfo } from "./data/playerInfo.js";
import { background } from "./data/background.js";

function handleMovingForward() {
  playerInfo.octoHitBoxBound = playerInfo.octoHitBox.getBounds();
  if (background.oceanBg.x-playerInfo.playerSpeed <= -background.oceanBgBound.width) {
    background.oceanBgBound.x = background.oceanBgBound2.x-playerInfo.playerSpeed+background.oceanBgBound2.width;
  } else {
    background.oceanBgBound.x-=playerInfo.playerSpeed/2;
  }
  background.oceanBg.setPosition([background.oceanBgBound.x], [0])

  if (background.oceanBg2.x-playerInfo.playerSpeed <= -background.oceanBgBound2.width) {
    background.oceanBgBound2.x = background.oceanBgBound2.width-playerInfo.playerSpeed;
  } else {
    background.oceanBgBound2.x-=playerInfo.playerSpeed/2;
  }
  background.oceanBg2.setPosition([background.oceanBgBound2.x], [0]);
  //loops
  moveLoopBack();
}

export {handleMovingForward}