import { playerInfo } from "../../data/playerInfo.js";
import { background } from "../../data/background.js";
import {entity} from "../../data/entity.js";
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

  if (background.sandGroundBound.x-playerInfo.playerSpeed <= -background.sandGroundBound.width) {
    //console.log(background.sandGround.x); //300
    background.sandGround.x = background.sandGround2.x-playerInfo.playerSpeed+background.sandGround2.width;
    background.sandGround.setPosition(0, background.oceanBgBound.height-background.sandGroundBound.height+background.sandGroundBound.height/2)
  } else {
    background.sandGround.x-=playerInfo.playerSpeed/2;
  }
  background.sandGround.setPosition([background.sandGround.x], [0]);

  if (background.sandGround2Bound.x-playerInfo.playerSpeed <= -background.sandGround2Boundwidth) {
    background.sandGround2Bound.x = background.sandGround2Bound.x-playerInfo.playerSpeed+background.sandGround2Boundwidth;
    background.sandGround2BoundsetPosition(0, background.oceanBgBound.height-background.sandGround2Boundound.height+background.sandGround2Boundound.height/2)
  } else {
    background.sandGround2Bound.x-=playerInfo.playerSpeed/2;
  }

  //background.sandGround2.setPosition([background.sandGround2.x], [0]);

  //background.sandGround.setPosition(0, background.oceanBgBound.height-background.sandGroundBound.height+background.sandGroundBound.height/2);
  
  //move everything in entity back
  Object.keys(entity).forEach(singleEntity => {
    entity[singleEntity].moveFunction();
  })
  firstLoop=false;
}

export {handleMovingForward}