// ===========================
// Global State Management
// ===========================

const STATE = {
    currentPage: 'home',
    currentProduct: null,
    currentUser: null,
    cart: [],
    wishlist: [],
    theme: localStorage.getItem('theme') || 'light',
    filters: {
        category: null,
        maxPrice: 1000,
        minRating: 0,
        search: '',
        sort: 'latest'
    },
    pagination: {
        currentPage: 1,
        itemsPerPage: 12
    },
    products: [],
    filteredProducts: []
};

// ===========================
// Local Storage Management
// ===========================

function loadFromStorage() {
    const savedCart = localStorage.getItem('luxestore_cart');
    const savedWishlist = localStorage.getItem('luxestore_wishlist');
    const savedTheme = localStorage.getItem('theme');

    if (savedCart) STATE.cart = JSON.parse(savedCart);
    if (savedWishlist) STATE.wishlist = JSON.parse(savedWishlist);
    if (savedTheme) STATE.theme = savedTheme;
}

function saveCart() {
    localStorage.setItem('luxestore_cart', JSON.stringify(STATE.cart));
    updateCartUI();
}

function saveWishlist() {
    localStorage.setItem('luxestore_wishlist', JSON.stringify(STATE.wishlist));
    updateWishlistUI();
}

// ===========================
// Initialization
// ===========================

document.addEventListener('DOMContentLoaded', async () => {
    loadFromStorage();
    initializeTheme();
    await initializeApp();
    setupEventListeners();
    renderHome();
});

async function initializeApp() {
    try {
        STATE.products = await API.getProducts();
        STATE.filteredProducts = STATE.products;
    } catch (error) {
        console.error('Failed to load products:', error);
        showToast('Failed to load products', 'error');
    }
}

function initializeTheme() {
    if (STATE.theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('themeIcon').textContent = '☀️';
    }
}

function setupEventListeners() {
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Navigation
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            navigateTo(page);
        });
    });

    // Search
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            STATE.filters.search = e.target.value.toLowerCase();
            STATE.pagination.currentPage = 1;
            filterAndDisplayProducts();
        }, 300);
    });

    // Sort
    document.getElementById('sortSelect')?.addEventListener('change', (e) => {
        STATE.filters.sort = e.target.value;
        filterAndDisplayProducts();
    });

    // Price range
    document.getElementById('priceRange')?.addEventListener('input', (e) => {
        STATE.filters.maxPrice = parseInt(e.target.value);
        document.getElementById('priceValue').textContent = e.target.value;
        filterAndDisplayProducts();
    });

    // Rating filters
    document.querySelectorAll('.rating-check').forEach(checkbox => {
        checkbox.addEventListener('change', filterAndDisplayProducts);
    });

    // Category filters
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('category-check')) {
            STATE.filters.category = e.target.checked ? e.target.value : null;
            STATE.pagination.currentPage = 1;
            filterAndDisplayProducts();
        }
    });

    // User button
    document.getElementById('userBtn').addEventListener('click', () => {
        if (STATE.currentUser) {
            navigateTo('dashboard');
        } else {
            openModal('loginModal');
        }
    });

    // Cart button
    document.getElementById('cartBtn').addEventListener('click', () => {
        navigateTo('cart');
    });

    // Wishlist button
    document.getElementById('wishlistBtn').addEventListener('click', () => {
        navigateTo('wishlist');
    });

    // Mobile menu toggle
    document.getElementById('menuToggle')?.addEventListener('click', toggleMobileMenu);

    // Modal close on background click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
}

// ===========================
// Navigation & Routing
// ===========================

function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');

    STATE.currentPage = page;
    window.scrollTo(0, 0);

    switch (page) {
        case 'home':
            renderHome();
            document.getElementById('home-page').style.display = 'block';
            break;
        case 'products':
            renderProducts();
            document.getElementById('products-page').style.display = 'block';
            break;
        case 'product-details':
            document.getElementById('product-details-page').style.display = 'block';
            break;
        case 'cart':
            renderCart();
            document.getElementById('cart-page').style.display = 'block';
            break;
        case 'checkout':
            renderCheckout();
            document.getElementById('checkout-page').style.display = 'block';
            break;
        case 'wishlist':
            renderWishlist();
            document.getElementById('wishlist-page').style.display = 'block';
            break;
        case 'dashboard':
            if (!STATE.currentUser) {
                openModal('loginModal');
                return;
            }
            renderDashboard();
            document.getElementById('dashboard-page').style.display = 'block';
            break;
    }
}

