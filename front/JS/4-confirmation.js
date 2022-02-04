
function numeroDeCommande() {
    var str = window.location.href;  //propriété qui indique l'emplacement de l'URL
    console.log(str);
    
    var url = new URL(str)  // crée et retourne un objst URL() composé des paramètres donnés
    console.log("propriétés du constructeur :", url)                                             

    // l'interface URLSearchParams permet de construire et manipuler la chaine de requête de l'URL
    var recherche_param = new URLSearchParams(url.search);

    if (recherche_param.has('orderId')) {
      let orderId = recherche_param.get('orderId');
      console.log("numero de commande : ",orderId)
      
      document.getElementById('orderId').innerHTML = orderId
    }
  }
  numeroDeCommande()

  