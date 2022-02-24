
//les 5 variables devront être true pour que l'odre de commande puisse être lancée
var check1=false
var check2=false
var check3=false
var check4=false
var check5=false

//on écoute les inputs du formulaire, si les Regex sont validées -> check et innerText
document.getElementById("firstName").addEventListener("input", function(e) {
  if (/^(([a-zA-Zà-ùÀ-Ù\-\.']+)(\ )?){0,7}$/g.test(e.target.value) ) {
    document.getElementById("firstNameErrorMsg").innerText = ""
    check1=true
    console.log("Regex : la saisie du prénom est correcte")
  } else {
    document.getElementById("firstNameErrorMsg").innerText = "Erreur de saisie"
      check1=false  
  }
})

document.getElementById("lastName").addEventListener("input", function(e) {
    if (/^(([a-zA-Zà-ùÀ-Ù\-\.']+)(\ )?){0,7}$/g.test(e.target.value)) {
      document.getElementById("lastNameErrorMsg").innerText = ""
      check2=true  
      console.log("Regex : la saisie du nom est correcte")
    } else {
      document.getElementById("lastNameErrorMsg").innerText = "Erreur de saisie"  
      check2=false  
    }
})

document.getElementById("address").addEventListener("input", function(e) {
  if (/^(([a-zA-Zà-ùÀ-Ù0-9\-\.']+)(\ )?){0,7}$/g.test(e.target.value)) {
    document.getElementById("addressErrorMsg").innerText = ""
    check3=true
    console.log("Regex : la saisie de l'adresse est correcte")
  } else {
    document.getElementById("addressErrorMsg").innerText = "Erreur de saisie"
    check3=false  
  }
})

document.getElementById("city").addEventListener("input", function(e) {
  if (/^(([a-zA-Zà-ùÀ-Ù\-\.']+)(\ )?){0,7}$/g.test(e.target.value)) {
    document.getElementById("cityErrorMsg").innerText = ""
    check4=true
    console.log("Regex : la saisie de la ville est correcte")
  } else {
    document.getElementById("cityErrorMsg").innerText = "Erreur de saisie"
    check4=false  
  }
})

document.getElementById("email").addEventListener("input", function(e) {
  if (/^([a-zA-Z0-9]+(?:[._-][a-zA-Z0-9]+)*)@([a-zA-Z0-9]+(?:[.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,})$/g.test(e.target.value)) {
    document.getElementById("emailErrorMsg").innerText = ""
    check5=true
    console.log("Regex : la saisie du email est correcte")
  }
  else{
    document.getElementById("emailErrorMsg").innerText = "Erreur de saisie"
    check5=false
  }
})

function postForm() {
    
    let inputName = document.getElementById('firstName')
    let inputLastName = document.getElementById('lastName')
    let inputAdress = document.getElementById('address')
    let inputCity = document.getElementById('city')
    let inputMail = document.getElementById('email')
    
    
    let panierJSON = JSON.parse(localStorage.getItem('panier'))
   
    let tableauFinal = new Array
    panierJSON.forEach(element => {
      tableauFinal.push(element.id)  // 1 - on créé un tableau avec les id des différents produits sélectionnés

      const order = {             // 2 - fiche destinataire, qui contient les données client et les données produits
          contact : {
              firstName : inputName.value,
              lastName: inputLastName.value,
              address: inputAdress.value,
              city: inputCity.value,
              email: inputMail.value,
          },
          products: tableauFinal,
      }
      console.table(order) 
      
      const options = {        // 3 - options d'envoi
          method: 'POST',
          headers: {
              'Accept': 'application/json', 
              'Content-Type': 'application/json' 
          },
          body: JSON.stringify(order)
      }
      
      fetch("http://localhost:3000/api/products/order", options)  // on envoye les donnés a l'API avec une requête POST
      .then((response) => response.json())
      .then((data) => {               // on récupère orderId dans la réponse de l'API
        console.log("orderId fourni par l'API", data);
        document.location.href = "./confirmation.html?orderId=" + data.orderId  // on redirige vers la page confirmation
        localStorage.clear()
      })
      .catch(function (error) {
          console.log ("Problème avec l'API : " + error.message)
      })   
    })
}

//pour lancer la commande, le panier ne doit pas être vide et le formulaire correctement rempli
document.getElementById("order").addEventListener("click", function (e) {  
  e.preventDefault()    
  if(!localStorage.getItem("panier") & localStorage.getItem("panier") == 0){
    alert("le panier est vide")
  }
  else{
    if (check1 & check2 & check3 & check4 & check5){ 
      console.log("test Regex ok") 
      console.log(localStorage.getItem("panier"))  
      postForm()   
      
    }
    else{      
      alert("Le Formulaire présente des erreurs de saisie")
    }
  }  
})


