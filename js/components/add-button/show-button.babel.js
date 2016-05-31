import Module       from '../module';
import COLORS       from '../colors';
import VibroButton  from './vibro-button';
import C            from '../../constants';
import {Howl}       from 'howler';
import Modal  from '../../components/modal/modal';

const modal = new Modal;

class ShowButton extends Module {
  _render () {
    super._render();

    this.timeline = new mojs.Timeline({ speed: 1 });

    const left = '50%',
          top  = '50%',
          duration = 800;

    const bubbleSound = new Howl({
      urls: [`sounds/bubble.${C.FORMAT}`]
    });

    const showBase = new  mojs.Shape({
      left, top,
      fill: 'none',
      x:      { [-150]: 0,  easing: 'cubic.out' },
      y:      { [90]: 0, easing: 'cubic.out' },
      // isSwirl: true,
      // swirlSize: 20,
      // swirlFrequency: 3,
      // duration: 4000,
      duration: duration + 400
    });

    const vibroBtn = new VibroButton({ parent: showBase.el });


    this.showBase = showBase;
    showBase.el.style[ 'z-index' ] = 5;

    const circle = new mojs.Shape({
      fill: COLORS.WHITE,
      parent: showBase.el,
      left, top,
      radius: 50,
      scale: { .4: 1 },
      duration: 650,
      opacity: {.5: 0},
      delay: duration + 100,
      isForce3d: true,
      easing: 'cubic.out'
    });

    const showUp = new mojs.Shape({
      left, top,
      fill:           'none',
      stroke:         COLORS.WHITE,
      parent:         showBase.el,
      // scale:          { 1: .75 },
      radius:         { 0: 10 },
      angle:          { 560: 270 },
      strokeWidth:      { 0: 22, easing: 'cubic.inout' },
      strokeDasharray:  '100%',
      strokeDashoffset: { '-100%' : '0%', easing: 'cubic.in' },
      strokeLinecap:    'round',
      duration,
      isShowEnd:      false,
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
        // !!isFwd && vibroBtn.timeline.pause();
        // !!isFwd && (vibroBtn.addButton.el.style[ 'opacity' ] = 0);
      }
    });
    this.vibroBtn = vibroBtn;
    // .then({
    //   scale: 1,
    //   duration: 1100,
    //   easing: 'elastic.out',
    //   onComplete ( isFwd ) {
    //     // isFwd && vibroBtn.timeline.play();
    //     // isFwd && (vibroBtn.addButton.el.style[ 'opacity' ] = 1);
    //     // !!isFwd && vibroBtn.timeline.pause();
    //     // !!isFwd && (vibroBtn.addButton.el.style[ 'opacity' ] = 0);
    //   }
    // });

    const angle = 250;
    const bubbles = new mojs.Burst({
      left, top,
      parent:         showUp.el,
      count:          3,
      degree:         15,
      // scale:          1,
      angle:          { [90 + angle] : 280 + angle },
      y:              { 0: -15 },
      x:              { 0: 35 },
      timeline:       { delay: 300 },
      // radius:         { 0: 70 },
      childOptions: {
        radius:       [ 10, 7 ],
        fill:         COLORS.WHITE,
        // scale:        { 1 : 0 },
        pathScale:    'rand(.5, 1.5)',
        duration:     600,
      }
    });

    const angle2 = -340;
    const bubbles2 = new mojs.Burst({
      left, top,
      parent:         showUp.el,
      count:          3,
      // scale:          1,
      degree:         25,
      angle:          { [90 + angle2] : 280 + angle2 },
      y:              { 0: 15 },
      timeline:       { delay: 0 },
      childOptions: {
        radius:       [ 10, 7 ],
        fill:         COLORS.WHITE,
        // scale:        { 1 : 0 },
        pathScale:    'rand(.5, 1.5)',
        duration:     600,
      }
    });

    // showUp.el.style[ 'z-index' ] = 2;
    // // bubbles.childModules[0].el.style[ 'z-index' ] = 2;
    // // bubbles.childModules[1].el.style[ 'z-index' ] = 2;

    const addButtonCross = new mojs.Shape({
      left, top,
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
      // isTimelineLess: true,
      // isShowEnd:      false
    }).then({
      angle: -540,
      duration: duration/2,
      // easing: 'cubic.out'
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
    // let curtain = this._createElement('div');
    // curtain.style[ 'position' ] = 'absolute';
    // curtain.style[ 'width' ] = '100%';
    // curtain.style[ 'height' ] = '100%';
    // curtain.style[ 'left' ] = '0';
    // curtain.style[ 'top' ] = '0';
    // curtain.style[ 'z-index' ] = '15';
    // curtain.style[ 'background' ] = 'cyan';
    // this.showBase.el.appendChild( curtain );


    this.showBase.el.addEventListener('click', (e) => {
      var timeline = this.vibroBtn.timeline;
      this.showBase.el.style[ 'display' ] = 'none';
      modal.init();
    });

  }
}

export default ShowButton;