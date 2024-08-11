import { gameInfo } from "./data/gameInfo.js";

function createHeart(height) {
  let heart;
  heart = gameInfo.gameRef.add.image(0,0, 'heart').setScale(1.8).setOrigin(0, 0).setDepth(10);
  //-heart.getBounds().width/2
  heart.setPosition(gameInfo.sidebarMenuBg.getBounds().x+(gameInfo.sidebarMenuBg.getBounds().width/2)-(heart.getBounds().width/2), height);
}

export {createHeart}