// ===========================
// Home Page
// ===========================

async function renderHome() {
    try {
        // Render categories
        const categories = await API.getCategories();
        const categoriesGrid = document.getElementById('categoriesGrid');
        categoriesGrid.innerHTML = categories.map(cat => `
            <div class="category-card" onclick="filterByCategory('${cat.name}')">
                <div class="category-icon">${cat.icon}</div>
                <h3 class="category-name">${cat.name}</h3>
                <p style="color: var(--text-light); font-size: 0.9rem;">${cat.count} items</p>
            </div>
        `).join('');

        // Render featured products
        const featured = await API.getFeatured();
        const featuredGrid = document.getElementById('featuredProducts');
        featuredGrid.innerHTML = featured.map(product => createProductCard(product)).join('');

        // Render trending products
        const trending = await API.getTrending();
        const trendingGrid = document.getElementById('trendingProducts');
        trendingGrid.innerHTML = trending.map(product => createProductCard(product)).join('');

    } catch (error) {
        console.error('Error rendering home:', error);
    }
}

// ===========================
// Products Page
// ===========================

async function renderProducts() {
    try {
        // Render categories filter
        const categories = await API.getCategories();
        const categoryFilter = document.getElementById('categoryFilter');
        categoryFilter.innerHTML = `
            <label>
                <input type="checkbox" value="" class="category-check"> All Categories
            </label>
            ${categories.map(cat => `
                <label>
                    <input type="checkbox" value="${cat.name}" class="category-check"> ${cat.name}
                </label>
            `).join('')}
        `;

        // Re-attach event listeners
        document.querySelectorAll('.category-check').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                STATE.filters.category = checkbox.value || null;
                STATE.pagination.currentPage = 1;
                filterAndDisplayProducts();
            });
        });

        // Filter and display products
        await filterAndDisplayProducts();

    } catch (error) {
        console.error('Error rendering products:', error);
    }
}

async function filterAndDisplayProducts() {
    try {
        const filtered = await API.getProducts(STATE.filters);
        STATE.filteredProducts = filtered;

        // Pagination
        const totalPages = Math.ceil(filtered.length / STATE.pagination.itemsPerPage);
        const startIndex = (STATE.pagination.currentPage - 1) * STATE.pagination.itemsPerPage;
        const paginatedProducts = filtered.slice(startIndex, startIndex + STATE.pagination.itemsPerPage);

        // Update results count
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            resultsCount.textContent = `Showing ${paginatedProducts.length} of ${filtered.length} products`;
        }

        // Render products
        const grid = document.getElementById('productsGrid');
        if (paginatedProducts.length > 0) {
            grid.innerHTML = paginatedProducts.map(product => createProductCard(product)).join('');
            document.getElementById('noResults').style.display = 'none';
        } else {
            grid.innerHTML = '';
            document.getElementById('noResults').style.display = 'block';
        }

        // Render pagination
        renderPagination(totalPages);

    } catch (error) {
        console.error('Error filtering products:', error);
    }
}

function renderPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let html = '';
    for (let i = 1; i <= totalPages; i++) {
        html += `
            <button class="pagination-btn ${STATE.pagination.currentPage === i ? 'active' : ''}" 
                    onclick="goToPage(${i})">
                ${i}
            </button>
        `;
    }
    pagination.innerHTML = html;
}

function goToPage(page) {
    STATE.pagination.currentPage = page;
    filterAndDisplayProducts();
    window.scrollTo(0, 0);
}

function filterByCategory(category) {
    STATE.filters.category = category;
    STATE.filters.search = '';
    STATE.pagination.currentPage = 1;
    document.getElementById('searchInput').value = '';
    navigateTo('products');
}

function resetFilters() {
    STATE.filters = {
        category: null,
        maxPrice: 1000,
        minRating: 0,
        search: '',
        sort: 'latest'
    };
    STATE.pagination.currentPage = 1;
    document.getElementById('searchInput').value = '';
    document.getElementById('priceRange').value = 1000;
    document.getElementById('priceValue').textContent = '1000';
    document.getElementById('sortSelect').value = 'latest';
    filterAndDisplayProducts();
}

