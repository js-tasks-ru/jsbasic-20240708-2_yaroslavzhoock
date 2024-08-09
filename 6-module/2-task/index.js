import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.render();
    this.onClick();
  }

  render() {
    this.elem = createElement(
      [this.product]
        .map(
          (item) =>
            `<div class="card">
              <div class="card__top">
                <img src="/assets/images/products/${item.image}" class="card__image" alt="product">
                  <span class="card__price">€${item.price}.00</span>
              </div>
              <div class="card__body">
                <div class="card__title" id="${item.id}">${item.name}</div>
                <button type="button" class="card__button">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
              </div>
            </div>`
        )
        .join("")
    );
  }

    onClick() {
    this.elem.addEventListener("product-add", (ev) => {
      console.log("Продукт добавлен в корзину", ev.detail);
    });

    this.elem.addEventListener("click", ({ target }) => {
      let btn = target.closest("button");
      if (btn) {
        this.elem.dispatchEvent(
          new CustomEvent("product-add", {
            detail: btn.previousElementSibling.id,
            bubbles: true
          })
        );
      }
    });
  }
}