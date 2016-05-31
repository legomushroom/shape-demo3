import Module from '../module';
import COLORS  from '../colors';

class GeometricShapes extends Module {
  _render () {
    this.timeline = new mojs.Timeline;

    const parent = this._findEl( '#js-modal-hide-layer' );


    const charOpts = {
      left: '50%', top: '50%',
      fill:         COLORS.WHITE,
      radius:       10,
      // isShowStart:  true,
      isShowEnd: false,
      parent
    }

    const CHAR_STEP  = 40;
    const SCALE_DOWN = .25;
    const SCALE_UP   = 2;

    const Y_SHIFT = 0;
    // const Y_SHIFT = -60;
    const X_SHIFT = CHAR_STEP/2;

    const SLAP_OPTS = {
      scaleX: SCALE_UP,
      scaleY: SCALE_DOWN,
      y: Y_SHIFT,
      angle: 0,
      duration: 75
    }

    const SHIFTX = 4*CHAR_STEP;
    const bounceCurve = mojs.easing.path('M0,-100 C0,-100 15.6877613,115.487686 32.0269814,74.203186 C62.0118605,-1.559962 100.057489,-0.0941416292 100.057489,-0.0941416292');
    const nBounceCurve = (p) => { return 2 - bounceCurve(p) };
    const char1 = new mojs.Shape({
      ...charOpts,
      y: { [-100 + Y_SHIFT] : -200 },
      x: { [X_SHIFT]: -2*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      angle: -11,
      scaleX: { [SCALE_DOWN] : 1 },
      scaleY: { [SCALE_UP] : 1 },
      easing: 'quad.out',
      origin: '50% 100%'
    })
    .then({
      scaleX: SCALE_DOWN,
      scaleY: SCALE_UP,
      x: { to: -4*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: Y_SHIFT,
      angle: { 0: 11 },
      easing: 'sin.in',
    })
    .then(SLAP_OPTS)
    .then({
      scaleX: { 1: 1, curve: bounceCurve },
      scaleY: { 1: 1, curve: nBounceCurve },
      x: { to: -2.5*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: -175 + Y_SHIFT,
      angle: { to: 20, easing: 'quad.out' },
      duration: 350,
    })
    .then({
      x: { to: -CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: Y_SHIFT,
      scaleX: SCALE_DOWN,
      scaleY: SCALE_UP,
      angle:  { 0: -10 },
      easing: 'quad.in',
    })
    .then(SLAP_OPTS);

    const char2 = new mojs.Shape({
      ...charOpts,
      shape: 'rect',
      y: { [-100 + Y_SHIFT] : -220 },
      x: { [X_SHIFT]: -1.75*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
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
      x: { to: -3.5*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: -55 + Y_SHIFT,
      angle: { to: 5, easing: 'cubic.out' },
      easing: 'quad.in',
      duration: 350,
    })
    .then({
      ...SLAP_OPTS,
      duration: 40,
      y:   -95 + Y_SHIFT,
    })
    .then({
      scaleX: { 1: 1, curve: bounceCurve },
      scaleY: { 1: 1, curve: nBounceCurve },
      x: { to: -2.75*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: -275 + Y_SHIFT,
      angle: 0,
      easing: 'cubic.out',
      duration: 450,
    }).then({
      x: { to: -2*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: Y_SHIFT,
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
      y: { [-100 + Y_SHIFT] : -200 },
      x: { [X_SHIFT]: 1.5*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
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
      x: { to: 3*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: Y_SHIFT,
      angle: { 0: -11 },
      easing: 'quad.in',
      duration: 400,
    })
    .then(SLAP_OPTS)
    .then({
      x: { to: 1.5*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: -155 + Y_SHIFT,
      duration: 300,
      angle: -200,
      easing: 'quad.out',
    })
    .then({
      x: { to: X_SHIFT, easing: 'linear.none' },
      y: Y_SHIFT,
      angle: -360,
      easing: 'quad.in',
      duration: 350,
    });

    const char4 = new mojs.Shape({
      ...charOpts,
      shape: 'polygon',
      points: 5,
      y: { [-100 + Y_SHIFT] : -220 },
      x: { [X_SHIFT]: 1.25*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
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
      x: { to: 2.5*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: -55 + Y_SHIFT,
      angle: { to: 5, easing: 'cubic.out' },
      easing: 'quad.in',
      duration: 350,
    })
    .then({
      ...SLAP_OPTS,
      duration: 40,
      y:   -95 + Y_SHIFT,
    })
    .then({
      scaleX: { 1: 1, curve: bounceCurve },
      scaleY: { 1: 1, curve: nBounceCurve },
      x: { to: 1.75*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: -250 + Y_SHIFT,
      angle: 0,
      easing: 'cubic.out',
      duration: 450,
    }).then({
      x: { to: 1*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: Y_SHIFT,
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
      .add( char1, char2, char3, char4 );
  }
}

export default GeometricShapes;