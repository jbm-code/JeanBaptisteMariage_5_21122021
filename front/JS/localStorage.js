//Ajout des produits sélectionnés a Local Storage
function ajoutProduitLocalStorage(id) {

    // 6- creation de la variable "bouton" (let a une portée limitée au bloc)
    let bouton = document.getElementById('addToCart');
    bouton.addEventListener("click", function () {
        let color = document.getElementById('colors')
        color = color.options[color.selectedIndex].value;
        const qty = document.getElementById('quantity').value;
        const newItem = {
            id: IDproduit,
            qty: qty,
            color: color,
        }
        console.log(" 6- Définition de la sélection", newItem)        /////////// TEST 6 ////////////////////////

        // 7- si le panier contient deja des produits
        if (localStorage.getItem('panier') && localStorage.getItem('panier').length > 0) {
            //pour la lecture, la syntaxe JSON.parse() reforme l’objet à partir de la chaîne linéarisée.
            const cart = JSON.parse(localStorage.getItem('panier'));
            const productPosition = cart.findIndex(item => item.id === newItem.id && item.color === newItem.color);

            console.log(" 7b- produit existant ? rang dans LocalStorage ? -> ", productPosition)  ///////// TEST 7b ///////////

            //si la fonction renvoie faux pour tous les éléments du tableau, le résultat vaut -1.
            //cad si l'id ou la couleur sont nouveaux
            if (productPosition === -1) {
                cart.push(newItem);
                //on linéarise l’objet avec la syntaxe JSON.stringify().
                //Cette opération transforme l’objet en une chaîne de caractères.
                localStorage.setItem('panier', JSON.stringify(cart));
                console.log(" 7c- nouveau produit ajouté")                ////////////// TEST 7c ///////////

            // l'id et la couleur sont les mêmes, on change la quantité           
            } else {           
                cart[productPosition].qty = parseInt(cart[productPosition].qty) + parseInt(newItem.qty);
                localStorage.setItem('panier', JSON.stringify(cart));
                console.log(" 7d- produit existant, quantités modifiées")    ////////////// TEST 7d //////////
                                                                            
            }

        // 7- si le panier est vide, creation d'un nouveau 
        } else {
        let newCart = new Array();
        newCart.push(newItem);
        console.log(" 7a- Creation dans LocalStorage d'un tableau'")      ////////////// TEST 7a /////////////
        console.table(newCart)
        localStorage.setItem('panier', JSON.stringify(newCart));
        }
    })
}   

ajoutProduitLocalStorage();