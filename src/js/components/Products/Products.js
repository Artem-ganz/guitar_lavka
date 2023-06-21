class Products {
    constructor() {
        this.classNameActive = `products-element__btn_active`
        this.labelAdd = `Add to cart`
        this.labelRemove = `Remove from cart`
    }

    handleSetLocationStorage(element, id) {
        const {pushProduct, products} = localStorageUtil.putProducts(id)
        
        if(pushProduct) {
            element.classList.add(this.classNameActive)
            element.innerHTML = this.labelRemove
        } else {
            element.classList.remove(this.classNameActive)
            element.innerHTML = this.labelAdd
        }
        headerPage.render(products.length)
    }

    render() {
        let button1 = document.querySelector(`.nav__btn1`) 
        let button2 = document.querySelector(`.nav__btn2`)
        let button3 = document.querySelector(`#select`)
        
        const productsStor = localStorageUtil.getProducts()
        let htmlCatalog = ``

        CATALOG.forEach(({id, name, price, img, type}) => {
            let activeClass = ``
            let activeText = ``

            if(productsStor.indexOf(id) === -1) {
                activeText = this.labelAdd
            } else {
                activeText = this.labelRemove
                activeClass = this.classNameActive
            }

            htmlCatalog += `
                <li class="products-element">
                    <span class="products-element__name">${name}</span>
                    <img src="${img}" class="products-element__img" alt="image description">
                    <span class="products-element__type">${type}</span>
                    <span class="products-element__price">💵⚡️${price.toLocaleString()} USD</span>
                    <button class="products-element__btn ${activeClass}"  onclick ="productsPage.handleSetLocationStorage(this, '${id}')">
                        ${activeText}
                    </button>
                </li>
            `

            //// sort
            button1.onclick = () => {
                htmlCatalog = ``
                let array = CATALOG.sort((a, b) => parseInt(a.price) - parseInt(b.price))
                array.map(({id, name, price, img, type}) => {
                    htmlCatalog += `
                    <li class="products-element">
                        <span class="products-element__name">${name}</span>
                        <img src="${img}" class="products-element__img" alt="image description">
                        <span class="products-element__type">${type}</span>
                        <span class="products-element__price">💵⚡️${price.toLocaleString()} USD</span>
                        <button class="products-element__btn ${activeClass}"  onclick ="productsPage.handleSetLocationStorage(this, '${id}')">
                            ${activeText}
                        </button>
                    </li>
                `
                })
                const html = `<ul class="products-container">${htmlCatalog}</ul>`
                rootProducts.innerHTML = html
            }

            button2.onclick = () => {
                htmlCatalog = ``
                let array = CATALOG.sort((a, b) => parseInt(b.price) - parseInt(a.price))
                array.map(({id, name, price, img, type}) => {
                    htmlCatalog += `
                    <li class="products-element">
                        <span class="products-element__name">${name}</span>
                        <img src="${img}" class="products-element__img" alt="image description">
                        <span class="products-element__type">${type}</span>
                        <span class="products-element__price">💵⚡️${price.toLocaleString()} USD</span>
                        <button class="products-element__btn ${activeClass}"  onclick ="productsPage.handleSetLocationStorage(this, '${id}')">
                            ${activeText}
                        </button>
                    </li>
                `
                })
                const html = `<ul class="products-container">${htmlCatalog}</ul>`
                rootProducts.innerHTML = html
            }

            function renderProducts(CATALOG) {
                htmlCatalog = ``
                rootProducts.innerHTML = ``
                CATALOG.forEach(({id, name, price, img, type}) => {
                    htmlCatalog += `
                    <li class="products-element">
                        <span class="products-element__name">${name}</span>
                        <img src="${img}" class="products-element__img" alt="image description">
                        <span class="products-element__type">${type}</span>
                        <span class="products-element__price">💵⚡️${price.toLocaleString()} USD</span>
                        <button class="products-element__btn ${activeClass}"  onclick ="productsPage.handleSetLocationStorage(this, '${id}')">
                            ${activeText}
                        </button>
                    </li>
                `
                })
                const html = `<ul class="products-container">${htmlCatalog}</ul>`
                rootProducts.innerHTML = html
            }

            let typeSelect = document.querySelector(`#select`)
            typeSelect.addEventListener(`change`, function() {
                let typeValue = typeSelect.value
                let filterProducts
                if(typeValue === `all`) {
                    filterProducts = CATALOG.slice()
                } else {
                    filterProducts = CATALOG.filter(function(CATALOG) {
                        return CATALOG.type === typeValue
                    })
                }
                renderProducts(filterProducts)
            })
            renderProducts(CATALOG)

            ///// input search
            function filterProductsByName(products, searchTerm) {
                return products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
            }

            const searchInput = document.querySelector(`#search-input`)
            searchInput.addEventListener(`input`, function() {
                const searchTerm = searchInput.value
                const filteredProducts = filterProductsByName(CATALOG, searchTerm)
                renderProducts(filteredProducts)
            })
        })
        const html = `<ul class="products-container">${htmlCatalog}</ul>`
        rootProducts.innerHTML = html
    }
}

const productsPage = new Products()
productsPage.render()
