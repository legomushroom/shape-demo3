
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
      delay: 100,
      duration: 300,
      origin: '15% 90%',
      easing: 'bounce.out',
      isForce3d: true
    });

    modal.el.style[ 'overflow' ] = 'hidden';
    modal.el.style[ 'border-radius' ] = '38px';

    const ripple = new mojs.Shape({
      fill:   COLORS.RED,
      // shape: 'rect',
      rx: 38,
      ry: 38,
      // radiusX: 124,
      // radiusY: 92,
      radius: 140,
      x:       { [-150]: 0 },
      y:       { [150]: 0 },
      scale:   { 0: 1 },
      parent:  modal.el,
      isForce3d: true,
      isShoeEnd: false,
      // opacity: { 1: 0 },
      left:    '50%', top: '50%',
      delay:    150,
      duration: 400,
    });

    const corner = new mojs.Shape({
      fill:   COLORS.RED,
      shape: 'polygon',
      // rx: 38,
      // ry: 38,
      // radiusX: 124,
      // radiusY: 92,
      radiusX: 15,
      radiusY: 35,
      x:       -75,
      y:       95,
      angle:    72,
      scale:   { 0: 1 },
      // parent:  modal.el,
      isForce3d: true,
      isShoeEnd: false,
      // opacity: { 1: 0 },
      left:    '50%', top: '50%',
      delay:    150,
      duration: 400,
    });


    return [ bg, modal, ripple, corner ];

  }
}

export default Modal;
