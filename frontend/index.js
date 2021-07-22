// Clear le localstorage
initStorage()

// Index
let productsContainer = document.querySelector(".container-products");
//

// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  // get all products

  getTeddies().then((teddies) => {
    displayTeddies(teddies);
  });
});

// =======================================================

// Appel de la fonction de quantité panier

productQuantity();

