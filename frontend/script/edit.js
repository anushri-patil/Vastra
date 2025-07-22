    const id = new URLSearchParams(window.location.search).get('id');

    fetch(`http://localhost:8000/products`)
      .then(res => res.json())
      .then(data => {
        const product = data.find(p => p.id == id);
        if (!product)
             return alert("product not found");

        document.querySelector("[name='name']").value = product.name;
        document.querySelector("[name='description']").value = product.description;
        document.querySelector("[name='quantity']").value = product.quantity;
        document.querySelector("[name='price']").value = product.price;
        document.getElementById("currentImage").src = "http://localhost:8000" + product.image_url;
      })
      .catch(err => {
        console.log("error product loading", err);
      });

    document.getElementById("editForm").onsubmit = async e => {
      e.preventDefault();
      const form = new FormData(e.target);

      await fetch(`http://localhost:8000/products/${id}`, {
        method: "PUT",
        body: form
      });

      window.location.href = "index.html";
    };