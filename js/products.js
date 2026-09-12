// Sharma Medical App
// Products - Firebase Firestore

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { app } from "./firebase.js";

const db = getFirestore(app);

const productsGrid = document.getElementById("productsGrid");
const productCount = document.getElementById("productCount");
const searchInput = document.getElementById("productSearch");

let allProducts = [];

// Load products from Firebase
async function loadProducts() {
  try {
    productsGrid.innerHTML = `
      <div class="loading-state">
        <div class="loader"></div>
        <p>Loading products...</p>
      </div>
    `;

    const snapshot = await getDocs(collection(db, "products"));

    allProducts = [];

    snapshot.forEach((doc) => {
      allProducts.push({
        id: doc.id,
        ...doc.data()
      });
    });

    displayProducts(allProducts);

  } catch (error) {
    console.error("Firebase products error:", error);

    productsGrid.innerHTML = `
      <div class="empty-state">
        <h3>Products are not available</h3>
        <p>Please try again later.</p>
      </div>
    `;

    if (productCount) {
      productCount.textContent = "0 products";
    }
  }
}

// Display products
function displayProducts(products) {

  if (!productsGrid) return;

  if (products.length === 0) {

    productsGrid.innerHTML = `
      <div class="empty-state">
        <h3>No products found</h3>
        <p>Products will appear here soon.</p>
      </div>
    `;

    if (productCount) {
      productCount.textContent = "0 products";
    }

    return;
  }

  productsGrid.innerHTML = products.map((product) => {

    const name = product.name || "Medical Product";
    const price = product.price || 0;
    const mrp = product.mrp || "";
    const image = product.image || "assets/images/product-placeholder.png";
    const category = product.category || "medicine";
    const description = product.description || "Quality healthcare product";
    const stock = product.stock ?? 0;

    return `
      <article class="product-card">

        <div class="product-image">
          <img
            src="${image}"
            alt="${name}"
            onerror="this.src='assets/images/product-placeholder.png'"
          />
        </div>

        <div class="product-info">

          <span class="product-category">
            ${category}
          </span>

          <h3>${name}</h3>

          <p class="product-description">
            ${description}
          </p>

          <div class="product-price">

            <strong>₹${price}</strong>

            ${
              mrp
                ? `<span class="product-mrp">₹${mrp}</span>`
                : ""
            }

          </div>

          <div class="product-stock">

            ${
              stock > 0
                ? `<span class="in-stock">In Stock</span>`
                : `<span class="out-stock">Out of Stock</span>`
            }

          </div>

          <button
            class="product-view-btn"
            onclick="openProduct('${product.id}')"
          >
            View Product
          </button>

        </div>

      </article>
    `;

  }).join("");

  if (productCount) {
    productCount.textContent =
      `${products.length} ${products.length === 1 ? "product" : "products"}`;
  }
}

// Search products
if (searchInput) {

  searchInput.addEventListener("input", () => {

    const searchText =
      searchInput.value.toLowerCase().trim();

    const filteredProducts = allProducts.filter((product) => {

      const name =
        (product.name || "").toLowerCase();

      const category =
        (product.category || "").toLowerCase();

      const description =
        (product.description || "").toLowerCase();

      return (
        name.includes(searchText) ||
        category.includes(searchText) ||
        description.includes(searchText)
      );

    });

    displayProducts(filteredProducts);

  });

}

// Open product details
window.openProduct = function (productId) {
  window.location.href =
    `product.html?id=${productId}`;
};

// Start
loadProducts();
