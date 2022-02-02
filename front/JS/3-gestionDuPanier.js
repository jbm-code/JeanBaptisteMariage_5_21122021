function panierJSON() {
    return JSON.parse(localStorage.getItem('panier'))
}

async function creationAffichagePanier() {    // 8 - fonction d'affichage
  let panier = panierJSON()
  let prixTotal = 0
  let quantiteTotal = 0
  let contentHtml = ""

  if (localStorage.getItem("panier") && panier.length > 0){      // 8a - si le panier existe, on crée une boucle
      for (const produit of panier) {
        let produitId = produit.id;
        let produitColor = produit.color;
        let produitQuantity = produit.qty;

        await fetch(`http://localhost:3000/api/products/${produitId}`)
          .then(res => res.json())
          .then(produitApi => {

            let produitImage = produitApi.imageUrl
            let produitAlt = produitApi.altTxt
            let produitNom = produitApi.name
            let produitPrix = produitApi.price
            let total = produitPrix * produitQuantity
            
            contentHtml += `<article class="cart__item item_${produitId}" data-name ="${produitNom}" data-id ="${produitId}" data-color="${produitColor}">
                  <div class="cart__item__img">
                    <img src="${produitImage}" alt="${produitAlt}">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                      <h2>${produitNom}</h2>
                      <p id="color">${produitColor}</p>
                      <p data-name="prix" id="prix">${total} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p id="quantite">Qté : ${produitQuantity} </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitQuantity}">
                      </div>
                      <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                      </div>
                    </div>
                  </div>
                </article>`
            console.log(" 8a- la boucle for appelle les produits : ", produitNom, produitColor, "x", produitQuantity)
      
            prixTotal =parseInt(prixTotal) + parseInt(total)
            document.getElementById('totalPrice').innerHTML = prixTotal

            quantiteTotal = parseInt(quantiteTotal) + parseInt(produitQuantity)
            document.getElementById('totalQuantity').innerHTML = quantiteTotal
          })
          .catch(function(err) {
            console.log("erreur")
        })
      } 
    
// 8b - sinon "le panier est vide"
} else {
    contentHtml = "Votre panier est vide"
    document.getElementById('totalPrice').innerHTML = 0
    document.getElementById('totalQuantity').innerHTML = 0
  }

  document.getElementById('cart__items').innerHTML = ""
  document.getElementById('cart__items').innerHTML = contentHtml

  console.log("fin fonction affichage")
}


function suppression(produitId, produitColor) {  // 9 - fonctions de suppression, au click changent le localStorage
  const panier = panierJSON();
  const nouveauPanier = panier.filter(item => {
    if (item.id === produitId && item.color === produitColor) {
      return false
    } else {
      return true
    }
  })
  console.log(" 9b- suppression -> creation du nouveau panier", nouveauPanier)    ////// TEST 9b ///////           
  localStorage.setItem('panier', JSON.stringify(nouveauPanier))
    
  affichageAsynchrone()
}
function definitionProduitASupprimer() {
  let supprimer = document.querySelectorAll('.deleteItem')
  supprimer.forEach(suppr => {
    suppr.addEventListener('click', function (event) {
      const item = event.target.closest('article');
      const itemId = item.dataset.id;
      const itemColor = item.dataset.color;
      const itemNom = item.dataset.name
      console.log(" 9a- click, le produit ", itemNom, itemColor, "va être supprimé")                ///// TEST 9a ////////                          
      suppression(itemId, itemColor)
    });
  });
}


function modification(produitId, produitColor, produitQty) {  
  const panier = panierJSON();
  const positionPanier = panier.findIndex(item => item.id === produitId && item.color === produitColor)
  panier[positionPanier].qty = produitQty
  console.log(" 10- click, modification -> la position du produit dans le panier =", positionPanier)  ////// TEST 10 ///////    
  localStorage.setItem('panier', JSON.stringify(panier))
  affichageAsynchrone()
}
function definitionProduitAModifier() {
  let quantites = document.querySelectorAll('.itemQuantity')
  quantites.forEach(element => {
    element.addEventListener('change', function (event) {
      const item = event.target.closest('article');
      const itemId = item.dataset.id;
      const produitQty = event.target.value
      const itemColor = item.dataset.color
      modification(itemId, itemColor, produitQty)
    })
  });
}

// 11 - fonction qui attend une mise a jour de l'affichage
const affichageAsynchrone = async () => {
  await creationAffichagePanier()
  definitionProduitASupprimer()
  definitionProduitAModifier()
  if (localStorage.length == 0) {
    localStorage.clear()
  }
}
 affichageAsynchrone()