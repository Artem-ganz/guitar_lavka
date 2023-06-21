class Header {
    // открывает страницу с выбраными товарами
    handlerOpenShoppingPage() {
        shoppingPage.render()
    }

    render(count) {
        const html = `
            <div class="header-container">
                <div class="header-counter" onclick="headerPage.handlerOpenShoppingPage();">
                    <div class="shopping-icon">
                        <img src="https://rafaelalucas.com/dailyui/12/assets/shopping-cart.svg" alt="image description" class="img-counter"> ${count}
                    </div>                
                </div>
            </div>
        `
        rootHeader.innerHTML = html
    }
}

const headerPage = new Header()
const productsStore = localStorageUtil.getProducts()

headerPage.render(productsStore.length)
