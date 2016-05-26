import Module           from '../module';
import COLORS           from '../colors';
import Characters       from './characters';
import GeometricShapes  from './geometric-shapes';

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
      // scale:        .25,
      easing:       'linear.none',
      isShowStart:  true,
      isTimelineLess: 1
    });

    // const burst = new mojs.Burst({
    //   degree: 75,
    //   count: 4,
    //   left: '50%', top: '50%',
    //   radius: { 100: 250 },
    //   childOptions: {
    //     shape: 'line',
    //     stroke: [ COLORS.WHITE, COLORS.VINOUS ],
    //     radius: 'rand(30, 60)',
    //     scale: { 1: 0 },
    //     duration: 2000,
    //     pathScale: 'rand(.25, 1)',
    //     degreeShift: 90,
    //     angle: 90
    //   }
    // });

    return this.timeline
      .add(
        bg,
        // burst,
        new GeometricShapes,
        new Characters({ delay: 1600 })
      );
  }
}

export default ModalHide;