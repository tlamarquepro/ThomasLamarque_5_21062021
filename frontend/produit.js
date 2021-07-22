// Clear le localstorage
initStorage()

let onlyOneProductContainer = document.querySelector(".bloc-produit");
// Page produit
let nomTeddy = "";
let priceTeddy;
let quantiteDesire;
let cart = [];

const urlTeddy = document.location.search;
const teddyId = new URLSearchParams(urlTeddy).get("id");
let teddy = {};
let teddyImg = "";

document.addEventListener("DOMContentLoaded", () => {
  // get all products

  getTeddyById(teddyId)
    .then((ted) => {
      teddyImg = ted.imageUrl;
      displayTeddy(ted);
    })
    .then(() => {
      nomTeddy = document.querySelector(".nom-produit");
      priceTeddy = document.querySelector(".tedPrice");
      colorTeddy = document.getElementById("selectColor");

      let flecheGauche = document.querySelector(".leftarrow");
      let flecheDroite = document.querySelector(".rightarrow");
      quantiteDesire = document.querySelector(".nb-quantite");
      flecheDroite.addEventListener("click", () => {
        quantiteDesire.textContent = parseInt(quantiteDesire.textContent) + 1;
      });
      flecheGauche.addEventListener("click", () => {
        if (quantiteDesire.textContent > 1) {
          quantiteDesire.textContent = parseInt(quantiteDesire.textContent) - 1;
        }
      });
    });
});

// Fonction ajouter au panier

const addToCart = () => {
  teddy = {
    _id: teddyId,
    name: nomTeddy.textContent,
    price: priceTeddy.textContent,
    color: colorTeddy.value,
    qty: quantiteDesire.textContent,
    imageUrl: teddyImg,
  };
  addItemToCart(teddy);
  refresh();
};

// Appel de la fonction de quantité panier

productQuantity();
