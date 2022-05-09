document.addEventListener("DOMContentLoaded", refreshCart);

document.addEventListener("click", (event) => {
  event.preventDefault();

  if (event.target.matches(".dropdown-item")) {
    const categoryName = event.target.dataset.categoryName;
    displayOneCategory(categoryName);
  }

  if (event.target.matches("#display-all-categories")) {
    displayAllCategories();
  }

  if (event.target.matches("[data-product-id]")) {
    addProduct(event.target);
    refreshCart();
  }

  if (event.target.matches("#clear-shopping-cart")){
    clearShoppingCart("panier")
    refreshCart();
  }

  if (event.target.matches("[data-id] button")){
    const element = getGrandFatherElement(event.target)
    deleteProductFromCart(element.dataset.id);
    refreshCart();
  }

  if (event.target.matches("[data-change-quantity]")){
    const element = getGrandFatherElement(event.target)
    // console.log(element)
    changeQuantity(element.dataset.id, event.target.dataset.changeQuantity)
   // refreshCart()
  }
});


function changeQuantity(idProduct, statut)
{
  // je recupere mon panier 
  const shoppingCart = getLocalStorage("panier");
  // je recupere l'index du produit avec son ID 
  const foundIndex = shoppingCart.findIndex((item) => item.id == idProduct);
  // je modifie sa quantité 
  if(statut == "less"){
    if(shoppingCart[foundIndex].quantity == 1){
      const newShoppingCart = shoppingCart.filter(elem => elem.id != idProduct);
      setLocalStorage("panier", newShoppingCart);
      refreshCart();
      return;      
    }else{
      shoppingCart[foundIndex].quantity--;
    }

  }else{
    shoppingCart[foundIndex].quantity++;
  }

  setLocalStorage("panier", shoppingCart);
  refreshCart();
}


function getGrandFatherElement(element)
{
  return element.parentNode.parentNode
}