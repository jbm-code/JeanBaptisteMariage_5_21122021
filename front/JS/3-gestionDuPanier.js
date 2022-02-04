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
    
} else {   // 8b - sinon "le panier est vide"
    contentHtml = "Votre panier est vide"
    document.getElementById('totalPrice').innerHTML = 0
    document.getElementById('totalQuantity').innerHTML = 0
  }

  document.getElementById('cart__items').innerHTML = ""
  document.getElementById('cart__items').innerHTML = contentHtml  // On injecte "contentHtml" dans le html, via l'id "cart_items"

  console.log("fin fonction affichage")
}


function suppression(IdASupprimer, colorASupprimer) {  // 9 - fonctions de suppression, au click changent le localStorage
  const panier = panierJSON();
  const nouveauPanier = panier.filter(item => {
    if (item.id === IdASupprimer && item.color === colorASupprimer) {
      return false          // -> supprime le produit ciblé
    } else {
      return true           // -> conserve le produit ciblé
    }
  })
  console.log(" 9b- suppression -> creation du nouveau panier", nouveauPanier)              
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
      console.log(" 9a- click, le produit ", itemNom, itemColor, "va être supprimé")                                          
      suppression(itemId, itemColor)
    });
  });
}


function modification(produitId, produitColor, produitQty) {      // 10 - fonctions de modifications, au "change", modifient le localstorage
  const panier = panierJSON();
  const positionPanier = panier.findIndex(item => item.id === produitId && item.color === produitColor)
  panier[positionPanier].qty = produitQty
  console.log(" 10- click, modification -> position =", positionPanier, "nouvelle quantité =", produitQty)      
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

const affichageAsynchrone = async () => {         // 11 - fonction qui attend une mise a jour de l'affichage
  await creationAffichagePanier()
  definitionProduitASupprimer()
  definitionProduitAModifier()
}
 affichageAsynchrone()