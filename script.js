const products = [
  {
    name: "Velvet Lip Gloss",
    price: 8500,
    category: "LIPS",
    image: "Velvet_gloss.jpg"
  },
  {
    name: "Radiance Face Serum",
    price: 12500,
    category: "SKINCARE",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Silk Glow Foundation",
    price: 15000,
    category: "MAKEUP",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Velvet Matte Lipstick",
    price: 9500,
    category: "LIPS",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Hydrating Face Cream",
    price: 11000,
    category: "SKINCARE",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Golden Glow Highlighter",
    price: 9500,
    category: "MAKEUP",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Nourishing Lip Balm",
    price: 4500,
    category: "LIPS",
    image: "Lip_gloss.jpg"
  },
  {
    name: "Luxury Makeup Brush",
    price: 7000,
    category: "ACCESSORIES",
    image: "Makeup_brush.jpg"
  },
  {
    name: "Glossy Lip Oil",
    price: 6500,
    category: "LIPS",
    image: "Lip1.jpg"
  },
  {
    name: "Plumping Lip Treatment",
    price: 7500,
    category: "LIPS",
    image: "Lip2.jpg"
  },
  {
    name: "Rose Nude Lipstick",
    price: 9000,
    category: "LIPS",
    image: "Lip3.jpg"
  },
  {
    name: "Lip Liner Duo",
    price: 5000,
    category: "LIPS",
    image: "Lip4.jpg"
  },
  {
    name: "Gentle Cleansing Balm",
    price: 8500,
    category: "SKINCARE",
    image: "Skincare1.jpg"
  },
  {
    name: "Vitamin C Brightening Serum",
    price: 13500,
    category: "SKINCARE",
    image: "Skincare2.jpg"
  },
  {
    name: "Daily Moisturizer",
    price: 10000,
    category: "SKINCARE",
    image: "Skincare3.jpg"
  },
  {
    name: "Hydrating Toner",
    price: 9000,
    category: "SKINCARE",
    image: "Skincare4.jpg"
  },
  {
    name: "Overnight Repair Mask",
    price: 12000,
    category: "SKINCARE",
    image: "Skincare5.jpg"
  },
  {
    name: "Daily Sunscreen SPF 50",
    price: 11500,
    category: "SKINCARE",
    image: "Skincare6.jpg"
  },
  {
    name: "Soft Matte Concealer",
    price: 8500,
    category: "MAKEUP",
    image: "Make1.jpg"
  },
  {
    name: "Liquid Blush",
    price: 8000,
    category: "MAKEUP",
    image: "Make7.jpg"
  },
  {
    name: "Sculpting Contour Stick",
    price: 9500,
    category: "MAKEUP",
    image: "Make3.jpg"
  },
  {
    name: "Brow Defining Gel",
    price: 6000,
    category: "MAKEUP",
    image: "Make6.jpg"
  },
  {
    name: "Volumizing Mascara",
    price: 7500,
    category: "MAKEUP",
    image: "Make5.jpg"
  },
  {
    name: "Everyday Eyeshadow Palette",
    price: 14000,
    category: "MAKEUP",
    image: "Make2.jpg"
  },
  {
    name: "Silky Setting Powder",
    price: 10000,
    category: "MAKEUP",
    image: "Make4.jpg"
  },
  {
    name: "Makeup Sponge Set",
    price: 5500,
    category: "ACCESSORIES",
    image: "Makeup1.jpg"
  },
  {
    name: "Precision Brush Set",
    price: 12500,
    category: "ACCESSORIES",
    image: "Makeup2.jpg"
  },
  {
    name: "Compact Makeup Mirror",
    price: 6500,
    category: "ACCESSORIES",
    image: "Makeup3.jpg"
  },
  {
    name: "Cosmetic Travel Pouch",
    price: 8000,
    category: "ACCESSORIES",
    image: "Makeup4.jpg"
  },
  {
    name: "Silk Beauty Headband",
    price: 4000,
    category: "ACCESSORIES",
    image: "Makeup5.jpg"
  }
];


// GET THE HTML ELEMENTS

const productList = document.getElementById("product-list");
const productSearch = document.getElementById("product-search");

// Only select real category buttons.
// The Favorites button has its own click handler.
const filterButtons = document.querySelectorAll(
  ".filter-button[data-category]"
);

const favoritesFilter = document.getElementById("favorites-filter");
const productCount = document.getElementById("product-count");
const loadMoreButton = document.getElementById("load-more");

let selectedCategory = "ALL";
let showingFavorites = false;
let visibleProductCount = 8;

// Load saved favorites from this browser.
let favoriteProducts = [];

try {
  favoriteProducts = JSON.parse(
    localStorage.getItem("luxeBeautyFavorites") || "[]"
  );

  if (!Array.isArray(favoriteProducts)) {
    favoriteProducts = [];
  }
} catch (error) {
  favoriteProducts = [];
}


