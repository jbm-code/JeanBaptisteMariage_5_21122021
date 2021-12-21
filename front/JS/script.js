let kanapData = [];

const fetchAPI = async () => {
    await fetch ("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((promise) => {
            kanapData = promise
            console.log("liste des produits de l'API :", kanapData)
        });            
};

const affichageIndex = async () => {
    await fetchAPI();

    document.getElementById("items").innerHTML = kanapData.map((kanap) => 
        `<a href="./product.html?id=${kanap._id}">
            <article>
                <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
                <h3 class="productName">${kanap.name}</h3>
                <p class="productDescription">${kanap.description}</p>
            </article>
        </a>`
    ).join("")
};

affichageIndex();
