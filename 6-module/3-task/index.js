// import createElement from '../../assets/lib/create-element.js';


export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = document.createElement("div");
    this.elem.classList.add("carousel");
    this.elem.insertAdjacentHTML(
      "afterbegin",
      `<div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets//images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner"></div>`
    );
    this.carouselInner = this.elem.querySelector(".carousel__inner");

    this.render();
    this.initCarousel();
    this.onClick();
  }

  render() {
    this.carouselInner.insertAdjacentHTML(
      "afterbegin",
      this.slides
        .map(
          (item) =>
            `<div class="carousel__slide" data-id="penang-shrimp">
              <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
              <div class="carousel__caption">
                <span class="carousel__price">€${item.price}.00</span>
                <div class="carousel__title" data-id="${item.id}">${item.name}</div>
                <button type="button" class="carousel__button">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
              </div>
            </div>`
        )
        .join("")
    );
  }

  initCarousel() {
    let carouselArrowRight = this.elem.querySelector(".carousel__arrow_right");
    let carouselArrowLeft = this.elem.querySelector(".carousel__arrow_left");

    let index = 0;

    const transform = (i) =>
      (this.carouselInner.style.transform = `translateX(-${
        this.carouselInner.querySelector(".carousel__slide").offsetWidth * i
      }px`);

    carouselArrowLeft.style.display = "none";

    this.elem.onclick = (e) => {
      if (e.target.closest(".carousel__arrow_right")) {
        transform(++index);
      }

      if (e.target.closest(".carousel__arrow_left")) {
        transform(--index);
      }
      carouselArrowRight.style.display =
        index < this.carouselInner.children.length - 1 ? "" : "none";
      carouselArrowLeft.style.display = index > 0 ? "" : "none";
    };
  }

  onClick() {
    this.elem.addEventListener("click", ({ target }) => {
      let btn = target.closest("button");

      if (btn) {
        let id = btn.previousElementSibling.dataset.id;

        this.elem.dispatchEvent(
          new CustomEvent("product-add", {
            detail: id,
            bubbles: true
          })
        );
      }
    });
  }
}
