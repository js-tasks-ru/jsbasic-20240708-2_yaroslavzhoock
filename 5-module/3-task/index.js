function initCarousel() {
  const carouselWrapper = document.querySelector(".container"),
    carouselArrowRight = carouselWrapper.querySelector(
      ".carousel__arrow_right"
    ),
    carouselArrowLeft = carouselWrapper.querySelector(".carousel__arrow_left"),
    carouselInner = carouselWrapper.querySelector(".carousel__inner");

  let index = 0;
  const transform = (i) =>
    (carouselInner.style.transform = `translateX(-${
      carouselInner.querySelector(".carousel__slide").offsetWidth * i
    }px`);

  carouselArrowLeft.style.display = "none";

  carouselWrapper.onclick = (e) => {
    if (e.target.closest(".carousel__arrow_right")) {
      transform(++index);
    }

    if (e.target.closest(".carousel__arrow_left")) {
      transform(--index);
    }
    carouselArrowRight.style.display =
      index < carouselInner.children.length - 1 ? "" : "none";
    carouselArrowLeft.style.display = index > 0 ? "" : "none";
  };
}