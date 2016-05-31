import Module  from '../module';
import COLORS  from '../colors';
import pool    from '../../pool';

class ModalIn extends Module {
  _render () {

    const travelCircleExpand = new mojs.Shape({
      fill: COLORS.BLACK,
      radius: 126,
      left: '50%', top: '50%',
      // x: { 0: -70 },
      // y: { 0:  60 },
      scale: { .1: 1 },
      isTimelineLess: true,
      easing: 'cubic.out',
      duration: 400,
      isForce3d: true,
      opacity: { 0 : 1 }
      // opacity: .25
    });

    const travelCircle = new mojs.Shape({
      left: '50%', top: '50%',
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
      fill: COLORS.WHITE,
      left: '50%', top: '50%',
      radius:     500,
      scale:      { .1 : pool.getScaler( 500 ) },
      isForce3d:  true,
      easing:     'cubic.out',
      duration:   BG_DURATION,
      delay:      DELAY
    });

    const bg = new mojs.Shape({
      left: '50%', top: '50%',
      fill:       COLORS.BLACK,
      radius:     500,
      scale:      { 0: pool.getScaler( 500 ) },
      duration:   BG_DURATION,
      // opacity: .95,
      isForce3d:  true,
      delay:      DELAY + 50,
    });

    const modal = new mojs.Shape({
      left: '50%', top: '50%',
      parent:     this._o.el,
      className:  'modal-shape',
      shape:      'rect',
      x:          { [-100] : 0 },
      y:          { [100] : 0 },
      rx:         38,
      ry:         38,
      radiusX:    124,
      radiusY:    92,
      // angle:     -3,
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
      left: '50%', top: '50%',
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

    const buttonsTween = new mojs.Tween({
      delay: 75,
      onUpdate ( ep, p ) {
        var loveTransform = `translate(${-30*(1-ep)}px, ${20*(1-ep)}px) rotate(${3}deg)`,
            hateTransform = `translate(${30*(1-ep)}px, ${20*(1-ep)}px) rotate(${-2}deg)`,
            textTransform = `translate(${-50*(1-ep)}px, ${30*(1-ep)}px) scale(${Math.min( .3 + ep, 1 )})`;

        buttonLove.style[ 'transform' ] = loveTransform;
        buttonLove.style[ `${prefix}transform` ] = loveTransform;

        buttonHate.style[ 'transform' ] = hateTransform;
        buttonHate.style[ `${prefix}transform` ] = hateTransform;

        modalText.style[ 'transform' ] = textTransform;
        modalText.style[ `${prefix}transform` ] = textTransform;
      }
    });

    const corner = new mojs.Shape({
      left: '50%', top: '50%',
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
      left: '50%', top: '50%',
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

    const triangles = new ShapeStagger({
      left: '50%', top: '50%',
      parent:       this._o.el,
      quantifier:   2,
      shape:        'polygon',
      fill:         [ COLORS.RED, COLORS.WHITE ],
      y:            { [-115] : -105 },
      x:            { 'rand(70, 100)': 'rand(45, 55)' },
      radius:       'rand(8, 12)',
      scale:        { 1 : 0 },
      delay:        'stagger(250)',
      isForce3d:    true,
      isTimelineLess: true,
    });

    const lines = new ShapeStagger({
      left: '50%', top: '50%',
      parent:       this._o.el,
      quantifier:   3,
      fill:         'none',
      shape:        'curve',
      stroke:       [ COLORS.WHITE, COLORS.RED, COLORS.WHITE ],
      radiusX:      30,
      radiusY:      11,
      angle:        [ 133, 123 ],
      // x:            117,
      x:            [{ 70 : 117 }, { 55 : 117 } ],
      y:            76,
      strokeLinecap: 'round',
      strokeDasharray: '100%',
      strokeDashoffset: { '-100%' : '100%' },
      // isShowStart:  true,
      isShowEnd: false,
      isTimelineLess: true,
      // delay: 1600,
    });

    this.timeline = new mojs.Timeline();

    const modalTimeline = new mojs.Timeline({ delay: BG_DURATION + 100 });

    modalTimeline
      .add(
        modal, ripple, corner,
        triangles, lines,
        buttonsTween,
      );

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