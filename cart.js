// Sharma Medical App
// Cart Management

const CART_KEY = "sharmaMedicalCart";

// Get cart
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (error) {
    return [];
  }
}

// Save cart
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Add product to cart
window.addToCart = function (product) {

  const cart = getCart();

  const existingProduct = cart.find(
    item => item.id === product.id
  );

  if (existingProduct) {
    existingProduct.quantity += product.quantity || 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: Number(product.price) || 0,
      mrp: Number(product.mrp) || 0,
      image: product.image || "",
      quantity: product.quantity || 1
    });
  }

  saveCart(cart);

  alert("Product added to cart!");

  updateCartCount();
};

// Remove product
window.removeFromCart = function (productId) {

  let cart = getCart();

  cart = cart.filter(
    item => item.id !== productId
  );

  saveCart(cart);

  renderCart();
  updateCartCount();
};

// Change quantity
window.changeQuantity = function (productId, change) {

  const cart = getCart();

  const product = cart.find(
    item => item.id === productId
  );

  if (!product) return;

  product.quantity += change;

  if (product.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart(cart);

  renderCart();
  updateCartCount();
};

// Calculate subtotal
function getCartSubtotal() {

  const cart = getCart();

  return cart.reduce(
    (total, item) =>
      total + (item.price * item.quantity),
    0
  );
}

// Update cart count
function updateCartCount() {

  const cart = getCart();

  const count = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  document.querySelectorAll(".cart-count").forEach(
    element => {
      element.textContent = count;
    }
  );
}

// Render cart
function renderCart() {

  const container =
    document.getElementById("cartContainer");

  const subtotalElement =
    document.getElementById("cartSubtotal");

  const deliveryElement =
    document.getElementById("deliveryCharge");

  const totalElement =
    document.getElementById("cartTotal");

  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {

    container.innerHTML = `
      <div class="empty-state">
        <h3>Your cart is empty</h3>
        <p>Add some products to continue.</p>

        <a href="products.html" class="primary-btn">
          Browse Products
        </a>
      </div>
    `;

    if (subtotalElement)
      subtotalElement.textContent = "₹0";

    if (deliveryElement)
      deliveryElement.textContent = "₹0";

    if (totalElement)
      totalElement.textContent = "₹0";

    return;
  }

  container.innerHTML = cart.map(item => `

    <div class="cart-item">

      <img
        src="${item.image || 'assets/images/product-placeholder.png'}"
        alt="${item.name}"
        onerror="this.src='assets/images/product-placeholder.png'"
      >

      <div class="cart-item-info">

        <h3>${item.name}</h3>

        <strong>₹${item.price}</strong>

        <div class="quantity-controls">

          <button onclick="changeQuantity('${item.id}', -1)">
            −
          </button>

          <span>${item.quantity}</span>

          <button onclick="changeQuantity('${item.id}', 1)">
            +
          </button>

        </div>

      </div>

      <button
        class="remove-btn"
        onclick="removeFromCart('${item.id}')"
      >
        Remove
      </button>

    </div>

  `).join("");

  const subtotal = getCartSubtotal();

  // Free delivery above ₹500
  const delivery = subtotal >= 500 ? 0 : 40;

  const total = subtotal + delivery;

  if (subtotalElement)
    subtotalElement.textContent = `₹${subtotal}`;

  if (deliveryElement)
    deliveryElement.textContent =
      delivery === 0 ? "FREE" : `₹${delivery}`;

  if (totalElement)
    totalElement.textContent = `₹${total}`;
}

// Checkout
window.goToCheckout = function () {

  const cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  window.location.href = "checkout.html";
};

// Start
document.addEventListener("DOMContentLoaded", () => {

  updateCartCount();
  renderCart();

});
