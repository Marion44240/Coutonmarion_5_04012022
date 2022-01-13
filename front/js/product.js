// Récupération id des produits dans l'API
let str = window.location.href;
let newUrl = new URL(str);
let productId = newUrl.searchParams.get('id');
console.log(productId);

fetch('http://localhost:3000/api/products/' + productId)
    .then ((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .then ((product) => {
        detailProducts (product)
        console.log(product)
    })

    // Message d'erreur si probléme requête API
    .catch((error) => {
        alert('Un problème est intervenu, merci de revenir plus tard.');
    });

// Fonction insertion des produits et ses détails dans le DOM
function detailProducts(product) {
    document.querySelector('title').textContent = product.name;
    document.querySelector('#description').innerHTML = product.description;
    document.querySelector('#price').innerHTML = product.price;
    document.querySelector('#title').innerHTML = product.name;
    document.querySelector('.item__img').innerHTML = 
    `<img src=${product.imageUrl} alt=${product.altTxt}/>`;

    for (colors of product.colors) {
        let optionColors = document.createElement('option');
        document.querySelector('#colors').append(optionColors);
        optionColors.innerHTML = `${colors}`;
        optionColors.value = `${colors}`;
    }  
}