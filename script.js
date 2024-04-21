const products = [
    { id: 1, name: 'Product- 1', price: 100, quantity: 0},
    { id: 2, name: 'Product- 2', price: 200, quantity: 0},
    { id: 3, name: 'Product- 3', price: 300, quantity: 0},
];

const productList = document.getElementById('product-list');
const cartList = document.getElementById('cart-list');
const totalPriceElement = document.getElementById('total-price');

let cart = [];
function renderProducts(){
    productList.innerHTML = '';
    products.forEach((product) => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `<p>${product.name}</p> <p>${product.price}</p>
            <div class="btn"><span onclick="decrementQuantity(${product.id})" class="decrement"> - </span><span>${product.quantity}</span><span onclick="incrementQuantity(${product.id})" class="decrement"> + </span></div>`;
        listItem.style.display = "flex";
        listItem.style.width = "40vw";
        listItem.style.margin = "8px";
        listItem.style.justifyContent = "space-around";
        listItem.style.alignItems = "center";
        listItem.style.backgroundColor = "rgba(178, 178, 187, 0.752)";
        productList.appendChild(listItem);

    });
}

function renderCart(){
    cartList.innerHTML = '';
    let totalPrice = 0;

    if(cart.length === 0){
        const noProductMessage = document.createElement('p');
        noProductMessage.innerText = 'No Product in the cart';
        cartList.appendChild(noProductMessage);
    }else{
        cart.forEach((cartItem) => {
            const listItem = document.createElement('div');
            listItem.innerHTML = `<p>${cartItem.name}</p> <p>${cartItem.quantity} x ${cartItem.price}</p>`;
            listItem.style.margin = "8px";
            listItem.style.backgroundColor = "rgba(178, 178, 187, 0.752)";
            listItem.style.justifyContent = "space-around";
            listItem.style.alignItems = "center";
            listItem.style.display = "flex";
            listItem.style.width = "20vw";
            cartList.appendChild(listItem);
            
            totalPrice += cartItem.price * cartItem.quantity;
        });
    }
    totalPriceElement.innerText = `Total Price: ${totalPrice}`;
}

function addtocart(product){
    const existingCartItem = cart.find((item) => item.id === product.id);
    if(existingCartItem){
        existingCartItem.quantity++;
    }else{
        cart.push({ ...product, quantity: 1 });
    }
    renderProducts();
    renderCart();
}

function incrementQuantity(productId){
    const product = products.find((p) => p.id === productId);
    if(product){
        product.quantity++;
        addtocart(product);
    }
}

function decrementQuantity(productId){
    const product = products.find((p) => p.id === productId);
    if(product && product.quantity > 0){
        product.quantity--;
        const existingCartItem = cart.find((cartItem) => cartItem.id === productId);
        if(existingCartItem){
            existingCartItem.quantity--;
            if(existingCartItem.quantity === 0){
                cart = cart.filter((item) => item.id !== productId);
            }
        }
        renderProducts();
        renderCart();
    } 
}

renderProducts();
renderCart();