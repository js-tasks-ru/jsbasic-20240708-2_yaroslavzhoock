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

    for (let product of this.products) {
      if (this.filters.noNuts && product.nuts) continue;
      if (this.filters.vegeterianOnly && !product.vegeterian) continue;
      if (this.filters.maxSpiciness && product.spiciness > this.filters.maxSpiciness) continue;
      if (this.filters.category && product.category != this.filters.category) continue;

      let card = new ProductCard(product);
      this.sub("inner").append(card.elem);
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
