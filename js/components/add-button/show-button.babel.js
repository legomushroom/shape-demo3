import Module       from '../module';
import COLORS       from '../colors';
import VibroButton  from './vibro-button';
import C            from '../../constants';
import {Howl}       from 'howler';

class ShowButton extends Module {
  _render () {
    super._render();

    this.timeline = new mojs.Timeline;

    const vibroBtn = new VibroButton();
    const left = '50%',
          top  = '50%',
          duration = 800;

    const bubbleSound = new Howl({
      urls: [`sounds/bubble.${C.FORMAT}`]
    });

    // const BubbleStagger = mojs.stagger( mojs.Shape );
    // const bubbles = new BubbleStagger({
    //   left, top,
    //   quantifier:     2,
    //   // parent:         this.el,
    //   radius:         [ 10, 7 ],
    //   scale:          { 1: 0 },
    //   fill:           'white',
    //   y:              [ { 0: -30 }, { 0: -15 } ],
    //   x:              [ { 15: 25 }, { 15: 30 } ],
    //   duration:       duration/2.5,
    //   delay:          duration/2,
    //   isForce3d:      true,
    //   isShowEnd:      false,
    //   onStart: [ (isFwd) => {
    //     // isFwd && bubbleSound.play();
    //   }  , null]
    // });

    const showUp = new mojs.Shape({
      left, top,
      fill: 'none',
      stroke: COLORS.WHITE,
      // parent:         this.el,
      radius: { 0: 10 },
      angle: { 560: 270 },
      x:      { [-150]: 0 },
      strokeWidth: { 0: 22 },
      strokeDasharray: '100%',
      strokeDashoffset: { '-100%' : '0%', easing: 'cubic.in' },
      strokeLinecap: 'round',
      duration,
      isShowEnd:      false,
      onComplete ( isFwd ) {
        // isFwd && vibroBtn.timeline.play();
        // isFwd && (vibroBtn.addButton.el.style[ 'opacity' ] = 1);
        // !!isFwd && vibroBtn.timeline.pause();
        // !!isFwd && (vibroBtn.addButton.el.style[ 'opacity' ] = 0);
      }
    });

    const angle = 100;
    const bubbles = new mojs.Burst({
      left, top,
      parent:         showUp.el,
      count:          3,
      degree:         25,
      angle:          { [90 + angle] : 280 + angle },
      y:              { 0: -25 },
      timeline:       { delay: 200 },
      // radius:         { 0: 70 },
      childOptions: {
        radius:       [ 10, 7 ],
        fill:         COLORS.WHITE,
        scale:        { 1 : 0 },
        pathScale:    'rand(.5, 1.5)',
        duration:     600,
      }
    });

    const angle2 = 100;
    const bubbles2 = new mojs.Burst({
      left, top,
      parent:         showUp.el,
      count:          3,
      degree:         25,
      angle:          { [90 + angle2] : 280 + angle2 },
      // x:              { 0: -25 },
      timeline:       { delay: 350 },
      // radius:         { 0: 70 },
      childOptions: {
        radius:       [ 10, 7 ],
        fill:         COLORS.WHITE,
        scale:        { 1 : 0 },
        pathScale:    'rand(.5, 1.5)',
        duration:     600,
      }
    });

    showUp.el.style[ 'z-index' ] = 2;
    // bubbles.childModules[0].el.style[ 'z-index' ] = 2;
    // bubbles.childModules[1].el.style[ 'z-index' ] = 2;

    const addButtonCross = new mojs.Shape({
      left, top,
      shape:          'cross',
      parent:         showUp.el,
      fill:           'none',
      stroke:         COLORS.VINOUS,
      radius:         6,
      strokeLinecap:  'round',
      isShowStart:    true,
      duration:       duration,
      angle:          { 0: -360 },
      scale:          { 0: 1 },
      y:              { 35: 0 },
      // x:              { 35: 0 },
      isForce3d:      true,
      isTimelineLess: true,
      isShowEnd:      false
    });

    this.timeline.add(
      bubbles, bubbles2,
      showUp,
      addButtonCross
    );

    return this;
  }
}

export default ShowButton;