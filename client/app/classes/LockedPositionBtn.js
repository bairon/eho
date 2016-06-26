import config from '../static/config/pixiConfig';

export const BTN_WIDTH = 80;
export const BTN_HEIGHT = config.charSelect.height;

/**
 * Class that defines a fixed position button.
 * When the character select stage is scrolled left or right, these buttons
 * will stay fixed to the screen.
 * @todo this should probably be a component of some sort
 */
export class LockedPositionBtn extends PIXI.Container {
  constructor(originX = 0, originY = 0) {
    super();

    this.interactive = true;
    this.buttonMode = true;

    this.background = new PIXI.Graphics();
    this.background.lineStyle(0, 0x000000, 1);
    this.background.beginFill(0x203040, 1);
    this.background.drawRect(originX, originY,
                            originX + BTN_WIDTH,
                            originY + BTN_HEIGHT);
    this.background.endFill();
    this.addChild(this.background);
  }
}
