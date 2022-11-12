import { menuArray } from "./data.js";

const cartEl = document.getElementById("cart");
const checkoutModalEl = document.getElementById("checkout-modal");
const name = document.getElementById("name");

let cart = [];
let totalPrice = 0;

document.addEventListener("click", (e) => {
  let targetDataset = e.target.dataset;
  let target = e.target;

  if (targetDataset.add) {
    addItem(targetDataset.add);
  } else if (targetDataset.remove) {
    removeItem(targetDataset.remove);
  } else if (target.id === "complete-order-btn") {
    openModal();
  } else if (target.id === "close-modal-btn") {
    document.getElementById("checkout-modal").style.display = "none";
  } else if (target.id === "pay-btn") {
    e.preventDefault();
    handlePayForm();
  }
});

function addItem(id) {
  const targetItemObj = menuArray.filter((item) => {
    return item.id == id;
  })[0];

  if (!cart.includes(targetItemObj)) {
    cart.push(targetItemObj);
  }

  cart.forEach((item) => {
    if (item.id === targetItemObj.id) {
      item.quantity++;
    }
  });

  totalPrice += targetItemObj.price;

  cartEl.classList.add("show");

  renderCart();
}

function removeItem(id) {
  const targetItemObj = cart.filter((item) => {
    return item.id == id;
  })[0];

  cart.forEach((item, idx) => {
    if (item.id === targetItemObj.id) {
      item.quantity--;
    }

    if (item.quantity === 0) {
      cart.splice(idx, 1);
    }
  });

  if (cart.length === 0) {
    cartEl.classList.remove("show");
  }

  totalPrice -= targetItemObj.price;

  renderCart();
}

function getMenuHtml() {
  let menuHtml = ``;

  menuArray.forEach((item) => {
    menuHtml += `
    <section class="menu" id="${item.id}">
        <div class="menu-item">
            <p class="emoji-item">${item.emoji}</p>
            <div>
                <h4 class="menu-item-info">${item.name}</h4>
                <p class="menu-item-info">${item.ingredients}</p>
                <p class="menu-item-info">$${item.price}</p>
            </div>
        </div>
        <div>
            <button class="item-add-btn" data-add="${item.id}">+</button>
        </div>
    </section>
    <div class="separator"></div>
  `;
  });

  return menuHtml;
}

function renderOrderItem() {
  let getCartHtml = ``;
  cart.forEach((item) => {
    getCartHtml += `
        <div class="item-list" id="item-list">  
                <div class="item-info">
                  <h3>${item.name}</h3>
                  <h4 id="item-qty">x${item.quantity}</h4>
                  <button id="remove-item-btn" data-remove="${
                    item.id
                  }">remove</button>
                </div>
            <div class="item-price">
                <h4>$${item.price * item.quantity}</h4>
            </div>
        </div>
    `;
  });

  let cartSectionHtml = ``;
  cart.forEach(() => {
    cartSectionHtml = `
    <div id="items-ordered">
    <div>
    <h3 id="order-title">Your order</h3>
    </div>
    <div id="order-list">${getCartHtml}</div>
    <div class="order-separator"></div>
    <div class="total-price">
    <div><p>Total price:</p></div>
      <div><p id="total-price">$${totalPrice}</p></div>
      </div>
      <button id="complete-order-btn">Complete order</button>
      </div>
      `;
  });

  return cartSectionHtml;
}

function openModal() {
  checkoutModalEl.style.display = "block";
}

function handlePayForm() {
  const cardNum = document.getElementById("card-number").value;
  const cardCvv = document.getElementById("card-cvv").value;

  if (name.value != "" && cardNum != "" && cardCvv != "") {
    thanksMsg();
    checkoutModalEl.style.display = "none";
  }
  cart.forEach((item) => {
    item.quantity = 0;
  });
  cart = [];
  totalPrice = 0;
}

function thanksMsg() {
  let cartHtml = `
  <div class="thanks-msg">
    <h1>Thanks ${name.value}, for your order!</h1>
  </div>
  `;

  document.getElementById("cart").innerHTML = cartHtml;
}

function render() {
  document.getElementById("main").innerHTML = getMenuHtml();
}

function renderCart() {
  cartEl.innerHTML = renderOrderItem();
}

render();
