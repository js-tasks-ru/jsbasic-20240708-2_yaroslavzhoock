import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.render();
    this.initRibbon();
    this.value = "";
  }

  render() {
    this.elem = createElement(
      `<div class="ribbon">
        <div class="ribbon__arrow ribbon__arrow_left">
          <img src="https://course-jsbasic.javascript.ru/assets/icons/angle-icon.svg" alt="icon">
        </div>
        <nav class="ribbon__inner"></nav>
        <div class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="https://course-jsbasic.javascript.ru/assets/icons/angle-icon.svg" alt="icon">
        </div>
      </div>`
    );

    this.sub("inner").insertAdjacentHTML(
      "afterbegin",
      this.categories
        .map(
          (item) =>
            `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`
        )
        .join("")
    );
  }

  initRibbon() {
    let selectedLink = this.elem.querySelectorAll("a")[0];
    selectedLink.classList.add("ribbon__item_active");

    const scroll = (x, y = 0) => this.sub("inner").scrollBy(x, y);

    this.elem.onclick = ({ target }) => {
      if (target.closest(".ribbon__arrow_left")) {
        scroll(-350);
      }

      if (target.closest(".ribbon__arrow_right")) {
        scroll(350);
      }

      if (target.tagName == "A") {
        if (selectedLink) {
          selectedLink.classList.remove("ribbon__item_active");
        }
        selectedLink = target;
        selectedLink.classList.add("ribbon__item_active");
      }
    };

    this.sub("inner").addEventListener("click", (e) => {
      e.preventDefault();
      
      this.value = e.target.closest("a").dataset.id;

      this.sub("inner").dispatchEvent(
        new CustomEvent("ribbon-select", {
          detail: this.value,
          bubbles: true
        })
      );
    });

    this.sub("inner").onscroll = () => {
      this.sub("inner").scrollLeft
        ? this.sub("arrow_left").classList.add("ribbon__arrow_visible")
        : this.sub("arrow_left").classList.remove("ribbon__arrow_visible");

      this.sub("inner").scrollWidth -
      this.sub("inner").scrollLeft -
      this.sub("inner").clientWidth
        ? this.sub("arrow_right").classList.add("ribbon__arrow_visible")
        : this.sub("arrow_right").classList.remove("ribbon__arrow_visible");
    };
  }

  // onClick() {
  //   this.sub("inner").addEventListener("ribbon-select", (e) => {
  //     console.log(
  //       "три мышки слепых бегут за фермершей следом, которая хвосты отрубила им ножом кривым",
  //       e.detail
  //     );
  //   });
  // }

  sub(ref) {
    return this.elem.querySelector(`.ribbon__${ref}`);
  }
}
