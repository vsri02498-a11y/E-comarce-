# LuxeStore - Premium E-Commerce Platform

A modern, fully-functional e-commerce application built with vanilla HTML, CSS, and JavaScript. Features a luxury minimalist design inspired by premium retailers like Apple and Ssense.

## 🎯 Features

### Core E-Commerce Features
- ✅ **Product Browsing** - Grid view with filtering, sorting, and search
- ✅ **Shopping Cart** - Add/remove items, adjust quantities, persistent storage
- ✅ **Wishlist** - Save favorite products, stored in localStorage
- ✅ **Product Details** - Image gallery, ratings, descriptions, related products
- ✅ **Checkout** - Order review with address and payment options
- ✅ **User Dashboard** - Profile, order history, wishlist management
- ✅ **Search & Filter** - Real-time search, category filter, price range, ratings
- ✅ **Sorting** - Price, popularity, ratings, newest first

### UI/UX Features
- ✅ **Dark/Light Theme** - Toggle between themes, persistent preference
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Smooth Animations** - CSS transitions and hover effects
- ✅ **Toast Notifications** - Success/error feedback
- ✅ **Modal Dialogs** - Login, signup, quick view
- ✅ **Loading States** - Skeleton loaders and animations
- ✅ **Empty States** - Helpful messages when no results

### Technical Features
- ✅ **LocalStorage** - Cart and wishlist persistence
- ✅ **Mock API** - Simulated API with realistic delays
- ✅ **State Management** - Centralized global state
- ✅ **Client-Side Routing** - No page reloads
- ✅ **No Dependencies** - Pure vanilla JavaScript
- ✅ **Production Ready** - Clean, organized, scalable code

## 📁 Project Structure

```
luxestore/
├── index.html          # Main HTML file with all page structures
├── styles.css          # Complete styling with CSS variables
├── app.js              # Application logic and state management
├── data.js             # Mock data and API simulation
└── README.md           # This file
```

## 🚀 Quick Start

### 1. Extract Files
Save all files (`index.html`, `styles.css`, `app.js`, `data.js`) in the same directory.

### 2. Open in Browser
Simply open `index.html` in your web browser:
```bash
# macOS
open index.html

# Linux
firefox index.html

# Windows
start index.html
```

Or use a local server for better performance:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📱 Pages & Routes

### 1. **Home Page** (`#home`)
- Hero banner with promotional content
- Category grid (6 categories)
- Featured products carousel (8 products)
- Trending products section
- Newsletter subscription form

### 2. **Products Page** (`#products`)
- Advanced filtering (category, price range, ratings)
- Sorting options (price, popularity, ratings, newest)
- Product grid with pagination (12 items per page)
- Search functionality
- Results counter

### 3. **Product Details Page** (`#product-details`)
- High-resolution image gallery with thumbnails
- Product information (title, price, description)
- Rating and reviews section
- Add to cart and wishlist buttons
- Quantity selector
- Related products carousel
- Tabbed information (Details, Reviews, Shipping)

### 4. **Shopping Cart** (`#cart`)
- List of selected items with images
- Quantity adjustment controls
- Remove item buttons
- Price summary (subtotal, shipping, tax, total)
- Proceed to checkout button
- Empty state when no items

### 5. **Checkout** (`#checkout`)
- Shipping address form
- Payment method selection (Card, PayPal, Apple Pay)
- Card details form
- Order summary with items
- Total price calculation
- Order completion

### 6. **Dashboard** (`#dashboard`)
- User profile information
- Order history with status
- Wishlist management
- Logout button

### 7. **Wishlist Page** (`#wishlist`)
- Grid of saved products
- Add to cart from wishlist
- Remove from wishlist
- Empty state message

## 💾 Data Management

### LocalStorage Keys
```javascript
luxestore_cart      // Shopping cart items
luxestore_wishlist  // Saved wishlist items
theme              // Dark/light theme preference
```

### Mock Data
- **20 Products** across 6 categories
- **6 Categories** with icons and item counts
- **3 Mock Orders** in user dashboard
- **Reviews & Ratings** for each product

## 🎨 Design System

### Color Palette
```css
--primary-color: #1a1a2e      /* Deep navy, text in light mode */
--secondary-color: #d4a574    /* Gold accent, CTAs */
--accent-color: #f5f5f5       /* Off-white background */
--text-dark: #1a1a2e          /* Dark text */
--text-light: #666666         /* Secondary text */
--border-color: #e0e0e0       /* Subtle borders */
```

### Typography
- **Display Font**: Playfair Display (headings)
- **Body Font**: Poppins (content)
- **Responsive Sizing**: Scales on mobile devices

### Spacing System
- Base unit: 1rem = 16px
- Padding/margins use multiples: 0.5rem, 1rem, 1.5rem, 2rem, etc.

### Shadows
```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08)
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12)
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.16)
```

## 🔧 JavaScript API

### State Management
```javascript
STATE = {
    currentPage,        // Current page
    currentProduct,     // Selected product
    currentUser,        // Logged-in user
    cart,              // Cart items
    wishlist,          // Wishlist items
    theme,             // Dark/light mode
    filters,           // Active filters
    pagination         // Pagination state
}
```