// ===========================
// Product Card
// ===========================

function createProductCard(product) {
    const isInWishlist = STATE.wishlist.some(item => item.id === product.id);
    return `
        <div class="product-card">
            <div class="product-image">
                <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 4rem;">
                    ${product.image}
                </div>
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <div class="product-rating">
                    <span class="stars">${renderStars(product.rating)}</span>
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="price">$${product.price}</span>
                    ${product.originalPrice > product.price ? `<span class="price-original">$${product.originalPrice}</span>` : ''}
                </div>
                <div class="product-buttons">
                    <button class="btn-add" onclick="addToCartQuick(${product.id})">Add to Cart</button>
                    <button class="btn-wishlist ${isInWishlist ? 'active' : ''}" 
                            onclick="quickToggleWishlist(${product.id})"
                            title="${isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}">
                        ${isInWishlist ? '❤️' : '♡'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    let stars = '★'.repeat(fullStars);
    if (hasHalf) stars += '½';
    stars += '☆'.repeat(5 - Math.ceil(rating));
    return stars;
}

// ===========================
// Product Details Page
// ===========================

async function viewProduct(productId) {
    try {
        STATE.currentProduct = await API.getProductById(productId);
        if (!STATE.currentProduct) {
            showToast('Product not found', 'error');
            return;
        }
        renderProductDetails();
        navigateTo('product-details');
    } catch (error) {
        console.error('Error loading product:', error);
        showToast('Failed to load product', 'error');
    }
}

function renderProductDetails() {
    const p = STATE.currentProduct;
    const isInWishlist = STATE.wishlist.some(item => item.id === p.id);

    // Main image
    document.getElementById('mainImage').textContent = p.image;
    document.getElementById('mainImage').style.fontSize = '4rem';

    // Thumbnails
    const thumbnails = document.getElementById('thumbnails');
    thumbnails.innerHTML = `
        <div class="thumbnail active" onclick="selectThumbnail(this)">
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                ${p.image}
            </div>
        </div>
        <div class="thumbnail" onclick="selectThumbnail(this)">
            <div style="width: 100%; height: 100%; background: var(--border-color); display: flex; align-items: center; justify-content: center;">
            </div>
        </div>
        <div class="thumbnail" onclick="selectThumbnail(this)">
            <div style="width: 100%; height: 100%; background: var(--border-color); display: flex; align-items: center; justify-content: center;">
            </div>
        </div>
        <div class="thumbnail" onclick="selectThumbnail(this)">
            <div style="width: 100%; height: 100%; background: var(--border-color); display: flex; align-items: center; justify-content: center;">
            </div>
        </div>
    `;

    // Product info
    document.getElementById('productName').textContent = p.name;
    document.getElementById('productCategory').textContent = p.category;
    document.getElementById('productPrice').textContent = `$${p.price}`;
    document.getElementById('productDescription').textContent = p.description;
    document.getElementById('detailsContent').textContent = p.details;
    document.getElementById('productRating').innerHTML = `${renderStars(p.rating)} (${p.reviews} reviews)`;

    if (p.originalPrice > p.price) {
        document.getElementById('productOriginalPrice').textContent = `$${p.originalPrice}`;
        document.getElementById('productDiscount').textContent = `-${Math.round((1 - p.price / p.originalPrice) * 100)}%`;
    } else {
        document.getElementById('productOriginalPrice').textContent = '';
        document.getElementById('productDiscount').textContent = '';
    }

    // Wishlist button
    const wishlistBtn = document.getElementById('wishlistToggleBtn');
    if (isInWishlist) {
        wishlistBtn.textContent = '❤️ Remove from Wishlist';
        wishlistBtn.classList.add('active');
    } else {
        wishlistBtn.textContent = '♡ Add to Wishlist';
        wishlistBtn.classList.remove('active');
    }

    // Reviews
    const reviewsList = document.getElementById('reviewsList');
    reviewsList.innerHTML = `
        <div style="background-color: var(--accent-color); padding: 1.5rem; border-radius: 8px;">
            <p style="margin-bottom: 1rem;"><strong>Average Rating: ${p.rating}/5 (${p.reviews} reviews)</strong></p>
            <p style="color: var(--text-light); margin-bottom: 1rem;">Our customers love this product! These are simulated reviews.</p>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${['Excellent quality!', 'Highly recommended', 'Great value for money', 'Very satisfied'].map(review => `
                    <div style="padding: 1rem; background: var(--primary-color); color: var(--accent-color); border-radius: 6px;">
                        <p>${renderStars(5)}</p>
                        <p>"${review}"</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Reset quantity
    document.getElementById('quantity').value = 1;

    // Related products
    renderRelatedProducts();
}

function selectThumbnail(element) {
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    element.classList.add('active');
}

async function renderRelatedProducts() {
    try {
        const related = await API.getRelated(STATE.currentProduct.id);
        const grid = document.getElementById('relatedProducts');
        grid.innerHTML = related.map(product => createProductCard(product)).join('');
    } catch (error) {
        console.error('Error loading related products:', error);
    }
}

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    document.getElementById(`${tabName}-tab`).classList.add('active');
    event.target.classList.add('active');
}

function increaseQty() {
    const input = document.getElementById('quantity');
    input.value = parseInt(input.value) + 1;
}

function decreaseQty() {
    const input = document.getElementById('quantity');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// ===========================
// Cart Management
// ===========================

function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value);
    addToCartInternal(STATE.currentProduct.id, quantity);
}

function addToCartQuick(productId) {
    addToCartInternal(productId, 1);
}

function addToCartInternal(productId, quantity) {
    const product = MOCK_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = STATE.cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        STATE.cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: quantity
        });
    }

    saveCart();
    showToast(`Added ${quantity} item(s) to cart`, 'success');
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');

    if (STATE.cart.length === 0) {
        cartItems.innerHTML = '';
        document.getElementById('emptyCart').style.display = 'block';
        cartSummary.style.display = 'none';
    } else {
        document.getElementById('emptyCart').style.display = 'none';
        cartSummary.style.display = 'block';

        cartItems.innerHTML = STATE.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        ${item.image}
                    </div>
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <p class="cart-item-price">$${item.price}</p>
                    <p style="color: var(--text-light); font-size: 0.9rem;">${item.category}</p>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-quantity">
                        <button onclick="updateQuantity(${item.id}, -1)">−</button>
                        <input type="number" value="${item.quantity}" readonly>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="cart-remove" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');

        updateCartSummary();
    }
}

function updateQuantity(productId, change) {
    const item = STATE.cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            renderCart();
        }
    }
}

function removeFromCart(productId) {
    STATE.cart = STATE.cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
    showToast('Item removed from cart', 'success');
}

function updateCartSummary() {
    const subtotal = STATE.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function updateCartUI() {
    const count = STATE.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// ===========================
// Checkout
// ===========================

function renderCheckout() {
    const checkoutItems = document.getElementById('checkoutItems');
    const total = STATE.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 
                  (STATE.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) > 50 ? 0 : 10) +
                  (STATE.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.08);

    checkoutItems.innerHTML = STATE.cart.map(item => `
        <div class="checkout-item">
            <div class="checkout-item-image">
                <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                    ${item.image}
                </div>
            </div>
            <div class="checkout-item-info">
                <div class="checkout-item-title">${item.name} x${item.quantity}</div>
                <div class="checkout-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        </div>
    `).join('');

    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
}

function completeOrder() {
    if (STATE.cart.length === 0) {
        showToast('Cart is empty', 'error');
        return;
    }

    showToast('Order placed successfully! Thank you for your purchase.', 'success');
    STATE.cart = [];
    saveCart();
    
    setTimeout(() => {
        navigateTo('home');
    }, 2000);
}

// ===========================
// Wishlist
// ===========================

function toggleWishlist() {
    if (!STATE.currentProduct) return;
    quickToggleWishlist(STATE.currentProduct.id);
}

function quickToggleWishlist(productId) {
    const product = MOCK_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const index = STATE.wishlist.findIndex(item => item.id === productId);

    if (index > -1) {
        STATE.wishlist.splice(index, 1);
        showToast('Removed from wishlist', 'success');
    } else {
        STATE.wishlist.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category
        });
        showToast('Added to wishlist', 'success');
    }

    saveWishlist();

    // Update button if on product details page
    if (STATE.currentPage === 'product-details') {
        const wishlistBtn = document.getElementById('wishlistToggleBtn');
        if (index > -1) {
            wishlistBtn.textContent = '♡ Add to Wishlist';
            wishlistBtn.classList.remove('active');
        } else {
            wishlistBtn.textContent = '❤️ Remove from Wishlist';
            wishlistBtn.classList.add('active');
        }
    }

    // Refresh product cards if visible
    if (STATE.currentPage === 'products' || STATE.currentPage === 'home') {
        document.querySelectorAll('.product-card').forEach(card => {
            const btn = card.querySelector('.btn-wishlist');
            if (btn) {
                const isInWishlist = STATE.wishlist.some(item => item.id === productId);
                btn.classList.toggle('active');
            }
        });
    }
}

function renderWishlist() {
    const grid = document.getElementById('wishlistGrid');
    const empty = document.getElementById('emptyWishlist');

    if (STATE.wishlist.length === 0) {
        grid.innerHTML = '';
        empty.style.display = 'block';
    } else {
        empty.style.display = 'none';
        grid.innerHTML = STATE.wishlist.map(item => {
            const product = MOCK_DATA.products.find(p => p.id === item.id);
            return createProductCard(product);
        }).join('');
    }
}

function updateWishlistUI() {
    document.getElementById('wishlistCount').textContent = STATE.wishlist.length;
}

// ===========================
// Dashboard
// ===========================

function renderDashboard() {
    // Profile
    if (STATE.currentUser) {
        document.getElementById('userName').textContent = STATE.currentUser.name;
        document.getElementById('userEmail').textContent = STATE.currentUser.email;
    }

    // Orders
    const ordersList = document.getElementById('ordersList');
    ordersList.innerHTML = MOCK_DATA.mockOrders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <div class="order-number">Order ${order.id}</div>
                    <p style="color: var(--text-light); font-size: 0.9rem;">${order.date}</p>
                </div>
                <span class="order-status ${order.status}">${order.status.toUpperCase()}</span>
            </div>
            <div class="order-details">
                <div class="order-detail-item">
                    <span>Items</span>
                    <strong>${order.items.length}</strong>
                </div>
                <div class="order-detail-item">
                    <span>Total</span>
                    <strong>$${order.total.toFixed(2)}</strong>
                </div>
            </div>
        </div>
    `).join('');

    // Wishlist in dashboard
    const dashboardWishlist = document.getElementById('dashboardWishlist');
    if (STATE.wishlist.length === 0) {
        dashboardWishlist.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No items in wishlist</p>';
    } else {
        dashboardWishlist.innerHTML = STATE.wishlist.map(item => {
            const product = MOCK_DATA.products.find(p => p.id === item.id);
            return createProductCard(product);
        }).join('');
    }
}

function switchDashboard(section) {
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.dashboard-btn').forEach(b => b.classList.remove('active'));

    if (section === 'logout') {
        STATE.currentUser = null;
        showToast('Logged out successfully', 'success');
        navigateTo('home');
        return;
    }

    document.getElementById(`${section}-section`).classList.add('active');
    event.target.classList.add('active');
}

// ===========================
// Authentication (Mock)
// ===========================

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function switchModal(newModalId) {
    document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('active'));
    openModal(newModalId);
}

function handleLogin(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    STATE.currentUser = {
        name: 'John Doe',
        email: email,
        joinDate: 'January 2024'
    };
    closeModal('loginModal');
    showToast('Logged in successfully!', 'success');
    navigateTo('dashboard');
}

function handleSignup(e) {
    e.preventDefault();
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    STATE.currentUser = {
        name: name,
        email: email,
        joinDate: 'January 2024'
    };
    closeModal('signupModal');
    showToast('Account created successfully!', 'success');
    navigateTo('home');
}

// ===========================
// Theme Toggle
// ===========================

function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';

    if (isDark) {
        html.removeAttribute('data-theme');
        STATE.theme = 'light';
        document.getElementById('themeIcon').textContent = '🌙';
    } else {
        html.setAttribute('data-theme', 'dark');
        STATE.theme = 'dark';
        document.getElementById('themeIcon').textContent = '☀️';
    }

    localStorage.setItem('theme', STATE.theme);
}

// ===========================
// Utilities
// ===========================

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.navbar-menu');
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
}
