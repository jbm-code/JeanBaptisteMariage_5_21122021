function ajoutProduitLocalStorage(id) {         //Ajout des produits sélectionnés a Local Storage 

    // 6- creation de la variable "bouton" 
    let bouton = document.getElementById('addToCart');
    bouton.addEventListener("click", function () {
        let color = document.getElementById('colors')
        color = color.options[color.selectedIndex].value;
        const qty = document.getElementById('quantity').value;
        const newItem = {
            id: IDproduit,
            qty: qty,
            color: color, }       
        console.log(" 6- Définition de la sélection", newItem)                                    

        // 7- si le panier contient deja des produits
        if (localStorage.getItem('panier') && localStorage.getItem('panier').length > 0) {
            //pour la lecture, la syntaxe JSON.parse() reforme l’objet à partir de la chaîne linéarisée.
            const cart = JSON.parse(localStorage.getItem('panier'));
            const productPosition = cart.findIndex(item => item.id === newItem.id && item.color === newItem.color);
            console.log(" 7b- position index dans le local storage (-1=absent) ", productPosition)  

            if (productPosition === -1) {  
                cart.push(newItem);
                //on linéarise l’objet avec la syntaxe JSON.stringify().
                localStorage.setItem('panier', JSON.stringify(cart));
                console.log(" 7c- nouveau produit ajouté")                                                     
            } else {          
                cart[productPosition].qty = parseInt(cart[productPosition].qty) + parseInt(newItem.qty);
                localStorage.setItem('panier', JSON.stringify(cart));
                console.log(" 7d- produit existant, quantités modifiées") }   
                                                                                     
        // 7- si le panier est vide, creation d'un nouveau 
        } else {
        let newCart = new Array();
        newCart.push(newItem);
        console.log(" 7a- Creation dans LocalStorage d'un tableau'")      
        console.table(newCart)
        localStorage.setItem('panier', JSON.stringify(newCart));
        }
    })
}   

ajoutProduitLocalStorage();