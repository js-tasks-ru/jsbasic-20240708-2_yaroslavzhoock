import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    // this.render();
  }

  async render() {
    this.renderCarousel();
    this.renderRibbon();
    this.renderStepSlider();
    this.renderCartIcon();
    this.cart = new Cart(this.cartIcon);
    this.products = await this.fetchProducts();
    this.renderProductsGrid();
    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.value,
      category: this.ribbonMenu.value
    });

    document.body.addEventListener("product-add", (event) => {
      let product = this.products.find(item => item.id == event.detail);
      this.cart.addProduct(product);
    });

    this.stepSlider.elem.addEventListener("slider-change", ({detail: value}) => {
      this.productsGrid.updateFilter({
        maxSpiciness: value
      })
    });

    this.ribbonMenu.elem.addEventListener("ribbon-select", ({detail: categoryId}) => {
      this.productsGrid.updateFilter({
        category: categoryId
      })
    });

    document.getElementById("nuts-checkbox").onchange = (e) => {
      this.productsGrid.updateFilter({
          noNuts: e.target.checked
      })
    }

    document.getElementById("vegeterian-checkbox").onchange = (e) => {
        this.productsGrid.updateFilter({
            vegeterianOnly: e.target.checked
        })
    }
  }

  renderCarousel() {
    this.carousel = new Carousel(slides);
    document.querySelector("[data-carousel-holder]").append(this.carousel.elem);
  }

  renderRibbon() {
    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector("[data-ribbon-holder]").append(this.ribbonMenu.elem);
  }

  renderStepSlider() {
    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    document.querySelector("[data-slider-holder]").append(this.stepSlider.elem);
  }

  renderProductsGrid() {
    this.productsGrid = new ProductsGrid(this.products);
    document.querySelector("[data-products-grid-holder] .products-grid").replaceWith(this.productsGrid.elem);
  }

  renderCartIcon() {
    this.cartIcon = new CartIcon(); 
    document.querySelector("[data-cart-icon-holder]").append(this.cartIcon.elem);
  }

  async fetchProducts() {
    let response = await fetch("products.json"); 
    return await response.json();
  } 
}
