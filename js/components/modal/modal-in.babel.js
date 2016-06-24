import Module  from '../module';
import COLORS  from '../colors';
import pool    from '../../pool';

class ModalIn extends Module {
  _render () {

    const travelCircleExpand = new mojs.Shape({
      fill:       COLORS.BLACK,
      radius:     126,
      scale:      { .1: 1 },
      easing:     'cubic.out',
      duration:   400,
      opacity:    { 0 : 1 },
      isForce3d:  true,
      isTimelineLess: true,
    });

    const travelCircle = new mojs.Shape({
      radius:         115,
      fill:           COLORS.WHITE,
      scale:          { .2: 1 },
      easing:         'back.in',
      isShowEnd:      false,
      isForce3d:      true,
      isTimelineLess: true,
    });

    const BG_DURATION = 250;
    const DELAY = 300;

    const circle = new mojs.Shape({
      fill:       COLORS.WHITE,
      radius:     500,
      scale:      { .1 : pool.getScaler( 500 ) },
      isForce3d:  true,
      easing:     'cubic.out',
      duration:   BG_DURATION,
      delay:      DELAY
    });

    const bg = new mojs.Shape({
      fill:       COLORS.BLACK,
      radius:     500,
      scale:      { 0: pool.getScaler( 500 ) },
      duration:   BG_DURATION,
      isForce3d:  true,
      delay:      DELAY + 50,
    });

    const modal = new mojs.Shape({
      parent:     this._o.el,
      className:  'modal-shape',
      shape:      'rect',
      x:          { [-100] : 0 },
      y:          { [100] : 0 },
      rx:         38,
      ry:         38,
      radiusX:    124,
      radiusY:    92,
      scaleX:     { 0: 1 },
      scaleY:     { 0: 1 },
      fill:       COLORS.WHITE,
      duration:   300,
      origin:     '15% 90%',
      easing:     'bounce.out',
      isForce3d:  true
    });

    modal.el.style[ 'overflow' ] = 'hidden';

    const modalInner = this._createElement( 'div' );
    modalInner.classList.add( 'modal__inner' );
    modalInner.innerHTML = document.querySelector('#js-modal-template').innerHTML;
    this._o.el.appendChild( modalInner );
    mojs.h.setPrefixedStyle( modalInner, 'transform-origin', '15% 90%' );

    const buttonLove = this._findEl('#js-button-love'),
          buttonHate = this._findEl('#js-button-hate'),
          modalText  = this._findEl('#js-modal-text');

    const prefix = mojs.h.prefix.css,
          style  = modalInner.style;

    const ripple = new mojs.Shape({
      fill:       COLORS.RED,
      rx:         38,
      ry:         38,
      radius:     142,
      x:          { [-150]: 0 },
      y:          { [150]: 0 },
      scale:      { 0: 1 },
      parent:     modal.el,
      isForce3d:  true,
      isShoeEnd:  false,
      duration:   400,
      isTimelineLess: true,
      onUpdate (ep, p) {
        var bounceP   = mojs.easing.bounce.out(p),
            transform = `scale(${bounceP})`;

        style[ 'transform' ] = transform;
        style[ `${prefix}transform` ] = transform;
        style.opacity = ep;
      }
    });

    const prefixedStyle = mojs.h.setPrefixedStyle.bind(mojs.h);
    const buttonsTween = new mojs.Tween({
      delay: 75,
      onUpdate ( ep, p ) {
        var loveTransform = `translate(${-30*(1-ep)}px, ${20*(1-ep)}px) rotate(${3}deg)`,
            hateTransform = `translate(${30*(1-ep)}px, ${20*(1-ep)}px) rotate(${-2}deg)`,
            textTransform = `translate(${-50*(1-ep)}px, ${30*(1-ep)}px) scale(${Math.min( .3 + ep, 1 )})`;

        prefixedStyle( buttonLove, 'transform', loveTransform );
        prefixedStyle( buttonHate, 'transform', hateTransform );
        prefixedStyle( modalText,  'transform', textTransform );
      }
    });

    const corner = new mojs.Shape({
      parent:     this._o.el,
      fill:       COLORS.RED,
      shape:      'polygon',
      radiusX:    45,
      radiusY:    45,
      x:          { [-100]: -75},
      y:          { [110]: 76},
      angle:      90,
      scale:      { 0: 1 },
      isForce3d:  true,
      duration:   250,
      isTimelineLess: true,
    });

    const cornerShadow = new mojs.Shape({
      fill:         'rgba(0,0,0,.25)',
      shape:        'polygon',
      parent:       corner.el,
      radiusX:      27,
      radiusY:      27,
      x:            20,
      y:            5,
      isForce3d:    true,
      isShoeEnd:    false,
      isShowStart:  true,
    });

    this.corner = corner;

    cornerShadow.el.style[ 'z-index' ] = '-1';

    const ShapeStagger = mojs.stagger( mojs.Shape );

    const triangles = [];
    const TRI_OPTS = {
      parent:       this._o.el,
      shape:        'polygon',
      y:            { [-115] : -105 },
      x:            { 'rand(70, 100)': 'rand(45, 55)' },
      radius:       'rand(8, 12)',
      scale:        { 1 : 0 },
      isForce3d:    true,
      isTimelineLess: true,
    }
    for ( let i = 0; i < 2; i++ ) {
      triangles.push(new mojs.Shape({
        ...TRI_OPTS,
        fill:         [ COLORS.RED, COLORS.WHITE ][i],
        delay:        i*250
      }));
    }

    const lines = [];
    const LINES_OPTS = {
      parent:           this._o.el,
      fill:             'none',
      shape:            'curve',
      radiusX:          30,
      radiusY:          11,
      y:                76,
      strokeLinecap:    'round',
      strokeDasharray:  '100%',
      strokeDashoffset: { '-100%' : '100%' },
      isShowEnd:        false,
      isTimelineLess:   true,
    }

    for ( let i = 0; i < 3; i++ ) {
      lines.push(new mojs.Shape({
        ...LINES_OPTS,
        stroke:       [ COLORS.RED, COLORS.WHITE, COLORS.RED ][i],
        x:            [{ 70 : 117 }, { 55 : 117 }, { 40 : 117 } ][i],
        angle:        [ 133, 123, 113 ][i],
        delay:        50*i
      }));
    }
  
    const modalTimeline = new mojs.Timeline({ delay: BG_DURATION + 100 });
    modalTimeline
      .add(
        modal, ripple, corner,
        triangles, lines,
        buttonsTween,
      );

    this.timeline = new mojs.Timeline;
    this.timeline
      .add(
        bg,
        modalTimeline,
        circle,
        travelCircle,
        travelCircleExpand
      );

    return this;
  }
}

export default ModalIn;