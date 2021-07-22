// Clear le localstorage

initStorage();

// Déclaration des variables

let cartPlace = document.querySelector(".articles");
let btnbuy = document.querySelector(".btn-achat");

let cart = JSON.parse(localStorage.getItem("Bag"));

// Fonction affichage du panier dans le DOM page panier

function displayCart(bag) {
  if (cart == 0) {
    cartPlace.innerHTML = `<div class="emptyCart">Votre panier est vide !</div>`;
  } else {
    let result = "";
    if (bag) {
      bag.forEach((ted, index) => {
        result += `
      <div class="melmartN"><img src="${ted.imageUrl}" alt="" class="mini">
            <div class="noir">${ted.color}</div>
            <div class="number">${ted.qty}</div>
            <button class="btn-danger btn-sup" onclick="removeItem(${index})">x</button>
          </div>
         `;
      });
    }
    cartPlace.innerHTML = result;
  }
}

displayCart(cart);

// Appel de la fonction de quantité panier

productQuantityCart();

// Appel de la fonction de prix total du panier

priceCart();

// Renvoie sur la confirmation au clic sur le bouton achat

/*contact: {
 firstName: string,
  lastName: string,
   address: string,
   city: string,
    email: string
 }
 products: [string] <-- array of product _id*/
formorder.onsubmit = (e) => {
  e.preventDefault();
  if (isFormValid()) {
    let contact = {
      firstName: inputPrenom.value,
      lastName: inputNom.value,
      address: inputAdresse.value,
      city: inputVille.value,
      email: inputEmail.value,
    };
    let products = [];
    cart.forEach((teddy) => {
      products.push(teddy._id);
    });
    let commande = JSON.stringify({
      contact,
      products,
    });
    // console.log(commande);
    postOrder(commande).then((response) => {
      const recapOrder = {
        orderId: response.orderId,
        total: totalPrice.textContent,
      };
      console.log(recapOrder);
      localStorage.setItem("recapOrder", JSON.stringify(recapOrder));
      window.location.href = "./confirmation.html";
    });
  }
};

// Fonction isFormValid

function isFormValid() {
  return (
    validInputText(inputPrenom) &&
    validInputText(inputNom) &&
    validInputText(inputVille) &&
    validAdresse(inputAdresse) &&
    validEmail(inputEmail)
  );
}

// Validation du formulaire et expressions régulières

let form = document.querySelector("#formorder");
console.log();

// Evenements

form.inputPrenom.addEventListener("change", () => {
  validInputText(inputPrenom);
});
form.inputNom.addEventListener("change", () => {
  validInputText(inputNom);
});
form.inputAdresse.addEventListener("change", () => {
  validAdresse(this);
});
form.inputVille.addEventListener("change", () => {
  validInputText(inputVille);
});
form.inputEmail.addEventListener("change", () => {
  validEmail(this);
});

// Fonctions

// Validation Prénom

function validInputText(inputText) {
  // Création de l'expression régulière
  let inputTextRegExp = new RegExp("^[a-zA-Zçéèêëàâä -]{2,30}$", "g");
  let testInputText = inputTextRegExp.test(inputText.value);
  let small = inputText.nextElementSibling;
  if (inputText.value == "") {
    small.innerHTML = ``;
    inputText.classList.remove("is-valid");
  } else if (testInputText == false) {
    small.innerHTML = `La saisie est invalide`;
    inputText.classList.remove("is-valid");
    small.classList.add("noValid");
  } else {
    small.innerHTML = ``;
    inputText.classList.add("is-valid");
    small.classList.remove("noValid");
  }
  return testInputText;
}

// Validation Adresse

function validAdresse() {
  // Création de l'expression régulière
  let adresseRegExp = new RegExp("^[a-zA-Z0-9.-_ çéèêëàâä]{5,100}$", "g");
  let testAdresse = adresseRegExp.test(inputAdresse.value);
  let small = inputAdresse.nextElementSibling;
  console.log(small);
  if (form.inputAdresse.value == "") {
    small.innerHTML = ``;
    form.inputAdresse.classList.remove("is-valid");
  } else if (testAdresse == false) {
    small.innerHTML = `La saisie est invalide`;
    form.inputAdresse.classList.remove("is-valid");
    small.classList.add("noValid");
  } else {
    small.innerHTML = ``;
    form.inputAdresse.classList.add("is-valid");
    small.classList.remove("noValid");
  }
  return testAdresse;
}

// Validation Email

function validEmail() {
  // Création de l'expression régulière
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  let testEmail = emailRegExp.test(inputEmail.value);
  let small = inputEmail.nextElementSibling;
  console.log(small);
  console.log(testEmail);
  if (form.inputEmail.value == "") {
    small.innerHTML = ``;
    form.inputEmail.classList.remove("is-valid");
  } else if (testEmail == false) {
    small.innerHTML = `La saisie est invalide`;
    form.inputEmail.classList.remove("is-valid");
    small.classList.add("noValid");
  } else {
    small.innerHTML = ``;
    form.inputEmail.classList.add("is-valid");
    small.classList.remove("noValid");
  }
  return testEmail;
}
