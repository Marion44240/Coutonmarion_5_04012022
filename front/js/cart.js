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
        initValidForm();
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
            let inputValue = Number(input[i].value);
            localStorageProduct[i].quantity = inputValue;

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

////////// FORMULAIRE ////////////

// Expréssion régulière (regEx) pour vérifie l'email
const emailRegExp = (value) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
};
// Expréssion régulière (regEx) pour vérifie l'adresse
const addressRegExp = (value) => {
    return /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+$/.test(value);
};
// Expréssion régulière (regEx) pour vérifier le prénom, nom et ville
const otherRegExp = (value) => {
    return /^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*(\s)*$/.test(value);
};

// Variable qui récupère les éléments du formulaire
let inputFirstName = document.querySelector('#firstName');
let inputName = document.querySelector('#lastName');
let inputAddress = document.querySelector('#address');
let inputCity = document.querySelector('#city');
let inputEmail = document.querySelector('#email');
let inputValid = document.querySelector('#order');
let formField;

// Fonction qui vérifie le prénom
function controlFirstName() {
    if (otherRegExp(inputFirstName.value)) {
        document.querySelector('#firstNameErrorMsg').textContent = '';
        return true;
    }
    else {
        document.querySelector('#firstNameErrorMsg').textContent = 'Votre saisie prénom est incorrect';
        return false;
    }
};

// Fonction qui vérifie le nom
function controlName() {
    if (otherRegExp(inputName.value)) {
        document.querySelector('#lastNameErrorMsg').textContent = '';
        return true;
    }
    else {
        document.querySelector('#lastNameErrorMsg').textContent = 'Votre saisie nom est incorrect';
        return false;
    }
};

// Fonction qui vérifie l'adresse
function controlAddress() {
    if (addressRegExp(inputAddress.value)) {
        document.querySelector('#addressErrorMsg').textContent = '';
        return true;
    }
    else {
        document.querySelector('#addressErrorMsg').textContent = 'Votre saisie adresse est incorrect';
        return false;
    }
};

// Fonction qui vérifie la ville
function controlCity() {
    if (otherRegExp(inputCity.value)) {
        document.querySelector('#cityErrorMsg').textContent = '';
        return true;
    }
    else {
        document.querySelector('#cityErrorMsg').textContent = 'Votre saisie ville est incorrect';
        return false;
    }
};

// Fonction qui vérifie l'email
function controlEmail() {
    if (emailRegExp(inputEmail.value)) {
        document.querySelector('#emailErrorMsg').textContent = '';
        return true;
    }
    else {
        document.querySelector('#emailErrorMsg').textContent = 'Votre saisie email est incorrect';
        return false;
    }
};

// Fonction qui vérifie les données du formulaire et valide la commande
function initValidForm() {
    // Evénement au click du boutton commander
    inputValid.addEventListener('click', (e) => {
        e.preventDefault();
        //appel des fonctions qui vérifie la saisie des champs du formulaire
        controlFirstName();
        controlName();
        controlAddress();
        controlCity();
        controlEmail();
        
        // Variable d'un tableau récapitulatif ID des produits du local storage à envoyer a l'API
        let idProduct = [];
        for (i = 0; i < localStorageProduct.length; i++) {
            idProduct.push(localStorageProduct[i].id);
        }

        if (controlFirstName() && controlName() && controlAddress() && controlCity() && controlEmail()) {
            // Tableau récapitulatif des données client et l'id des produits commandé
            formField = {
                contact : {
                    firstName: inputFirstName.value,
                    lastName: inputName.value,
                    address: inputAddress.value,
                    city: inputCity.value,
                    email: inputEmail.value,
                },
                products: idProduct, 
            };
            console.table(formField);

            // appel de la fonction qui requête le serveur pour l'envoie des données a l'API
            saveOrder(formField);

            alert('Votre commande est validé !');  
            return true;
        }
        else {
            alert('Saisies du formulaire incorrect !');
            return false;
        }
    });    
}

// Fonction requête du serveur pour envoie des données a l'API 
function saveOrder(formField) {

    fetch('http://localhost:3000/api/products/order', {
        method:'POST',
        body: JSON.stringify(formField),
        headers: {
            'Content-type': 'application/json',
        }
    })

    .then ((res) => {
        return res.json();
    })

    .then ((data) => {
        console.log(data);
        // Envoie vers la page confirmation avec l'id de la commande
        location.href = '/front/html/confirmation.html?orderId='+ data.orderId;
        // on vide le local storage
        localStorage.clear();
    })
     
    .catch((error) => {
        alert('Probléme requête API');
    })
}