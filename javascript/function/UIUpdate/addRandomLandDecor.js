import {background} from "../../data/background.js";

function addRandomLandDecor () {
  let ranDecor = Math.floor(Math.random()*background.decorList.length);
    background.groundDecor.setTexture(background.decorList[ranDecor]);
    background.groundDecorBound = background.groundDecor.getBounds();
}
export {addRandomLandDecor}