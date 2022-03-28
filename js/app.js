const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");
const cardBtn = document.querySelectorAll(".card-btn");
let overlay = document.querySelector(".overlay");
let cardEle = document.querySelector("#card");
let tbodyEle = document.querySelector("tbody");
let countCard = document.querySelectorAll(".count");

//  Open toggle menu
bar.addEventListener("click", () => {
  nav.classList.add("active");
});
//  Cancel toggle menu
close.addEventListener("click", () => {
  nav.classList.remove("active");
});

// Calc number of products
countCard.forEach((el) => {
  el.innerHTML = tbodyEle.children.length;
});

// Open display Card
cardBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (tbodyEle.innerHTML !== "") {
      cardEle.classList.add("active");
      overlay.classList.add("active");
    } else {
      alert("Please Add Product");
    }
  });
});
// Close display Card
overlay.addEventListener("click", () => {
  cardEle.classList.remove("active");
  overlay.classList.remove("active");
});

// Display Products In Shop Page
const productsEle = document.querySelector(".pro-container");
data.map((el) => {
  productsEle.innerHTML += `
<div class="pro">
<img src="${el.img}" alt="">
<div class="des">
    <span>adidas</span>
    <h5>Cartoon Astronaut T-Shirts</h5>
    <div class="star">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
    </div>
    <h4>$${el.price}</h4>
</div>
<i class="fal fa-shopping-cart add-card"></i>
</div>
`;
});

// Add Product in Card
const cardBtns = document.querySelectorAll(".add-card");

cardBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (localStorage.getItem("username")) {
      tbodyEle.innerHTML += `
            <tr>
                        <td class="close-pro"><a href="#"><i class="far fa-times-circle"></i></a></td>
                        <td><img src="${data[index].img}" alt=""></td>
                        <td>Cartoon Astronaut T-Shirts</td>
                        <td id="price">${data[index].price}</td>
                        <td><input type="number" id="quantity" value="1"></td>
                        <td id="total">${data[index].price}</td>
            </tr>      
            `;

      // Display none Button add product in card
      btn.classList.add("active");

      //  Calc Price total at a product
      let quantityEle = document.querySelectorAll("#quantity");
      quantityEle.forEach((el) => {
        el.addEventListener("change", () => {
          el.parentElement.nextElementSibling.innerHTML =
            el.parentElement.previousElementSibling.innerHTML * el.value;
        });
      });

      // Remove Product
      let closeProBtn = document.querySelectorAll(".close-pro");
      closeProBtn.forEach((closeBtn) => {
        closeBtn.addEventListener("click", () => {
          closeBtn.parentElement.remove();

          countCard.forEach((el) => {
            el.innerHTML = tbodyEle.children.length;
          });
        });
      });
    } else {
      window.location.href = "../login.html";
    }

    countCard.forEach((el) => {
      el.innerHTML = tbodyEle.children.length;
    });
  });
});

//Calc Total Price at Products
let btnAddProductsToCard = document.querySelector(".add-to-cart-page");
let allPrice = [];

btnAddProductsToCard.addEventListener("click", () => {
  let price = document.querySelectorAll("#total");

  for (let i = 0; i < price.length; i++) {
    allPrice.push(+price[i].textContent);
  }

  let total = allPrice.reduce((total, item) => total + item);
  localStorage.setItem("total", total);
  localStorage.setItem("products", tbodyEle.innerHTML);

  window.location.href = "../card.html";
});

// Delete All Products To Card

let deleteAllProducts = document.querySelector(".delete-products");

deleteAllProducts.addEventListener("click", () => {
  tbodyEle.innerHTML = "";
  cardEle.classList.remove("active");
  overlay.classList.remove("active");
  countCard.forEach((el) => {
    el.innerHTML = tbodyEle.children.length;
  });
  window.location.reload();
});

window.onload = function () {
  localStorage.removeItem("total");
  localStorage.removeItem("products");
};
