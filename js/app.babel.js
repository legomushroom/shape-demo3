import Polyfill   from 'classlist-polyfill';
import MojsPlayer from 'mojs-player'
import Module     from './components/module';
import COLORS     from './components/colors';
import AddButton  from './components/add-button/add-button';
import Modal      from './components/modal/modal';

// require('../css/main.postcss.css');
// const CLASSES = require('../css/main.postcss.css.json');

class Demo extends Module {
  /*
    Method for initial module's render.
    @private
  */
  _render () {
    // super._render();
  
    const mainTimeline = new mojs.Timeline;

    mainTimeline.add(
      // new AddButton
      new Modal
    );

    ;( new MojsPlayer({ add: mainTimeline }) )
      .el.style[ 'z-index' ] = 10;

  }
}

new Demo;

export default Demo;