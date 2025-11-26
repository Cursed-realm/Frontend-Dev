class Product {
    constructor(id, name, price, category, stock = 0) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.stock = stock;
        this.originalPrice = price;
        this.discountApplied = 0;
    }
    applyDiscount(percentage) {
        if (percentage < 0 || percentage > 100) {
            throw new Error('Discount percentage must be between 0 and 100');
        }

        this.discountApplied = percentage;
        const discountAmount = (this.originalPrice * percentage) / 100;
        this.price = this.originalPrice - discountAmount;

        return {
            originalPrice: this.originalPrice,
            discountPercentage: percentage,
            discountAmount: discountAmount,
            finalPrice: this.price,
            savedAmount: discountAmount
        };
    }

    // Remove discount
    removeDiscount() {
        this.price = this.originalPrice;
        this.discountApplied = 0;
    }
    displayDetails() {
        const hasDiscount = this.discountApplied > 0;

        let details = `

ID:          ${String(this.id).padEnd(49)} ║
Name:        ${this.name.padEnd(49)} ║
Category:    ${this.category.padEnd(49)} ║
Stock:       ${String(this.stock).padEnd(49)} ║`;

        if (hasDiscount) {
            details += `
Original:    ₹${this.originalPrice.toLocaleString('en-IN').padEnd(48)} ║
  Discount:    ${this.discountApplied}% OFF${' '.padEnd(44)} ║
 Price:       ₹${this.price.toLocaleString('en-IN').padEnd(48)} ║
  You Save:    ₹${(this.originalPrice - this.price).toLocaleString('en-IN').padEnd(48)} ║`;
        } else {
            details += `
 Price:       ₹${this.price.toLocaleString('en-IN').padEnd(48)} ║`;
        }

        details += `
`;

        return details;
    }

    // Compact display for lists
    displayCompact() {
        const discountTag = this.discountApplied > 0 ? ` (${this.discountApplied}% OFF)` : '';
        return `[${this.id}] ${this.name} - ₹${this.price.toLocaleString('en-IN')}${discountTag} | ${this.category}`;
    }

    // Check if in stock
    isInStock() {
        return this.stock > 0;
    }

    // Update stock
    updateStock(quantity) {
        this.stock += quantity;
        return this.stock;
    }
}

