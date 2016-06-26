/**
 * Defined a character selection view.
 * Primarily used to define some functionality for clicking and dragging
 * the character cards left or right.
 *
 * This class is set up to be a singleton instance since we should only ever
 * have one character selection container.
 */
class CharSelect extends PIXI.Container {
  constructor() {
    super();

    this.interactive = true;

    this.zoom = 1;
    this.scale.x = this.scale.y = this.zoom;

    this.mousePressPoint = [0, 0];

    this.mousedown = function(event) {
      this.dragging = true;
      let parentX = event.data.getLocalPosition(this.parent).x;
      let parentY = event.data.getLocalPosition(this.parent).y;

      this.mousePressPoint[0] = parentX - this.position.x;
      this.mousePressPoint[1] = parentY - this.position.y;
    };

    this.mousemove = function(event) {
      if (this.dragging) {
        var position = event.data.getLocalPosition(this.parent);
        this.position.x = position.x - this.mousePressPoint[0];
      }
    };

    this.mouseup = function() {
      this.dragging = false;
    };
  }
}

export default new CharSelect();
