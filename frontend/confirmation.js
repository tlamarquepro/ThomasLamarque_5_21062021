//

let numOrder = document.querySelector(".order");

let recapOrder = JSON.parse(localStorage.getItem("recapOrder"));
totalPrice.textContent = recapOrder.total;
numOrder.textContent = recapOrder.orderId;

//
