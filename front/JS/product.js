//on récupère l'ID de l'URL
const IDproduit = window.location.search.split("?id=").join("")
console.log("l'ID du produit ciblé est :", IDproduit)

let produitData = []

const fetchProduit = async () => {
    await fetch (`http://localhost:3000/api/products/${IDproduit}`)
        .then((res) => res.json())
        .then((promise) => {
            produitData = promise
            console.log("Données du produit :", produitData)
        })
}

const affichageProduit = async () => {
    await fetchProduit()

    document.querySelector(".item__img").innerHTML = `<img src="${produitData.imageUrl}" alt="${produitData.altTxt}">`
    document.getElementById("title").innerHTML = produitData.name
    document.getElementById("price").innerHTML = produitData.price
    document.getElementById("description").innerHTML = produitData.description
    produitData.colors.forEach(couleur => {
    document.getElementById("colors").innerHTML += `<option value="${couleur}">${couleur}</option>`
    document.title = produitData.name
    })
}
affichageProduit()