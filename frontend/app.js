// Ciblage des éléments
// Page produit
let flecheGauche = document.querySelectorAll('.leftarrow');
let flecheDroite = document.querySelectorAll('.rightarrow');
let quantiteDesire = document.querySelectorAll('.nb-quantite');
let productsContainer = document.querySelector('.container-products');
// ==========================================================



// Fonction nombre d'article



class Teddies {
    static async  getTeddies() {
      try {
        let result = await fetch("http://localhost:3000/api/teddies");
        let data = await result.json();
        console.log(data);
        // let contentful = await client.getEntries({
        //   content_type: "comfyHouseProducts"
        // });
        // console.log(contentful.items);
        // console.log(data);
  
        let teddies = data;
        /*teddies = teddies.map((ted) => {
          const { _id, colors, name, price, imageUrl, description } = ted;
          return { _id, colors, name, price, imageUrl, description };
        });
        console.log(teddies);*/
  
        return teddies;
      } catch (error) {
        console.log(error);
      }
    }
  }
Teddies.getTeddies();

// UI 

class UI {
    static displayTeddies(teddies) {
      let result = "";
      teddies.forEach((ted) => {
        result += `
        <div class="products">
        <a href="./produit1.html" class="text-decoration-none product-cage">
            <img src="${ted.imageUrl}" alt="" class="img">
            <div class="desc">${ted.description}</div>
            <div class="prix">48.99 €</div>
        </a>
        </div>
     `;
      });
      productsContainer.innerHTML = result;
    }
}

document.addEventListener("DOMContentLoaded", () => {
  
    // get all products
    Teddies
      .getTeddies()
      .then((teddies) => {
        UI.displayTeddies(teddies);
        /*Storage.saveProducts(products);*/
      })
      .then(() => {
        /*ui.getBagButtons();
        ui.cartLogic();*/
      });
  });