class App {
  constructor() {

    // EVENT HANDLERS
    this.onStart = this.onStart.bind(this);
    this.onMove  = this.onMove.bind(this);
    this.onEnd   = this.onEnd.bind(this);
    this.update  = this.update.bind(this);

    // DOM NODES
    this.targetBCR  = null;
    this.target     = null;
    this.clone      = document.querySelector('.card-holder');

    // GEOMETRIC INFORMATION
    // We track where we started so we can calculate how far
    // we've moved the target, and so we know where we need
    // to return to in case we cancel the drag.
    this.startX    = 0;
    this.startY    = 0;

    // We always keep track of our current position.
    this.currentX  = 0;
    this.currentY  = 0;

    // These are the coordinates we'll use to update
    // the actual position on screen
    this.screenX   = 0;
    this.screenY   = 0;

    this.targetX   = 0;
    this.targetY   = 0;

    // Are we dragging?
    this.draggingCard = false;

    // Boot up event listeners
    this.addEventListeners();

    // Begin the RAF loop
    requestAnimationFrame(this.update);
  }

  addEventListeners () {
    document.addEventListener('touchstart', this.onStart);
    document.addEventListener('touchmove', this.onMove);
    document.addEventListener('touchend', this.onEnd);

    document.addEventListener('mousedown', this.onStart);
    document.addEventListener('mousemove', this.onMove);
    document.addEventListener('mouseup', this.onEnd);
  }

  onStart(evt) {

    if (this.target) {
      return;
    }

    if (!evt.target.classList.contains('card')) {
      return;
    }

    console.log('ONSTART');

    this.target    = evt.target;
    this.targetBCR = this.target.getBoundingClientRect();

    this.startX = evt.pageX || evt.touches[0].pageX;
    this.startY = evt.pageY || evt.touches[0].pageY;
    this.currentX = this.startX;
    this.currentY = this.startY;

    this.draggingCard = true;
    this.target.style.willChange = "transform";
    this.target.style.zIndex = "10";

    this.clone.style.top     = `${this.targetBCR.top}px`;
    this.clone.style.bottom  = `${this.targetBCR.bottom}px`;
    this.clone.style.left    = `${this.targetBCR.left}px`;
    this.clone.style.right   = `${this.targetBCR.right}px`;
    this.clone.style.height  = `${this.targetBCR.height}px`;
    this.clone.style.width   = `${this.targetBCR.width}px`;
    this.clone.style.opacity = 1;
  }

  onMove(evt) {
    if (!this.target) {
      return;
    }

    console.log('ONMOVE');

    this.currentX = evt.pageX || evt.touches[0].pageX;
    this.currentY = evt.pageY || evt.touches[0].pageY;
  }

  onEnd(evt) {
    if (!this.target) {
      return;
    }

    console.log('ONEND');

    this.draggingCard = false;
  }

  update() {

    // Schedule another update before the next repaint
    requestAnimationFrame(this.update);

    if (!this.target) {
      return;
    }

    console.log('UPDATING...');

    if (!this.draggingCard) {
      this.resetTarget();
    }
    else {
      this.performUpdate();
    }
  }

  performUpdate() {
    this.screenX = this.currentX - this.startX;
    this.screenY = this.currentY - this.startY;

    const transform = `translate(${this.screenX}px, ${this.screenY}px) rotate(3deg)`;
    this.target.style.transform = transform;
  }

  resetTarget() {
    if (!this.target) {
      return;
    }

    this.target.style.willChange = 'initial';
    this.target.style.transform  = 'none';
    this.target.style.zIndex = '2';
    this.target = null;
  }
}

new App();
