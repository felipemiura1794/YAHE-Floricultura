document.addEventListener('DOMContentLoaded', () => {
    const cartItems = [];
    const products = document.querySelectorAll('.product');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    const checkoutButton = document.querySelector('.checkout');

    products.forEach(product => {
        product.querySelector('.add-to-cart').addEventListener('click', () => {
            const productId = product.getAttribute('data-id');
            const productName = product.getAttribute('data-name');
            const productPrice = parseFloat(product.getAttribute('data-price'));

            const cartItem = cartItems.find(item => item.id === productId);

            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cartItems.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }

            renderCartItems();
        });
    });

    checkoutButton.addEventListener('click', () => {
        if (cartItems.length > 0) {
            setTimeout(() => {
                alert('Compra bem-sucedida! Obrigado por comprar conosco!');
                cartItems.length = 0;
                renderCartItems();
            }, 500);
        } else {
            alert('Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.');
        }
    });

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';

        cartItems.forEach(item => {
            const cartItemElement = document.createElement('li');
            cartItemElement.textContent = `${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}`;
            cartItemElement.innerHTML += ` <button class="remove-from-cart" data-id="${item.id}">Remover</button>`;

            cartItemsContainer.appendChild(cartItemElement);

            cartItemElement.querySelector('.remove-from-cart').addEventListener('click', () => {
                removeCartItem(item.id);
            });
        });

        const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    function removeCartItem(productId) {
        const itemIndex = cartItems.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            cartItems.splice(itemIndex, 1);
        }
        renderCartItems();
    }
});
