// ===========================
// Mock Data
// ===========================

const MOCK_DATA = {
    categories: [
        { id: 1, name: 'Electronics', icon: '📱', count: 24 },
        { id: 2, name: 'Fashion', icon: '👗', count: 18 },
        { id: 3, name: 'Home & Living', icon: '🏠', count: 15 },
        { id: 4, name: 'Sports & Outdoors', icon: '⛰️', count: 12 },
        { id: 5, name: 'Beauty & Skincare', icon: '💄', count: 20 },
        { id: 6, name: 'Books & Media', icon: '📚', count: 30 }
    ],

    products: [
        {
            id: 1,
            name: 'Premium Wireless Headphones',
            category: 'Electronics',
            price: 299.99,
            originalPrice: 399.99,
            rating: 4.8,
            reviews: 342,
            image: '🎧',
            description: 'High-quality wireless headphones with noise cancellation, 30-hour battery life, and premium comfort design.',
            details: 'Features: Noise cancellation, Bluetooth 5.0, 30hr battery, Comfortable padding, Foldable design',
            badge: 'New'
        },
        {
            id: 2,
            name: 'Luxury Leather Watch',
            category: 'Fashion',
            price: 149.99,
            originalPrice: 199.99,
            rating: 4.9,
            reviews: 289,
            image: '⌚',
            description: 'Elegant leather watch with Swiss movement, water resistant, perfect for any occasion.',
            details: 'Swiss movement, Water resistant to 50m, Genuine leather strap, Sapphire crystal',
            badge: 'Premium'
        },
        {
            id: 3,
            name: 'Smart Home Hub',
            category: 'Electronics',
            price: 199.99,
            originalPrice: 249.99,
            rating: 4.7,
            reviews: 156,
            image: '🏠',
            description: 'Central hub for all your smart home devices with voice control and automation.',
            details: 'WiFi 6, Voice control, Multi-device support, Energy monitoring',
            badge: 'Best Seller'
        },
        {
            id: 4,
            name: 'Premium Cotton T-Shirt',
            category: 'Fashion',
            price: 49.99,
            originalPrice: 79.99,
            rating: 4.6,
            reviews: 523,
            image: '👕',
            description: 'Soft, comfortable premium cotton t-shirt available in multiple colors.',
            details: '100% organic cotton, Available in 10+ colors, Sustainable production',
            badge: 'Sale'
        },
        {
            id: 5,
            name: 'Yoga Mat Premium',
            category: 'Sports & Outdoors',
            price: 79.99,
            originalPrice: 99.99,
            rating: 4.8,
            reviews: 234,
            image: '🧘',
            description: 'Eco-friendly yoga mat with superior grip and cushioning for comfortable workouts.',
            details: 'Eco-friendly materials, 6mm thickness, Non-slip surface, Portable design',
            badge: 'New'
        },
        {
            id: 6,
            name: 'Organic Skincare Set',
            category: 'Beauty & Skincare',
            price: 89.99,
            originalPrice: 129.99,
            rating: 4.9,
            reviews: 412,
            image: '🧴',
            description: 'Complete organic skincare set with natural ingredients for healthy skin.',
            details: 'All-natural ingredients, Dermatologist tested, Cruelty-free',
            badge: 'Popular'
        },
        {
            id: 7,
            name: '4K Webcam',
            category: 'Electronics',
            price: 179.99,
            originalPrice: 229.99,
            rating: 4.7,
            reviews: 198,
            image: '📷',
            description: 'Crystal clear 4K webcam perfect for streaming and video calls.',
            details: '4K resolution, Auto-focus, Built-in microphone, USB plug and play',
            badge: null
        },
        {
            id: 8,
            name: 'Designer Sunglasses',
            category: 'Fashion',
            price: 199.99,
            originalPrice: 299.99,
            rating: 4.8,
            reviews: 278,
            image: '😎',
            description: 'Premium designer sunglasses with UV protection and stylish frame.',
            details: 'UV400 protection, Polarized lenses, Premium frame material',
            badge: 'Trending'
        },
        {
            id: 9,
            name: 'Coffee Maker Deluxe',
            category: 'Home & Living',
            price: 129.99,
            originalPrice: 179.99,
            rating: 4.7,
            reviews: 321,
            image: '☕',
            description: 'Advanced coffee maker with programmable features and thermal carafe.',
            details: 'Programmable timer, Thermal carafe, Water filter, Easy cleanup',
            badge: 'Best Seller'
        },
        {
            id: 10,
            name: 'Wireless Charging Pad',
            category: 'Electronics',
            price: 39.99,
            originalPrice: 59.99,
            rating: 4.6,
            reviews: 567,
            image: '🔌',
            description: 'Fast wireless charging pad compatible with all major devices.',
            details: 'Fast charge, Overcharge protection, LED indicator, Non-slip base',
            badge: 'Value'
        },
        {
            id: 11,
            name: 'Cashmere Sweater',
            category: 'Fashion',
            price: 159.99,
            originalPrice: 219.99,
            rating: 4.9,
            reviews: 156,
            image: '🧶',
            description: 'Luxurious pure cashmere sweater, perfect for any season.',
            details: '100% pure cashmere, Hand-washable, Available in 8 colors',
            badge: 'Premium'
        },
        {
            id: 12,
            name: 'Fitness Tracker Pro',
            category: 'Electronics',
            price: 249.99,
            originalPrice: 329.99,
            rating: 4.8,
            reviews: 445,
            image: '⌚',
            description: 'Advanced fitness tracker with heart rate monitoring and sleep tracking.',
            details: '7-day battery, Water resistant, 100+ sport modes, Sleep tracking',
            badge: 'New'
        },
        {
            id: 13,
            name: 'Bamboo Cutting Board Set',
            category: 'Home & Living',
            price: 59.99,
            originalPrice: 89.99,
            rating: 4.7,
            reviews: 234,
            image: '🪵',
            description: 'Sustainable bamboo cutting board set with premium knives.',
            details: 'Eco-friendly bamboo, Includes 3 knives, Easy to clean',
            badge: 'Sale'
        },
        {
            id: 14,
            name: 'Portable Bluetooth Speaker',
            category: 'Electronics',
            price: 119.99,
            originalPrice: 169.99,
            rating: 4.6,
            reviews: 612,
            image: '🔊',
            description: 'Waterproof portable speaker with 360° sound and long battery life.',
            details: 'Waterproof IPX7, 20hr battery, 360° sound, Portable design',
            badge: 'Popular'
        },
        {
            id: 15,
            name: 'Bestselling Novel',
            category: 'Books & Media',
            price: 24.99,
            originalPrice: 29.99,
            rating: 4.9,
            reviews: 1023,
            image: '📖',
            description: 'Award-winning contemporary novel that has captivated millions of readers.',
            details: 'Hardcover, 450 pages, Award winner, International bestseller',
            badge: 'Bestseller'
        },
        {
            id: 16,
            name: 'Stainless Steel Water Bottle',
            category: 'Sports & Outdoors',
            price: 44.99,
            originalPrice: 64.99,
            rating: 4.8,
            reviews: 789,
            image: '💧',
            description: 'Durable stainless steel water bottle that keeps drinks hot or cold for hours.',
            details: 'Double-wall insulation, Leak-proof, BPA-free, Multiple colors',
            badge: null
        },
        {
            id: 17,
            name: 'Gaming Mouse',
            category: 'Electronics',
            price: 89.99,
            originalPrice: 129.99,
            rating: 4.7,
            reviews: 456,
            image: '🖱️',
            description: 'High-precision gaming mouse with customizable RGB lighting.',
            details: '16,000 DPI, Programmable buttons, RGB lighting, Lightweight',
            badge: 'Sale'
        },
        {
            id: 18,
            name: 'Aromatherapy Diffuser',
            category: 'Home & Living',
            price: 69.99,
            originalPrice: 99.99,
            rating: 4.8,
            reviews: 378,
            image: '🌸',
            description: 'Ultrasonic aromatherapy diffuser with essential oil blend.',
            details: '7-color LED, Quiet operation, Auto shut-off, 400ml capacity',
            badge: 'New'
        },
        {
            id: 19,
            name: 'Professional Camera Tripod',
            category: 'Electronics',
            price: 99.99,
            originalPrice: 149.99,
            rating: 4.7,
            reviews: 267,
            image: '📸',
            description: 'Heavy-duty tripod for cameras and phones with adjustable legs.',
            details: 'Aluminum alloy, Phone holder included, Ball head, Max height 180cm',
            badge: 'Value'
        },
        {
            id: 20,
            name: 'Running Shoes Pro',
            category: 'Sports & Outdoors',
            price: 139.99,
            originalPrice: 189.99,
            rating: 4.9,
            reviews: 534,
            image: '👟',
            description: 'Professional running shoes with advanced cushioning technology.',
            details: 'Gel cushioning, Lightweight, Breathable mesh, Available in 12 colors',
            badge: 'Best Seller'
        }
    ],

    users: [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            joinDate: 'January 2024'
        }
    ],

    mockOrders: [
        {
            id: 'ORD-001',
            date: '2024-03-15',
            total: 549.97,
            status: 'completed',
            items: [
                { id: 1, name: 'Premium Wireless Headphones', price: 299.99, qty: 1 },
                { id: 2, name: 'Luxury Leather Watch', price: 149.99, qty: 1 }
            ]
        },
        {
            id: 'ORD-002',
            date: '2024-03-10',
            total: 329.97,
            status: 'completed',
            items: [
                { id: 3, name: 'Smart Home Hub', price: 199.99, qty: 1 },
                { id: 5, name: 'Yoga Mat Premium', price: 79.99, qty: 1 }
            ]
        },
        {
            id: 'ORD-003',
            date: '2024-03-20',
            total: 199.99,
            status: 'pending',
            items: [
                { id: 12, name: 'Fitness Tracker Pro', price: 249.99, qty: 1 }
            ]
        }
    ]
};

