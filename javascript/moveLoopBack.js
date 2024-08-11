import { entity } from "./data/entity.js";
import { playerInfo } from "./data/playerInfo.js";
let loops = entity.loops;
let silverLoops = entity.silverLoops;

function moveLoopBack(loop) {
  for (let i = 0; i < loops.length; i++) {
    if (loops[i].hasGivenPoint == false && playerInfo.finishedLaneSwitching &&loops[i].lane == playerInfo.currLane && playerInfo.octoHitBoxBound.x+playerInfo.playerSpeed >= loops[i].bound.x && playerInfo.octoHitBoxBound.x+playerInfo.playerSpeed <= loops[i].bound.x+loops[i].bound.width) {
      loops[i].hasGivenPoint = true;
      playerInfo.score+=5;
      playerInfo.scoreText.setText(`${playerInfo.score}`);
    }
    if (loops[i].bound.x-playerInfo.playerSpeed <= -loops[i].bound.width-playerInfo.playerSpeed) {
      loops[i].front.destroy();
      loops[i].back.destroy();
      return loops.shift();
    } else {
      loops[i].bound.x-=playerInfo.playerSpeed;
    }
    loops[i].back.setPosition([loops[i].bound.x], [loops[i].bound.y]);
    loops[i].front.setPosition([loops[i].bound.x], [loops[i].bound.y]);
  }
  for (let i = 0; i < silverLoops.length; i++) {
    if (silverLoops[i].hasGivenPoint == false && playerInfo.finishedLaneSwitching && silverLoops[i].lane == playerInfo.currLane && playerInfo.octoHitBoxBound.x+playerInfo.playerSpeed >= silverLoops[i].bound.x && playerInfo.octoHitBoxBound.x+playerInfo.playerSpeed <= silverLoops[i].bound.x+silverLoops[i].bound.width) {
      silverLoops[i].hasGivenPoint = true;
      playerInfo.score+=1;
      playerInfo.scoreText.setText(`${playerInfo.score}`);
    }
    if (silverLoops[i].bound.x-playerInfo.playerSpeed <= -silverLoops[i].bound.width-playerInfo.playerSpeed) {
      silverLoops[i].front.destroy();
      silverLoops[i].back.destroy();
      return silverLoops.shift();
    } else {
      silverLoops[i].bound.x-=playerInfo.playerSpeed;
    }
    silverLoops[i].back.setPosition([silverLoops[i].bound.x], [silverLoops[i].bound.y]);
    silverLoops[i].front.setPosition([silverLoops[i].bound.x], [silverLoops[i].bound.y]);
  }
}
export {moveLoopBack}