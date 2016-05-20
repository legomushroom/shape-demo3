import Module       from '../module';
import COLORS       from '../colors';
import VibroButton  from './vibro-button';
import C            from '../../constants';
import {Howl}       from 'howler';

class ShowButton extends Module {
  _render () {
    super._render();

    const vibroBtn = new VibroButton();
    const left = '50%',
          top  = '50%',
          duration = 800;

    const bubbleSound = new Howl({
      urls: [`sounds/bubble.${C.FORMAT}`]
    });

    const BubbleStagger = mojs.stagger( mojs.Shape );
    const bubbles = new BubbleStagger({
      left, top,
      quantifier:     2,
      radius:         [ 10, 7 ],
      scale:          { 1: 0 },
      fill:           'white',
      y:              [ { 0: -30 }, { 0: -15 } ],
      x:              [ { 15: 25 }, { 15: 30 } ],
      duration:       duration/2.5,
      delay:          duration/2,
      isForce3d:      true,
      isShowEnd:      false,
      onStart: [ (isFwd) => {
        // isFwd && bubbleSound.play();
      }  , null]
    });

    const showUp = new mojs.Shape({
      left, top,
      fill: 'none',
      stroke: COLORS.WHITE,
      radius: { 0: 10 },
      angle: { 560: 270 },
      strokeWidth: { 0: 22 },
      strokeDasharray: '100%',
      strokeDashoffset: { '-100%' : '0%' },
      strokeLinecap: 'round',
      duration,
      isShowEnd:      false,
      isSoftHide:     false,
      onComplete ( isFwd ) {
        isFwd && vibroBtn.timeline.play();
        isFwd && (vibroBtn.addButton.el.style[ 'opacity' ] = 1);
        // !!isFwd && vibroBtn.timeline.pause();
        // !!isFwd && (vibroBtn.addButton.el.style[ 'opacity' ] = 0);
      }
    });

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

    return [ bubbles, showUp, addButtonCross ];
  }
}

export default ShowButton;