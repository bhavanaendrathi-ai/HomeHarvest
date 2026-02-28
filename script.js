// Scroll to Top Button Functionality
const scrollBtn = document.querySelector(".scroll-top");

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// show button only when scrolled down
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollBtn.style.display = "grid";
  } else {
    scrollBtn.style.display = "none";
  }
});

// Product Filtering Functionality
document.addEventListener("DOMContentLoaded", () => {
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");
const products = document.querySelectorAll(".product-card");

function filterProducts() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedCategory = filterCategory.value;
  products.forEach(product => {

    const titleElement = product.querySelector("h3");
    if (!titleElement) return;
    const name = titleElement.textContent.toLowerCase();
    const category = product.getAttribute("data-category");
    const matchSearch = name.includes(searchValue);
    const matchCategory =
      selectedCategory === "all" ||
      category === selectedCategory;
    if (matchSearch && matchCategory) {
            product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });

}

searchInput.addEventListener("input", filterProducts);
filterCategory.addEventListener("change", filterProducts);


// auto filter when page loads
const params = new URLSearchParams(window.location.search);
const categoryFromURL = params.get("category");

if (categoryFromURL) {
  filterCategory.value = categoryFromURL;
  filterProducts();
}

// Product Popup Functionality
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popupImg");
const popupTitle = document.getElementById("popupTitle");
const popupPrice = document.getElementById("popupPrice");
const closePopupBtn = document.getElementById("closePopup");

products.forEach(product => {
  product.addEventListener("click", () => {
    popup.style.display = "flex";
    popupImg.src =
      product.querySelector("img").src;
    popupTitle.textContent =
      product.querySelector("h3").textContent;
    popupPrice.textContent =
      product.querySelector("p").textContent;
  });
});

closePopupBtn.addEventListener("click", () => {
  popup.style.display = "none";
});
});




//cart functionality

let iconCart = document.querySelector('.bi-cart-fill');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let addToCart = document.getElementById("addToCart");
let cartBox = document.querySelector(".listCart");
let cartCount = document.querySelector(".cart-count");
let checkOut = document.querySelector(".checkOut");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Open
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// Close
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// Add to Cart
addToCart.addEventListener("click", () => {
    const product = {
      img: popupImg.src,
      name: popupTitle.textContent,
      price: popupPrice.textContent
    };
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    popup.style.display = "none";
    showCart();
});

//buy button functionality
buyNow.addEventListener("click", () => {
  alert("Order placed successfully!");
  popup.style.display = "none";
});


// Show Cart Items
function showCart(){
  cartBox.innerHTML = "";
  cart.forEach((item) => {
    cartBox.innerHTML += `
    <div class="item">
        <img src="${item.img}">
        <div>${item.name}</div>
        <div>${item.price}</div>
        <button onclick="removeItem(${cart.indexOf(item)})">Remove</button>
    </div>
    `;
  });
  cartCount.innerText = cart.length;
}

function removeItem(index){
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

//display cart items on page load
showCart();