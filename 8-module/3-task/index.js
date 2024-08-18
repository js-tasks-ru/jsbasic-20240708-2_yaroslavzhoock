export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    // ваш код
    if (product === null || product === undefined) return;
    let elem = this.cartItems.find((item) => item.product.id === product.id);
    elem ? elem.count++ : this.cartItems.push({ product: product, count: 1 });

    this.onProductUpdate();
  }

  updateProductCount(productId, amount) {
    // ваш код
    let elem = this.cartItems.find((item) => item.product.id == productId);
    elem.count += amount;
    elem.count == 0 && this.cartItems.splice(this.cartItems.indexOf(elem), 1);
    
    this.onProductUpdate();
  }
  

  isEmpty() {
    // ваш код
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    // ваш код
    return this.cartItems.reduce(
      (totalSum, product) => totalSum + product.count,
      0
    );
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (totalPrice, item) => totalPrice + item.product.price * item.count,
      0
    );
  }

  onProductUpdate() {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

