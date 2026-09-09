// Sharma Medical App
// Orders Management

const ORDERS_KEY = "sharmaMedicalOrders";

function getOrders() {
  try {
    return JSON.parse(
      localStorage.getItem(ORDERS_KEY)
    ) || [];
  } catch (error) {
    return [];
  }
}

function renderOrders() {

  const container =
    document.getElementById("ordersContainer");

  if (!container) return;

  const orders = getOrders();

  if (orders.length === 0) {

    container.innerHTML = `
      <div class="empty-state">

        <div class="empty-icon">📦</div>

        <h3>No orders yet</h3>

        <p>
          Your placed orders will appear here.
        </p>

        <a href="products.html" class="primary-btn">
          Start Shopping
        </a>

      </div>
    `;

    return;
  }

  container.innerHTML = orders.map(order => {

    const date = new Date(order.createdAt);

    const formattedDate =
      date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });

    return `
      <div class="order-card">

        <div class="order-header">

          <div>
            <span class="order-label">
              Order ID
            </span>

            <strong>
              ${order.id}
            </strong>
          </div>

          <span class="order-status">
            ${order.status}
          </span>

        </div>

        <div class="order-date">
          ${formattedDate}
        </div>

        <div class="order-items">

          ${order.items.map(item => `
            <div class="order-item">

              <div>
                <strong>${item.name}</strong>

                <p>
                  ₹${item.price} × ${item.quantity}
                </p>
              </div>

              <strong>
                ₹${item.price * item.quantity}
              </strong>

            </div>
          `).join("")}

        </div>

        <div class="order-footer">

          <span>
            Total
          </span>

          <strong>
            ₹${order.total}
          </strong>

        </div>

        <div class="order-payment">
          Payment: ${order.payment}
        </div>

      </div>
    `;

  }).join("");
}

document.addEventListener(
  "DOMContentLoaded",
  renderOrders
);
