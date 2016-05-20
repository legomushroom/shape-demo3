
import Module from '../module';
import COLORS from '../colors';
import ShowButton  from './show-button';
import VibroButton from './vibro-button';

class AddButton extends Module {
  _render () {
    super._render();
    this.timeline = new mojs.Timeline;

    this.timeline
      .add( new ShowButton )
      // .append( new VibroButton );

    return this.timeline;
  }
}

export default AddButton;