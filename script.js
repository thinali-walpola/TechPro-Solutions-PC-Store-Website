/* ============================= */
/* NAVBAR TOGGLE */
/* ============================= */
function myFunction() {
  let nav = document.getElementById("myTopnav");

  if (nav.className === "nav-links") {
    nav.className += " responsive";
  } else {
    nav.className = "nav-links";
  }
}

/* ============================= */
/* FILTER SYSTEM */
/* ============================= */
function filterSelection(e, category) {
  let cards = document.getElementsByClassName("column");

  if (category === "all") category = "";

  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove("show");

    if (cards[i].className.includes(category)) {
      cards[i].classList.add("show");
    }
  }

  let btns = document.getElementsByClassName("btn");

  for (let i = 0; i < btns.length; i++) {
    btns[i].classList.remove("active");
  }

  e.currentTarget.classList.add("active");
}

/* ============================= */
/* COMPONENT PAGE ADD TO CART (INSTANT REDIRECT) */
/* ============================= */
function addToCart(btn) {

  let name = btn.dataset.name;
  let price = parseFloat(btn.dataset.price);
  let img = btn.dataset.img;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      name,
      price,
      img,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // 🔥 instant redirect (ONLY component page behavior)
  window.location.href = "add_cart.html";
}

/* ============================= */
/* PRODUCT PAGE (QTY SYSTEM) */
/* ============================= */
document.addEventListener("DOMContentLoaded", () => {

  let minus = document.querySelector(".minus");
  let plus = document.querySelector(".plus");
  let qtyText = document.querySelector(".quantity");

  let qty = 0;

  if (minus && plus && qtyText) {

    plus.addEventListener("click", () => {
      qty++;
      qtyText.textContent = qty;
    });

    minus.addEventListener("click", () => {
      if (qty > 0) qty--;
      qtyText.textContent = qty;
    });
  }

  /* ============================= */
  /* PRODUCT PAGE ADD TO CART */
/* ============================= */
  let addBtn = document.querySelector(".addcart");

  if (addBtn) {
    addBtn.addEventListener("click", () => {

      let product = document.querySelector(".flex-container");

      let name = product.dataset.name;
      let price = parseFloat(product.dataset.price);
      let img = product.dataset.img;

      let quantity = parseInt(document.querySelector(".quantity").textContent);

      if (!quantity || quantity <= 0) {
        alert("Please select quantity");
        return;
      }

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      let existing = cart.find(item => item.name === name);

      if (existing) {
        existing.qty += quantity;
      } else {
        cart.push({
          name,
          price,
          img,
          qty: quantity
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      window.location.href = "add_cart.html";
    });
  }

  displayCart();

  /* checkout */
  let checkoutBtn = document.querySelector(".checkout-btn");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      alert("Proceeding to checkout...");
    });
  }

});

/* ============================= */
/* DISPLAY CART PAGE */
/* ============================= */
function displayCart() {

  const cartItems = document.getElementById("cartItems");
  if (!cartItems) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItems.innerHTML = "";

  let subtotal = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty</h2>
      </div>
    `;
    updateSummary(0);
    return;
  }

  cart.forEach((item, index) => {

    let itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    cartItems.innerHTML += `
      <div class="cart-item">

        <img src="${item.img}" width="80">

        <div class="cart-details">

          <h3>${item.name}</h3>
          <p class="qty-number">$${item.price}</p>

          <div class="qty-box">
            <button onclick="decreaseQty(${index})">-</button>
            <span class="qty-number">${item.qty}</span>
            <button onclick="increaseQty(${index})">+</button>
          </div>

          <button onclick="removeItem(${index})" class="remove-btn">Remove</button>

        </div>

        <div class="item-total">
          $${itemTotal.toFixed(2)}
        </div>

      </div>
    `;
  });

  updateSummary(subtotal);
}

/* ============================= */
/* SUMMARY */
/* ============================= */
function updateSummary(subtotal) {

  let shipping = 15;
  let total = subtotal + shipping;

  let subEl = document.getElementById("subtotal");
  let shipEl = document.getElementById("shipping");
  let totalEl = document.getElementById("total");

  if (subEl) subEl.innerText = "$" + subtotal.toFixed(2);
  if (shipEl) shipEl.innerText = "$" + shipping.toFixed(2);
  if (totalEl) totalEl.innerText = "$" + total.toFixed(2);
}

/* ============================= */
/* CART CONTROLS */
/* ============================= */
function increaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].qty++;
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function decreaseQty(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index].qty > 1) {
    cart[index].qty--;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}