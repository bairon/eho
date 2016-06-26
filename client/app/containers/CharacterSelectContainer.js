import React, {Component} from 'react';
import {connect} from 'react-redux';
import Characters from '../static/characters';
import config from '../static/config/pixiConfig';
import charSelect from '../classes/CharSelect';
import {LockedPositionBtn, BTN_WIDTH} from '../classes/LockedPositionBtn';

/**
 * Container component used to display the character selector.
 * Has no corresponding presentational component object since the display is
 * primarily controlled by pixi.js.
 * @todo This should be broken up into separate components:
 *       review https://github.com/andrewmunro/react-redux-pixi-seed
 *              https://github.com/Izzimach/react-pixi/blob/master/src/ReactPIXI.js
 */
class CharacterSelectContainer extends Component {
  /**
   * Override the componentDidMount component hook to render our characters
   * when the component is full loaded, as well as initiate the animation
   * process.
   * @override
   */
  componentDidMount() {
    const {characterSelect} = this.props;

    // Initialize the character select stage
    characterSelect.stage.addChild(charSelect);

    // Add the buttons that allow you to scroll left or right
    let leftBtn = new LockedPositionBtn();
    leftBtn.mouseup = function() {
      charSelect.position.x += config.charSelect.spacer;
    };
    characterSelect.stage.addChild(leftBtn);

    let rightBtn = new LockedPositionBtn(config.charSelect.width - BTN_WIDTH);
    rightBtn.mouseup = function() {
      charSelect.position.x -= config.charSelect.spacer;
    };
    characterSelect.stage.addChild(rightBtn);

    // Add the stage to the page
    let node = document.getElementsByClassName('charSelectContainer')[0];
    node.appendChild(characterSelect.renderer.view);

    // Used by pixi.js to start the animation loop
    requestAnimationFrame(function animate() {
      requestAnimationFrame(animate);
      characterSelect.renderer.render(characterSelect.stage);
    });

    let currPosX = config.charSelect.startPosX;
    let currPosY = config.charSelect.startPosY;
    let spacer = config.charSelect.spacer;

    // Add each character to the stage so it can be rendered.
    Characters.forEach(function(character) {
      let texture = PIXI.Texture.fromImage(character.bgImg);
      let sprite = new PIXI.Sprite(texture);

      sprite.anchor.x = config.charSelect.anchorX;
      sprite.anchor.y = config.charSelect.anchorY;

      sprite.position.x = currPosX;
      sprite.position.y = currPosY;

      currPosX += spacer;

      charSelect.addChild(sprite);
    }, this);
  }

  render() {
    return (
      <div className="charSelectContainer">
      </div>
    );
  }
}

CharacterSelectContainer.propTypes = {
  characterSelect: React.PropTypes.object,
  characters: React.PropTypes.array
};

const mapStateToProps = state => {
  return {
    characterSelect: state.characterSelect
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterSelectContainer);
