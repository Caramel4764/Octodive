import { playerInfo } from "./data/playerInfo.js";
import { gameInfo } from "./data/gameInfo.js";

function changeLife (change) {
  playerInfo.life+=change;
  if (playerInfo.heartEntity[playerInfo.life]) {
    console.log(playerInfo.heartEntity);
console.log(gameInfo.gameRef);
    console.log(`${playerInfo.heartEntity[playerInfo.life]} ${playerInfo.life}`)
    playerInfo.heartEntity[playerInfo.life].setTexture('heartEmpty');
  } else {
    console.log('negative life')
  }
  if (playerInfo.life <= 0) {
    gameInfo.gameRef.scene.stop('GameScene').launch('GameOver');
  }
}
export {changeLife}