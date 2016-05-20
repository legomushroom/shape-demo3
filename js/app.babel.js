import Polyfill   from 'classlist-polyfill';
import MojsPlayer from 'mojs-player'
import Module     from './components/module';
import COLORS     from './components/colors';
import C          from './components/constants';
import {Howl}     from 'howler';

// require('../css/main.postcss.css');
// const CLASSES = require('../css/main.postcss.css.json');

class Demo extends Module {
  /*
    Method for initial module's render.
    @private
  */
  _render () {
    // super._render();

    const DURATION = 950,
          DELAY    = 1200,
          SHIFT    = 25;

    const vibroSound = new Howl({
      rate: .9,
      urls: ['sounds/vibro.mp3']
    });


    const noise = mojs.easing.path('M0,100 C0,100 2.08241272,101.287388 3.78271484,102.328264 C5.35552883,99.9999999 7.00048828,95.208496 7.00048828,95.208496 L10.1762695,103.816964 L12.7734375,95.9547991 L19.3125,102.328264 L22.2539062,95.208496 L27.0786839,106.645089 L29.2555809,93.3549108 L32.0340385,103.816964 L35.3459816,94.6015626 L38.3783493,103.092634 L41.0513382,95.9547991 L43.7739944,106.645089 L45.6729927,96.8973214 L50,105.083147 L53.3504448,93.3549108 L57.7360497,103.816964 L60.8616066,95.9547991 L65.0345993,103.092634 L68.6997757,97.5106029 L71.6646194,102.03125 L75.5066986,96.5672433 L78.2949219,102.652344 L81.0313873,96.8973214 L84.0174408,102.328264 L86.0842667,97.7332592 L88.7289352,101.606306 L91.1429977,98.3533763 L94.3822556,101.287388 L97.0809174,98.7254467 L100,100');
    const addButton = new mojs.Shape({
      fill:           COLORS.WHITE,
      radius:         16,
      left:           '50%',
      top:            '50%',
      isShowStart:    true,
      duration:       DURATION,
      delay:          DELAY,
      scale:          { 1: 1.35 },
      y:              10,
      onStart () {
        vibroSound.play();
      },
      onUpdate: ( ep, p ) => {
        var proc = noise( p );
        var coefX = Math.random() <= .5 ? 1 : -1;
        var coefY = Math.random() <= .5 ? 1 : -1;
        addButtonCross.el.style[ 'transform' ] =
          `translateX( ${1*SHIFT*proc}px )`;
      }
    }).then({
      scale: 1,
      duration: .5*DURATION
    });

    addButton.el.style[ 'cursor' ] = 'pointer';

    const bigReturnCircle = new mojs.Shape({
      fill:         COLORS.WHITE,
      fillOpacity:  .65,
      radius:       42,
      left: '50%',  top: '50%',
      parent:       addButton.el,
      scale:        { 0: 1 },
      // isShowStart:  true,
      opacity:      { 1 : 0},
      duration:     1.5*DURATION,
      delay:        DELAY + .7*DURATION,
      easing:       'cubic.out',
      isTimelineLess: true
    });

    const innerCircle = new mojs.Shape({
      fill:           COLORS.RED,
      parent:         addButton.el,
      fillOpacity:    .15,
      radius:         13,
      left:           '50%', top: '50%',
      scale:          { 0: 1 },
      isShowStart:    true,
      opacity:        { 0 : 1 },
      duration:       .95*DURATION,
      delay:          DELAY,
      easing:         'cubic.out'
    }).then({
      scale:          0,
      opacity:        0,
      duration:       .25*DURATION,

    });

    const addButtonCross = new mojs.Shape({
      shape:          'cross',
      parent:         addButton.el,
      left:           '50%',
      top:            '50%',
      fill:           'none',
      stroke:         COLORS.VINOUS,
      radius:         6,
      strokeLinecap: 'round',
      isShowStart:    true,
      duration:       DURATION,
      delay:          DELAY + 50,
      isTimelineLess: true
    });

    const showUp2 = new mojs.Shape({
      fill: 'none',
      stroke: COLORS.WHITE,
      radius: { 0: 10 },
      angle: { 0: -290 },
      strokeWidth: { 0: 22 },
      left: '80%', top: '80%',
      strokeDasharray: '100%',
      strokeDashoffset: { '-100%' : '0%' },
      strokeLinecap: 'round',
      duration: 1500
    });

    const BubbleStagger = mojs.stagger( mojs.Shape );

    const bubbles = new BubbleStagger({
      quantifier:     2,
      // parent:         showUp2.el,
      delay:          550,
      left: '80%', top: '80%',
      radius:         [ 10, 7 ],
      scale:          { 1: 0 },
      fill:           'white',
      y:              [ { 0: -30 }, { 0: -15 } ],
      x:              [ { 15: 25 }, { 15: 30 } ],
      duration:       400,
      isForce3d:      true
      // pathScale:      [ 'rand(.3, .5)', 'rand(.5, 1)' ],
      // direction:     [ 1, -1 ]
    });

    const showUp = new mojs.Shape({
      fill: 'none',
      stroke: COLORS.WHITE,
      radius: { 0: 10 },
      angle: { 560: 270 },
      strokeWidth: { 0: 22 },
      left: '80%', top: '80%',
      strokeDasharray: '100%',
      strokeDashoffset: { '-100%' : '0%' },
      strokeLinecap: 'round',
      duration: 1000
    })

    const addButtonCross2 = new mojs.Shape({
      shape:          'cross',
      parent:         showUp.el,
      left:           '50%',
      top:            '50%',
      fill:           'none',
      stroke:         COLORS.VINOUS,
      radius:         6,
      strokeLinecap: 'round',
      isShowStart:    true,
      duration:       DURATION,
      angle:         { 0: 180 },
      // strokeWidth:    { 4: 2 },
      // stroke:       { [COLORS.WHITE]: COLORS.VINOUS },
      scale: { 0: 1 },
      y:     { 25: 0 },
      // delay:          DELAY + 50,
      isTimelineLess: true
    });
    
    const mainTimeline = new mojs.Timeline;

    mainTimeline.add(
      showUp,
      // showUp2,
      addButtonCross2,
      bubbles
      // addButton, addButtonCross,
      // bigReturnCircle, innerCircle
    );

    ;( new MojsPlayer({ add: mainTimeline }) )
      .el.style[ 'z-index' ] = 10;

  }
}

new Demo;

export default Demo;