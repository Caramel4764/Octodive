import { gameInfo } from "./gameInfo.js";
import { playerInfo } from "./playerInfo.js";
import { config } from "../../script.js";
import { changeLife } from "../function/UIUpdate/changeLife.js";
import { placeCenterOfLane } from "../function/UIUpdate/placeCenterOfLane.js";
import { updatePlayerScore } from "../function/UIUpdate/updatePlayerScore.js";
import { moveEntityBack } from "../function/movement/moveEntityBack.js";
import { changeInk } from "../function/UIUpdate/changeInk.js";
import { spawnEntity } from "../function/UIUpdate/spawnEntity.js";
let entity = {
  silverLoops : {
    ref: [],
    isPowerup: true,
    speed: 0,
    indexVal: 4,
    spawnDistanceRate: 1,
    prevDistanceTraveledRounded: 0,
    src: ['silverLoopFront'],
    backSrc: 'silverLoopBack',
    audioSound: 'silverLoopPickup',
    scale: 4.7,
    spawnFunction: () => {
      spawnEntity('silverLoops');
    },
    activateFunctionality: function () {
      updatePlayerScore(1);
    },
    moveFunction: () => {
      moveEntityBack(entity.silverLoops);
    }
  },
  goldLoops : {
    ref: [],
    isPowerup: true,
    speed: 0,
    indexVal: 4,
    src: ['goldLoopFront'],
    backSrc: 'goldLoopBack',
    scale: 4.7,
    spawnDistanceRate: 10,
    audioSound: 'goldLoopPickup',
    prevDistanceTraveledRounded: 0,
    goldLoopSpawnInterval: 3000,
    spawnFunction: () => {
      spawnEntity('goldLoops');
    },
    moveFunction: () => {
      moveEntityBack(entity.goldLoops);
    },
    activateFunctionality: function () {
      updatePlayerScore(10);
    },
  },
  pufferfish : {
    ref: [],
    speed: 0.3,
    multiLane: 1,
    spawnDistanceRate: 8,
    prevDistanceTraveledRounded: 0,
    spawnFunction: () => {
      let lane = Math.floor(Math.random() * 3);
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
            //heart issue here I think
            //console.log(1)
            pufferfish.hasBeenHit = true;
          }
        }
      })
    }
  },
  swordfish: {
    ref: [],
    speed: -20,
    scale: 3.9,
    spawnDistanceRate: 5,
    src: ['swordfish', 'swordFishAqua'],
    prevDistanceTraveledRounded: 0,
    warningTime: 1000,
    activateFunctionality: function () {
      changeLife(-1);
    },
    spawnFunction: () => {
      let lane = Math.floor(Math.random() * 4);
      let dangerSign = gameInfo.gameRef.add.image(config.width-200, 30+(lane*gameInfo.laneHeight), 'dangerSign').setScale(3).setOrigin(0, 0);
      gameInfo.gameRef.time.addEvent({
        delay: entity.swordfish.warningTime,
        callback: function () {
          dangerSign.destroy();
          spawnEntity('swordfish', lane);
        },
        callbackScope: this,
        loop: false
      })
    },
    moveFunction: () => {
      moveEntityBack(entity.swordfish)
    }
  },
  trash: {
    ref: [],
    speed: 0,
    indexVal: 5,
    src: ['plasticBag', 'bottle', 'plasticRing', 'cigarette', 'crushedCan'],
    spawnDistanceRate: 10,
    prevDistanceTraveledRounded: 0,
    //audioSound: 'audio',
    activateFunctionality: function () {
      changeLife(-1);

    },
    spawnFunction: () => {
      spawnEntity('trash')

    },
    moveFunction: () => {
      moveEntityBack(entity.trash)
    }
  },
  heart: {
    ref: [],
    isPowerup: true,
    speed: 0,
    isDestroyedAfterGrab: true,
    spawnDistanceRate: 30,
    prevDistanceTraveledRounded: 0,
    audioSound: 'itemPickup',
    activateFunctionality: function () {
      changeLife(1)
    },
    spawnFunction: () => {
      spawnEntity('heart')
    },
    moveFunction: () => {
      moveEntityBack(entity.heart)
    }
  },
  inkVial: {
    ref: [],
    speed: 0,
    isPowerup: true,
    isDestroyedAfterGrab: true,
    spawnDistanceRate: 6,
    prevDistanceTraveledRounded: 0,
    audioSound: 'itemPickup',
    activateFunctionality: function () {
      changeInk(1);
    },
    spawnFunction: () => {
      spawnEntity('inkVial')
    },
    moveFunction: () => {
      moveEntityBack(entity.inkVial)
    }
  },
  clownfish: {
    ref: [],
    speed: -1,
    scale: 3,
    spawnDistanceRate: 15,
    src: ['clownfish', 'clownfishClown'],
    prevDistanceTraveledRounded: 0,
    warningTime: 250,
    activateFunctionality: function () {
      changeLife(-1);
    },
    spawnFunction: () => {
      spawnEntity('clownfish')
    },
    moveFunction: () => {
      moveEntityBack(entity.clownfish)
    }
  },
}

export {entity}

/*
    inkVial: {
    ref: [],
    speed: 0,
    isDestroyedAfterGrab: true,
    spawnDistanceRate: 15,
    prevDistanceTraveledRounded: 0,
    audioSound: 'itemPickup',
    activateFunctionality: function () {
      changeInk(1);
    },
    spawnFunction: () => {
      let lane = Math.floor(Math.random() * 4);
      let inkVial = gameInfo.gameRef.physics.add.sprite(gameInfo.laneWidth, lane*gameInfo.laneHeight, 'inkVial').setOrigin(0, 0).setDepth(0).setScale(2.3);
      let heartInfo = {
        inkVial: inkVial,
        lane: lane,
        hasBeenHit: false,
        isMoving: false,
      }
      entity.inkVial.ref.push(heartInfo);
      placeCenterOfLane(inkVial, lane)
    },
    moveFunction: () => {
      moveEntityBack(entity.inkVial, 'inkVial')
    }
  }
*/