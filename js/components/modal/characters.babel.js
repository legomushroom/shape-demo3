import Module from '../module';
import COLORS  from '../colors';
import ShowButton  from '../../components/add-button/show-button';

const showButton = new ShowButton;

// showButton.play()

class Characters extends Module {
  _render () {
    this.timeline = new mojs.Timeline;

    const charOpts = {
      left: '50%', top: '50%',
      fill:         'none',
      radius:       10,
      delay:        this._o.delay,
      isShowEnd:    true,
      // origin:   '50% 100%'
      // isShowStart:  true
    }

    const CHAR_STEP  = 40;
    const SCALE_DOWN = .25;
    const SCALE_UP   = 2;

    const Y_SHIFT = -60;
    const X_SHIFT = CHAR_STEP/2;

    const FALLDOWN_OPTS = {
      scaleX: 2,
      scaleY: 2,
      y: Y_SHIFT,
      angle: 0,
      easing: 'bounce.out',
      duration: 1000,
    }

    const SHIFTX = 4*CHAR_STEP;
    const not = ( fn, base = 1 ) => { return (p) => { return base - fn(p); } }
    const bounceCurve   = mojs.easing.path('M0,-100 C0,-100 15.6877613,115.487686 32.0269814,74.203186 C62.0118605,-1.559962 100.057489,-0.0941416292 100.057489,-0.0941416292');
    const nBounceCurve  = not( bounceCurve, 2 );

    const elasticCurve  = mojs.easing.path('M0,0 L42.4468,99.9990418 C46.3646102,-8.62551409 51.8137449,77.8031065 53.2538649,98.8047514 C54.3071019,114.164379 57.4212363,145.777285 62.4147182,98.8047479 C62.4147182,98.8047504 64.981755,73.166208 70.2635684,98.8047479 C73.8553743,114.6133 81.1660962,98.8047504 100,99.9990418');

    const PRE_WORD = 'love';
    const WORD = PRE_WORD.split('');
    
    const elasticScale  = mojs.easing.path('M1.77635684e-15,-0.000957489014 L42.4468,-0.000958179367 C46.3646102,-108.625514 51.8137449,-22.1968935 53.2538649,-1.19524857 C54.3071019,14.1643792 57.4212363,45.7772847 62.4147182,-1.19525215 C62.4147182,-1.19524958 64.981755,-26.833792 70.2635684,-1.19525215 C73.8553743,14.6132996 81.1660962,-1.19524958 100,-0.000958179367');
    const nElasticScale = not( elasticScale, 2 );
    const char1 = new mojs.Shape({
      ...charOpts,
      y: { [Y_SHIFT]: -100 + Y_SHIFT },
      angle: { 0: -50 },
      x: -CHAR_STEP + X_SHIFT,
      scaleX: { 2: 2, curve: bounceCurve },
      scaleY: { 2: 2, curve: nBounceCurve },
      easing: 'quad.out',
      origin: '50% 100%',
      duration: 350,
    })
    .then({
      y: Y_SHIFT,
      angle: { to: -100, curve: elasticCurve },
      easing: 'bounce.out',
      duration: 850
    })
    const character = document.createElement('div');
    character.classList.add( 'character' );
    character.innerText = WORD[1];
    char1.el.appendChild( character );

    const char2 = new mojs.Shape({
      ...charOpts,
      y: { [Y_SHIFT]: -125 + Y_SHIFT },
      angle: { [-90]: -50 },
      x: X_SHIFT,
      scaleX: { 0: 2, curve: bounceCurve },
      scaleY: { 2: 2, curve: nBounceCurve },
      easing: 'quad.out',
      origin: '50% 100%',
      delay: charOpts.delay + 75,
      duration: 350,
    })
    .then({
      y: Y_SHIFT,
      angle: { to: 100, curve: elasticCurve },
      easing: 'bounce.out',
      duration: 950
    })
    const character2 = document.createElement('div');
    character2.classList.add( 'character' );
    character2.innerText = WORD[2];
    char2.el.appendChild( character2 );

    const char3 = new mojs.Shape({
      ...charOpts,
      y: { [Y_SHIFT]: -150 + Y_SHIFT },
      angle: { 0 : -180, easing: 'cubic.in' },
      x: -2*CHAR_STEP + X_SHIFT,
      scaleY: { 2: 2, curve: bounceCurve },
      scaleX: { 2: 2, curve: nBounceCurve },
      easing: 'quad.out',
      delay: charOpts.delay + 250,
      duration: 350,
    })
    .then({
      y: Y_SHIFT - 10,
      angle: { to: -360, easing: 'expo.out' },
      easing: 'bounce.out',
      duration: 1000,
      origin: '50% 100%',
    })
    const character3 = document.createElement('div');
    character3.classList.add( 'character' );
    character3.innerText = WORD[0];
    char3.el.appendChild( character3 );


    const char4 = new mojs.Shape({
      ...charOpts,
      y: { [Y_SHIFT]: -125 + Y_SHIFT },
      angle: { 0 : 180, easing: 'cubic.in' },
      x:      CHAR_STEP + X_SHIFT,
      scaleY: { 2: 2, curve: nBounceCurve },
      scaleX: { 2: 2, curve: bounceCurve },
      easing: 'quad.out',
      delay: charOpts.delay + 500,
      duration: 300,
    })
    .then({
      y: Y_SHIFT - 10,
      scaleX: { 2: 2, curve: elasticScale },
      scaleY: { 2: 2, curve: nElasticScale },
      angle: { to: 360, easing: 'expo.out' },
      easing: 'bounce.out',
      duration: 1000,
      // origin: '50% 100%',
    })
    const character4 = document.createElement('div');
    character4.classList.add( 'character' );
    character4.innerText = WORD[3];
    char4.el.appendChild( character4 );

    const burst1 = new mojs.Burst({
      left: '50%', top: '50%',
      degree:   20,
      count:    2,
      angle:   -90,
      x:       -150 + X_SHIFT,
      y:       -100 + Y_SHIFT,
      radius:   { 10: 100 },
      timeline: { delay: 900 },
      childOptions: {
        shape:        'line',
        scale:        { 1 : 0 },
        radius:       'rand(8, 18)',
        radiusY:      0,
        stroke:       COLORS.VINOUS,
        strokeWidth:  7,
        duration:     450,
      }
    });

    const burst2 = new mojs.Burst({
      left: '50%', top: '50%',
      degree:   20,
      count:    2,
      // angle:   -90,
      x:        CHAR_STEP + X_SHIFT,
      y:        Y_SHIFT,
      radius:   { 10: 100 },
      timeline: { delay: 2200 },
      childOptions: {
        shape:        'line',
        scale:        { 1 : 0 },
        radius:       'rand(8, 18)',
        radiusY:      0,
        stroke:       COLORS.VINOUS,
        strokeWidth:  7,
        duration:     450,
      }
    });

    const line = new mojs.Shape({
      shape: 'line',
      stroke: COLORS.VINOUS,
      radius:  40,
      radiusY: 0,
      x:      -CHAR_STEP + X_SHIFT,
      y:       40 + Y_SHIFT,
      scaleX: { 0 : 1 },
      strokeWidth: 4,
      left: '50%', top: '50%',
      delay: 1550,
      duration: 100,
      isTimelineLess: true,
      isShowEnd: false,
      onComplete () {
        showButton.timeline.replay();
      }
    });

    const line2 = new mojs.Shape({
      shape: 'line',
      stroke: COLORS.VINOUS,
      radius:  15,
      radiusY: 0,
      x:      { X_SHIFT : CHAR_STEP + X_SHIFT },
      y:       40 + Y_SHIFT,
      scaleX: { 1 : 0 },
      strokeWidth: 4,
      left: '50%', top: '50%',
      delay: 1550,
      duration: 400,
      isTimelineLess: true,
      isShowEnd: false
    });
    
    return this.timeline
      .add(
        char1, char2, char3, char4,
        burst1, burst2,
        line, line2
      );
  }
}

export default Characters;