// diğer dosyalardan gelenler;
import { renderCategories , renderProducts , renderBasketItem} from "./ui.js";

// sayfanın (html'in) yüklenme anını izleme
document.addEventListener("DOMContentLoaded", () => {
    fetchCategories();
    fetchProducts();
});

// kategori bilgilerini çek
//   - API'a istek at
//   - gelen veriyi işle
//   - gelen verileri ekrana yansıtacak fonks. çalıştır.

function fetchCategories(){
    fetch('https://api.escuelajs.co/api/v1/categories')
    // veri gelirse çalışır
    .then((response) => response.json())
    // veri json formatına dönünce çalışır
    .then((data) => renderCategories(data))
    // hata olursa çalışır
    .catch((error) => console.log(error));
}

let globalData = []

// Ürünler verisini çek
async function fetchProducts() {
    try{
        // veri çekme isteği at
      const res = await fetch('https://api.escuelajs.co/api/v1/products');
      // gelen veriyi işle
      const data = await res.json();
      // veriyi erişilebilir yapma
      globalData = data;
      // bu veriyi ekrana yansıt
      renderProducts(data);
    } catch (err){
      console.log(err);
    }
}

// Sepet İşlemleri

//  Sepete eklenenleri tutacağımız dizi 
let basket = []
let total = 0;

const modal = document.querySelector('.modal-wrapper')
const sepetBtn = document.querySelector('#sepet-btn')
const closeBtn = document.querySelector('#close-btn')
const basketList = document.querySelector('.list')
const modalInfo = document.querySelector('.total-span')

// sepet butonuna basılma olayını izleme
sepetBtn.addEventListener("click", () => {
// modalı görünür yapma
  modal.classList.add('active');
  // modalın içerisine sepetteki ürünleri listeleme
  addList()
} );
// çarpı butonuna basılma olayını izleme
closeBtn.addEventListener("click" , () => {
  // modalı ortadan kaldırma
  modal.classList.remove('active');
  // sepetin içindeki html'i temizle
  basketList.innerHTML =  "";
  total = 0;
  modalInfo.textContent = '0';
});

// modal dışında bir yere tıklanma olayını izleme
document.addEventListener("click", (e) =>{
  var clickedEl = e.target;
  if(clickedEl.classList.contains("modal-wrapper")){
    modal.classList.remove("active")
    // sepetin içindeki html'i temizle
  basketList.innerHTML =  ""
  total = 0;
  modalInfo.textContent = '0';
  }
});

// Uygulamadaki bütün tıklanma olaylarını izleme
document.body.addEventListener("click", findItem)
// html tarafında tıklanılan elemanı tespit etme
function findItem(e){
  //  tıklanılan olay
  const ele = e.target;
  // tıklanan elemanın idsi sepete ekleme butonu mu kontrol
  if(ele.id === "add-btn"){
    //  hangi elemanı sepete ekleyeceğimizi buluyoruz
    const selected = globalData.find(
    (product) => product.id == ele.dataset.id
    );
    // elemanın miktar değeri yoksa 1'e eşitle
    if(!selected.amount){
      selected.amount = 1;
    }
    addToBasket(selected);
  }

  // eğer sepetteki eleman sil ise
  if(ele.id === "del-button"){
    // butonun kapsayıcısını htmlden kaldırma
    ele.parentElement.remove();
    
    // elemanı dizi içerisinde bulma
    const selected = globalData.find((i) => i.id == ele.dataset.id);
    deleteItem(selected);
  }
}

// elemanı sepete gönderecek fonks.
function addToBasket(product){
  console.log(product, basket)
  // sepette elemandan var mı kontrol
  const foundItem = basket.find((item) => item.id === product.id); 

  if(foundItem){
    //  ürün sepette varsa ürünün miktarını arttır
    foundItem.amount++;
  }else{
    // sepette yoksa sepete ekle
    basket.push(product);
  }
}

// ürünleri sepete aktarma fonks.
function addList(){
  basket.forEach((product) => {
    //  ürünü ekrana yansıt
    renderBasketItem(product);
    // toplam fiyatı güncelle
    total += product.price * product.amount;
  });

  // modaldaki toplam fiyatı güncelle
  modalInfo.textContent = total;
}

// ürünü diziden kladırma
function deleteItem(deletingItem){
  //  id'si silinecek elemanın idsine eşit olmayanları alma
  const filtredData = basket.filter(
    (item) => item.id !== deletingItem.id
    );

    //sepet dizisini güncelleme
    basket = filtredData ;

    // toplam fiyatı güncelleme
    toplam -= deleteItem.price * deleteItem.amount
    modalInfo.textContent = total ;
}

