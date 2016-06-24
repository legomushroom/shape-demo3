import Module       from '../module';
import COLORS       from '../colors';
import VibroButton  from './vibro-button';
import C            from '../../constants';
// import {Howl}       from 'howler';
import Modal  from '../../components/modal/modal';

const modal = new Modal;

class ShowButton extends Module {
  _render () {
    super._render();

    this.timeline = new mojs.Timeline({ speed: 1 });

    const duration = 800;

    const showBase = new  mojs.Shape({
      fill:         'none',
      radius:       20,
      x:            { [-150]: 0,  easing: 'cubic.out' },
      y:            { [90]: 0, easing: 'cubic.out' },
      isForce3d:    true,
      duration:     duration + 400
    });

    const vibroBtn = new VibroButton({ parent: showBase.el });
    this.vibroBtn  = vibroBtn;

    this.showBase = showBase;
    showBase.el.style[ 'z-index' ] = 5;

    const circle = new mojs.Shape({
      fill: COLORS.WHITE,
      parent: showBase.el,
      radius: 50,
      scale: { .4: 1 },
      duration: 650,
      opacity: {.5: 0},
      delay: duration + 100,
      isForce3d: true,
      easing: 'cubic.out'
    });

    const showUp = new mojs.Shape({
      fill:             'none',
      stroke:           COLORS.WHITE,
      parent:           showBase.el,
      radius:           { 0: 10 },
      angle:            { 560: 270 },
      strokeWidth:      { 0: 22, easing: 'cubic.inout' },
      strokeDasharray:  '100%',
      strokeDashoffset: { '-100%' : '0%', easing: 'cubic.in' },
      strokeLinecap:    'round',
      duration,
      isShowEnd:        false,
    })
    .then({
      scale: .75,
      duration: 250
    })
    .then({
      scale: 1,
      duration: 300,
      onComplete ( isFwd ) {
        isFwd && vibroBtn.timeline.play();
        isFwd && (vibroBtn.addButton.el.style[ 'opacity' ] = 1);
      }
    });
    
    const angle = 250;
    const bubbles = new mojs.Burst({
      parent:         showUp.el,
      count:          3,
      degree:         15,
      angle:          { [90 + angle] : 280 + angle },
      y:              { 0: -15 },
      x:              { 0: 35 },
      timeline:       { delay: 300 },
      radius:         { 0: 70 },
      children: {
        radius:       [ 10, 7 ],
        fill:         COLORS.WHITE,
        pathScale:    'rand(.5, 1.5)',
        duration:     600,
        isForce3d:    true,
      }
    });

    const angle2 = -340;
    const bubbles2 = new mojs.Burst({
      parent:         showUp.el,
      count:          3,
      degree:         25,
      angle:          { [90 + angle2] : 280 + angle2 },
      y:              { 0: 15 },
      timeline:       { delay: 0 },
      radius:        { 0: 70 },
      children: {
        radius:       [ 10, 7 ],
        fill:         COLORS.WHITE,
        pathScale:    'rand(.5, 1.5)',
        duration:     600,
        isForce3d:    true,
      }
    });

    const addButtonCross = new mojs.Shape({
      shape:          'cross',
      parent:         showUp.el,
      fill:           'none',
      stroke:         COLORS.VINOUS,
      radius:         6,
      strokeLinecap:  'round',
      isShowStart:    true,
      duration,
      angle:          { 0: -360 },
      scale:          { 0: 1 },
      y:              { 35: 0 },
      x:              { 35: 0 },
      isForce3d:      true,
    }).then({
      angle: -540,
      duration: duration/2,
    });

    this.timeline.add(
      bubbles,
      bubbles2,
      circle,
      showUp,
      showBase,
      addButtonCross
    );

    this._addListeners();

    return this;
  }
  _addListeners() {
    this.showBase.el.addEventListener('click', (e) => {
      var timeline = this.vibroBtn.timeline;
      this.showBase.el.style[ 'display' ] = 'none';
      modal.init();
    });

  }
}

export default ShowButton;