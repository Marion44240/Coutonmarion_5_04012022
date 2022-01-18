let str = window.location.href;
let newUrl = new URL(str);
let productId = newUrl.searchParams.get('id');
console.log(productId);

const button = document.querySelector('#addToCart');
const quantityProduct = document.querySelector('#quantity');
const colorProduct = document.querySelector('#colors');

// Récupération id des produits dans l'API
fetch('http://localhost:3000/api/products/' + productId)
    .then ((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .then ((product) => {
        detailProducts (product)
        addToCart(product)
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
        colorProduct.append(optionColors);
        optionColors.innerHTML = `${colors}`;
        optionColors.value = `${colors}`;
    }  
};

// Fonction sélectionnant les options des produits pour pouvoir au click les ajouter au panier
function addToCart(product) {  

    // Evenement au click du boutton "Ajouter au panier"
    button.addEventListener ('click', (e) => {
        e.preventDefault();

        if (colorProduct.value == ''){
            confirm('Sélectionner une couleur de votre choix !');
        } 
        else if (quantityProduct.value == 0){
            confirm('Sélectionner la quantité d\'article souhaité !');
        }
        else {
            alert('Félicitation votre commande a était ajouté au panier !');

            // Information produit à ajouter au panier
            let infoProduct = {
                id: productId,
                color: colorProduct.value,
                quantity: Number(quantityProduct.value),
                name: product.name,
                img: product.imageUrl,
                altTxt: product.altTxt,
                description: product.description,
                price: product.price,
            };
            console.log(infoProduct)

            // LocalStorage
            let localStorageProduct = JSON.parse(localStorage.getItem('cart'));
            
            // On cherche Si le panier contient déjà l'id et la couleur d'un article
            if (localStorageProduct) {
                let elt = localStorageProduct.find ((elt) => 
                elt.id == infoProduct.id && elt.color == infoProduct.color
                );
                // Si oui on modifie avec la nouvelle quantité
                if (elt) {
                    elt.quantity = elt.quantity + infoProduct.quantity;
                    localStorage.setItem('cart',JSON.stringify(localStorageProduct));
                }
                // Sinon on ajoute le nouveau produit commandé
                else {
                    localStorageProduct.push(infoProduct);
                    localStorage.setItem('cart',JSON.stringify(localStorageProduct));
                }
            }
            // Si le panier et vide 
            else {
                localStorageProduct = [];
                localStorageProduct.push(infoProduct);
                localStorage.setItem('cart',JSON.stringify(localStorageProduct));
            }
            console.table(localStorageProduct)
        }
    });
}