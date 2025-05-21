let products = [];

document.getElementById("productForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const image = document.getElementById("productImage").value;
  const seller = document.getElementById("sellerName").value;
  const category = document.getElementById("productCategory").value;
  const whatsapp = document.getElementById("whatsappNumber").value;

  const product = {
    name,
    price,
    image,
    seller,
    category,
    whatsapp: `https://wa.me/${whatsapp}?text=أرغب%20بشراء%20${encodeURIComponent(name)}`
  };

  products.push(product);
  displayProducts(products);
  this.reset();
});

function displayProducts(productsToShow) {
  const container = document.getElementById('products-container');
  container.innerHTML = "";
  productsToShow.forEach(product => {
    const box = document.createElement('div');
    box.className = 'product';
    box.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>السعر: ${product.price}</p>
      <p>البائع: ${product.seller}</p>
      <a class="whatsapp-button" href="${product.whatsapp}" target="_blank">تواصل عبر واتساب</a>
    `;
    container.appendChild(box);
  });
}

function filterProducts(category) {
  if (category === "all") {
    displayProducts(products);
  } else {
    const filtered = products.filter(p => p.category === category);
    displayProducts(filtered);
  }
}

function searchProducts() {
  const term = document.getElementById("searchBox").value.trim();
  const results = products.filter(p => p.name.includes(term));
  displayProducts(results);
}
