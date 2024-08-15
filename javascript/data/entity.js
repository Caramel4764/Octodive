import { gameInfo } from "./gameInfo.js";
import { playerInfo } from "./playerInfo.js";
import { config } from "../../script.js";
import { changeLife } from "../function/UIUpdate/changeLife.js";
import { moveToCenterOfMenu } from "../function/UIUpdate/moveToCenterOfMenu.js";
let entity = {
  silverLoops : {
    ref: [],
    speed: 0,
    spawnDistanceRate: 1,
    prevDistanceTraveledRounded: 0,
    spawnFunction: () => {
      let ranLane = Math.floor(Math.random() * 4);
      let y = ranLane*gameInfo.laneHeight;
      let silverRingBack = gameInfo.gameRef.add.sprite(config.width, y, 'silverLoopBack').setOrigin(0, 0).setScale(4.7);
      silverRingBack.setDepth(0)
      let silverRingFront = gameInfo.gameRef.add.sprite(config.width, y, 'silverLoopFront').setOrigin(0, 0).setScale(4.7);
      silverRingFront.setDepth(3)
      let silverRingBound = silverRingBack.getBounds();
      let silverRingInfo = {
        back: silverRingBack,
        front: silverRingFront,
        bound: silverRingBound,
        lane: ranLane,
        hasGivenPoint: false,
      }
      entity.silverLoops.ref.push(silverRingInfo);
    },
    moveFunction: () => {
      entity.silverLoops.ref.forEach(silverLoop => {
        if (silverLoop.hasGivenPoint == false && playerInfo.finishedLaneSwitching && silverLoop.lane == playerInfo.currLane && playerInfo.octoHitBoxBound.x+playerInfo.playerSpeed >= silverLoop.bound.x && playerInfo.octoHitBoxBound.x+playerInfo.playerSpeed <= silverLoop.bound.x+silverLoop.bound.width) {
          silverLoop.hasGivenPoint = true;
          playerInfo.score+=1;
          playerInfo.scoreText.setText(`${playerInfo.score}`);
          moveToCenterOfMenu(playerInfo.scoreText,15)
    
        }
        if (silverLoop.bound.x-playerInfo.playerSpeed <= -silverLoop.bound.width-playerInfo.playerSpeed-200) {
          silverLoop.front.destroy();
          silverLoop.back.destroy();
          return entity.silverLoops.ref.shift();
        } else {
          silverLoop.bound.x-=playerInfo.playerSpeed;
        }
        silverLoop.back.setPosition([silverLoop.bound.x], [silverLoop.bound.y]);
        silverLoop.front.setPosition([silverLoop.bound.x], [silverLoop.bound.y]);
      })
    }
  },
  goldLoops : {
    ref: [],
    speed: 0,
    spawnDistanceRate: 10,
    prevDistanceTraveledRounded: 0,
    goldLoopSpawnInterval: 3000,
    spawnFunction: () => {
      let x = gameInfo.laneWidth;
      let lane = Math.floor(Math.random() * 4);
      let y = lane*gameInfo.laneHeight;
      let goldRingBack = gameInfo.gameRef.add.sprite(x, y, 'goldLoopBack').setOrigin(0, 0).setScale(4.7);
      goldRingBack.setDepth(0)
      let goldRingFront = gameInfo.gameRef.add.sprite(x, y, 'goldLoopFront').setOrigin(0, 0).setScale(4.7);
      goldRingFront.setDepth(3)
      let goldRingBound = goldRingBack.getBounds();
      let goldRingInfo = {
        back: goldRingBack,
        front: goldRingFront,
        bound: goldRingBound,
        lane: lane,
        hasGivenPoint: false,
      }
      entity.goldLoops.ref.push(goldRingInfo);
    },
    moveFunction: () => {
      entity.goldLoops.ref.forEach(goldLoop => {
        if (goldLoop.hasGivenPoint == false && playerInfo.finishedLaneSwitching &&goldLoop.lane == playerInfo.currLane && playerInfo.octoHitBoxBound.x+playerInfo.playerSpeed >= goldLoop.bound.x && playerInfo.octoHitBoxBound.x+playerInfo.playerSpeed <= goldLoop.bound.x+goldLoop.bound.width) {
          goldLoop.hasGivenPoint = true;
          playerInfo.score+=5;
          playerInfo.scoreText.setText(`${playerInfo.score}`);
        }
        if (goldLoop.bound.x-playerInfo.playerSpeed <= -goldLoop.bound.width-playerInfo.playerSpeed) {
          goldLoop.front.destroy();
          goldLoop.back.destroy();
          return entity.goldLoops.ref.shift();
        } else {
          goldLoop.bound.x-=playerInfo.playerSpeed;
        }
        goldLoop.back.setPosition([goldLoop.bound.x], [goldLoop.bound.y]);
        goldLoop.front.setPosition([goldLoop.bound.x], [goldLoop.bound.y]);
      })
    }
  },
  pufferfish : {
    ref: [],
    speed: 0.3,
    spawnDistanceRate: 5,
    prevDistanceTraveledRounded: 0,
    spawnFunction: () => {
      let lane = Math.floor(Math.random() * 4);
      let pufferfish = gameInfo.gameRef.physics.add.sprite(gameInfo.laneWidth, lane*gameInfo.laneHeight, 'pufferfish').setOrigin(0, 0).setDepth(0).setScale(3.9);
      let pufferfishInfo = {
        pufferfish: pufferfish,
        lane: lane,
        hasBeenHit: false,
      }
      entity.pufferfish.ref.push(pufferfishInfo);
    },
    moveFunction : () => {
      entity.pufferfish.ref.forEach(pufferfish => {
        let pufferfishBounds = pufferfish.pufferfish.getBounds();
        pufferfishBounds.x -= playerInfo.playerSpeed-entity.pufferfish.speed;
    
        pufferfish.pufferfish.setPosition(pufferfishBounds.x, pufferfishBounds.y);
        if (playerInfo.isInvincible == false && playerInfo.finishedLaneSwitching == true && (playerInfo.currLane == pufferfish.lane || playerInfo.currLane == pufferfish.lane+1) && pufferfish.hasBeenHit == false && playerInfo.octoDangerHitBoxBound.x+(playerInfo.playerSpeed-0.3)+playerInfo.octoDangerHitBoxBound.width >= pufferfishBounds.x && playerInfo.octoDangerHitBoxBound.x+(playerInfo.playerSpeed-0.3) <=pufferfishBounds.x+pufferfishBounds.width) {
          if (playerInfo.finishedLaneSwitching && pufferfish.hasBeenHit == false) {
            changeLife(-1)
            pufferfish.hasBeenHit = true;
          }
        }
      })
    }
  },
  swordfish: {
    ref: [],
    speed: -10,
    spawnDistanceRate: 5,
    prevDistanceTraveledRounded: 0,
    spawnFunction: () => {
      let lane = Math.floor(Math.random() * 4);
      let swordfish = gameInfo.gameRef.physics.add.sprite(gameInfo.laneWidth, lane*gameInfo.laneHeight, 'swordfish').setOrigin(0, 0).setDepth(0).setScale(3.9);
      let swordfishInfo = {
        swordfish: swordfish,
        lane: lane,
        hasBeenHit: false,
      }
      entity.swordfish.ref.push(swordfishInfo);
    },
    moveFunction: () => {
      entity.swordfish.ref.forEach(swordfish => {
        let swordfishBounds = swordfish.swordfish.getBounds();
        swordfishBounds.x -= playerInfo.playerSpeed-entity.swordfish.speed;
        swordfish.swordfish.setPosition(swordfishBounds.x, swordfishBounds.y);
        if (playerInfo.isInvincible == false && playerInfo.finishedLaneSwitching == true && (playerInfo.currLane == swordfish.lane || playerInfo.currLane == swordfish.lane+1) && swordfish.hasBeenHit == false && playerInfo.octoDangerHitBoxBound.x+(playerInfo.playerSpeed-0.3)+playerInfo.octoDangerHitBoxBound.width >= swordfishBounds.x && playerInfo.octoDangerHitBoxBound.x+(playerInfo.playerSpeed-0.3) <=swordfishBounds.x+swordfishBounds.width) {
          if (playerInfo.finishedLaneSwitching && swordfish.hasBeenHit == false) {
            changeLife(-1)
            swordfish.hasBeenHit = true;
          }
        }
      })
    }
  }
}

export {entity}