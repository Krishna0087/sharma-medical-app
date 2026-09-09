// Sharma Medical Store
// Main Application JavaScript

document.addEventListener("DOMContentLoaded", () => {
  console.log("Sharma Medical Store app loaded successfully.");

  // Mobile menu
  const menuButton = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });
  }

  // Cart button
  const cartButtons = document.querySelectorAll(".cart-btn");

  cartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
  });

  // Search button
  const searchButton = document.querySelector(".search-btn");

  if (searchButton) {
    searchButton.addEventListener("click", () => {
      window.location.href = "products.html";
    });
  }
});
