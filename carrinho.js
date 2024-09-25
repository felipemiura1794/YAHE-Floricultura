let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.name} (${item.quantity}) - R$ ${item.price}</span>
            <button class="btn btn-small red remove-item" data-index="${index}">Remover</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
    localStorage.setItem('cart', JSON.stringify(cart));
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const name = event.target.dataset.name;
        const price = parseFloat(event.target.dataset.price);
        
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCart();
    });
});

document.getElementById('cart').addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item')) {
        const index = event.target.dataset.index;
        cart.splice(index, 1);
        updateCart();
    }
});

document.getElementById('finalize-btn').addEventListener('click', () => {
    const successModal = document.getElementById('success-modal');
    const overlay = document.getElementById('overlay');
    successModal.classList.add('show');
    overlay.classList.add('show');
    cart = []; 
    updateCart(); 
});

document.getElementById('close-modal').addEventListener('click', () => {
    const successModal = document.getElementById('success-modal');
    const overlay = document.getElementById('overlay');
    successModal.classList.remove('show');
    overlay.classList.remove('show');
});

updateCart();