import { gameInfo } from "../../data/gameInfo.js";
import { playerInfo } from "../../data/playerInfo.js";
import { changeLife } from "../UIUpdate/changeLife.js";
function moveEntityBack(entity) {
  entity.ref.forEach(singleEntity => {
    let entityBound = singleEntity.entityBody.getBounds();
    entityBound.x -= playerInfo.playerSpeed-entity.speed;
    if (singleEntity.backEntityBody) {
      let backEntityBound = singleEntity.backEntityBody.getBounds();
      backEntityBound.x -= playerInfo.playerSpeed-entity.speed;
      singleEntity.backEntityBody.setPosition(backEntityBound.x, backEntityBound.y);
    }
    singleEntity.entityBody.setPosition(entityBound.x, entityBound.y);
    if ((playerInfo.isInvincible == false || entity.isPowerup) && playerInfo.finishedLaneSwitching == true && playerInfo.currLane == singleEntity.lane && singleEntity.hasBeenHit == false && playerInfo.octoDangerHitBoxBound.x+(playerInfo.playerSpeed-entity.speed)+playerInfo.octoDangerHitBoxBound.width >= entityBound.x && playerInfo.octoDangerHitBoxBound.x+(playerInfo.playerSpeed-entity.speed) <=entityBound.x+entityBound.width) {
      if ((playerInfo.isInvincible == false || entity.isPowerup) && playerInfo.finishedLaneSwitching && singleEntity.hasBeenHit == false) {
        if (entity.activateFunctionality) {
          entity.activateFunctionality();
        }
        if (entity.audioSound) {
          gameInfo.gameRef.sound.add(entity.audioSound).play();
        }
        singleEntity.hasBeenHit = true;
        if (entity.isDestroyedAfterGrab) {
          singleEntity.entityBody.destroy();
        }
      }
    }
    if (entityBound.x<-100) {
      singleEntity.entityBody.destroy();
    }
  })
}

export {moveEntityBack}