// Featured products (first 8)
MOCK_DATA.featured = MOCK_DATA.products.slice(0, 8);

// Trending products
MOCK_DATA.trending = MOCK_DATA.products.filter(p => p.badge === 'New' || p.badge === 'Popular').slice(0, 6);

// Utility function to simulate API delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Simulated API functions
const API = {
    getProducts: async (filters = {}) => {
        await delay(300);
        let filtered = [...MOCK_DATA.products];

        // Filter by category
        if (filters.category) {
            filtered = filtered.filter(p => p.category === filters.category);
        }

        // Filter by price
        if (filters.maxPrice) {
            filtered = filtered.filter(p => p.price <= filters.maxPrice);
        }

        // Filter by rating
        if (filters.minRating) {
            filtered = filtered.filter(p => p.rating >= filters.minRating);
        }

        // Search
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchTerm) ||
                p.category.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm)
            );
        }

        // Sort
        if (filters.sort) {
            switch (filters.sort) {
                case 'price-low':
                    filtered.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    filtered.sort((a, b) => b.price - a.price);
                    break;
                case 'rating':
                    filtered.sort((a, b) => b.rating - a.rating);
                    break;
                case 'popular':
                    filtered.sort((a, b) => b.reviews - a.reviews);
                    break;
                default:
                    filtered.sort((a, b) => b.id - a.id);
            }
        }

        return filtered;
    },

    getProductById: async (id) => {
        await delay(200);
        return MOCK_DATA.products.find(p => p.id === id);
    },

    getCategories: async () => {
        await delay(150);
        return MOCK_DATA.categories;
    },

    getFeatured: async () => {
        await delay(200);
        return MOCK_DATA.featured;
    },

    getTrending: async () => {
        await delay(200);
        return MOCK_DATA.trending;
    },

    getRelated: async (productId) => {
        await delay(200);
        const product = MOCK_DATA.products.find(p => p.id === productId);
        return MOCK_DATA.products.filter(p =>
            p.category === product.category && p.id !== productId
        ).slice(0, 4);
    },

    getOrders: async () => {
        await delay(200);
        return MOCK_DATA.mockOrders;
    }
};
