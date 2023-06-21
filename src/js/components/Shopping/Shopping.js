class Shopping {
    handlerClear() {
      rootShopping.innerHTML = ``
    }
  
    handleCounterPlus(event) {
      const counterElement = event.target.previousElementSibling
      const counterValue = parseInt(counterElement.textContent)
      const priceElement = event.target.parentNode.nextElementSibling;
      const price = parseFloat(priceElement.textContent.replace(/[^0-9.]/g, ``))
      const totalPriceElement = document.querySelector('.shopping-element__price')
      let totalPrice = parseFloat(totalPriceElement.textContent.replace(/[^0-9.]/g, ``))
  
      const newCounterValue = counterValue + 1
      const newPrice = price * newCounterValue
      const newTotalPrice = totalPrice - price + newPrice
  
      counterElement.textContent = newCounterValue
      priceElement.textContent = `${newPrice.toLocaleString()} USD`
      totalPriceElement.textContent = `${newTotalPrice.toLocaleString()} USD`
    }
  
    handleCounterMinus(event) {
      const counterElement = event.target.nextElementSibling
      const counterValue = parseInt(counterElement.textContent)
      const priceElement = event.target.parentNode.nextElementSibling
      const price = parseFloat(priceElement.textContent.replace(/[^0-9.]/g, ``))
      const totalPriceElement = document.querySelector('.shopping-element__price')
      let totalPrice = parseFloat(totalPriceElement.textContent.replace(/[^0-9.]/g, ``))
  
      if (counterValue > 1) {
        const newCounterValue = counterValue - 1
        // const newPrice = price * newCounterValue
        const newPrice = price / 2
        const newTotalPrice = totalPrice - price + newPrice
  
        counterElement.textContent = newCounterValue
        priceElement.textContent = `${newPrice.toLocaleString()} USD`
        totalPriceElement.textContent = `${newTotalPrice.toLocaleString()} USD`
      }
    }
  
    render() {
      const productsStore = localStorageUtil.getProducts()
      let htmlCatalog = ``
      let sumCatalog = 0
  
      CATALOG.forEach(({ id, name, price }) => {
        if (productsStore.indexOf(id) !== -1) {
          htmlCatalog += `
            <div class="basket-item">
              <div class="basket-item__name">
                <p>⚡️ ${name}</p>
              </div>
              <div class="counter-wrapper">
                <span class="counter-minus count" onclick="shoppingPage.handleCounterMinus(event)">-</span>
                <span class="counter count">1</span>
                <span class="counter-plus count" onclick="shoppingPage.handleCounterPlus(event)">+</span> 
              </div>
              <div class="basket-item__price">
                ${price.toLocaleString()} USD
              </div>
            </div>
          `
          sumCatalog += price
        }
      })
  
      const html = `
        <div class="shopping-container">
          <h2 class="title-shopping">Your order is ready:</h2>
          <div class="basket-wrapper">
            ${htmlCatalog}
          </div>
          <div class="shopping-element__sum">
            <span class="shopping-element__name">💥 Summary:</span>
            <span class="shopping-element__price">${sumCatalog.toLocaleString()} USD</span>
          </div>
          <button class="shopping__close" onclick="shoppingPage.handlerClear()">X</button>
        </div>
      `
      rootShopping.innerHTML = html
    }
}
  
const shoppingPage = new Shopping()
shoppingPage.render