// E-Commerce Product Manager Class
class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    // Add product
    addProduct(name, price, category, stock = 0) {
        const product = new Product(this.nextId++, name, price, category, stock);
        this.products.push(product);
        return product;
    }

    // Get product by ID
    getProductById(id) {
        return this.products.find(p => p.id === id);
    }

    // Filter products by price
    filterByPrice(minPrice, maxPrice = Infinity) {
        return this.products.filter(p => p.price >= minPrice && p.price <= maxPrice);
    }

    // Filter products above a certain price
    getExpensiveProducts(threshold = 1000) {
        return this.products.filter(p => p.price > threshold);
    }

    // Filter by category
    filterByCategory(category) {
        return this.products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    // Get products on discount
    getDiscountedProducts() {
        return this.products.filter(p => p.discountApplied > 0);
    }

    // Apply bulk discount to category
    applyBulkDiscount(category, percentage) {
        const categoryProducts = this.filterByCategory(category);
        categoryProducts.forEach(product => {
            product.applyDiscount(percentage);
        });
        return categoryProducts.length;
    }

    // Display all products
    displayAllProducts() {
        console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
        console.log('  ║                          ALL PRODUCTS IN INVENTORY                         ║');
        console.log('  ╚════════════════════════════════════════════════════════════════════════════╝\n');

        if (this.products.length === 0) {
            console.log('No products available.\n');
            return;
        }

        this.products.forEach((product, index) => {
            console.log(`${index + 1}. ${product.displayCompact()}`);
        });
        console.log('');
    }

    // Display products in table format
    displayTable(products = this.products) {
        console.log('\n┌──────┬─────────────────────────────┬────────────────┬─────────────┬───────┬─────────┐');
        console.log('│  ID  │           Name              │    Category    │    Price    │ Stock │ Discount│');
        console.log('├──────┼─────────────────────────────┼────────────────┼─────────────┼───────┼─────────┤');

        products.forEach(p => {
            const id = String(p.id).padEnd(4);
            const name = p.name.padEnd(27);
            const category = p.category.padEnd(14);
            const price = `₹${p.price.toLocaleString('en-IN')}`.padEnd(11);
            const stock = String(p.stock).padEnd(5);
            const discount = p.discountApplied > 0 ? `${p.discountApplied}%`.padEnd(7) : '-'.padEnd(7);

            console.log(`│ ${id} │ ${name} │ ${category} │ ${price} │ ${stock} │ ${discount} │`);
        });

        console.log('└──────┴─────────────────────────────┴────────────────┴─────────────┴───────┴─────────┘\n');
    }

    // Get statistics
    getStatistics() {
        if (this.products.length === 0) {
            return { totalProducts: 0, totalValue: 0, avgPrice: 0, categories: {} };
        }

        const stats = {
            totalProducts: this.products.length,
            totalValue: this.products.reduce((sum, p) => sum + (p.price * p.stock), 0),
            avgPrice: this.products.reduce((sum, p) => sum + p.price, 0) / this.products.length,
            maxPrice: Math.max(...this.products.map(p => p.price)),
            minPrice: Math.min(...this.products.map(p => p.price)),
            totalStock: this.products.reduce((sum, p) => sum + p.stock, 0),
            categories: {},
            discountedCount: this.products.filter(p => p.discountApplied > 0).length
        };

        // Count products per category
        this.products.forEach(p => {
            stats.categories[p.category] = (stats.categories[p.category] || 0) + 1;
        });

        return stats;
    }

    // Display statistics
    displayStatistics() {
        const stats = this.getStatistics();
        console.log(`📊 Total Products:        ${stats.totalProducts}`);
        console.log(`💰 Total Inventory Value: ₹${stats.totalValue.toLocaleString('en-IN')}`);
        console.log(`📈 Average Price:         ₹${stats.avgPrice.toFixed(2)}`);
        console.log(`🔝 Highest Price:         ₹${stats.maxPrice.toLocaleString('en-IN')}`);
        console.log(`🔽 Lowest Price:          ₹${stats.minPrice.toLocaleString('en-IN')}`);
        console.log(`📦 Total Stock:           ${stats.totalStock} units`);
        console.log(`🏷️  Products on Discount:  ${stats.discountedCount}`);

        console.log('\n📂 Products by Category:');
        Object.entries(stats.categories).forEach(([category, count]) => {
            console.log(`   ${category}: ${count} product(s)`);
        });
        console.log('');
    }
}
console.log('\n🛒 E-COMMERCE PRODUCT MANAGER - ADMIN PANEL\n');
console.log('═'.repeat(80));

// Create Product Manager
const manager = new ProductManager();

// Add products to inventory
console.log('\n📦 Adding Products to Inventory...\n');

const products = [
    manager.addProduct('iPhone 15 Pro', 129900, 'Electronics', 25),
    manager.addProduct('Samsung Galaxy S24', 89999, 'Electronics', 30),
    manager.addProduct('Sony WH-1000XM5', 29990, 'Electronics', 50),
    manager.addProduct('Dell XPS 15', 145000, 'Electronics', 15),
    manager.addProduct('MacBook Pro M3', 199900, 'Electronics', 10),
    manager.addProduct('Nike Air Max', 8999, 'Footwear', 100),
    manager.addProduct('Adidas Ultraboost', 15999, 'Footwear', 75),
    manager.addProduct('Levi\'s Jeans', 3499, 'Clothing', 200),
    manager.addProduct('Tommy Hilfiger Shirt', 2999, 'Clothing', 150),
    manager.addProduct('Rolex Submariner', 850000, 'Watches', 5),
    manager.addProduct('Apple Watch Series 9', 45900, 'Electronics', 40),
    manager.addProduct('Sony PlayStation 5', 54990, 'Electronics', 20),
    manager.addProduct('Xbox Series X', 52990, 'Electronics', 18),
    manager.addProduct('Bose QuietComfort', 26900, 'Electronics', 35),
    manager.addProduct('Canon EOS R5', 325000, 'Electronics', 8)
];

