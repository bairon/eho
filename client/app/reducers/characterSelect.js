import config from '../static/config/pixiConfig';

const characterSelect = (state = {
  renderer: PIXI.autoDetectRenderer(config.charSelect.width,
                                    config.charSelect.height),
  stage: new PIXI.Container()
}) => {
  return state;
};

export default characterSelect;
