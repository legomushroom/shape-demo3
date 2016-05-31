
class Pool {
  constructor () {
    this._vars();
    this._getWindowSize();    
    this._listenResize();    
  }

  _vars () {
    this._subscribers = [];
  }

  _listenResize () {
    window.addEventListener('resize', this._getWindowSize.bind(this))
  }

  _getWindowSize () {
    this.windowWidth  = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this._emitSubscribe()
  }

  getScaler ( initial ) {
    const max = Math.max( this.windowWidth, this.windowHeight );
    return  1.25 * (max / (2*initial));
  }

  resizeSubscribe (subscriber) {
    this._subscribers.push(subscriber);
    subscriber( this.windowWidth, this.windowHeight );
  }

  _emitSubscribe () {
    for ( subscriber of this._subscribers ) {
      subscriber( this.windowWidth, this.windowHeight );
    }
  }
}

export default new Pool;