console.log(`✅ Successfully added ${products.length} products to inventory!\n`);

manager.displayAllProducts();
console.log('═'.repeat(80));
console.log('                        PRODUCT INVENTORY TABLE                        ');
console.log('═'.repeat(80));
manager.displayTable();
console.log('═'.repeat(80));
console.log('              PREMIUM PRODUCTS (Price > ₹1,000)              ');
console.log('═'.repeat(80));

const expensiveProducts = manager.getExpensiveProducts(1000);

console.log(`\nFound ${expensiveProducts.length} products above ₹1,000:\n`);

expensiveProducts.forEach((product, index) => {
    console.log(`${index + 1}. ${product.displayCompact()}`);
});

console.log('\n');
manager.displayTable(expensiveProducts);
console.log('═'.repeat(80));
console.log('                        APPLYING DISCOUNTS                        ');
console.log('═'.repeat(80));

// Apply 10% discount to iPhone
console.log('\n🏷️  Applying 10% discount to iPhone 15 Pro...\n');
const iphone = manager.getProductById(1);
const discountInfo = iphone.applyDiscount(10);

console.log(`Original Price:    ₹${discountInfo.originalPrice.toLocaleString('en-IN')}`);
console.log(`Discount:          ${discountInfo.discountPercentage}%`);
console.log(`Discount Amount:   ₹${discountInfo.discountAmount.toLocaleString('en-IN')}`);
console.log(`Final Price:       ₹${discountInfo.finalPrice.toLocaleString('en-IN')}`);
console.log(`You Save:          ₹${discountInfo.savedAmount.toLocaleString('en-IN')}`);

// Apply bulk discount to Electronics category
console.log('\n\n🎉 MEGA SALE: Applying 15% discount to all Electronics...\n');
const discountedCount = manager.applyBulkDiscount('Electronics', 15);
console.log(`✅ Applied 15% discount to ${discountedCount} electronic products!\n`);

// Apply discount to Footwear
console.log('👟 Footwear Flash Sale: 20% OFF on all footwear...\n');
manager.applyBulkDiscount('Footwear', 20);
console.log('✅ Footwear discounts applied!\n');

// Display updated products
console.log('═'.repeat(80));
console.log('                   UPDATED INVENTORY (After Discounts)                   ');
console.log('═'.repeat(80));
manager.displayTable();
console.log('═'.repeat(80));
console.log('                        PRODUCTS ON SALE                        ');
console.log('═'.repeat(80));

const discountedProducts = manager.getDiscountedProducts();
console.log(`\n🔥 ${discountedProducts.length} Products Currently on Sale:\n`);

manager.displayTable(discountedProducts);
console.log('═'.repeat(80));
console.log('                  FEATURED PRODUCT DETAILS                  ');
console.log('═'.repeat(80));

// Display iPhone details
console.log(iphone.displayDetails());

// Display MacBook details
const macbook = manager.getProductById(5);
console.log(macbook.displayDetails());

// Display Rolex details
const rolex = manager.getProductById(10);
console.log(rolex.displayDetails());

const electronics = manager.filterByCategory('Electronics');
console.log(`\nFound ${electronics.length} electronic products:\n`);
manager.displayTable(electronics);
console.log('═'.repeat(80));
manager.displayStatistics();
console.log('═'.repeat(80));
console.log('\n💎 LUXURY ITEMS (Price > ₹100,000)\n');
const luxuryItems = manager.filterByPrice(100000);
luxuryItems.forEach(p => console.log(`  • ${p.displayCompact()}`));
