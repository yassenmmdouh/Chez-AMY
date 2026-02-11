function renderCategory(category){

  const container = document.getElementById("products-container");
  if(!container) return;

  const list = PRODUCTS[category];

  container.innerHTML="";

  list.forEach(p=>{

    container.innerHTML += `
    <div class="product-card">
      <div class="img-box">
        <img src="${p.img}">
        <button class="add-cart">ADD TO CART</button>
      </div>

      <h3>${p.name}</h3>
      <p class="price" data-price="${p.price}">${p.price} EGP</p>
    </div>
    `;

  });

}
