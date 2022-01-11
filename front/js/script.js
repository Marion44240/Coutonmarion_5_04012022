const url = 'http://localhost:3000/api/products';
const items = document.querySelector('#items');

// Fonction requête API
fetch(url)
    .then ((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    // Récuparation des produits
    .then ((products) => { 
        console.log(products); 
        // Insertion des produits dans le DOM
        for (data of products) {
            items.innerHTML += `
            <a href="./product.html?id=${data._id}">
            <article>
            <img src="${data.imageUrl}" alt="${data.altTxt}"/>
            <h3 class="productName">${data.name}</h3>
            <p class="productDescription">${data.description}</p>
            </article>
            </a>`;
        } 
    })
    // Message d'erreur si probléme requête API
    .catch((error) => {
        alert('Un problème est intervenu, merci de revenir plus tard.');
    });