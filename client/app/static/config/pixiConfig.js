/**
 * Object used to hold the global configurations for pixi.js rendering.
 */
export default {
  // Configurations specific to the character select view
  charSelect: {
    // height and with of the stage
    width: 1280,
    height: 1024,

    // space between character sprites
    spacer: 600,
    // controls the starting position of the character cards horizontally
    startPosX: 450,
    // controls the starting position vertically
    startPosY: 450,

    // Anchor is the origin point for the sprite (in percentage).
    anchorX: 0.5,
    anchorY: 0.5
  }
};
