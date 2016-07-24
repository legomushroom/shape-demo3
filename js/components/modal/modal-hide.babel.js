import Module           from '../module';
import COLORS           from '../colors';
import Characters       from './characters';
import GeometricShapes  from './geometric-shapes';
import pool from '../../pool';

class ModalHide extends Module {
  _render () {
    super._render();
    this.parent = this._findEl( '#js-modal-hide-layer' );
    mojs.h.force3d( this.parent );

    this.timeline = new mojs.Timeline;

    const BG_OPTS = {
      parent:         this.parent,
      radius:         100,
      scale:          { .25 : 3 },
      duration:       500,
      easing:         'cubic.out',
      isForce3d:      true,
      isTimelineLess: true,
    }

    const whiteBigBg = new mojs.Shape({
      ...BG_OPTS,
      fill:         COLORS.WHITE,
      radius:       500,
      scale:        { .25 : pool.getScaler( 500 ) }
    });

    const redBigBg = new mojs.Shape({
      ...BG_OPTS,
      fill:         COLORS.RED,
      radius:       500,
      delay:        50,
      scale:        { .25 : pool.getScaler( 500 ) },
      easing:       'quad.out'
    });

    // BLAST
    const whiteBg = new mojs.Shape({
      ...BG_OPTS,
      radius:         BG_OPTS.radius-2,
      fill:           COLORS.WHITE,
      duration:       600,
    });

    const redBg = new mojs.Shape({
      ...BG_OPTS,
      fill:           COLORS.RED,
      duration:       600,
      delay:          50,
      easing:         'quad.out'
    });

    const burst = new mojs.Burst({
      count:      5,
      radius:     { 50: 250 },
      parent:     this.parent,
      children: {
        fill:         'white',
        shape:        'line',
        stroke:       [ COLORS.WHITE, COLORS.VINOUS ],
        strokeWidth:  12, 
        radius:       'rand(30, 60)',
        radiusY:      0,
        scale:        { 1: 0 },
        pathScale:    'rand(.5, 1)',
        degreeShift:  'rand(-360, 360)',
        isForce3d:    true,
      }
    });

    const burst2 = new mojs.Burst({
      count:  3,
      radius: { 0: 250 },
      parent: this.parent,
      angle:  90,
      children: {
        shape:      [ 'circle', 'rect' ],
        fill:       [ COLORS.WHITE, COLORS.VINOUS ],
        radius:     'rand(30, 60)',
        scale:      { 1: 0 },
        pathScale:  'rand(.5, 1)',
        isForce3d:  true
      }
    });

    const circle = new mojs.Shape({
      fill:     COLORS.WHITE,
      parent:   this.parent,
      left:     '50%', top: '50%',
      radius:   200,
      scale:    { .2: 1 },
      opacity: { 1: 0 },
      isForce3d: true,
      isShowEnd: false
    });

    const circle2 = new mojs.Shape({
      fill:     COLORS.WHITE,
      parent:   this.parent,
      left:     '50%', top: '50%',
      radius:   240,
      scale:    { .2: 1 },
      opacity: { 1: 0 },
      isForce3d: true,
      isShowEnd: false,
      easing: 'cubic.out',
      delay: 150,
    });

    this.characters = new Characters({ delay: 1600 });

    this.timeline
      .add(
        redBigBg, whiteBigBg, redBg, whiteBg,
        burst, burst2,
        circle,
        circle2,
        new GeometricShapes,
        this.characters
      );

    return this;
  }

  play () {
    this.timeline.play();
    mojs.h.setPrefixedStyle( this.parent, 'transform', 'none' );
  }
}

export default ModalHide;