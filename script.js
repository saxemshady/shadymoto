document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');

            navItems.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
    const currentPage = window.location.pathname;
    navItems.forEach(link => {
        if (link.getAttribute('href').includes(currentPage.split('/').pop() || 'index.html')) {
            link.classList.add('active');
        }
    });
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
});

function increase(btn) {
    let input = btn.previousElementSibling;
    input.value = parseInt(input.value) + 1;
}

function decrease(btn) {
    let input = btn.nextElementSibling;
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}



// cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
    let count = 0;
    cart.forEach(item => count += item.qty);

    const el = document.getElementById("cartCount");
    if (el) el.innerText = count;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function addToCart(name, price) {
    let item = cart.find(p => p.name === name);

    if (item) {
        item.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    saveCart();
}

function displayCart() {
    const table = document.getElementById("cartItems");
    if (!table) return;

    table.innerHTML = "";
    let grandTotal = 0;

    cart.forEach((item, index) => {
        let total = item.price * item.qty;
        grandTotal += total;

        table.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td>
                    <button class="cart-btn" onclick="changeQty(${index}, -1)">−</button>
                    ${item.qty}
                    <button class="cart-btn" onclick="changeQty(${index}, 1)">+</button>
                </td>
                <td>$${total}</td>
                <td>
                    <button class="cart-btn remove" onclick="removeItem(${index})">X</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("grandTotal").innerText = grandTotal;
}
// function updateCartCount() {
//     let count = 0;
//     cart.forEach(item => count += item.qty);

//     const el = document.getElementById("cartCount");
//     if (el) el.innerText = count;
// }

// function changeQty(index, change) {
//     cart[index].qty += change;

//     if (cart[index].qty <= 0) {
//         cart.splice(index, 1);
//     }

//     saveCart();
//     displayCart();
// }

// function removeItem(index) {
//     cart.splice(index, 1);
//     saveCart();
//     displayCart();
// }

function openCart() {
    window.location.href = "cart.html";
}

updateCartCount();
displayCart();

const cartItems = document.getElementById("cartItems");
const grandTotal = document.getElementById("grandTotal");

function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;

        cartItems.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>
                    <input type="number" min="1" value="${item.qty}"
                        class="qty-input"
                        onchange="updateQty(${index}, this.value)">
                </td>
                <td>${itemTotal}</td>
                <td>
                    <button class="remove-btn" onclick="removeItem(${index})">X</button>
                </td>
            </tr>
        `;
    });

    grandTotal.innerText = total;
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateQty(index, qty) {
    cart[index].qty = parseInt(qty);
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

renderCart();
