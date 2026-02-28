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
const CART_KEY = 'alligator_cart';
const WISHLIST_KEY = 'alligator_wishlist';

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
  // require size selection if size buttons exist
  const sizeButton = e.target.parentElement.parentElement.querySelector('.size-option.selected');
  if (!sizeButton && e.target.parentElement.parentElement.querySelector('.size-selector')) {
    showNotification('❗ Please select a size before adding to cart');
    return;
  }
  const selectedSize = sizeButton ? `UK ${sizeButton.textContent}` : '';
  const cartItem = {
    name: productName,
    price: price,
    size: selectedSize
  };
  cart.push(cartItem);
  saveCart();
  showNotification(`✓ ${productName}${selectedSize ? ' ('+selectedSize+')' : ''} added to cart!`);
  updateCartDisplay();
  updateCartCount();
  // Auto-show cart after 2 seconds
  setTimeout(() => {
    if (confirm(`${productName} added! View your cart?`)) {
      window.location.href = "cart.html";
    }
  }, 1500);
}

function addToWishlist(productName) {
  wishlist.push(productName);
  saveWishlist();
  showNotification(`❤️ ${productName} added to wishlist!`);
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function saveWishlist() {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

function loadData() {
  const storedCart = localStorage.getItem(CART_KEY);
  if (storedCart) {
    try { cart = JSON.parse(storedCart); } catch {};
  }
  const storedWishlist = localStorage.getItem(WISHLIST_KEY);
  if (storedWishlist) {
    try { wishlist = JSON.parse(storedWishlist); } catch {};
  }
}

function updateCartCount() {
  const span = document.getElementById('cart-count');
  if (span) span.textContent = cart.length;
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
  saveCart();
  updateCartDisplay();
  updateCartCount();
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
  // restore cart/wishlist from localStorage
  loadData();
  updateCartDisplay();
  updateCartCount();

  // shrink header on scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('shrink');
    else header.classList.remove('shrink');
  });

  // Checkout form
  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("Payment successful! Thank you for shopping with Alligator Safety Boots.");
      closeCheckout();
      cart = [];
      saveCart();
      updateCartDisplay();
      updateCartCount();
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