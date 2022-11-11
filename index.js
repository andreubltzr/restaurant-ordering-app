import { menuArray } from "./data.js";

const totalPriceEl = document.getElementById("total-price");
const cartEl = document.getElementById("cart");

let cart = [];
let totalPrice = 0;

document.addEventListener("click", (e) => {
  let target = e.target.dataset;

  if (target.add) {
    addItem(target.add);
  } else if (target.remove) {
    removeItem(target.remove);
  }
});

function addItem(id) {
  cartEl.classList.add("show");
  const targetItemObj = menuArray.filter((item) => {
    return item.id == id;
  })[0];

  cart.push(targetItemObj);

  targetItemObj.quantity++;

  totalPrice += targetItemObj.price;
  totalPriceEl.textContent = `$${totalPrice}`;

  renderCheckout();
}

function removeItem(id) {
  const targetItemObj = cart.filter((item) => {
    return item.id == id;
  })[0];

  let itemIndex = cart.indexOf(targetItemObj);
  cart.splice(itemIndex, 1);

  if (targetItemObj.quantity >= 1) {
    targetItemObj.quantity--;
    renderCheckout();
  } else {
    cart.splice(itemIndex, 1);
  }

  totalPrice -= targetItemObj.price;
  totalPriceEl.textContent = `$${totalPrice}`;

  if (!cart.length) {
    cartEl.classList.remove("show");
  }
}

function getMenu() {
  let container = ``;

  menuArray.forEach((item) => {
    container += `
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

  return container;
}

function renderCheckout() {
  let cartHtml = ``;

  cart.forEach((item) => {
    cartHtml += `
        <div class="item-list" id="item-list">
            <h3>${item.name}</h3>
            <div class="item-price">
                <button id="remove-item-btn" data-remove="${item.id}">remove</button>
                <h4>$${item.price}</h4>
            </div>
        </div>
    `;
  });

  document.getElementById("order-list").innerHTML = cartHtml;
}

function render() {
  document.getElementById("main").innerHTML = getMenu();
}

render();
