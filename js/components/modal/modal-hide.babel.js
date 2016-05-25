import Module from '../module';
import COLORS  from '../colors';

class ModalHide extends Module {
  _render () {
    this.timeline = new mojs.Timeline;

    document.body.style[ 'background' ] = COLORS.BLACK;

    const bg = new mojs.Shape({
      fill:         COLORS.RED,
      left:         '50%', top: '50%',
      radius:       500,
      duration:     200,
      scale:        { .25 : 1.5 },
      easing:       'linear.none',
      isShowStart:  true,
      isTimelineLess: 1
    });

    const shift = Math.random()*360;
    const burst = new mojs.Burst({
      fill: 'none',
      count: 3,
      left: '50%', top: '50%',
      radius: { 75 : 300 },
      // angle: 20,
      y: -75,
      degree: 100,
      childOptions: {
        shape: 'line',
        radius: 'rand(40, 60)',
        strokeWidth: 4,
        pathScale: 'rand(0.5, 1)',
        // degreeShift: shift,
        // angle: shift,
        // radiusX: 2,
        scaleX: { 1: 0  },
        scaleY: { 1: .5  },
        stroke: [ COLORS.WHITE, COLORS.VINOUS ],
        duration: 300,
        isForce3d: true,
        delay: 'rand(100, 200)'
      }
    });

    console.log(burst)

    const charOpts = {
      left: '50%', top: '50%',
      fill:         COLORS.WHITE,
      radius:       10,
      isShowStart:  true
    }

    const CHAR_STEP  = 40;
    const SCALE_DOWN = .25;
    const SCALE_UP   = 2;

    const SLAP_OPTS = {
      scaleX: SCALE_UP,
      scaleY: SCALE_DOWN,
      y: 0,
      angle: 0,
      duration: 75
    }

    const SHIFTX = 4*CHAR_STEP;
    const bounceCurve = mojs.easing.path('M0,-100 C0,-100 15.6877613,115.487686 32.0269814,74.203186 C62.0118605,-1.559962 100.057489,-0.0941416292 100.057489,-0.0941416292');
    const nBounceCurve = (p) => { return 2 - bounceCurve(p) };
    const char1 = new mojs.Shape({
      ...charOpts,
      y: { [-100] : -200 },
      x: { 0: -2*CHAR_STEP, easing: 'linear.none' },
      angle: -11,
      scaleX: { [SCALE_DOWN] : 1 },
      scaleY: { [SCALE_UP] : 1 },
      easing: 'quad.out',
      origin: '50% 100%'
    })
    .then({
      scaleX: SCALE_DOWN,
      scaleY: SCALE_UP,
      x: { to: -4*CHAR_STEP, easing: 'linear.none' },
      y: 0,
      angle: { 0: 11 },
      easing: 'sin.in',
    })
    .then(SLAP_OPTS)
    .then({
      scaleX: { 1: 1, curve: bounceCurve },
      scaleY: { 1: 1, curve: nBounceCurve },
      x: { to: -2.5*CHAR_STEP, easing: 'linear.none' },
      y: -175,
      angle: { to: 20, easing: 'quad.out' },
      duration: 350,
    })
    .then({
      x: { to: -CHAR_STEP, easing: 'linear.none' },
      y: 0,
      scaleX: SCALE_DOWN,
      scaleY: SCALE_UP,
      angle:  { 0: -10 },
      easing: 'quad.in',
    })
    .then(SLAP_OPTS);

    const char2 = new mojs.Shape({
      ...charOpts,
      shape: 'rect',
      y: { [-100] : -220 },
      x: { 0: -1.75*CHAR_STEP, easing: 'linear.none' },
      angle: -11,
      scaleX: { [SCALE_DOWN] : 1 },
      scaleY: { [SCALE_UP]: 1 },
      easing: 'quad.out',
      delay:  100,
      duration: 425,
      origin: '50% 100%'
    })
    .then({
      scaleX: SCALE_DOWN,
      scaleY: SCALE_UP,
      x: { to: -3.5*CHAR_STEP, easing: 'linear.none' },
      y: -55,
      angle: { to: 5, easing: 'cubic.out' },
      easing: 'quad.in',
      duration: 350,
    })
    .then({
      ...SLAP_OPTS,
      duration: 40,
      y:   -95,
    })
    .then({
      scaleX: { 1: 1, curve: bounceCurve },
      scaleY: { 1: 1, curve: nBounceCurve },
      x: { to: -2.75*CHAR_STEP, easing: 'linear.none' },
      y: -275,
      angle: 0,
      easing: 'cubic.out',
      duration: 450,
    }).then({
      x: { to: -2*CHAR_STEP, easing: 'linear.none' },
      y: 0,
      scaleX: SCALE_DOWN,
      scaleY: SCALE_UP,
      angle:   { 180: 180, curve: 'quad.out' },
      origin:  { '50% 50%' : '50% 50%' },
      easing: 'quad.in',
      duration: 450,
    }).then({
      ...SLAP_OPTS,
      angle:  { 360: 360 },
      easing: 'quad.out',
      origin: '50% 100%'
    });

    const DELAY2 = 200;
    
    const char3 = new mojs.Shape({
      ...charOpts,
      shape: 'rect',
      y: { [-100] : -200 },
      x: { 0: 1.5*CHAR_STEP, easing: 'linear.none' },
      angle: -11,
      scaleX: { [SCALE_DOWN] : 1 },
      scaleY: { [SCALE_UP] : 1 },
      easing: 'quad.out',
      origin: '50% 100%',
      delay: DELAY2
    })
    .then({
      scaleX: SCALE_DOWN,
      scaleY: SCALE_UP,
      x: { to: 3*CHAR_STEP, easing: 'linear.none' },
      y: 0,
      angle: { 0: -11 },
      easing: 'quad.in',
      duration: 400,
    })
    .then(SLAP_OPTS)
    .then({
      x: { to: 1.5*CHAR_STEP, easing: 'linear.none' },
      y: -155,
      duration: 300,
      angle: -200,
      easing: 'quad.out',
    })
    .then({
      x: { to: 0, easing: 'linear.none' },
      y: 0,
      angle: -360,
      easing: 'quad.in',
      duration: 350,
    });

    const char4 = new mojs.Shape({
      ...charOpts,
      shape: 'polygon',
      points: 5,
      y: { [-100] : -220 },
      x: { 0: .75*CHAR_STEP, easing: 'linear.none' },
      angle: -11,
      scaleX: { [SCALE_DOWN] : 1 },
      scaleY: { [SCALE_UP]: 1 },
      easing: 'quad.out',
      delay:  100 + DELAY2,
      duration: 425,
      origin: '50% 100%'
    })
    .then({
      scaleX: SCALE_DOWN,
      scaleY: SCALE_UP,
      x: { to: 2.5*CHAR_STEP, easing: 'linear.none' },
      y: -55,
      angle: { to: 5, easing: 'cubic.out' },
      easing: 'quad.in',
      duration: 350,
    })
    .then({
      ...SLAP_OPTS,
      duration: 40,
      y:   -95,
    })
    .then({
      scaleX: { 1: 1, curve: bounceCurve },
      scaleY: { 1: 1, curve: nBounceCurve },
      x: { to: 1.75*CHAR_STEP, easing: 'linear.none' },
      y: -250,
      angle: 0,
      easing: 'cubic.out',
      duration: 450,
    }).then({
      x: { to: 1*CHAR_STEP, easing: 'linear.none' },
      y: 0,
      scaleX: SCALE_DOWN,
      scaleY: SCALE_UP,
      angle:   { 180: 180, curve: 'quad.out' },
      origin:  { '50% 50%' : '50% 50%' },
      easing: 'quad.in',
      duration: 450,
    }).then({
      ...SLAP_OPTS,
      angle:  { 360: 360 },
      easing: 'quad.out',
      origin: '50% 100%'
    });

    return this.timeline
      .add(
        bg,
        burst,
        char1, char2, char3, char4
      );
  }
}

export default ModalHide;