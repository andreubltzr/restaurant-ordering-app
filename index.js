import { menuArray } from "./data.js";

let cart = [];

document.addEventListener("click", (e) => {
  let target = e.target.dataset;

  if (target.add) {
    addItem(target.add);
  }
});

function addItem(id) {
  const targetItemObj = menuArray.filter((item) => {
    return item.id == id;
  })[0];

  cart.push(targetItemObj);
  renderCheckout();
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
        <div class="item-list">
            <h3>${item.name}</h3>
            <div class="item-price">
                <button class="remove-item-btn">remove</button>
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
