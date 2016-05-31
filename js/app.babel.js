import Polyfill   from 'classlist-polyfill';
import MojsPlayer from 'mojs-player'
import Module     from './components/module';
import COLORS     from './components/colors';
// import AddButton  from './components/add-button/add-button';
import ShowButton from './components/add-button/show-button';
// import Vibro      from './components/add-button/vibro-button';
import Modal      from './components/modal/modal';
import ModalHide  from './components/modal/modal-hide';
import Characters from './components/modal/characters';

import pool from './pool';

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
      new ShowButton
      // new ModalHide
      // new Characters({ delay: 200 })
      // new Modal
    )
    .play();

    // this._findEl( '#js-modal-hide-layer' ).style['transform'] = 'none';

    // ;( new MojsPlayer({ add: mainTimeline }) )
    //   .el.style[ 'z-index' ] = 10;

  }
}

new Demo;

export default Demo;