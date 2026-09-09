// Sharma Medical App
// Profile Page

document.addEventListener("DOMContentLoaded", () => {

  // Current cart count
  updateProfileCartCount();

  // Store contact buttons
  const callButton =
    document.getElementById("callStore");

  const whatsappButton =
    document.getElementById("whatsappStore");

  if (callButton) {
    callButton.addEventListener("click", () => {
      window.location.href = "tel:+919359131359";
    });
  }

  if (whatsappButton) {
    whatsappButton.addEventListener("click", () => {
      window.open(
        "https://wa.me/919359131359",
        "_blank"
      );
    });
  }

});

// Update cart count
function updateProfileCartCount() {

  const cart =
    JSON.parse(
      localStorage.getItem("sharmaMedicalCart")
    ) || [];

  const count = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  document
    .querySelectorAll(".cart-count")
    .forEach(element => {
      element.textContent = count;
    });
}