// SHOPPING BAG ELEMENTS

const cartButton = document.getElementById("cart-button");
const cartPanel = document.getElementById("cart-panel");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartOverlay = document.createElement("div");


// IMAGE PREVIEW ELEMENTS

const imagePreview = document.getElementById("image-preview");
const previewImage = document.getElementById("preview-image");
const previewName = document.getElementById("preview-name");

let cart = [];


// FORMAT PRICES IN NAIRA

function formatPrice(price) {
  return "₦" + price.toLocaleString("en-NG");
}


// DISPLAY THE SHOPPING BAG

function renderCart() {
  cartItems.innerHTML = "";

  let total = 0;
  let itemCount = 0;

  cart.forEach(function(item, index) {
    const product = item.product;
    const quantity = item.quantity;
    const subtotal = product.price * quantity;

    total += subtotal;
    itemCount += quantity;

    const row = document.createElement("div");
    row.className = "cart-item";

    row.innerHTML = `
      <img
        class="cart-product-preview"
        src="${product.image}"
        alt="${product.name}"
        tabindex="0"
        role="button"
        aria-label="View ${product.name} image"
        data-index="${index}"
      >

      <div class="cart-item-details">
        <h3>${product.name}</h3>
        <p>${formatPrice(subtotal)}</p>

        <div class="cart-quantity">
          <button
            class="quantity-button"
            data-action="decrease"
            data-index="${index}"
            aria-label="Decrease quantity"
          >−</button>

          <span class="quantity-number">${quantity}</span>

          <button
            class="quantity-button"
            data-action="increase"
            data-index="${index}"
            aria-label="Increase quantity"
          >+</button>
        </div>
      </div>

      <button
        class="remove-item"
        data-action="remove"
        data-index="${index}"
      >Remove</button>
    `;

    cartItems.appendChild(row);
  });

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your bag is empty.</p>";
  }

  cartTotal.textContent = formatPrice(total);
  cartButton.textContent = `Bag (${itemCount})`;
}


// SAVE FAVORITES

function saveFavorites() {
  localStorage.setItem(
    "luxeBeautyFavorites",
    JSON.stringify(favoriteProducts)
  );
}


// SEARCH, FILTER AND DISPLAY PRODUCTS

function displayProducts() {
  const searchText = productSearch.value
    .trim()
    .toLowerCase();

  const filteredProducts = products.filter(function(product) {
    const matchesSearch =
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "ALL" ||
      product.category === selectedCategory;

    const matchesFavorite =
      !showingFavorites ||
      favoriteProducts.includes(product.name);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesFavorite
    );
  });

  productList.innerHTML = "";

  productCount.textContent =
    filteredProducts.length +
    (filteredProducts.length === 1
      ? " product found"
      : " products found");

  const productsToShow = filteredProducts.slice(
    0,
    visibleProductCount
  );

  if (filteredProducts.length === 0) {
    productList.innerHTML = `
      <p class="no-products">
        ${
          showingFavorites
            ? "You haven't added any favorites yet."
            : "No products found. Try another search."
        }
      </p>
    `;
  } else {
    productsToShow.forEach(function(product) {
      const card = document.createElement("article");
      card.className = "product-card";

      const isFavorite = favoriteProducts.includes(product.name);

      card.innerHTML = `
        <div class="product-image">
          <img
            src="${product.image}"
            alt="${product.name}"
          >

          <span>${product.category}</span>

          <button
            class="favorite-button ${isFavorite ? "is-favorite" : ""}"
            aria-label="${isFavorite ? "Remove from favorites" : "Add to favorites"}"
            aria-pressed="${isFavorite}"
            type="button"
          >${isFavorite ? "♥" : "♡"}</button>
        </div>

        <h3>${product.name}</h3>

        <p>${formatPrice(product.price)}</p>

        <button class="add-to-cart" type="button">
          Add to Bag
        </button>
      `;


      // ADD OR REMOVE A FAVORITE

      const favoriteButton = card.querySelector(
        ".favorite-button"
      );

      favoriteButton.addEventListener("click", function() {
        const alreadyFavorite = favoriteProducts.includes(
          product.name
        );

        if (alreadyFavorite) {
          favoriteProducts = favoriteProducts.filter(
            function(name) {
              return name !== product.name;
            }
          );
        } else {
          favoriteProducts.push(product.name);
        }

        saveFavorites();
        displayProducts();
      });


      // ADD PRODUCT TO THE SHOPPING BAG

      const addButton = card.querySelector(".add-to-cart");

      addButton.addEventListener("click", function() {
        const existingItem = cart.find(function(item) {
          return item.product === product;
        });

        if (existingItem) {
          existingItem.quantity++;
        } else {
          cart.push({
            product: product,
            quantity: 1
          });
        }

        renderCart();

        addButton.textContent = "Added ✓";

        setTimeout(function() {
          addButton.textContent = "Add to Bag";
        }, 1000);
      });

      productList.appendChild(card);
    });
  }


  // SHOW OR HIDE LOAD MORE

  if (filteredProducts.length > visibleProductCount) {
    loadMoreButton.style.display = "block";
    loadMoreButton.disabled = false;
  } else {
    loadMoreButton.style.display = "none";
    loadMoreButton.disabled = true;
  }
}


