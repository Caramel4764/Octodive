import { playerInfo } from "./data/playerInfo.js";
import { gameInfo } from "./data/gameInfo.js";

function changeLife (change) {
  playerInfo.life+=change;
  playerInfo.heartEntity[playerInfo.life].setTexture('heartEmpty');
  if (playerInfo.life <= 0) {
    gameInfo.game.scene.pause("default")
    alert("Game Over");
  }
}
export {changeLife}