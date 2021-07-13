// Liaison a l'API
const apiUrl = "http://localhost:3000/api/teddies";
async function getTeddies() {
  try {
    let result = await fetch(apiUrl);
    let data = await result.json();
    // console.log(data);
    let teddies = data;
    return teddies;
  } catch (error) {
    console.log(error);
  }
}
//
// Fonction pour afficher les teddy sur l'index

function displayTeddies(teddies) {
  let result = "";
  teddies.forEach((ted) => {
    result += `
        <div class="products">
        <a href="./produit.html?id=${
          ted._id
        }" class="text-decoration-none product-cage">
            <img src="${ted.imageUrl}" alt="" class="img">
            <div class="desc">${ted.description}</div><div class="name">${
      ted.name
    }</div>
            <div class="prix">${ted.price / 100} €</div>
        </a>
        </div>
     `;
  });
  productsContainer.innerHTML = result;
}

// Fonction page produit

async function getTeddyById(id) {
  try {
    let result = await fetch(`${apiUrl}/${id}`);
    let data = await result.json();
    // console.log(data);
    let teddy = data;
    return teddy;
  } catch (error) {
    console.log(error);
  }
}

// Fonction affichage des ours dans le DOM page produit

function displayTeddy(teddy) {
  let result = "";
  let colorOptions = "";
  teddy.colors.forEach((color) => {
    colorOptions += `
        <option value="${color}">${color}</option>
        `;
  });
  result = `
    <div class="container-products-produit">
      <div class="products-produit">
          <a href="" class="text-decoration-none">
              <img src="${teddy.imageUrl}" alt="" class="img-produit">
          </a>
      </div>
  </div>
  <div class="choix">
    <div class="nom-produit">${teddy.name}</div>
    <div class="desc-produit">${teddy.description}</div>
    <div class="prix-produit"><span class="tedPrice">${
      teddy.price / 100
    }</span> €</div>
    <div class="setcolor">
        <h5>Choisir la couleur :</h5>
        <div class="bloc-couleur">
            <select class="custom-select" id="selectColor">
                ${colorOptions}
            </select>
        </div>
    </div>
    <div class="quantite">
        <i class="fas fa-chevron-left leftarrow"></i>
        <div class="nb-quantite">1</div>
        <i class="fas fa-chevron-right rightarrow"></i>
    </div>
    <div class="ajouter">
        <button class="btn btn-dark btn-addtobasket" onclick="addToCart()">Ajouter au panier</button>
    </div>

  </div>
       `;
  onlyOneProductContainer.innerHTML = result;
}

// Fonction ajouter au panier

// Gestion du localStorage

let teddyAlreadyInCart = false;
function addItemToCart(teddy) {
  let cart = JSON.parse(localStorage.getItem("Bag"));
  if (cart == null) {
    cart = [];
    cart.push(teddy);
  } else {
    cart.forEach((ted) => {
      if (ted._id == teddy._id) {
        ted.qty = parseInt(ted.qty) + parseInt(teddy.qty);
        teddyAlreadyInCart = true;
      }
    });
    if (!teddyAlreadyInCart) {
      cart.push(teddy);
    }
  }
  localStorage.setItem("Bag", JSON.stringify(cart));
  // console.log(cart);
}

// Quantité panier

// Quantité panier page index et produit

let numberPlace = document.querySelector(".nbarticles");
let qtyCartPlace = document.querySelector(".nbtotal");
function productQuantity() {
  let quantity = 0;
  let cart = JSON.parse(localStorage.getItem("Bag"));
  cart.forEach((ted) => {
    quantity += parseInt(ted.qty);
  });
  console.log(quantity);
  numberPlace.textContent = quantity;
}

// Quantité panier page panier

function productQuantityCart() {
  let quantity = 0;
  let cart = JSON.parse(localStorage.getItem("Bag"));
  cart.forEach((ted) => {
    quantity += parseInt(ted.qty);
  });
  console.log(quantity);
  qtyCartPlace.textContent = `Quantité : ${quantity}`;
}

// Prix total panier

let totalPrice = document.querySelector(".prixtotal");
function priceCart() {
  let price = 0;
  let cart = JSON.parse(localStorage.getItem("Bag"));
  cart.forEach((ted) => {
    price += parseInt(ted.price * ted.qty);
  });
  console.log(price);
  totalPrice.textContent = `Prix total : ${price} €`;
}

// Total commande page confirmation

let endPrice = document.querySelector(".prixfin");
function priceCart() {
  let price = 0;
  let cart = JSON.parse(localStorage.getItem("Bag"));
  cart.forEach((ted) => {
    price += parseInt(ted.price * ted.qty);
  });
  console.log(price);
  totalPrice.textContent = `${price} €`;
}

// Fonction pour supprimer du panier

function removeItem(position) {
  let cart = JSON.parse(localStorage.getItem("Bag"));
  cart.splice(position, 1);
  localStorage.setItem("Bag", JSON.stringify(cart));
  refresh();
}

// Fonction pour raffraichir la page

function refresh() {
  document.location.reload();
}
