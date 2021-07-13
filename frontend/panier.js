// Déclaration des variables

let cartPlace = document.querySelector(".articles");
let btnbuy = document.querySelector(".btn-achat");

let cart = JSON.parse(localStorage.getItem("Bag"));
console.log(cart);

// Fonction affichage du panier dans le DOM page panier

function displayCart(bag) {
  if (cart == 0) {
    cartPlace.innerHTML = `<div class="emptyCart">Votre panier est vide !</div>`;
  } else {
    let result = "";
    bag.forEach((ted, index) => {
      result += `
      <div class="melmartN"><img src="${ted.imageUrl}" alt="" class="mini">
            <div class="noir">${ted.color}</div>
            <div class="number">${ted.qty}</div>
            <button class="btn-danger btn-sup" onclick="removeItem(${index})">x</button>
          </div>
         `;
    });
    cartPlace.innerHTML = result;
  }
}

displayCart(cart);

// Appel de la fonction de quantité panier

productQuantityCart();

// Appel de la fonction de prix total du panier

priceCart();

// Renvoie sur la confirmation au clic sur le bouton achat

btnbuy.addEventListener("click", () => {
  window.location.href = "./confirmation.html";
});
