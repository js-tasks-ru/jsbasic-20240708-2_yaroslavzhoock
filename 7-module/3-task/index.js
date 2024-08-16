import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.render(steps);
    this.thumb = this.sub("thumb");
    this.value = this.sub("value");
    this.progress = this.sub("progress");
    this.steps = this.sub("steps");
    this.segments = steps - 1;
    this.setValue(value);
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
    this.elem.addEventListener("slider-change", (e) => {
      console.log(
        "Плохие разработчики копируют. Хорошие разработчики крадут",
        e.detail
      );
    });

    this.elem.addEventListener("click", (e) => {
      let value = Math.round(
        (this.segments * (e.clientX - this.elem.getBoundingClientRect().left)) /
          this.elem.offsetWidth
      );

      this.setValue(value);

      this.elem.dispatchEvent(
        new CustomEvent("slider-change", {
          detail: value,
          bubbles: true
        })
      );
    });
  }

  setValue(value) {
    this.thumb.style.left = `${(value / this.segments) * 100}%`;
    this.progress.style.width = `${(value / this.segments) * 100}%`;
    this.value.innerHTML = value;
    this.sub("step-active") && this.sub("step-active").classList.remove("slider__step-active");
    this.steps.children[value].classList.add("slider__step-active");
  }
}
