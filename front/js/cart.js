// Récupération des produits ajouté au panier depuis le local Storage
let localStorageProduct = JSON.parse(localStorage.getItem('cart'));
console.table(localStorageProduct);

// Fonction verifiant si le panier est vide
function getCard() {
    if (localStorageProduct === null || localStorageProduct === 0) {
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

getCard();

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

getTotal();