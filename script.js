const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-button");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

// lista do carrinho - começa como um array vazio
let cart = [];

// abertura do modal
cartBtn.addEventListener("click", function () {
  updateCartModal();
  cartModal.style.display = "flex";
});

//fechamento do modal
cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

closeModalBtn.addEventListener("click", function () {
  cartModal.style.display = "none";
});

menu.addEventListener("click", function (event) {
  let parentBtn = event.target.closest(".add-to-cart-btn");
  if (parentBtn) {
    const name = parentBtn.getAttribute("data-name");
    const price = parseFloat(parentBtn.getAttribute("data-price"));

    // adicionando ao carrinho

    addToCart(name, price);
  }
});

// função para adicionar ao carrinho

function addToCart(name, price) {
  // verificamos se exite algum item com o mesmo nome na lista que já tenha sido adicionado anteriormente
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    //Se o item já existe, aumenta a quantidade +1
    existingItem.quantity += 1;
    return;
  }

  cart.push({
    name,
    price,
    quantity: 1,
  });

  updateCartModal();
}

//atualiza carrinho
function updateCartModal() {
  cartItemsContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add(
      "flex",
      "justify-between",
      "mb-4",
      "flex-col"
    );
    cartItemElement.innerHTML = `
    <div  class="flex items-center justify-between">
      <div>
        <p class="font-medium">${item.name}</p>
        <p> Qtb: ${item.quantity}</p>
        <p class="font-medium mt-2">${item.price.toFixed(2)}</p>
      </div>
     
        <button class="remove-from-cart-btn" data-name="${
          item.name
        }">Remover</button>
      
    </div>
        `;

    total += item.price * item.quantity;

    cartItemsContainer.appendChild(cartItemElement);
  });

  cartTotal.textContent = total.toLocaleString("pt-PT", {
    style: "currency",
    currency: "EUR",
  });

  cartCounter.innerHTML = cart.length;
}

//função para remover item do carrinho
cartItemsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const name = event.target.getAttribute("data-name");
    removeFromCart(name);
  }
});

function removeFromCart(name) {
  const index = cart.findIndex((index) => item.name === name);

  if (index !== -1) {
    const item = cart[index];
    if (item.quantity > 1) {
      item.quantity -= 1;
      updateCartModal();
      return;
    }
    cart.splice(index, 1);
    updateCartModal();
  }
}

addressInput.addEventListener("input", function (event) {
  let inputValue = event.target.input.value;

  if (inputValue !== "") {
    addressWarn.classList.add("hidden");
    addressInput.classList.remove("border-red-500");
  }
});

checkoutBtn.addEventListener("click", function () {
  const isOpen = checkHour();
  if (!isOpen) {
    alert("O Restaurante está fechado no momento!");
    return;
  }

  if (cart.length === 0) return;
  if (addressInput.value === "") {
    addressWarn.classList.remove("hidden");
    addressInput.classList.add("border-red-500");
    return;
  }

  const cartItems = cart
    .map((item) => {
      return `${item.name} Quantidade: (${item.quantity}) Preço: R$ ${item.price}`;
    })
    .join("");

  const message = encodeURIComponent(cartItems);
  const phoneNumber = "999999999";

  window.open(
    `https://wa.me/${phoneNumber}?text=${message} Endereço: ${addressInput.value}`,
    "_blank"
  );

  cart.length = 0;
  updateCartModal();
});

function checkHour() {
  const date = new Date();
  const hour = date.getHours();
  return (hour >= 12 && hour < 15) || (hour >= 19 && hour < 23);
}

const spanItem = document.getElementById("date-spam");
const isOpen = checkHour();

if (isOpen) {
  spanItem.classList.remove("bg-red-500");
  spanItem.classList.add("bg-green-600");
} else {
  spanItem.classList.add("bg-red-500");
  spanItem.classList.remove("bg-green-600");
}
