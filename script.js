// =======================
// CART LOGIC
// =======================
let cart = [];

function addToCart(productName, price) {
  cart.push({ name: productName, price: price });
  alert(`${productName} added to cart!`);
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotalDiv = document.getElementById("cart-total");
  if (cartItemsDiv && cartTotalDiv) {
    cartItemsDiv.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
      cartItemsDiv.innerHTML += `<p>🛒 ${item.name} – R${item.price}</p>`;
      total += item.price;
    });
    cartTotalDiv.textContent = `Total: R${total}`;
  }
}

// =======================
// NAVIGATION TOGGLE
// =======================
function toggleNav() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
}

// =======================
// CTA BUTTONS
// =======================
function shopNow() { window.location.href = "products.html"; }
function requestQuote() { window.location.href = "contact.html"; }

// =======================
// CHECKOUT MODAL
// =======================
function openCheckout() {
  const modal = document.getElementById("checkout-modal");
  if (modal) modal.style.display = "block";
}
function closeCheckout() {
  const modal = document.getElementById("checkout-modal");
  if (modal) modal.style.display = "none";
}

// =======================
// DOMContentLoaded EVENTS
// =======================
document.addEventListener("DOMContentLoaded", () => {
  // Checkout form
  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("Payment successful! Thank you for shopping with Gravis Safety Footwear.");
      closeCheckout();
      cart = [];
      updateCartDisplay();
    });
  }

  // FAQ accordion
  const faqButtons = document.querySelectorAll(".faq-question");
  faqButtons.forEach(button => {
    button.addEventListener("click", () => {
      const answer = button.nextElementSibling;
      answer.style.display = answer.style.display === "block" ? "none" : "block";
    });
  });
});

// =======================
// INITIAL CART DISPLAY
// =======================
updateCartDisplay();