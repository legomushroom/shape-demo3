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

    const whiteBg = new mojs.Shape({
      parent:       this.parent,
      fill:         COLORS.WHITE,
      left:         '50%', top: '50%',
      radius:       500,
      duration:     500,
      scale:        { .25 : pool.getScaler( 500 ) },
      // scale:        .25,
      easing:       'cubic.out',
      // isShowStart:  true,
      isTimelineLess: true,
      isForce3d: true
    });

    const redBg = new mojs.Shape({
      parent:       this.parent,
      fill:         COLORS.RED,
      left:         '50%', top: '50%',
      radius:       500,
      duration:     500,
      delay:        50,
      scale:        { .25 : pool.getScaler( 500 ) },
      // scale:        .25,
      easing:       'quad.out',
      // isShowStart:  true,
      isTimelineLess: true,
      isForce3d:      true
    });

    const burst = new mojs.Burst({
      left: '50%', top: '50%',
      count:    6,
      radius:   { 100: 250 },
      parent:   this.parent,
      children: {
        fill:   'white',
        shape:  'line',
        stroke: [ COLORS.WHITE, COLORS.VINOUS ],
        strokeWidth: 12, 
        radius: 'rand(30, 60)',
        radiusY: 0,
        scale: { 1: 0 },
        // duration: 800,
        pathScale: 'rand(.5, 1)',
        isForce3d: true,
        degreeShift: 'rand(0, 360)',
        // angle: 90
      }
    });

    const burst2 = new mojs.Burst({
      count: 3,
      left: '50%', top: '50%',
      radius: { 100: 250 },
      parent: this.parent,
      angle: 90,
      children: {
        fill: 'white',
        shape: 'line',
        stroke: [ COLORS.WHITE, COLORS.VINOUS ],
        strokeWidth: 12, 
        radius: 'rand(30, 60)',
        radiusY: 0,
        scale: { 1: 0 },
        // duration: 800,
        pathScale: 'rand(.5, 1)',
        isForce3d: true
        // degreeShift: 90,
        // angle: 90
      }
    });

    const burst3 = new mojs.Burst({
      count:  3,
      left:   '50%', top: '50%',
      radius: { 0: 250 },
      parent: this.parent,
      children: {
        shape:      [ 'circle', 'rect' ],
        points:     5,
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
        redBg,
        // whiteBg,
        burst,
        // burst2,
        burst3,
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