document.addEventListener("DOMContentLoaded", () => {
  
  refreshCart();

});

document.addEventListener("click", (event) => {
  event.preventDefault();

  if (event.target.matches(".dropdown-item")) {
    const categoryName = event.target.dataset.categoryName;
    // console.log(categoryName)
    displayOneCategory(categoryName);
  }

  if (event.target.matches("#display-all-categories")) {
    displayAllCategories();
  }

  if (event.target.matches("[data-product-id]")) {
    addProduct(event.target);
  }

  if (event.target.matches("#clear-shopping-cart")){
    clearShoppingCart("panier")
  }

  if (event.target.matches("[data-id]")){
    deleteProductFromCart(event.target.dataset.id)
  }
});

function displayOneCategory(categoryName) {
  const sections = document.querySelectorAll("section");

  for (const element of sections) {
    if (element.id == categoryName) {
      changeClasses(element, "displayOff", "displayOn");
    } else {
      changeClasses(element, "displayOn", "displayOff");
    }
  }
}

function displayAllCategories() {
  const sections = document.querySelectorAll("section");

  // for(const element of sections)
  // {
  //     changeClasses(element, "displayOff", "displayOn")
  // }

  sections.forEach((elem) => changeClasses(elem, "displayOff", "displayOn"));
}

function changeClasses(element, oldClass, newClass) {
  // verifie que l'element contiens la classe
  // ex: <span class="toto"></span> contient la classe toto
  // donc retourne true
  if (element.classList.contains(oldClass)) {
    // dans ces cas la il enleve toto
    element.classList.remove(oldClass);
  }
  // et ajoute la nouvelle classe ex : tata
  element.classList.add(newClass);

  // resultat <span class="tata"></span>
}

function addProduct(element) {
  // console.log(element.dataset.productId)
  // const id = element.dataset.productId
  // console.log(element.parentNode)
  const parent = element.parentNode;
  // console.log(parent)
  // const price = parent.querySelector("[data-price]").textContent
  //console.log(price)
  // const title = parent.querySelector(".card-title").textContent
  // console.log(title)

  const price = parent.querySelector("[data-price]").textContent;
  const priceEur = Number(price.replace(",", "."));

  const product = {
    id: Number(element.dataset.productId),
    price: priceEur,
    title: parent.querySelector(".card-title").textContent,
    quantity: 1,
  };

  // apres avoir crée mon produit je l'ajoute au panier
  addToCart(product);

  // je met a jour mon panier
  refreshCart();
}

function addToCart(product) {
  // je recupere mon panier
  const shoppingCart = getLocalStorage("panier");

  const foundIndex = shoppingCart.findIndex((item) => item.id == product.id);

  if (foundIndex != -1) {
    // si l'index existe alors j'augmente la quantité
    shoppingCart[foundIndex].quantity++;
  } else {
    // j'ajoute au panier
    shoppingCart.push(product);
  }

  // j'écrase mon ancien panier par le nouveau
  setLocalStorage("panier", shoppingCart);
}

function getLocalStorage(key) {
  let localValue = localStorage.getItem(key);

  if (JSON.parse(localValue) != null) {
    return JSON.parse(localValue);
  }
  return [];
}

function setLocalStorage(key, value) {
  const JsonArray = JSON.stringify(value);
  localStorage.setItem(key, JsonArray);
}

function refreshCart()
{
    const shoppingCart = getLocalStorage("panier");
    const bodyOfModal = document.querySelector(".modal-body table"); 
    let total = 0;
    // je vide mon panier au cas ou pour etre sur d'avoir uniquement
    // ce que je souhaite avoir

    for(const product of shoppingCart)
    {
        //console.log(product)
        //j'ajoute mes produits
        bodyOfModal.innerHTML += `
        <tr>
            <td style="margin-right:10px">${product.quantity}</td>
            <td>${product.title}</td>
            <td>${(product.quantity * product.price).toFixed(2)} €</td>
            <td><button type="button" 
                        class="btn btn-danger"
                        data-id=${product.id}>Supprimer</button>
            </td>
        </tr>`

        total += product.quantity * product.price
    }

    bodyOfModal.innerHTML += `<tr colspan="4">montant total = ${total.toFixed(2)} €</tr>`
}

function clearShoppingCart(key)
{
    localStorage.removeItem(key)
    refreshCart()
}

function deleteProductFromCart(id)
{
    const shoppingCart = getLocalStorage("panier")

    const newShoppingCart = shoppingCart.filter();

    setLocalStorage("panier", newShoppingCart);

    refreshCart();
}