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

    const charOpts = {
      left: '50%', top: '50%',
      fill:         COLORS.WHITE,
      radius:       10,
      isShowStart:  true
    }

    const CHAR_STEP = 40;

    const SHIFTX = 4*CHAR_STEP;
    const bounceCurve = mojs.easing.path('M0,-100 C0,-100 15.6877613,115.487686 32.0269814,74.203186 C62.0118605,-1.559962 100.057489,-0.0941416292 100.057489,-0.0941416292');
    const nBounceCurve = (p) => { return 2 - bounceCurve(p) };
    const char1 = new mojs.Shape({
      ...charOpts,
      y: { [-100] : -200 },
      x: { 0: -2*CHAR_STEP, easing: 'linear.none' },
      angle: -11,
      scaleX: { .25 : 1 },
      scaleY: { 2 : 1 },
      easing: 'quad.out',
      origin: '50% 100%'
    })
    .then({
      scaleX: .25,
      scaleY: 2,
      x: { to: -4*CHAR_STEP, easing: 'linear.none' },
      y: 0,
      angle: { 0: 11 },
      easing: 'sin.in',
    })
    .then({
      scaleX: 2,
      scaleY: .25,
      y: 0,
      angle: 0 ,
      duration: 75,
    })
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
      scaleX: .25,
      scaleY: 2,
      angle:  { 0: -10 },
      easing: 'quad.in',
    })
    .then({
      scaleX: 2,
      scaleY: .25,
      angle:  0,
      duration: 75
    });

    const char2 = new mojs.Shape({
      ...charOpts,
      shape: 'rect',
      y: { [-100] : -220 },
      x: { 0: -1.75*CHAR_STEP, easing: 'linear.none' },
      angle: -11,
      scaleX: { .25 : 1 },
      scaleY: { 2 : 1 },
      easing: 'quad.out',
      delay:  100,
      duration: 425,
      origin: '50% 100%'
    })
    .then({
      scaleX: .25,
      scaleY: 2,
      x: { to: -3.5*CHAR_STEP, easing: 'linear.none' },
      y: -55,
      angle: { to: 5, easing: 'cubic.out' },
      easing: 'quad.in',
      duration: 350,
    })
    .then({
      scaleX: 2,
      scaleY: .25,
      angle:  0,
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
      duration: 400,
    }).then({
      x: { to: -2*CHAR_STEP, easing: 'linear.none' },
      y: 0,
      scaleX: .25,
      scaleY: 2,
      angle:   { 180: 180, curve: 'sin.out' },
      origin:  { '50% 50%' : '50% 50%' },
      easing: 'cubic.in',
      duration: 450,
    }).then({
      scaleX: 2,
      scaleY: .25,
      // angle:  0,
      duration: 75,
      easing: 'quad.out',
      origin: '50% 75%'
    })

    // .then({
    //   scaleX: {
    //     to: 1,
    //     isPropertyCurve: true,
    //     easing: mojs.easing.path('M0,100 L30.2646503,208.450653 L71.5762558,208.450653 L100,0')
    //   },
    //   scaleY: { to: 1, easing: 'expo.out' },
    //   y: -150,
    //   angle: 0,
    //   duration: 250,
    //   origin: '50% 100%',
    //   // easing: 'quad.out'
    // });

    const char3 = new mojs.Shape({
      ...charOpts,
      shape: 'polygon',
      points: 5
    });

    const char4 = new mojs.Shape({
      ...charOpts,
      shape: 'rect'
    });

    return this.timeline
      .add(
        bg,
        char1, char2, char3, char4
      );
  }
}

export default ModalHide;