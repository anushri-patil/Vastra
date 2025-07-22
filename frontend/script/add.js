const form = document.getElementById("addProduct");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    try {
        const response = await fetch("http://localhost:8000/products", {
            method: "POST",
            body: data
        });
        if (response.ok) {
            alert("Product added");
            window.location.href = "index.html";
        } else {
            const error = await response.text();
            alert("Error: " + error);
        }
    } catch (err) {
        console.log("Error", err);
    }
});
