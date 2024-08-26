import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 3 }) {
    this.render(steps);
    this.segments = steps - 1;
    this.setValue(value);
    this.addEventListeners();
  }

  render(steps) {
    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
        ${"<span></span>".repeat(steps)}</div>
      </div>`);
  }

  setValue(value) {
    this.value = value;

    this.sub("thumb").style.left = `${(value / this.segments) * 100}%`;
    this.sub("progress").style.width = `${(value / this.segments) * 100}%`;

    this.sub("value").innerHTML = value;

    if (this.sub("step-active"))
      this.sub("step-active").classList.remove("slider__step-active");

    this.sub("steps").children[value].classList.add("slider__step-active");
  }

  addEventListeners() {
    this.sub("thumb").ondragstart = () => false;
    this.elem.onclick = this.onClick;
    this.sub("thumb").onpointerdown = this.onPointerDown;
  }

  onClick = (e) => {
    let value = Math.round(
      (this.segments * (e.clientX - this.elem.getBoundingClientRect().left)) /
        this.elem.offsetWidth
    );

    this.setValue(value);

    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true
      })
    );
  };

  onPointerDown = (e) => {
    e.preventDefault();

    // let thumb = e.target.getBoundingClientRect();
    // this.shiftX = thumb.left + thumb.width / 2 - e.clientX;
    this.elem.classList.add("slider_dragging");

    document.addEventListener("pointermove", this.onPointerMove);
    document.addEventListener("pointerup", this.onPointerUp);
  };

  onPointerMove = (e) => {
    e.preventDefault();

    let left =
      // (e.clientX - this.elem.getBoundingClientRect().left + this.shiftX) /
      (e.clientX - this.elem.getBoundingClientRect().left) /
      this.elem.offsetWidth;

    left = left < 0 ? 0 : left > 1 ? 1 : left;

    this.sub("thumb").style.left = `${left * 100}%`;
    this.sub("progress").style.width = `${left * 100}%`;

    this.value = Math.round(left * this.segments);
    this.sub("value").innerHTML = this.value;

    if (this.sub("step-active"))
      this.sub("step-active").classList.remove("slider__step-active");

    this.sub("steps").children[this.value].classList.add("slider__step-active");
  };

  onPointerUp = (e) => {
    e.preventDefault();
    document.removeEventListener("pointermove", this.onPointerMove);
    document.removeEventListener("pointerup", this.onPointerUp);

    this.elem.classList.remove("slider_dragging");

    this.sub("thumb").style.left = `${(this.value / this.segments) * 100}%`;
    this.sub("progress").style.width = `${(this.value / this.segments) * 100}%`;

    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true
      })
    );
  };

  sub(e) {
    return this.elem.querySelector(`.slider__${e}`);
  }
}