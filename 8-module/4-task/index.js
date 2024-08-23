import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';
import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
    this.onSubmit = (e) => {
      e.preventDefault(e);

      this.modalBody
        .querySelector("button[type='submit']")
        .classList.add("is-loading");

      (async () => {
        let response = await fetch("https://httpbin.org/post", {
          method: "POST",
          body: new FormData(document.querySelector(".cart-form"))
        });

        if (response) {
          this.modal.setTitle("Success!");
          this.modalBody
            .querySelector('button[type="submit"]')
            .classList.remove("is-loading");

          this.cartItems = [];

          console.log(this.cartItems);
          this.cartIcon.update(this);

          this.modalBody.innerHTML = `<div class="modal__body-inner">
              <p>Order successful! Your order is being cooked :) <br>
                We’ll notify you about delivery time shortly.<br>
                <img src="https://course-jsbasic.javascript.ru/assets/delivery.gif">
              </p>
            </div>`;
        }
      })();
    };
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (totalPrice, item) => totalPrice + item.product.price * item.count,
      0
    );
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="https://course-jsbasic.javascript.ru/assets/products/${
          product.image
        }" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="https://course-jsbasic.javascript.ru/assets/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="https://course-jsbasic.javascript.ru/assets/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    let cartItem = this.cartItems.find((item) => item.product.id == product.id);
    cartItem
      ? cartItem.count++
      : ((cartItem = {
          product,
          count: 1
        }),
        this.cartItems.push(cartItem)),
      this.onProductUpdate(cartItem);
  }

  onProductUpdate({ product: e, count: t }) {
    this.cartIcon.update(this);

    this.modal &&
      (this.cartItems.length != 0
        ? (t == 0
            ? this.modalBody
                .querySelector(`[data-product-id="${e.id}"]`)
                .remove()
            : ((this.modalBody.querySelector(
                `[data-product-id="${e.id}"] .cart-counter__count`
              ).innerHTML = t),
              (this.modalBody.querySelector(
                `[data-product-id="${e.id}"] .cart-product__price`
              ).innerHTML = "€" + (t * e.price).toFixed(2))),
          (this.modalBody.querySelector(".cart-buttons__info-price").innerHTML =
            "€" + this.getTotalPrice().toFixed(2)))
        : this.modal.close());
  }

  getTotalCount() {
    return this.cartItems.reduce(
      (totalSum, product) => totalSum + product.count,
      0
    );
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");
    this.modalBody = createElement("<div></div>");

    for (let { product: e, count: t } of this.cartItems) {
      this.modalBody.append(this.renderProduct(e, t));
    }

    this.modalBody.append(this.renderOrderForm());

    this.modalBody.addEventListener("click", (e) => {
      if (e.target.closest(".cart-counter__button")) {
        let productId = e.target.closest("[data-product-id]").dataset.productId;

        this.updateProductCount(
          productId,
          e.target.closest(".cart-counter__button_plus") ? 1 : -1
        );
      }
    });
    this.modalBody.querySelector("form").onsubmit = this.onSubmit;
    this.modal.setBody(this.modalBody);
    this.modal.elem.addEventListener("modal-close", () => {
      this.modal = null;
      this.modalBody = null;
    });

    this.modal.open();
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find((item) => item.product.id == productId);
    cartItem.count += amount;
    if (cartItem.count == 0)
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }
}
