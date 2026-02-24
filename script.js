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
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");
const products = document.querySelectorAll(".product-card");


function filterProducts() {

  const searchValue = searchInput.value.toLowerCase();
  const selectedCategory = filterCategory.value;

  products.forEach(product => {

    const name = product.querySelector("h3").textContent.toLowerCase();
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

// // Close popup when clicking outside content
// popup.addEventListener("click", (e) => {
//   if (e.target === popup) {
//     popup.style.display = "none";
//   } else if (e.target.classList.contains("product-card")) {
//     // If a product card is clicked, show the popup with that product's details
//     popup.style.display = "flex";   
//     popupImg.src =
//       e.target.querySelector("img").src;
//     popupTitle.textContent =  
//       e.target.querySelector("h3").textContent;
//     popupPrice.textContent =
//       e.target.querySelector("p").textContent;
//   }
// });

//cart functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];
addToCart.addEventListener("click", () => {

    const product = {
        img: popupImg.src,
        title: popupTitle.textContent,
        price: popupPrice.textContent
    };
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart 🛒");
});