### Key Functions

#### Navigation
```javascript
navigateTo(page)          // Navigate to page
viewProduct(productId)    // View product details
```

#### Cart Management
```javascript
addToCart()               // Add current product to cart
addToCartQuick(id)        // Add product by ID
removeFromCart(id)        // Remove from cart
updateQuantity(id, qty)   // Update item quantity
renderCart()              // Re-render cart page
```

#### Wishlist Management
```javascript
toggleWishlist()          // Toggle current product
quickToggleWishlist(id)   // Toggle by product ID
renderWishlist()          // Re-render wishlist page
```

#### Filtering & Search
```javascript
filterAndDisplayProducts()     // Apply filters and display
filterByCategory(category)     // Filter by category
resetFilters()                 // Clear all filters
goToPage(pageNum)             // Go to pagination page
```

#### Authentication (Mock)
```javascript
handleLogin(event)        // Process login form
handleSignup(event)       // Process signup form
```

#### UI Functions
```javascript
toggleTheme()             // Toggle dark/light mode
showToast(msg, type)      // Show notification
openModal(id)             // Open modal
closeModal(id)            // Close modal
```

### Mock API Functions
```javascript
API.getProducts(filters)      // Get filtered products
API.getProductById(id)        // Get single product
API.getCategories()           // Get all categories
API.getFeatured()             // Get featured products
API.getTrending()             // Get trending products
API.getRelated(productId)     // Get related products
API.getOrders()               // Get mock orders
```

## 📦 Mock Data Structure

### Product Object
```javascript
{
    id: 1,
    name: 'Product Name',
    category: 'Electronics',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 342,
    image: '🎧',  // Emoji icon
    description: 'Product description',
    details: 'Detailed specifications',
    badge: 'New'  // Optional: New, Sale, Best Seller, etc.
}
```

### Cart Item Object
```javascript
{
    id: 1,
    name: 'Product Name',
    price: 299.99,
    image: '🎧',
    category: 'Electronics',
    quantity: 2
}
```

## 🎯 Filtering & Search System

### Available Filters
```javascript
filters = {
    category: 'Electronics',  // Single category
    maxPrice: 500,           // Price range (0-1000)
    minRating: 3,            // Minimum rating (0-5)
    search: 'headphones',    // Search term
    sort: 'price-low'        // Sort: latest, price-low, price-high, popular, rating
}
```

### Pagination
- 12 items per page
- Client-side pagination
- Auto-resets when filters change

## 🔐 Authentication

### Mock Login Credentials
Any email/password combination works for demonstration purposes.

### User Session
- Stored in memory (not persisted)
- Required for dashboard access
- Mock user data: "John Doe"

## 📊 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Responsive Breakpoints

```css
Desktop: 1024px+
Tablet: 768px - 1023px
Mobile: < 768px
Small Mobile: < 480px
```

## ⚡ Performance Features

- **CSS Grid & Flexbox** for efficient layouts
- **CSS-only animations** (no JavaScript overhead)
- **Debounced search** (prevents excessive filtering)
- **Lazy component rendering** (only visible content)
- **Minimal bundle size** (no external dependencies)
- **Optimized media** (emoji icons instead of images)

## 🚀 Customization Guide

### Change Colors
Edit CSS variables in `styles.css` (lines 4-17):
```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-accent;
    /* ... etc */
}
```

### Add Products
Edit `MOCK_DATA.products` in `data.js`:
```javascript
{
    id: 21,
    name: 'Your Product',
    category: 'Your Category',
    price: 99.99,
    // ... other properties
}
```

### Modify Page Titles
Update `<title>` tag in `index.html`:
```html
<title>Your Store Name</title>
```

### Change Fonts
Update Google Fonts link in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

## 🔄 Converting to Production

### With Backend Integration
1. Replace `API` object in `app.js` with real API calls
2. Update cart/wishlist to POST to backend
3. Implement real authentication
4. Connect to product database

### With Build Tools
```bash
# Bundle with Webpack/Vite
npm install --save-dev webpack webpack-cli
npm run build

# Or use Parcel for zero-config
npm install --save-dev parcel
parcel build index.html
```

### Deployment Options
- **Static Host**: Netlify, Vercel, GitHub Pages
- **Docker**: Create Dockerfile for containerization
- **Server**: Deploy to any web server (Apache, Nginx)

## 📝 License

Free to use and modify for personal or commercial projects.

## 🤝 Support

For issues or questions, check the code comments in:
- `app.js` - Application logic
- `styles.css` - Styling guide
- `data.js` - Data structure

## 🎓 Learning Resources

This project demonstrates:
- HTML5 semantic structure
- CSS3 modern layouts (Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- State management patterns
- Client-side routing
- LocalStorage API
- Responsive design principles
- Accessibility best practices

## 📈 Future Enhancement Ideas

- [ ] Real backend API integration
- [ ] User authentication (JWT)
- [ ] Product image uploads
- [ ] Reviews & ratings system
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Inventory management
- [ ] Admin dashboard
- [ ] Analytics tracking
- [ ] PWA features
- [ ] Multi-language support
- [ ] Accessibility (WCAG AA)

---

**Built with ❤️ - Premium E-Commerce Platform v1.0**
