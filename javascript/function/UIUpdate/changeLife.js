import { playerInfo } from "../../data/playerInfo.js";
import { gameInfo } from "../../data/gameInfo.js";

function changeLife (change) {
  if (change < 0) {
    playerInfo.life+=change;
    playerInfo.isInvincible = true;
    gameInfo.gameRef.time.addEvent({
      delay: playerInfo.afterHitInvincibleTime,
      callback: function () {
        playerInfo.isInvincible = false;
      },
      callbackScope: this,
      loop: false
    })
    if (playerInfo.heartEntity[playerInfo.life]) {
      playerInfo.heartEntity[playerInfo.life].setTexture('heartEmpty');
    } else {
      console.log(`heart doesn't exist ${playerInfo.life}`)
    }
  } else if (change > 0) {
    if (playerInfo.life < 3) {
      playerInfo.life+=change;

      if (playerInfo.heartEntity[playerInfo.life-1]) {
        playerInfo.heartEntity[playerInfo.life-1].setTexture('heart');
      } else {
        console.log(`heart doesn't exist ${playerInfo.life}`)
      }
    } else {
      playerInfo.score += 15;
    }

  }
  if (playerInfo.life <= 0) {
    gameInfo.gameRef.scene.stop('GameScene').launch('GameOver');
    playerInfo.isGameOver = true;
  }
}
export {changeLife}