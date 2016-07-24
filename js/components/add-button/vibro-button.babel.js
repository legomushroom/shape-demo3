import Module from '../module';
import COLORS from '../colors';
import C      from '../../constants';

class VibroButton extends Module {
  _render () {
    super._render();

    const DURATION = 950,
          DELAY    = 2000,
          SHIFT    = 12;

    const addButton = new mojs.Shape({
      className:      'add-button',
      fill:           COLORS.WHITE,
      radius:         21,
      isShowStart:    true,
      duration:       DURATION,
      delay:          DELAY,
      scale:          { 1: 1.35 },
      parent:         this._o.parent,
      isForce3d:      true
    }).then({
      scale: 1,
      duration: .5*DURATION
    });

    addButton.el.style[ 'cursor' ] = 'pointer';
    addButton.el.style[ 'opacity' ] = '0';
    addButton.el.style[ 'z-index' ] = '2';

    this.addButton = addButton;

    const bigReturnCircle = new mojs.Shape({
      fill:         COLORS.WHITE,
      fillOpacity:  .65,
      radius:       55,
      parent:       this._o.parent,
      scale:        { 0: 1 },
      isShowEnd:    false,
      isSoftHide:   false,
      isShowStart:  true,
      opacity:      { 1 : 0},
      duration:     1.5*DURATION,
      delay:        DELAY + .7*DURATION,
      easing:       'cubic.out',
      isTimelineLess: true,
      isForce3d: true,
    });

    bigReturnCircle.el.style[ 'z-index' ] = '0';

    const innerCircle = new mojs.Shape({
      fill:           COLORS.RED,
      parent:         addButton.el,
      fillOpacity:    .15,
      radius:         18,
      scale:          { 0: 1 },
      isShowStart:    true,
      opacity:        { 0 : 1 },
      duration:       .95*DURATION,
      delay:          DELAY,
      easing:         'cubic.out',
      isForce3d:      true,
    }).then({
      scale:          0,
      opacity:        0,
      duration:       .25*DURATION,

    });

    const noise = mojs.easing.path('M0,100 L2.0172237,93.0346887 L2.5383084,104.414093 L4.54648287,93 L5.95891666,104.414093 L8.51456926,93.0671151 L9.46473818,104.095861 L11.3469776,93.0844595 L12.9132633,104.095861 L15.0172237,93.0346887 L15.5383084,104.414093 L17.5464829,93 L18.9589167,104.414093 L21.5145693,93.0671151 L22.4647382,104.095861 L24.3469776,93.0844595 L25.9132633,104.095861 L28.0172237,93.0346887 L28.5383084,104.414093 L30.5464829,93 L31.9589167,104.414093 L34.5145693,93.0671151 L35.4647382,104.095861 L37.3469776,93.0844595 L38.9132633,104.095861 L41.0172237,93.0346887 L41.5383084,104.414093 L43.5464829,93 L44.9589167,104.414093 L47.5145693,93.0671151 L48.4647382,104.095861 L50.3469776,93.0844595 L51.7823677,105.309605 L53.6047297,93.9302003 L54.1258144,105.309604 L56.1339889,93.8955116 L57.5464227,105.309605 L60.1020753,93.9626267 L61.0522442,104.991373 L62.9344836,93.979971 L64.5007694,104.991373 L66.6047297,93.9302003 L67.1258144,105.309604 L69.1339889,93.8955116 L70.5464227,105.309605 L73.1020753,93.9626267 L74.0522442,104.991373 L75.9344836,93.979971 L77.5007694,104.991373 L79.6047297,93.9302003 L80.1258144,105.309604 L82.1339889,93.8955116 L83.5464227,105.309605 L86.1020753,93.9626267 L87.0522442,104.991373 L88.9344836,93.979971 L90.5007694,104.991373 C90.5007694,104.991373 91.7245407,96.0128348 92.3677444,93.0844595 C92.6568069,94.3823242 93.1258144,105.309604 93.1258144,105.309604 L95.1339889,93.8955116 L96.5464227,105.309605 L99.1020753,93.9626267 L100,100');

    const addButtonCross = new mojs.Shape({
      shape:          'cross',
      parent:         addButton.el,
      fill:           'none',
      stroke:         COLORS.VINOUS,
      radius:         6,
      strokeLinecap: 'round',
      scale:          1,
      x:              { [SHIFT]: SHIFT, curve: noise },
      y:              { [-SHIFT]: -SHIFT, curve: noise },
      duration:       DURATION,
      delay:          DELAY + 50,
      isTimelineLess: true,
      isShowStart:    true,
      isForce3d:      true
    });

    const ripple = new mojs.Shape({
      left: 0, top: 0,
      parent:     addButton.el,
      fill:       COLORS.VINOUS,
      scale:      { 0: 1 },
      opacity:    { .5: 0 },
      isForce3d:  true,
    });

    addButton.el.addEventListener('mouseenter', (e) => {
      ripple
        .tune({ x: e.layerX, y: e.layerY })
        .replay();
    });

    this.timeline = new mojs.Timeline({ repeat: 99999 });

    this.timeline.add(
        addButton,
        addButtonCross,
        bigReturnCircle, innerCircle
      );
    return this;
  }
}

export default VibroButton;