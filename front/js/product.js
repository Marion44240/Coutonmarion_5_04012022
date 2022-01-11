// Récupération id produits dans l'API
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
        console.log(product)
    })

    // Message d'erreur si probléme requête API
    .catch((error) => {
        alert('Un problème est intervenu, merci de revenir plus tard.');
    });