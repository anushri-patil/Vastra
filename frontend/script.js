async function getProducts() {
    const url = "http://localhost:8080/products";
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const products = await response.json();
        displayProducts(products);
        console.log(products);
    }
    catch(error){
        console.log(error.message);
    }
}

function displayProducts(products){
    const container = document.querySelector('.products');
    container.innerHTML = "";

    products.forEach(product => {
        const item = document.createElement('div');
        item.classList.add("product-card");
        item.innerHTML = `
            <img src="${product.image_url}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Quantity: ${product.quantity}</p>
            <p>Price: ${product.price}</p>
            `;
            container.appendChild(item);
    });
}

window.onload = getProducts;