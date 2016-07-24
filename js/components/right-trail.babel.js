import Trail  from './trail';
import C      from './constants';

class RightTrail extends Trail {

  _declareOpts () {
    super._declareOpts();
    this.trailOpts.strokeDashoffset = {'-100%': '0%'};
    this.trailOpts.left   = '155%';
    this.trailOpts.angle  = 157;
    this.trailOpts.top    = '31%';
    this.trailReturn.strokeDashoffset = '-100%';
  }

  _declareOpts2 () {
    super._declareOpts2();
    this.trail2Opts.top   = '45%';
  }
}

export default RightTrail;