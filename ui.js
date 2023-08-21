// arayüz işlemlerini burada yapıyoruz

const categoryList = document.querySelector('.categories')
const productList = document.querySelector(".products")
const basketList = document.querySelector(".list")

export function renderCategories(categories) {
    // kategoriler dizisindeki her obje için ekrana kart yansıtma
    categories.forEach((category) => {
        // bir div oluşturma
        const categoryDiv = document.createElement('div');

        // div'e class ekleme
        categoryDiv.classList.add("category");

        // divin içeriğini belirleme
        categoryDiv.innerHTML = `
    <img src=${category.image}>
    <span>${category.name}</span>
    `;

        // elemanı htmldeki categories divine ekleme
        categoryList.appendChild(categoryDiv);
    });
}

export function renderProducts(products) {
    products.slice(0, 40)
        // dizideki her obje için çalışır
        .forEach((product) => {
            // div oluşturma
            const productCard = document.createElement("div");
            // gerekli class atamasını yapma
            productCard.className = "product";
            // kartın içeriğini belirleme
            productCard.innerHTML = `
        <img src=${product.images[0]}>
        <p>${product.title}</p>
        <p>${product.category.name}</p>
        <div class="product-info">
        <p>${product.price} $</p>
        <button id="add-btn" data-id= ${product.id}>Sepete Ekle</button>
        </div>
        `;
        // elemanı html'e gönderme
        productList.appendChild(productCard)
        });
}

// ürünü ekrana yansıtma fonks.
export function renderBasketItem(product){
    const basketItem = document.createElement("div")
    basketItem.classList.add("list-item")
    basketItem.innerHTML = `
    <img src=${product.images[0]}/>
    <h2>${product.title}</h2>
    <h2>${product.price}</h2>
    <p>Miktar: ${product.amount}</p>
    <button id="del-button" data-id=${product.id}>Sil</button>
    `;

    basketList.appendChild(basketItem)
}