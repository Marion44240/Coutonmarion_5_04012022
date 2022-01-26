let paramsId = new URL(location.href).searchParams.get('orderId');
let orderId = document.querySelector('#orderId');

// On affiche l'id de la commande dans le DOM
orderId.textContent = paramsId;