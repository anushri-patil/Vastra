async function getProducts() {
  const url = "http://localhost:8000/products";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const products = await response.json();
    displayProducts(products);
    console.log(products);
  }
  catch (error) {
    console.log(error.message);
  }
}

function displayProducts(products) {
  const container = document.querySelector('.products');
  container.innerHTML = "";

  products.forEach(product => {
    const item = document.createElement('div');
    item.classList.add("product-card");
    item.innerHTML = `
            <img src="http://localhost:8000${product.image_url}" alt="${product.name}">
            <div class = "product-details">
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class = card-bottom>
            <p>Quantity: ${product.quantity}</p>
            <p>Price: ${product.price}</p>
            <div class="buttons">
                <button class="edit-btn" data-id="${product.id}">Edit</button>
                <button class="delete-btn" data-id="${product.id}">Delete</button>
            </div>
            </div>
            </div>
        `;
    container.appendChild(item);
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = e.target.dataset.id;
      window.location.href = `edit.html?id=${productId}`;
    });
  });


  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = e.target.dataset.id;
      deleteProduct(productId);
    });
  });
}


async function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;
  try {
    await fetch(`http://localhost:8000/products/${id}`, { method: "DELETE" });
    getProducts();
  } catch (err) {
    console.error("Failed to delete", err);
  }
}

window.onload = getProducts;