// Sharma Medical App
// Checkout & Order Management

const CART_KEY = "sharmaMedicalCart";
const ORDERS_KEY = "sharmaMedicalOrders";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function getOrders() {
  return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
}

// Show checkout items
function loadCheckout() {

  const cart = getCart();
  const container = document.getElementById("checkoutItems");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>Your cart is empty</h3>
        <a href="products.html" class="primary-btn">
          Browse Products
        </a>
      </div>
    `;
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="checkout-item">

      <div>
        <strong>${item.name}</strong>
        <p>₹${item.price} × ${item.quantity}</p>
      </div>

      <strong>
        ₹${item.price * item.quantity}
      </strong>

    </div>
  `).join("");

  const subtotal = cart.reduce(
    (total, item) =>
      total + (item.price * item.quantity),
    0
  );

  const delivery = subtotal >= 500 ? 0 : 40;
  const total = subtotal + delivery;

  const subtotalElement =
    document.getElementById("checkoutSubtotal");

  const deliveryElement =
    document.getElementById("checkoutDelivery");

  const totalElement =
    document.getElementById("checkoutTotal");

  if (subtotalElement)
    subtotalElement.textContent = `₹${subtotal}`;

  if (deliveryElement)
    deliveryElement.textContent =
      delivery === 0 ? "FREE" : `₹${delivery}`;

  if (totalElement)
    totalElement.textContent = `₹${total}`;
}

// Place order
async function placeOrder(event) {

  event.preventDefault();

  const cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const name =
    document.getElementById("customerName").value.trim();

  const phone =
    document.getElementById("customerPhone").value.trim();

  const address =
    document.getElementById("customerAddress").value.trim();

  const pincode =
    document.getElementById("customerPincode").value.trim();

  if (!name || !phone || !address || !pincode) {
    alert("Please fill all details.");
    return;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  if (!/^[0-9]{6}$/.test(pincode)) {
    alert("Please enter a valid 6-digit pincode.");
    return;
  }

  const subtotal = cart.reduce(
    (total, item) =>
      total + (item.price * item.quantity),
    0
  );

  const delivery = subtotal >= 500 ? 0 : 40;
  const total = subtotal + delivery;

  const payment =
    document.querySelector(
      'input[name="payment"]:checked'
    )?.value || "COD";

  const order = {

    id: "ORD" + Date.now(),

    customer: {
      name,
      phone,
      address,
      pincode
    },

    items: cart,

    subtotal,
    delivery,
    total,

    payment,

    status: "Pending",

    createdAt: new Date().toISOString()
  };

  const orders = getOrders();

  orders.unshift(order);

  saveOrders(orders);

  // Clear cart
  localStorage.removeItem(CART_KEY);

  alert(
    `Order placed successfully!\nOrder ID: ${order.id}`
  );

  window.location.href = "orders.html";
}

// Form submit
document.addEventListener("DOMContentLoaded", () => {

  loadCheckout();

  const form =
    document.getElementById("checkoutForm");

  if (form) {
    form.addEventListener(
      "submit",
      placeOrder
    );
  }

});
