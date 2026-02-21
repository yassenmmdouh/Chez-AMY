/* =========================
   GLOBAL VARIABLES
========================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* =========================
   NAVBAR SCROLL EFFECT
========================= */
const nav = document.querySelector(".floating-nav");

if(nav){
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      nav.classList.add("nav-scrolled");
    } else {
      nav.classList.remove("nav-scrolled");
    }
  });
}


/* =========================
   UPDATE CART COUNT
========================= */
function updateCartCount(){
  const count = document.getElementById("cart-count");
  if(count){
    count.innerText = cart.length;
  }
}

updateCartCount();


/* =========================
   SAVE CART
========================= */
function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}


/* =========================
   ADD TO CART
========================= */
document.addEventListener("click", function(e){

  if(e.target.classList.contains("add-cart")){

    const card = e.target.closest(".product-card");

    const name = card.querySelector(".product-name")?.innerText || "Product";
    const price = card.querySelector(".product-price")?.innerText || "0";
    const img = card.querySelector("img")?.src || "";

    const item = {
      id: Date.now(),
      name,
      price,
      img,
      qty: 1
    };

    const existing = cart.find(p => p.name === name);

    if(existing){
      existing.qty++;
    }else{
      cart.push(item);
    }

    saveCart();
    showToast(name + " added to cart");
  }

});


/* =========================
   REMOVE ITEM
========================= */
function removeItem(id){
  cart = cart.filter(item => item.id !== id);
  saveCart();
}


/* =========================
   CHANGE QTY
========================= */
function changeQty(id, delta){
  const item = cart.find(i => i.id === id);
  if(!item) return;

  item.qty += delta;

  if(item.qty <= 0){
    removeItem(id);
  }

  saveCart();
}


/* =========================
   RENDER CART
========================= */
function renderCart(){

  const container = document.getElementById("cart-items");
  if(!container) return;

  container.innerHTML = "";

  let total = 0;

  cart.forEach(item => {

    const priceNumber = parseFloat(item.price);
    total += priceNumber * item.qty;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}">
        <div>
          <h4>${item.name}</h4>
          <p>${item.price}</p>

          <div class="qty">
            <button onclick="changeQty(${item.id}, -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${item.id}, 1)">+</button>
          </div>

          <button onclick="removeItem(${item.id})">Remove</button>
        </div>
      </div>
    `;
  });

  const totalBox = document.getElementById("cart-total");
  if(totalBox){
    totalBox.innerText = "Total: " + total + " EGP";
  }
}

renderCart();


/* =========================
   TOGGLE CART POPUP
========================= */
function toggleCart(){
  document.getElementById("cart-popup").classList.toggle("show");
}


/* =========================
   SEND WHATSAPP ORDER
========================= */
function sendOrder(){

  if(cart.length === 0){
    alert("Cart is empty");
    return;
  }

  let msg = "New Order:%0A";
  let total = 0;

  cart.forEach(item=>{
    msg += `${item.name} x${item.qty} - ${item.price}%0A`;
    total += parseFloat(item.price) * item.qty;
  });

  msg += `%0ATotal: ${total} EGP`;

  const phone = "201111129289"; // حط رقمك

  window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
}


/* =========================
   TOAST MESSAGE
========================= */
function showToast(text){

  let toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = text;

  document.body.appendChild(toast);

  setTimeout(()=>{
    toast.classList.add("show");
  },100);

  setTimeout(()=>{
    toast.remove();
  },2500);
}
