
function getItemsFromCart() {
    // return the localStorage of cart in json
    return JSON.parse(localStorage.getItem('cart'))
  }
  
  function deleteItem(produitId, produitColor) {
    //declare cart
    const panier = getItemsFromCart();
    const newPanier = panier.filter(item => {
      if (item.id === produitId && item.color === produitColor) {
        return false
      } else {
        return true
      }
    })
    // store in localstorage
    localStorage.setItem('cart', JSON.stringify(newPanier))
    // call loadCart()
    loadCart()
  }
  
  function updateQty(produitId, produitColor, produitQty) {
    //declare cart
    const panier = getItemsFromCart();
    const pos = panier.findIndex(item => item.id === produitId && item.color === produitColor)
    panier[pos].qty = produitQty
    // store in localstorage
    localStorage.setItem('cart', JSON.stringify(panier))
    // call loadCart()
    loadCart()
  }
  
  async function createProducts() {
    // get cart
    let panier = getItemsFromCart()
    // initialize totalprice and totalquantity at 0
    let prixTotal = 0
    let quantiteTotal = 0
    // intialize empty contenuHtml
    let contentHtml = ""
  
    if(panier.length > 0){
      // loop on cart products
    for (const produit of panier) {
      let produitId = produit.id;
      let produitColor = produit.color;
      let produitQuantity = produit.qty;
  
      // add "await" before fetch
      await fetch(`http://localhost:3000/api/products/${produitId}`)
        .then(res => res.json())
        .then(produitApi => {
  
          let produitImage = produitApi.imageUrl
          let produitAlt = produitApi.altTxt
          let produitNom = produitApi.name
          let produitPrix = produitApi.price
          let total = produitPrix * produitQuantity
  
          // add HTML generated in contenuHtml with +=
          contentHtml += `<article class="cart__item item_${produitId}" data-id="${produitId}" data-color="${produitColor}">
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
          //add price and qty to the initials price and quantity
          prixTotal = parseInt(prixTotal) + parseInt(total)
          document.getElementById('totalPrice').innerHTML = prixTotal
  
          quantiteTotal = parseInt(quantiteTotal) + parseInt(produitQuantity)
          document.getElementById('totalQuantity').innerHTML = quantiteTotal
        })
        .catch(function(err) {
          console.log("erreur")
      })
    } 
    
    } else {
      contentHtml = "Votre panier est vide :'("
      document.getElementById('totalPrice').innerHTML = 
      document.getElementById('totalQuantity').innerHTML = 0
    }
    // empty #cart__items
    document.getElementById('cart__items').innerHTML = ""
    // fill #cart__items with contenuHtml
    document.getElementById('cart__items').innerHTML = contentHtml
  }
  
  function handleEvents() {
    // get all DOM deleteItem and itemQuantity
    let supprimer = document.querySelectorAll('.deleteItem')
    let quantites = document.querySelectorAll('.itemQuantity')
    // call deleteItem and updateQty in each event  
    supprimer.forEach(suppr => {
      suppr.addEventListener('click', function (event) {
        const item = event.target.closest('article');
        const itemId = item.dataset.id;
        const itemColor = item.dataset.color;
        deleteItem(itemId, itemColor)
      });
    });
  
    quantites.forEach(element => {
      element.addEventListener('change', function (event) {
        const item = event.target.closest('article');
        const itemId = item.dataset.id;
        const produitQty = event.target.value
        const itemColor = item.dataset.color
        updateQty(itemId, itemColor, produitQty)
      })
    });
  }
  
  async function loadCart() {
    const products = await createProducts();
    handleEvents(); // add eventListener to the created DOM
  }
  
  loadCart(); // execute the function that call the two principals function
  
  function escapeHtml(unsafe)
  {
      return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
  }
  
  function checkForm() {
    // regex creation for eache elements
    let emailReg = /^([a-zA-Z0-9]+(?:[._-][a-zA-Z0-9]+)*)@([a-zA-Z0-9]+(?:[.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,})$/g
    let regAdress = /^(([a-zA-Zà-ùÀ-Ù0-9\-\.']+)(\ )?){0,7}$/g
    let reg = /^(([a-zA-Zà-ùÀ-Ù\-\.']+)(\ )?){0,7}$/g
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value
    const address = document.getElementById('address').value
    const city = document.getElementById('city').value
    const email = document.getElementById('email').value
  
    function erreur(erreur, donnee) {
      erreur.innerHTML = `${escapeHtml(donnee)} est invalide`
    }
    let falseCount = 0
    
    // if there is no match return false
    if (!firstName.match(reg)){
      const prenom = document.getElementById('firstNameErrorMsg')
      erreur(prenom, firstName);
      falseCount ++;
    }
    if (!lastName.match(reg)) {
      const nom = document.getElementById('lastNameErrorMsg')
      erreur(nom, lastName)
      falseCount ++;
    }
    if (!address.match(regAdress)) {
      const adresse = document.getElementById('addressErrorMsg')
      erreur(adresse, address)
      falseCount ++;
    }
    if (!city.match(reg)) {
      const ville = document.getElementById('cityErrorMsg')
      erreur(ville, city)
      falseCount ++;
    }
    if (!email.match(emailReg)) {
      const mail = document.getElementById('emailErrorMsg')
      erreur(mail, email)
      falseCount ++;
    } else {
      if (falseCount === 0){
        return true
      }else{
        return false
      }
    }
  }
  
  
  
  function send() {
    //send data to the Api and redirect to corfirmation page.
    const isFormValid = checkForm();
    if (isFormValid) {
      let panier = getItemsFromCart()
      let products = new Array
      panier.forEach(element => {
        products.push(element.id)
      });
      let contact = {
        contact: {
          firstName: document.getElementById('firstName').value,
          lastName: document.getElementById('lastName').value,
          address: document.getElementById('address').value,
          city: document.getElementById('city').value,
          email: document.getElementById('email').value,
        },
        products: products
      }
      fetch("http://localhost:3000/api/products/order", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(contact)
        })
        .then(function (res) {
          if (res.ok) {
            return res.json()
          }
        })
        .then(function (res) {
          document.location.href = `confirmation.html?orderId=${res.orderId}`
          localStorage.clear()
        })
    } else {
      alert('Le formulaire est mal rempli.')
    }
  }
  
  //submit event and clean cart
  document.getElementById('order').addEventListener('click', function (e) {
    e.preventDefault()
    send()
  })