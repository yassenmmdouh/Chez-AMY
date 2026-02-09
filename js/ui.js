document.addEventListener("DOMContentLoaded",()=>{

  document.querySelectorAll(".product-card").forEach(card=>{

    const btn = card.querySelector(".add-cart");
    if(!btn) return;

    btn.addEventListener("click",()=>{

      const name = card.querySelector("h3").textContent;
      const price = parseInt(card.querySelector(".price").dataset.price);
      const img = card.querySelector("img").src;

      addToCart(name,price,img);

    });

  });

});
