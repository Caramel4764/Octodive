import { moveLoopBack } from "./moveLoopBack.js";
import { playerInfo } from "./data/playerInfo.js";
import { background } from "./data/background.js";
import {entity} from "./data/entity.js";
import { changeLife } from "./changeLife.js";
let firstLoop = true;
function handleMovingForward() {
  playerInfo.octoHitBoxBound = playerInfo.octoHitBox.getBounds();
  if (background.oceanBg.x-playerInfo.playerSpeed <= -background.oceanBgBound.width) {
    background.oceanBgBound.x = background.oceanBgBound2.x-playerInfo.playerSpeed+background.oceanBgBound2.width;
  } else {
    background.oceanBgBound.x-=playerInfo.playerSpeed/2;
  }
  background.oceanBg.setPosition([background.oceanBgBound.x], [0])

  if (background.oceanBg2.x-playerInfo.playerSpeed <= -background.oceanBgBound2.width) {
    if (firstLoop) {
    background.oceanBgBound2.x = background.oceanBgBound2.width-playerInfo.playerSpeed;
    } else {
    background.oceanBgBound2.x = background.oceanBgBound.x-playerInfo.playerSpeed+background.oceanBgBound.width;
    }
  } else {
    background.oceanBgBound2.x-=playerInfo.playerSpeed/2;
  }
  background.oceanBg2.setPosition([background.oceanBgBound2.x], [0]);
  //loops
  moveLoopBack();
  entity.pufferfish.forEach(pufferfish => {
    let pufferfishBounds = pufferfish.pufferfish.getBounds();
    //0.3 is pufferfish speed for going slower
    pufferfishBounds.x -= playerInfo.playerSpeed-0.3;
    pufferfish.pufferfish.setPosition(pufferfishBounds.x, pufferfishBounds.y);
    if ((playerInfo.currLane == pufferfish.lane || playerInfo.currLane == pufferfish.lane+1) && pufferfish.hasBeenHit == false && playerInfo.playerBound.x+playerInfo.playerSpeed > pufferfishBounds.x && playerInfo.playerBound.x+playerInfo.playerSpeed<pufferfishBounds.x+pufferfishBounds.width) {
      changeLife(-1)
      pufferfish.hasBeenHit = true;
    }
  })
  firstLoop=false;
}

export {handleMovingForward}