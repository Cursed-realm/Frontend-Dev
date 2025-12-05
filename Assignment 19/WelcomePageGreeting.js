// Welcome Page Greeting - Dynamic greeting based on time of day
// Features: 
// 1. Time-based personalized greeting on page load
// 2. Button to change greeting to motivational quotes
// 3. Toggle visibility of welcome message
// 4. Alert on greeting click

(function () {
  'use strict';

  // --- Helper Functions ---

  /**
   * Get greeting based on current time of day
   * @returns {string} Greeting message
   */
  function getTimeBasedGreeting() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return 'Good Morning! 🌅';
    } else if (hour >= 12 && hour < 18) {
      return 'Good Afternoon! ☀️';
    } else {
      return 'Good Evening! 🌙';
    }
  }

  // --- Motivational Quotes ---
  const QUOTES = [
    'Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine. – Roy T. Bennett',
    'It always seems impossible until it\'s done. – Nelson Mandela',
    'The only way to do great work is to love what you do. – Steve Jobs',
    'Don\'t watch the clock; do what it does. Keep going. – Sam Levenson',
    'The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt',
    'Success is not final, failure is not fatal. – Winston Churchill',
    'Your limitation—it\'s only your imagination. Push beyond it.',
    'Great things never come from comfort zones.',
    'Dream it. Wish it. Do it. Make it happen.',
    'Success is walking from failure to failure with no loss of enthusiasm.'
  ];

  // --- DOM Elements ---
  let greetingElement = null;
  let welcomeMessageElement = null;
  let changeGreetingBtn = null;
  let toggleWelcomeBtn = null;
  let containerElement = null;

  /**
   * Initialize and render the UI
   */
  function initializeUI() {
    // Create container
    containerElement = document.createElement('div');
    containerElement.id = 'welcome-greeting-container';
    containerElement.style.cssText = `
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 700px;
      margin: 40px auto;
      padding: 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      color: white;
      text-align: center;
    `;

    // Create greeting element
    greetingElement = document.createElement('h1');
    greetingElement.id = 'greeting-text';
    greetingElement.style.cssText = `
      margin: 0 0 20px 0;
      font-size: 2.5em;
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 15px;
      border-radius: 8px;
      user-select: none;
    `;
    greetingElement.textContent = getTimeBasedGreeting();

    // Add hover effect to greeting
    greetingElement.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.05)';
      this.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
    });

    greetingElement.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1)';
      this.style.textShadow = 'none';
    });

    // Create welcome message
    welcomeMessageElement = document.createElement('p');
    welcomeMessageElement.id = 'welcome-message';
    welcomeMessageElement.style.cssText = `
      margin: 0 0 30px 0;
      font-size: 1.1em;
      line-height: 1.6;
      opacity: 0.95;
      transition: opacity 0.3s ease;
    `;
    welcomeMessageElement.textContent = 'Welcome to our website! We are delighted to have you here. Feel free to explore and enjoy your visit.';

    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
      display: flex;
      gap: 15px;
      justify-content: center;
      flex-wrap: wrap;
    `;

    // Create "Change Greeting" button
    changeGreetingBtn = document.createElement('button');
    changeGreetingBtn.id = 'change-greeting-btn';
    changeGreetingBtn.textContent = 'Change Greeting';
    changeGreetingBtn.style.cssText = `
      padding: 12px 24px;
      font-size: 1em;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 2px solid white;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
    `;

    changeGreetingBtn.addEventListener('mouseenter', function () {
      this.style.background = 'rgba(255, 255, 255, 0.3)';
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    });

    changeGreetingBtn.addEventListener('mouseleave', function () {
      this.style.background = 'rgba(255, 255, 255, 0.2)';
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });

    // Create "Toggle Welcome" button
    toggleWelcomeBtn = document.createElement('button');
    toggleWelcomeBtn.id = 'toggle-welcome-btn';
    toggleWelcomeBtn.textContent = 'Hide Welcome Message';
    toggleWelcomeBtn.style.cssText = `
      padding: 12px 24px;
      font-size: 1em;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 2px solid white;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
    `;

    toggleWelcomeBtn.addEventListener('mouseenter', function () {
      this.style.background = 'rgba(255, 255, 255, 0.3)';
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    });

    toggleWelcomeBtn.addEventListener('mouseleave', function () {
      this.style.background = 'rgba(255, 255, 255, 0.2)';
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });

    // Append elements to container
    buttonContainer.appendChild(changeGreetingBtn);
    buttonContainer.appendChild(toggleWelcomeBtn);

    containerElement.appendChild(greetingElement);
    containerElement.appendChild(welcomeMessageElement);
    containerElement.appendChild(buttonContainer);

    // Add container to body
    document.body.insertBefore(containerElement, document.body.firstChild);

    // --- Event Listeners ---

    /**
     * 1. Greeting click shows alert
     */
    greetingElement.addEventListener('click', function () {
      alert('You clicked the greeting: "' + this.textContent + '"\n\nHave a great day! 🎉');
    });

    /**
     * 2. Change greeting button functionality
     */
    changeGreetingBtn.addEventListener('click', function () {
      const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
      greetingElement.textContent = randomQuote;

      // Add animation
      greetingElement.style.animation = 'none';
      setTimeout(() => {
        greetingElement.style.animation = 'fadeInScale 0.5s ease';
      }, 10);
    });

    /**
     * 3. Toggle welcome message visibility
     */
    let isWelcomeVisible = true;
    toggleWelcomeBtn.addEventListener('click', function () {
      isWelcomeVisible = !isWelcomeVisible;

      if (isWelcomeVisible) {
        welcomeMessageElement.style.display = 'block';
        welcomeMessageElement.style.animation = 'fadeIn 0.3s ease';
        this.textContent = 'Hide Welcome Message';
      } else {
        welcomeMessageElement.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
          welcomeMessageElement.style.display = 'none';
        }, 300);
        this.textContent = 'Show Welcome Message';
      }
    });
  }

  /**
   * Add CSS animations to the page
   */
  function addAnimations() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInScale {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fadeOut {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(-10px);
        }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Initialize on DOM ready
   */
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        addAnimations();
        initializeUI();
      });
    } else {
      addAnimations();
      initializeUI();
    }
  }

  // Start the application
  init();

})();

