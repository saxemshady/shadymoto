/***********************
 NAVBAR
************************/
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });
    }

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navItems.forEach(link => link.classList.remove("active"));
            item.classList.add("active");

            if (hamburger && navLinks) {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            }
        });
    });

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    navItems.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});


/***********************
 QUANTITY BUTTONS
************************/
function increase(btn) {
    const input = btn.previousElementSibling;
    input.value = parseInt(input.value) + 1;
}

function decrease(btn) {
    const input = btn.nextElementSibling;
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}


/***********************
 CART (SINGLE SOURCE)
************************/
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const el = document.getElementById("cartCount");
    if (!el) return;

    let count = 0;
    cart.forEach(item => count += item.qty);
    el.innerText = count;
}

updateCartCount();


/***********************
 ADD TO CART
************************/
function addProductToCart(button, name, price) {
    const card = button.closest(".product-card");
    if (!card) return;

    const qtyInput = card.querySelector(".qty-box input");
    const qty = parseInt(qtyInput.value);

    if (isNaN(qty) || qty < 1) return;

    addToCart(name, price, qty);
}

function addToCart(name, price, qty) {
    const item = cart.find(p => p.name === name);

    if (item) {
        item.qty += qty;
    } else {
        cart.push({ name, price, qty });
    }

    saveCart();
    // alert("Added to cart");
}


/***********************
 CART PAGE
************************/
function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const grandTotal = document.getElementById("grandTotal");

    if (!cartItems || !grandTotal) return;

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;

        cartItems.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>Rs. ${item.price}</td>
                <td>
                    <input type="number" min="1" value="${item.qty}"
                        onchange="updateQty(${index}, this.value)">
                </td>
                <td>Rs. ${itemTotal}</td>
                <td>
                    <button class="remove-btn" onclick="removeItem(${index})">X</button>
                </td>
            </tr>
        `;
    });

    grandTotal.innerText = total;
    saveCart();
}

function updateQty(index, qty) {
    cart[index].qty = Math.max(1, parseInt(qty));
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

renderCart();


/***********************
 CHECKOUT PAGE SUMMARY
************************/
document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("checkoutItems");
    const grandTotalEl = document.getElementById("grandTotal");

    if (!tableBody || !grandTotalEl) return;

    tableBody.innerHTML = "";
    let grandTotal = 0;

    cart.forEach(item => {
        const total = item.price * item.qty;
        grandTotal += total;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>Rs. ${item.price}</td>
            <td>Rs. ${total}</td>
        `;
        tableBody.appendChild(row);
    });

    grandTotalEl.innerText = "Grand Total: Rs. " + grandTotal;
});


/***********************
 PLACE ORDER + POPUP
************************/
    
function placeOrder(event) {
    event.preventDefault();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // show popup
    document.getElementById("popup").style.display = "flex";

    // clear cart
    localStorage.removeItem("cart");
}

function closePopup() {
    window.location.href = "index.html";
}



/***********************
 OPEN CART
************************/
function openCart() {
    window.location.href = "cart.html";
}
