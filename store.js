if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

function ready() {
    let removeCartItemButtons = document.getElementsByClassName("button-danger")

    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let removeButton = removeCartItemButtons[i]
        removeButton.addEventListener("click", removeCartItem )
    }

    let quantityInputs = document.getElementsByClassName("cart-quantity-input")

    for (let i = 0; i < quantityInputs.length; i++) {
        let quantityInput = quantityInputs[i]
        quantityInput.addEventListener("change", updateCartTotal )
    }

    let addToCartButtons = document.getElementsByClassName("shop-item-button")
    for (let i = 0; i < addToCartButtons.length; i++) {
        let addToCartButton = addToCartButtons[i]
        addToCartButton.addEventListener("click", addToCartClick )
    }

    document.getElementsByClassName("button-purchase")[0].addEventListener("click", purchaseClicked)
}

function purchaseClicked () {
    alert("Purchase complete!")
    let cartItems = document.getElementsByClassName("cart-items")[0]
    while ( cartItems.hasChildNodes() ) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function addToCartClick(event) {
    let button = event.target
    let container = button.parentElement.parentElement
    let title = container.getElementsByClassName("shop-item-title")[0].innerText
    let price = container.getElementsByClassName("shop-item-price")[0].innerText
    let imageSrc = container.getElementsByClassName("shop-item-image")[0].src
    console.log(title, price, imageSrc)
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    let newRow = document.createElement("div")
    newRow.classList.add("cart-row")
    let cartItems = document.getElementsByClassName("cart-items")[0]
    let cartItemTitles = cartItems.getElementsByClassName("cart-item-title")
    for (let i = 0; i < cartItemTitles.length; i++) {
        if (cartItemTitles[i].innerText == title) {
            alert("This item is already in your cart")
            return
        }
    }
    let newRowContents = `    
                <div class="cart-item cart-column">
                    <div class="item-data-wrapper">
                    <img class="cart-item-image" src="${imageSrc}" alt="">
                    <span class="cart-item-title">${title}</span>
                    </div>
                </div>
                
                <span class="cart-price cart-column cart-price-number">${price}</span>
                
                <div class="cart-quantity cart-column  cart-buttoms-wrapper">
                    <div class="item-data-wrapper quantity-wrapper">
                    <input type="number" name="" id="" class="cart-quantity-input" placeholder="0" max="99" min="0">
                    <button role="button" class="button button-danger">REMOVE</button>
                    </div>
                </div>
            `
    newRow.innerHTML = newRowContents
    cartItems.append(newRow)
    newRow.getElementsByClassName("button-danger")[0].addEventListener("click", removeCartItem)
    newRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", updateCartTotal )
}

function removeCartItem (event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
}

/* Could have used this as event listener for changing quantity. It is easier to just call the update function since I already took care of the input type a minimun value
function quantityChanged(event) {
    let quantityAltered = event.target
    updateCartTotal()    
}*/


function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName("cart-items")[0]
    let cartRows = cartItemContainer.getElementsByClassName("cart-row")
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName("cart-price")[0]
        let quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        let price = parseFloat( priceElement.innerText.replace("$", "") )
        let quantity = quantityElement.value
        total += (price * quantity)
    }
    /*If I dont use Math.round, it will work but the rounding will not be 100% precise*/
    total = Math.round(total * 100) / 100
    total = total.toFixed(2)
    document.getElementsByClassName("cart-total-price")[0].innerText = "$" + total
}