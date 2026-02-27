// =======================
// MOBILE NAVIGATION
// =======================
function toggleNav() {
  const navMenu = document.getElementById('nav-menu');
  if (navMenu) {
    navMenu.classList.toggle('active');
  }
}

// =======================
// CART & WISHLIST & THEME
// =======================
let cart = [];
let wishlist = [];
const THEME_KEY = 'alligator_theme';

function applySavedTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const btn = document.getElementById('theme-toggle');
  let useDark = true; // dark default
  if (saved) {
    useDark = saved === 'dark';
  }
  if (useDark) {
    document.body.classList.remove('light');
    document.body.classList.add('dark');
    document.body.setAttribute('data-theme','dark');
    if (btn) btn.textContent = '☀️ Light';
  } else {
    document.body.classList.remove('dark');
    document.body.classList.add('light');
    document.body.setAttribute('data-theme','light');
    if (btn) btn.textContent = '🌙 Dark';
  }
}

function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById('theme-toggle');
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    body.classList.add('light');
    body.setAttribute('data-theme','light');
    if (btn) btn.textContent = '🌙 Dark';
    localStorage.setItem(THEME_KEY, 'light');
  } else {
    body.classList.remove('light');
    body.classList.add('dark');
    body.setAttribute('data-theme','dark');
    if (btn) btn.textContent = '☀️ Light';
    localStorage.setItem(THEME_KEY, 'dark');
  }
}

function addToCart(e, productName, price) {
  // Check if a size was selected
  const sizeButton = e.target.parentElement.parentElement.querySelector('.size-option.selected');
  const selectedSize = sizeButton ? `UK ${sizeButton.textContent}` : 'No size selected';
  
  const cartItem = {
    name: productName,
    price: price,
    size: selectedSize
  };
  
  cart.push(cartItem);
  showNotification(`✓ ${productName} (${selectedSize}) added to cart!`);
  updateCartDisplay();
  // Auto-show cart after 2 seconds
  setTimeout(() => {
    if (confirm(`${productName} added! View your cart?`)) {
      window.location.href = "cart.html";
    }
  }, 1500);
}

function addToWishlist(productName) {
  wishlist.push(productName);
  showNotification(`❤️ ${productName} added to wishlist!`);
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

function updateCartDisplay() {
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotalDiv = document.getElementById("cart-total");
  if (cartItemsDiv && cartTotalDiv) {
    cartItemsDiv.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
      const sizeInfo = item.size ? ` - ${item.size}` : '';
      cartItemsDiv.innerHTML += `<div class="cart-item"><p>🛒 ${item.name}${sizeInfo} – R${item.price}</p><button class="remove-btn" onclick="removeFromCart(${index})">Remove</button></div>`;
      total += item.price;
    });
    cartTotalDiv.textContent = `Total: R${total}`;
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

// =======================
// SIZE SELECTION
// =======================
function selectSize(button) {
  const sizeOptions = button.parentElement.querySelectorAll('.size-option');
  sizeOptions.forEach(btn => btn.classList.remove('selected'));
  button.classList.add('selected');
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
  // apply stored theme preference
  applySavedTheme();
  // Checkout form
  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("Payment successful! Thank you for shopping with Alligator Safety Boots.");
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
      // Close other open FAQs
      document.querySelectorAll(".faq-answer.active").forEach(otherAnswer => {
        if (otherAnswer !== answer) {
          otherAnswer.classList.remove("active");
        }
      });
      // Toggle current FAQ
      answer.classList.toggle("active");
    });
  });
});

// =======================
// INITIAL CART DISPLAY
// =======================
updateCartDisplay();