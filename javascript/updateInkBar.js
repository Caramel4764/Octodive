import { playerInfo } from "./data/playerInfo.js";

function updateInkBar () {
  if (playerInfo.inkBarAmount == 2) {
    playerInfo.inkBar.setTexture('inkBottleFull');
  } else if (playerInfo.inkBarAmount == 1) {
    playerInfo.inkBar.setTexture('inkBottleHalf');
  } else if (playerInfo.inkBarAmount == 0) {
    playerInfo.inkBar.setTexture('inkBottleEmpty');
  }
}

export {updateInkBar}