
function displayOneCategory(categoryName) {
    const sections = document.querySelectorAll("section");
  
    for (const element of sections) {
      if (element.id == categoryName) 
        changeClasses(element, "displayOff", "displayOn");
      else
        changeClasses(element, "displayOn", "displayOff");
    }
  }
  
  function displayAllCategories() {
    const sections = document.querySelectorAll("section");
    sections.forEach((elem) => changeClasses(elem, "displayOff", "displayOn"));
  }
  
  function changeClasses(element, oldClass, newClass) {
  
    if (element.classList.contains(oldClass)) {
      element.classList.remove(oldClass);
    }
    element.classList.add(newClass);
  }
  
  function addProduct(element) {
    
    const parent = element.parentNode;
    const price = parent.querySelector("[data-price]").textContent;
    const priceEuro = Number(price.replace(",", "."));
  
    const product = {
      id: Number(element.dataset.productId),
      price: priceEuro,
      title: parent.querySelector(".card-title").textContent,
      quantity: 1,
    };
  
    addToCart(product);
  }
  
  function addToCart(product) {
    const shoppingCart = getLocalStorage("panier");
    const foundIndex = shoppingCart.findIndex((item) => item.id == product.id);
  
    if (foundIndex != -1) 
      shoppingCart[foundIndex].quantity++;
    else 
      shoppingCart.push(product);
  
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
  
      bodyOfModal.innerHTML = ""
  
      for(const product of shoppingCart)
      {
          bodyOfModal.innerHTML +=  lineShoppingCartComponent(product);
          total += product.quantity * product.price
      }
  
      bodyOfModal.innerHTML += `<tr><td colspan="4" style="text-align:right">montant total = ${total.toFixed(2)} €</td></tr>`
  }
  
  function clearShoppingCart(key)
  {
      localStorage.removeItem(key)
  }
  
  function deleteProductFromCart(id)
  {
    const shoppingCart = getLocalStorage("panier");
    const newShoppingCart = shoppingCart.filter(elem => elem.id != id);

    setLocalStorage("panier", newShoppingCart);
  }
  
  function lineShoppingCartComponent(product)
  {
    return `
    <tr style="display: flex;" data-id=${product.id}>
        <td style="margin-right:10px;">${product.quantity}</td>
        <td>${product.title}</td>
        <td>${(product.quantity * product.price).toFixed(2)} €</td>
        <td class="d-flex" >
            <a class="page-link" data-change-quantity="less">-</a>
            <a class="page-link">${product.quantity}</a>
            <a class="page-link" data-change-quantity="more">+</a>
        </td>
        <td><button type="button" 
                    class="btn btn-danger">Supprimer</button>
        </td>
    </tr>`
  }