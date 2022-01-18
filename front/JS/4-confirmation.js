
// fonction qui génère le numero de commande
function numeroDeCommande() {
    var str = window.location.href;
    console.log(str);
    
    var url = new URL(str)
    console.log(url)                                              /////// TEST //////////

    var recherche_param = new URLSearchParams(url.search);

    if (recherche_param.has('orderId')) {
      let orderId = recherche_param.get('orderId');
      console.log("numero de commande : ",orderId)
      
      document.getElementById('orderId').innerHTML = orderId
    }
  }
  numeroDeCommande()

  