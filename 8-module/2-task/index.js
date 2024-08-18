import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>`);

    this.renderContent();
  }

  renderContent() {
    this.sub("inner").innerHTML = "";

    for (let e of this.products) {
      if (this.filters.noNuts && e.nuts) continue;
      if (this.filters.vegeterianOnly && !e.vegeterian) continue;
      if (this.filters.maxSpiciness && e.spiciness > this.filters.maxSpiciness) continue;
      if (this.filters.category && e.category != this.filters.category) continue;

      this.sub("inner").append(
        createElement(
          `<div class="card">
          <div class="card__top">
            <img src="https://course-jsbasic.javascript.ru/assets/products/${
              e.image
            }" class="card__image" alt="product">
              <span class="card__price">€${e.price.toFixed(2)}</span>
          </div>
          <div class="card__body">
            <div class="card__title" id="${e.id}">${e.name}</div>
            <button type="button" class="card__button">
              <img src="https://course-jsbasic.javascript.ru/assets/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>`
        )
      );
    }
  }

  updateFilter(e) {
    Object.assign(this.filters, e);
    this.renderContent();
  }

  sub(e) {
    return this.elem.querySelector(`.products-grid__${e}`);
  }
}
