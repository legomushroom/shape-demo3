
import Module from '../module';
import COLORS from '../colors';

class Modal extends Module {
  _render () {

    const bg = new mojs.Shape({
      left: '50%', top: '50%',
      fill:  COLORS.BLACK,
      radius: 500,
      scale:  { 0: 2 },
      oapcity: .95,
      isForce3d: true
    });

    const modal = new mojs.Shape({
      shape: 'rect',
      rx: 38,
      ry: 38,
      radiusX: 124,
      radiusY: 92,
      left: '50%', top: '50%',
      angle:  -3,
      scaleX: { 0: 1 },
      scaleY: { 0: 1 },
      fill: COLORS.WHITE,
      // delay: 50,
      duration: 300,
      origin: '15% 90%',
      easing: 'bounce.out',
      isForce3d: true
    });

    modal.el.style[ 'overflow' ] = 'hidden';
    modal.el.style[ 'border-radius' ] = '35px';
    // modal.el.style[ 'border' ] = '1px solid white';

    const ripple = new mojs.Shape({
      fill:   COLORS.RED,
      // shape: 'rect',
      rx: 38,
      ry: 38,
      // radiusX: 124,
      // radiusY: 92,
      radius: 142,
      x:       { [-150]: 0 },
      y:       { [150]: 0 },
      scale:   { 0: 1 },
      parent:  modal.el,
      isForce3d: true,
      isShoeEnd: false,
      // opacity: { 1: 0 },
      left:    '50%', top: '50%',
      // delay:    50,
      duration: 400,
    });

    const corner = new mojs.Shape({
      fill:   COLORS.RED,
      shape: 'polygon',
      // rx: 38,
      // ry: 38,
      // radiusX: 124,
      // radiusY: 92,
      radiusX: 45,
      radiusY: 45,
      x:       { [-100]:   -75},
      y:       { 110: 74},
      angle:    90,
      scale:   { 0: 1 },
      // parent:  modal.el,
      isForce3d: true,
      isShoeEnd: false,
      // opacity: { 1: 0 },
      left:    '50%', top: '50%',
      // delay:    75,
      duration: 250,
      // easing: 'bounce.out'
    });

    const ShapeStagger = mojs.stagger( mojs.Shape );

    const triangles = new ShapeStagger({
      left: '50%', top: '50%',
      quantifier:   2,
      shape: 'polygon',
      fill:   [ COLORS.RED, COLORS.WHITE ],
      y:      { [-115] : -105 },
      x:      { 'rand(70, 100)': 'rand(45, 55)' },
      radius:   'rand(8, 12)',
      scale:    { 1 : 0 },
      delay: 'stagger(250)',
      isTimelineLess: true,
      isForce3d: true
    });

    const lines = new ShapeStagger({
      left: '50%', top: '50%',
      quantifier:   3,
      fill:         'none',
      shape:        'curve',
      stroke:       [ COLORS.WHITE, COLORS.RED, COLORS.WHITE ],
      isShowStart:  true,
      radiusX:      30,
      radiusY:      11,
      angle:        [ 133, 123 ],
      // x:            117,
      x:            [{ 70 : 117 }, { 55 : 117 } ],
      y:            76,
      strokeLinecap: 'round',
      // delay:        'stagger(50)',
      strokeDasharray: '100%',
      strokeDashoffset: { '-100%' : '100%' }
    });

    console.log(lines)

    return [
        bg, modal, ripple, corner,
        lines, triangles
      ];
  }
}

export default Modal;
