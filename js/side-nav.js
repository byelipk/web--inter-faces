'use strict';

class SideNav {
  constructor() {
    this.sideNavEl    = this.get(".js-side-nav");
    this.showButtonEl = this.get(".js-menu-show");
    this.hideButtonEl = this.get(".js-menu-hide");
    this.containerEl  = this.get(".js-side-nav-container");

    // Each function should execute within the context of the instance,
    // not the class.
    this.showSideNav   = this.showSideNav.bind(this);
    this.hideSideNav   = this.hideSideNav.bind(this);
    this.blockClicks   = this.blockClicks.bind(this);
    this.touchStart    = this.touchStart.bind(this);
    this.touchMove     = this.touchMove.bind(this);
    this.touchEnd      = this.touchEnd.bind(this);
    this.transitionEnd = this.transitionEnd.bind(this);

    this.startX   = 0;
    this.currentX = 0;

    this.addEventListeners();
  }

  addEventListeners() {
    this.showButtonEl.addEventListener("click", this.showSideNav);
    this.hideButtonEl.addEventListener("click", this.hideSideNav);
    this.sideNavEl.addEventListener("click", this.hideSideNav);
    this.containerEl.addEventListener("click", this.blockClicks);

    document.addEventListener("touchstart", this.touchStart, { passive: false });
    document.addEventListener("touchmove", this.touchMove, { passive: false });
    document.addEventListener("touchend", this.touchEnd, { passive: false });
  }

  blockClicks (evt) {
    evt.stopPropagation();
  }

  transitionEnd() {
    this.sideNavEl.classList.remove("side-nav--animatable");
    this.sideNavEl.removeEventListener("transitionend", this.transitionEnd);
  }

  showSideNav () {
    this.sideNavEl.addEventListener("transitionend", this.transitionEnd);
    this.sideNavEl.classList.add("side-nav--animatable");
    this.sideNavEl.classList.add("side-nav--visible");
  }

  hideSideNav () {
    this.sideNavEl.addEventListener("transitionend", this.transitionEnd);
    this.sideNavEl.classList.add("side-nav--animatable");
    this.sideNavEl.classList.remove("side-nav--visible");
  }

  touchStart(evt) {
    if (!this.sideNavEl.classList.contains("side-nav--visible")) {
      return;
    }

    this.startX   = evt.touches[0].pageX;
    this.currentX = this.startX;
  }

  touchMove(evt) {
    this.currentX    = evt.touches[0].pageX;
    const translateX = Math.min(0, this.currentX - this.startX);

    if (translateX < 0) {
      evt.preventDefault();
    }

    if (translateX === 0) {
      this.containerEl.style.transform = '';
    }
    else {
      this.containerEl.style.transform = `translateX(${translateX}px)`;
    }
  }

  touchEnd(evt) {
    const translateX   = Math.min(0, this.currentX - this.startX);
    if (translateX < 0) {
      this.containerEl.style.transform = '';
      this.hideSideNav();
    }
  }

  get(selector) {
    return document.querySelector(selector);
  }

}

const sideNav = new SideNav();

// console.log(sideNav);
