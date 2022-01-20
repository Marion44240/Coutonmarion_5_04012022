const url = 'http://localhost:3000/api/products';
let localStorageProduct;

// Fonction requête API
fetch(url)
    .then ((res) => {
        if (res.ok) {
            return res.json();
        }
    })

    .then ((products) => {
        console.log(products);

        // Récupération des produits ajouté au panier depuis le local Storage
        localStorageProduct = JSON.parse(localStorage.getItem('cart'));
        // Récupération du prix des produits
        localStorageProduct = localStorageProduct.map((prod) => {
            prod.price = products.find((prod2) => {
                return prod.id == prod2._id
            }).price
            return prod;
        })
        console.table(localStorageProduct);

        getCard();
        getTotal();
        newQuantity();
        toDelete();
    })

    // Message d'erreur si probléme requête API
    .catch((error) => {
        alert('Un problème est intervenu, merci de revenir plus tard.');
    });

// Fonction verifiant si le panier est vide
function getCard() {
    if (localStorageProduct == null || localStorageProduct == 0) {
        document.querySelector('h1').textContent = 'Votre panier est vide !';
    }
    else {
        document.querySelector('h1').textContent = 'Votre panier :';
    }

    // Insertion des produits commandés dans le panier
    for (product of localStorageProduct) {
        document.querySelector('#cart__items').innerHTML += `
        <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
        <div class="cart__item__img">
          <img src="${product.img}" alt="${product.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>Couleur : ${product.color}</p>
            <p>Prix à l'unité : ${product.price}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.quantity}>
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`
    }
};

// Fonction pour récupérer la quantité total et le prix total de la commande
function getTotal() {    
    let selectQuantity = document.getElementsByClassName('itemQuantity');
    let totalQuantity = 0;
    let totalPrice = 0;

    // Quantité total
    for (i = 0; i < selectQuantity.length; i++) {
        totalQuantity += Number(selectQuantity[i].value);
    }
    document.querySelector('#totalQuantity').innerHTML = totalQuantity;

    // Prix Total
    for (i = 0; i < selectQuantity.length; i++) {
        totalPrice += (Number(selectQuantity[i].value) * localStorageProduct[i].price);
    }
    document.querySelector('#totalPrice').innerHTML = totalPrice;
};

// Fonction pour modifier la quantité d'un produit
function newQuantity() {
    let input = document.querySelectorAll('.itemQuantity');
    
    for (let i = 0; i < input.length; i++) {
        // Evenement quand on change la quantité du produit
        input[i].addEventListener('change', (e) => {
            e.preventDefault();
            let inputQuantity = localStorageProduct[i].quantity;
            let inputValue = Number(input[i].value);
            let results = localStorageProduct.find((prod) => prod.inputQuantity != inputQuantity);
            results.quantity = inputValue;
            localStorageProduct[i].quantity = results.quantity;

            localStorage.setItem('cart',JSON.stringify(localStorageProduct));
            // Message d'alerte quantité changé
            alert('Vous avez modifié la quantité du produit')
            // rafraichissement de la page
            location.reload();
        })
    }
};

// Fonction pour supprimer un produit
function toDelete() {
    let deleteProduct = document.querySelectorAll('.deleteItem');

    for (let i = 0; i< deleteProduct.length; i++) {
        // Evenement au click sur "supprimer"
        deleteProduct[i].addEventListener('click', (e) => {
            e.preventDefault();
            localStorageProduct.splice(i, 1);

            localStorage.setItem('cart',JSON.stringify(localStorageProduct));
            // Message d'alerte produit supprimé
            alert('Votre produit a bien était supprimé de votre panier');
            // rafraichissement de la page
            location.reload();
        })
    }
};