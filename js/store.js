let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount(){
  const count = cart.reduce((a,b)=>a+b.qty,0);
  const el = document.getElementById("cart-count");
  if(el) el.textContent = count;
}

function addToCart(name, price, img){

  const existing = cart.find(p=>p.name===name);

  if(existing){
    existing.qty++;
  }else{
    cart.push({
      name,
      price,
      img,
      qty:1
    });
  }

  saveCart();
  renderCart();
}

function renderCart(){
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if(!container) return;

  container.innerHTML="";
  let total = 0;

  cart.forEach((item,i)=>{
    total += item.price * item.qty;

 container.innerHTML += `
<div class="cart-item">

  <img src="${item.img}" alt="${item.name}">

  <div class="cart-info">
    <h4>${item.name}</h4>
    <p>${item.price} EGP</p>
    <p>Qty: ${item.qty}</p>
  </div>

  <button onclick="removeItem(${i})">×</button>

</div>
`;
  });

  if(totalEl) totalEl.textContent = "Total: "+total+" EGP";
}

function removeItem(i){
  cart.splice(i,1);
  saveCart();
  renderCart();
}

function toggleCart(){
  document
    .getElementById("cart-popup")
    .classList.toggle("active");

  renderCart();
}

function goToCheckout(){
  window.location.href="checkout.html";
}

updateCartCount();
window.toggleCart = toggleCart;
window.removeItem = removeItem;
window.goToCheckout = goToCheckout;