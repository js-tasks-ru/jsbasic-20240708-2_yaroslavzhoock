import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.render(steps);
    this.thumb = this.sub("thumb");
    this.slider_value = this.sub("value");
    this.progress = this.sub("progress");
    this.steps = this.sub("steps");
    this.segments = steps - 1;
    this.setValue(value);
    this.thumb.ondragstart = () => false;
    this.addEventListeners();
    this.onClick();
  }

  render(steps) {
    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
        ${"<span></span>".repeat(steps)}</div>
      </div>`);
  }

  sub(e) {
    return this.elem.querySelector(`.slider__${e}`);
  }

  onClick() {
    this.elem.addEventListener("click", (e) => {
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
    });
  }

  setValue(value) {
    this.value = value;
    this.thumb.style.left = `${(value / this.segments) * 100}%`;
    this.progress.style.width = `${(value / this.segments) * 100}%`;
    this.slider_value.innerHTML = value;

    if (this.sub("step-active"))
      this.sub("step-active").classList.remove("slider__step-active");
    this.steps.children[value].classList.add("slider__step-active");
  }

  addEventListeners() {
    this.elem.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      if (e.target.closest(".slider__thumb")) {
        // let thumb = e.target.getBoundingClientRect();
        // this.shiftX = thumb.left + thumb.width / 2 - e.clientX;
        this.elem.classList.add("slider_dragging");

        let onPointeremove = (e) => {
          e.preventDefault();

          let left =
            // (e.clientX - this.elem.getBoundingClientRect().left + this.shiftX) /
            (e.clientX - this.elem.getBoundingClientRect().left) /
            this.elem.offsetWidth;

          left = left < 0 ? 0 : left > 1 ? 1 : left;

          this.thumb.style.left = `${left * 100}%`;
          this.progress.style.width = `${left * 100}%`;
          this.value = Math.round(left * this.segments);
          this.slider_value.innerHTML = this.value;
          if (this.sub("step-active"))
            this.sub("step-active").classList.remove("slider__step-active");
          this.steps.children[this.value].classList.add("slider__step-active");

          this.elem.dispatchEvent(
            new CustomEvent("slider-change", {
              detail: this.value,
              bubbles: true
            })
          );
        };

        document.addEventListener("pointermove", onPointeremove);

        this.elem.onpointerup = () => {
          e.preventDefault();
          document.removeEventListener("pointermove", onPointeremove);
          document.onpointerup = null;
          this.elem.classList.remove("slider_dragging");

          this.elem.dispatchEvent(
            new CustomEvent("slider-change", {
              detail: this.value,
              bubbles: true
            })
          );
        };
      }
    });
  }s
}