// LOAD EIGHT MORE PRODUCTS

loadMoreButton.addEventListener("click", function() {
  visibleProductCount += 8;
  displayProducts();
});


// SEARCH AS THE CUSTOMER TYPES

productSearch.addEventListener("input", function() {
  visibleProductCount = 8;
  displayProducts();
});


// FILTER BY CATEGORY

filterButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    selectedCategory = button.dataset.category;

    // Leaving Favorites when a category is selected.
    showingFavorites = false;
    favoritesFilter.classList.remove("active");

    filterButtons.forEach(function(filterButton) {
      filterButton.classList.remove("active");
    });

    button.classList.add("active");

    visibleProductCount = 8;
    displayProducts();
  });
});


// SHOW ONLY FAVORITE PRODUCTS

favoritesFilter.addEventListener("click", function() {
  showingFavorites = !showingFavorites;

  if (showingFavorites) {
    selectedCategory = "ALL";

    filterButtons.forEach(function(button) {
      button.classList.remove("active");
    });

    favoritesFilter.classList.add("active");
  } else {
    favoritesFilter.classList.remove("active");

    filterButtons.forEach(function(button) {
      button.classList.toggle(
        "active",
        button.dataset.category === selectedCategory
      );
    });
  }

  visibleProductCount = 8;
  displayProducts();
});


// SHOW THE FIRST EIGHT PRODUCTS

displayProducts();


// CREATE THE DARK OVERLAY FOR THE SHOPPING BAG

cartOverlay.className = "cart-overlay";
document.body.appendChild(cartOverlay);


// OPEN AND CLOSE THE SHOPPING BAG

function openCart() {
  cartPanel.hidden = false;

  requestAnimationFrame(function() {
    cartPanel.classList.add("cart-open");
    cartOverlay.classList.add("cart-overlay-visible");
    document.body.classList.add("cart-is-open");
  });
}

function closeCart() {
  cartPanel.classList.remove("cart-open");
  cartOverlay.classList.remove("cart-overlay-visible");
  document.body.classList.remove("cart-is-open");

  setTimeout(function() {
    if (!cartPanel.classList.contains("cart-open")) {
      cartPanel.hidden = true;
    }
  }, 350);
}

cartButton.addEventListener("click", openCart);

document.getElementById("close-cart").addEventListener(
  "click",
  closeCart
);

cartOverlay.addEventListener("click", closeCart);

document.getElementById("continue-shopping").addEventListener(
  "click",
  closeCart
);


// OPEN A LARGER PRODUCT IMAGE IN THE BAG

function openImagePreview(index) {
  const item = cart[index];

  if (!item) return;

  previewImage.src = item.product.image;
  previewName.textContent = item.product.name;
  imagePreview.hidden = false;
}

function closeImagePreview() {
  imagePreview.hidden = true;
  previewImage.src = "";
}


// HANDLE BAG IMAGE CLICKS AND QUANTITY BUTTONS

cartItems.addEventListener("click", function(event) {
  const image = event.target.closest(".cart-product-preview");

  if (image) {
    openImagePreview(Number(image.dataset.index));
    return;
  }

  const button = event.target.closest("button[data-action]");

  if (!button) return;

  const index = Number(button.dataset.index);
  const item = cart[index];

  if (!item) return;

  const action = button.dataset.action;

  if (action === "increase") {
    item.quantity++;
  }

  if (action === "decrease") {
    item.quantity--;

    if (item.quantity <= 0) {
      cart.splice(index, 1);
    }
  }

  if (action === "remove") {
    cart.splice(index, 1);
  }

  renderCart();
});


// ALLOW KEYBOARD USERS TO OPEN IMAGE PREVIEWS

cartItems.addEventListener("keydown", function(event) {
  const image = event.target.closest(".cart-product-preview");

  if (
    image &&
    (event.key === "Enter" || event.key === " ")
  ) {
    event.preventDefault();
    openImagePreview(Number(image.dataset.index));
  }
});


// CLOSE THE IMAGE PREVIEW

document.getElementById("close-image-preview").addEventListener(
  "click",
  closeImagePreview
);

imagePreview.addEventListener("click", function(event) {
  if (event.target === imagePreview) {
    closeImagePreview();
  }
});


// ESCAPE CLOSES THE IMAGE PREVIEW OR SHOPPING BAG

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    if (!imagePreview.hidden) {
      closeImagePreview();
    } else if (!cartPanel.hidden) {
      closeCart();
    }
  }
});


// INITIALISE THE SHOPPING BAG

renderCart();