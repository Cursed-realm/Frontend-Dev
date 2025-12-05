// Product Highlight System - Enhanced e-commerce UX
// Features:
// 1. Click product → highlight background
// 2. Hover → show additional product details
// 3. Favorite icon click → toggle "selected" class
// 4. Attribute selector for discount styles
// 5. Data attribute alert for out-of-stock products

(function() {
  'use strict';

  // --- Product data ---
  const PRODUCTS = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 79.99,
      originalPrice: 119.99,
      discount: '33%',
      hasDiscount: true,
      inStock: true,
      description: 'Premium sound quality with noise cancellation',
      rating: 4.8,
      reviews: 256
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 199.99,
      originalPrice: null,
      discount: null,
      hasDiscount: false,
      inStock: true,
      description: 'Stay connected with fitness tracking and heart rate monitor',
      rating: 4.5,
      reviews: 189
    },
    {
      id: 3,
      name: 'USB-C Cable',
      price: 12.99,
      originalPrice: 15.99,
      discount: '19%',
      hasDiscount: true,
      inStock: false,
      description: 'Fast charging and data transfer cable',
      rating: 4.9,
      reviews: 542
    },
    {
      id: 4,
      name: 'Phone Case',
      price: 24.99,
      originalPrice: 34.99,
      discount: '29%',
      hasDiscount: true,
      inStock: true,
      description: 'Durable protection with premium materials',
      rating: 4.6,
      reviews: 413
    },
    {
      id: 5,
      name: 'Screen Protector',
      price: 9.99,
      originalPrice: null,
      discount: null,
      hasDiscount: false,
      inStock: true,
      description: 'Tempered glass protection for your screen',
      rating: 4.7,
      reviews: 678
    },
    {
      id: 6,
      name: 'Bluetooth Speaker',
      price: 49.99,
      originalPrice: 79.99,
      discount: '37%',
      hasDiscount: true,
      inStock: false,
      description: 'Waterproof portable speaker with 20-hour battery',
      rating: 4.4,
      reviews: 324
    }
  ];

  let selectedProduct = null;

  /**
   * Render all products in the container
   */
  function renderProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;

    container.innerHTML = '';

    PRODUCTS.forEach(product => {
      const productCard = createProductCard(product);
      container.appendChild(productCard);
    });
  }

  /**
   * Create individual product card element
   */
  function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.id = `product-${product.id}`;
    card.setAttribute('data-product-id', product.id);
    card.setAttribute('data-in-stock', product.inStock);
    
    // Add discount attribute for CSS selector
    if (product.hasDiscount) {
      card.setAttribute('data-discount', product.discount);
    }

    const discountBadge = product.hasDiscount 
      ? `<div class="discount-badge">${product.discount} OFF</div>` 
      : '';

    const stockStatus = product.inStock 
      ? '<span class="stock-status in-stock">In Stock</span>' 
      : '<span class="stock-status out-of-stock">Out of Stock</span>';

    const priceDisplay = product.hasDiscount 
      ? `<div class="price-section">
           <span class="original-price">$${product.originalPrice}</span>
           <span class="current-price">$${product.price}</span>
         </div>`
      : `<span class="current-price">$${product.price}</span>`;

    card.innerHTML = `
      <div class="product-image-container">
        ${discountBadge}
        <div class="product-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
      </div>
      
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        ${stockStatus}
        
        <div class="rating">
          <span class="stars">★★★★★</span>
          <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
        </div>
        
        <div class="product-details hidden" id="details-${product.id}">
          <p class="details-text">${product.description}</p>
        </div>
        
        ${priceDisplay}
        
        <div class="product-actions">
          <button class="favorite-btn" aria-label="Add to favorites">
            <span class="favorite-icon">♡</span>
          </button>
          <button class="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    `;

    // --- Event Listeners ---

    // 1. Click product to highlight
    card.addEventListener('click', function(e) {
      // Don't trigger on button clicks
      if (e.target.closest('button')) return;
      
      highlightProduct(card);
    });

    // 2. Hover to show details
    card.addEventListener('mouseenter', function() {
      const detailsElement = card.querySelector('.product-details');
      if (detailsElement) {
        detailsElement.classList.remove('hidden');
      }
    });

    card.addEventListener('mouseleave', function() {
      const detailsElement = card.querySelector('.product-details');
      if (detailsElement) {
        detailsElement.classList.add('hidden');
      }
    });

    // 3. Favorite button toggle
    const favoriteBtn = card.querySelector('.favorite-btn');
    if (favoriteBtn) {
      favoriteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        card.classList.toggle('selected');
        const icon = this.querySelector('.favorite-icon');
        
        if (card.classList.contains('selected')) {
          icon.textContent = '♥';
          this.classList.add('favorited');
        } else {
          icon.textContent = '♡';
          this.classList.remove('favorited');
        }
      });
    }

    // 5. Check for out-of-stock on interaction
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const inStock = card.getAttribute('data-in-stock') === 'true';
        if (!inStock) {
          alert(`⚠️ "${product.name}" is out of stock!\n\nPlease check back later or notify me when it's available.`);
        } else {
          alert(`✅ "${product.name}" has been added to your cart!`);
        }
      });
    }

    return card;
  }

  /**
   * Highlight selected product and remove highlight from others
   */
  function highlightProduct(card) {
    // Remove highlight from previously selected product
    const allCards = document.querySelectorAll('.product-card');
    allCards.forEach(c => c.classList.remove('highlighted'));

    // Add highlight to clicked product
    card.classList.add('highlighted');
    selectedProduct = card.id;
  }

  /**
   * Add CSS styles dynamically
   */
  function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Product Container */
      #products-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
        padding: 20px;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        border-radius: 12px;
      }

      /* Product Card Base */
      .product-card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: all 0.3s ease;
        border: 3px solid transparent;
        position: relative;
      }

      .product-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
      }

      /* Highlighted product */
      .product-card.highlighted {
        background: linear-gradient(135deg, #fff9e6 0%, #ffe6e6 100%);
        border-color: #ffd700;
        box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.3);
      }

      /* Selected/Favorited product */
      .product-card.selected {
        border-color: #ff69b4;
        box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.2);
      }

      /* Image Container */
      .product-image-container {
        position: relative;
        height: 200px;
        background: #f5f5f5;
        overflow: hidden;
      }

      .product-image {
        width: 100%;
        height: 100%;
        transition: transform 0.3s ease;
      }

      .product-card:hover .product-image {
        transform: scale(1.1);
      }

      /* Discount Badge */
      .discount-badge {
        position: absolute;
        top: 12px;
        right: 12px;
        background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%);
        color: white;
        padding: 8px 12px;
        border-radius: 8px;
        font-weight: 700;
        font-size: 0.85em;
        box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
        z-index: 10;
      }

      /* ATTRIBUTE SELECTOR: Style products with discounts */
      .product-card[data-discount] {
        position: relative;
      }

      .product-card[data-discount]::before {
        content: '🏷️';
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 1.5em;
        opacity: 0.8;
      }

      .product-card[data-discount] .product-info {
        border-top: 4px solid #ff6b6b;
      }

      /* Product Info */
      .product-info {
        padding: 16px;
      }

      .product-name {
        margin: 0 0 8px 0;
        font-size: 1.2em;
        color: #333;
      }

      /* Stock Status */
      .stock-status {
        display: inline-block;
        font-size: 0.85em;
        font-weight: 600;
        padding: 4px 8px;
        border-radius: 6px;
        margin-bottom: 10px;
      }

      .stock-status.in-stock {
        background: #d4edda;
        color: #155724;
      }

      .stock-status.out-of-stock {
        background: #f8d7da;
        color: #721c24;
      }

      /* Rating */
      .rating {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-bottom: 10px;
        font-size: 0.9em;
      }

      .stars {
        color: #ffc107;
        font-size: 1.2em;
      }

      .rating-text {
        color: #666;
        font-size: 0.85em;
      }

      /* Product Details (shown on hover) */
      .product-details {
        background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
        padding: 10px;
        margin: 10px 0;
        border-radius: 8px;
        border-left: 4px solid #667eea;
      }

      .product-details.hidden {
        display: none;
      }

      .details-text {
        margin: 0;
        color: #555;
        font-size: 0.9em;
        line-height: 1.5;
      }

      /* Price Section */
      .price-section {
        display: flex;
        gap: 10px;
        align-items: center;
        margin: 12px 0;
      }

      .original-price {
        text-decoration: line-through;
        color: #999;
        font-size: 0.95em;
      }

      .current-price {
        font-size: 1.5em;
        font-weight: 700;
        color: #667eea;
      }

      /* Product Actions */
      .product-actions {
        display: flex;
        gap: 10px;
        margin-top: 12px;
      }

      .favorite-btn {
        flex: 0 0 auto;
        padding: 8px 10px;
        border: 2px solid #ff69b4;
        background: white;
        color: #ff69b4;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1.3em;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .favorite-btn:hover {
        background: #ffe6f0;
        transform: scale(1.1);
      }

      .favorite-btn.favorited {
        background: #ff69b4;
        color: white;
      }

      .favorite-icon {
        line-height: 1;
      }

      .add-to-cart-btn {
        flex: 1;
        padding: 10px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 700;
        transition: all 0.3s ease;
      }

      .add-to-cart-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
      }

      .add-to-cart-btn:active {
        transform: translateY(0);
      }

      /* Responsive */
      @media (max-width: 768px) {
        #products-container {
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
          padding: 15px;
        }

        .product-name {
          font-size: 1em;
        }

        .current-price {
          font-size: 1.3em;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Initialize the product showcase
   */
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        addStyles();
        renderProducts();
      });
    } else {
      addStyles();
      renderProducts();
    }
  }

  // Start the application
  init();

})();
