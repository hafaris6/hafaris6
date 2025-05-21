document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = this.querySelector('input[type="text"]').value;
    const price = this.querySelector('input[type="number"]').value;
    let phone = this.querySelector('input[type="tel"]').value;
    const imageInput = this.querySelector('input[type="file"]');
    const imageFile = imageInput.files[0];

    if (!imageFile || !phone) return;

    // تنظيف الرقم من أي رموز غير الأرقام
    phone = phone.replace(/[^0-9]/g, '');

    // إزالة 00 إن وُجدت وتحويلها إلى صيغة wa.me
    if (phone.startsWith('00')) {
        phone = phone.substring(2);
    } else if (phone.startsWith('0')) {
        alert("يرجى إدخال رقم الهاتف بصيغة دولية تبدأ بـ + أو 00 (مثل: +9639XXXXXXX)");
        return;
    }

    // التأكد أن الرقم أصبح دولي وصحيح (مثلاً: 9639...)
    if (!phone.match(/^963\d{7,8}$/)) {
        alert("يرجى التأكد من صحة الرقم. يجب أن يبدأ بـ 963 ويتبعه 7 أو 8 أرقام.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const productList = document.getElementById("productList");
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${e.target.result}" alt="صورة المنتج" />
            <h3>${name}</h3>
            <p>السعر: ${price} ل.س</p>
            <a href="https://wa.me/${phone}?text=مرحباً، أود الاستفسار عن المنتج: ${encodeURIComponent(name)}" target="_blank">
                تواصل عبر واتساب
            </a>
        `;
        productList.appendChild(card);
    };
    reader.readAsDataURL(imageFile);

    this.reset();
});
