document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("productForm");
    const productList = document.getElementById("productList");

    // تحميل المنتجات من localStorage
    function loadProducts() {
        const products = JSON.parse(localStorage.getItem("products") || "[]");
        productList.innerHTML = "";
        products.forEach(addProductToPage);
    }

    function addProductToPage(product) {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${product.image}" alt="صورة المنتج" />
            <h3>${product.name}</h3>
            <p>السعر: ${product.price} ل.س</p>
            <a href="https://wa.me/${product.phone}?text=مرحباً، أود الاستفسار عن المنتج: ${encodeURIComponent(product.name)}" target="_blank">
                تواصل عبر واتساب
            </a>
        `;
        productList.appendChild(card);
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = form.querySelector('input[type="text"]').value;
        const price = form.querySelector('input[type="number"]').value;
        let phone = form.querySelector('input[type="tel"]').value;
        const imageFile = form.querySelector('input[type="file"]').files[0];

        if (!imageFile || !phone) return;

        // تنظيف رقم الهاتف
        phone = phone.replace(/[^0-9]/g, '');
        if (phone.startsWith("00")) phone = phone.slice(2);
        else if (phone.startsWith("0")) {
            alert("يرجى استخدام رقم بصيغة دولية يبدأ بـ + أو 00");
            return;
        }
        if (!/^963\d{7,8}$/.test(phone)) {
            alert("الرقم يجب أن يبدأ بـ 963 ويتبعه 7 أو 8 أرقام.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const product = {
                name,
                price,
                phone,
                image: e.target.result
            };

            const products = JSON.parse(localStorage.getItem("products") || "[]");
            products.push(product);
            localStorage.setItem("products", JSON.stringify(products));
            addProductToPage(product);
            form.reset();
        };
        reader.readAsDataURL(imageFile);
    });

    loadProducts();
});