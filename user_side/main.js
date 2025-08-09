  // DOM Elements
  const cartBtn = document.querySelector('.cart-btn');
  const cartModal = document.querySelector('.cart-modal');
  const closeCartBtn = document.querySelector('.close-cart');
  const overlay = document.querySelector('.overlay');
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-total');
  const cartCount = document.querySelector('.cart-count');
  const addToCartBtns = document.querySelectorAll('.add-to-cart');
  const categoryBtns = document.querySelectorAll('.category-btn');
  const menuItemsContainer = document.querySelector('.menu-items');
  const checkoutBtn = document.querySelector('.checkout-btn');
  const orderNowBtn = document.getElementById('order-now-btn');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  const testimonials = document.querySelectorAll('.testimonial');
  const newsletterForm = document.querySelector('.newsletter-form');
  const loginBtn = document.getElementById('login-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const profilePic = document.getElementById('profile-pic');
  const usernameEl = document.getElementById('username');
  const dropdownUsername = document.getElementById('dropdown-username');
  const profileDropdown = document.getElementById('profile-dropdown');
  const loginModal = document.getElementById('login-modal');
  const closeLoginBtn = document.querySelector('.close-login');
  const loginForm = document.getElementById('login-form');
  const signupLink = document.getElementById('signup-link');

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  // Cart state
  let cart = [];

  // User state
  let currentUser = null;

  // Menu items data
  const menuItems = [
      { id: 1, name: "Dark Roast Coffee", price: 180, category: "hot-coffees", image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
      { id: 2, name: "Sith Sandwich", price: 150, category: "sandwiches", image: "https://images.unsplash.com/photo-1561043433-aaf687c4cf04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
      { id: 3, name: "Dark Chocolate Croissant", price: 120, category: "desserts", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
      { id: 4, name: "Death Star Cold Brew", price: 220, category: "cold-brews", image: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
      { id: 5, name: "Darth Wrap", price: 190, category: "sandwiches", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
      { id: 6, name: "Vader's Cookie", price: 90, category: "desserts", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
      { id: 7, name: "Jawa Juice", price: 130, category: "cold-brews", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
      { id: 8, name: "Bantha Milk Latte", price: 200, category: "hot-coffees", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
      { id: 9, name: "Tatooine Tea", price: 160, category: "hot-coffees", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
      { id: 10, name: "Endor Espresso", price: 170, category: "hot-coffees", image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
      { id: 11, name: "Rebel Toast", price: 140, category: "breakfast", image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
      { id: 12, name: "Chewbacca Chia Bowl", price: 210, category: "breakfast", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
      { id: 13, name: "Mandalorian Mocha", price: 230, category: "hot-coffees", image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
      { id: 14, name: "Boba Fett Bagel", price: 160, category: "breakfast", image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
      { id: 15, name: "Yoda Yogurt Parfait", price: 190, category: "breakfast", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
      { id: 16, name: "Wookiee Waffle", price: 220, category: "breakfast", image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
  ];

  // Testimonial state
  let currentTestimonial = 0;
  let testimonialInterval;

  // Initialize the page
  function init() {
      // Create floating coffee beans
      createCoffeeBeans();
      
      // Load menu items
      displayMenuItems(menuItems);
      
      // Load cart from localStorage
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
          cart = JSON.parse(savedCart);
          updateCart();
      }
      
      // Load user from localStorage
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
          currentUser = JSON.parse(savedUser);
          updateUserUI();
      }
      
      // Set up event listeners
      setupEventListeners();
      
      // Start testimonial slider
      startTestimonialSlider();
      
      // Set up quantity selectors
      setupQuantitySelectors();
      
      // Set up scroll spy for navigation
      setupScrollSpy();
  }

  // Create floating coffee beans animation
  function createCoffeeBeans() {
      const container = document.getElementById('coffee-beans-container');
      const beanCount = 15;
      
      for (let i = 0; i < beanCount; i++) {
          const bean = document.createElement('div');
          bean.classList.add('coffee-bean');
          
          // Random size between 10px and 30px
          const size = Math.random() * 20 + 10;
          bean.style.width = `${size}px`;
          bean.style.height = `${size}px`;
          
          // Random position
          bean.style.left = `${Math.random() * 100}%`;
          bean.style.top = `${Math.random() * 100}%`;
          
          // Random animation
          const duration = Math.random() * 10 + 10;
          const delay = Math.random() * 5;
          bean.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
          
          container.appendChild(bean);
      }
  }

  // Set up all event listeners
  function setupEventListeners() {
      // Cart toggle
      cartBtn.addEventListener('click', toggleCart);
      closeCartBtn.addEventListener('click', toggleCart);
      overlay.addEventListener('click', toggleCart);
      
      // Add to cart buttons
      addToCartBtns.forEach(btn => {
          btn.addEventListener('click', addToCart);
      });
      
      // Category filter buttons
      categoryBtns.forEach(btn => {
          btn.addEventListener('click', filterMenu);
      });
      
      // Checkout button
      checkoutBtn.addEventListener('click', checkout);
      
      // Order now button
      orderNowBtn.addEventListener('click', () => {
          document.querySelector('#popular').scrollIntoView({ behavior: 'smooth' });
      });
      
      // Testimonial dots
      testimonialDots.forEach(dot => {
          dot.addEventListener('click', () => {
              const index = parseInt(dot.getAttribute('data-index'));
              showTestimonial(index);
          });
      });
      
      // Newsletter form
      newsletterForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = e.target.querySelector('input').value;
          showNotification(`Thanks for subscribing with ${email}! You'll receive our newsletter soon.`);
          e.target.reset();
      });
      hamburger.addEventListener('click', () => {
          hamburger.classList.toggle('active');
          navLinks.classList.toggle('active');
          document.body.classList.toggle('no-scroll');
          
          // Close profile dropdown if open
          profileDropdown.classList.remove('active');
      });
      // Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('no-scroll');
  });
});
      
      // Smooth scrolling for navigation
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
              e.preventDefault();
              
              const targetId = this.getAttribute('href');
              if (targetId === '#') return;
              
              const targetElement = document.querySelector(targetId);
              if (targetElement) {
                  targetElement.scrollIntoView({
                      behavior: 'smooth'
                  });
                  
                  // Update active nav link
                  updateActiveNavLink(targetId);
              }
          });
      });
      
      // User profile events
      loginBtn.addEventListener('click', () => {
          loginModal.classList.add('active');
          overlay.classList.add('active');
      });
      
      closeLoginBtn.addEventListener('click', () => {
          loginModal.classList.remove('active');
          overlay.classList.remove('active');
      });
      
      profilePic.addEventListener('click', (e) => {
          e.stopPropagation();
          profileDropdown.classList.toggle('active');
      });
      
      logoutBtn.addEventListener('click', logout);
      
      document.addEventListener('click', (e) => {
          if (!e.target.closest('.profile-dropdown') && !e.target.closest('.user-profile')) {
              profileDropdown.classList.remove('active');
          }
      });
      
      // Login form
      loginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = document.getElementById('login-email').value;
          const password = document.getElementById('login-password').value;
          
          // Simple validation
          if (email && password) {
              login(email);
          } else {
              showNotification('Please enter both email and password');
          }
      });
      
      signupLink.addEventListener('click', (e) => {
          e.preventDefault();
          showNotification('Sign up feature coming soon!');
      });
  }

  function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { threshold: 0.5 });
  
    sections.forEach(section => observer.observe(section));
  }

    
    function updateActiveNavLink(scrollPos) {
        let currentSection = '';
        const offset = 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop - offset && 
                scrollPos < sectionTop + sectionHeight - offset) {
                currentSection = section.getAttribute('id');
            }
        });
        
        if (currentSection) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const linkHref = link.getAttribute('href').substring(1);
                if (linkHref === currentSection) {
                    link.classList.add('active');
                }
            });
        }
    }

  // Update active navigation link
  function updateActiveNavLink(targetId) {
      navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === targetId) {
              link.classList.add('active');
          }
      });
  }

  // Quantity selector functionality

      // Update your smooth scrolling event listener to:
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
  e.preventDefault();
  
  const targetId = this.getAttribute('href');
  if (targetId === '#') return;
  
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
      // Remove active class from all links
      document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
      });
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Scroll to section
      targetElement.scrollIntoView({
          behavior: 'smooth'
      });
  }
});
});

      document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
          btn.addEventListener('click', (e) => {
              const input = e.target.closest('.quantity-selector').querySelector('.quantity-input');
              if (parseInt(input.value) < 10) {
                  input.value = parseInt(input.value) +1;
              }
          });
      });

      document.querySelectorAll('.quantity-input').forEach(input => {
          input.addEventListener('change', (e) => {
              let value = parseInt(e.target.value);
              if (isNaN(value) || value < 1) {
                  e.target.value = 1;
              } else if (value > 10) {
                  e.target.value = 10;
              }
          });
      });

      function setupQuantitySelectors() {
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const input = e.target.closest('.quantity-selector').querySelector('.quantity-input');
                if (parseInt(input.value) > 1) {
                    input.value = parseInt(input.value) - 1;
                }
            });
        });
      }
  

  // Toggle cart visibility
  function toggleCart() {
      cartModal.classList.toggle('open');
      overlay.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
  }

  // Add item to cart with quantity and animation
  function addToCart(e) {
    const button = e.target.closest('.add-to-cart');
    if (!button) return;

    // Correctly find the parent card container for menu items
    const card = button.closest('.menu-item-card, .food-card, .offer-card');
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    const quantityInput = card.querySelector('.quantity-input');
    const quantity = parseInt(quantityInput.value);
      
      if (price === 0) {
          showNotification("This is a special offer that can't be added to cart directly. Please visit our cafe to avail this offer!");
          return;
      }

      // Create flying item animation
      const flyingItem = document.createElement('div');
      flyingItem.classList.add('item-flying');
      flyingItem.textContent = quantity;
      
      // Get positions for animation
      const buttonRect = button.getBoundingClientRect();
      const cartRect = document.querySelector('.cart-btn').getBoundingClientRect();
      
      // Calculate animation path
      const x = cartRect.left + cartRect.width/2 - (buttonRect.left + buttonRect.width/2);
      const y = cartRect.top + cartRect.height/2 - (buttonRect.top + buttonRect.height/2);
      
      flyingItem.style.setProperty('--x', `${x}px`);
      flyingItem.style.setProperty('--y', `${y}px`);
      flyingItem.style.left = `${buttonRect.left + buttonRect.width/2 - 20}px`;
      flyingItem.style.top = `${buttonRect.top - 20}px`;
      
      document.body.appendChild(flyingItem);
      
      // Remove the element after animation completes
      setTimeout(() => {
          flyingItem.remove();
      }, 800);

      // Check if item already in cart
      const existingItem = cart.find(item => item.name === name);
      
      if (existingItem) {
          existingItem.quantity += quantity;
      } else {
          cart.push({
              name,
              price,
              quantity
          });
      }
      
      updateCart();
      
      // Show cart briefly
      cartModal.classList.add('open');
      overlay.classList.add('active');
      setTimeout(() => {
          cartModal.classList.remove('open');
          overlay.classList.remove('active');
      }, 1500);
  }

  // Update cart UI
  function updateCart() {
      // Save cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Update cart count
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      cartCount.textContent = totalItems;
      
      // Clear cart items
      cartItemsContainer.innerHTML = '';
      
      // Add items to cart
      if (cart.length === 0) {
          cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
          cartTotal.textContent = 'Total: ₹0';
          return;
      }
      
      let total = 0;
      
      cart.forEach(item => {
          const cartItem = document.createElement('div');
          cartItem.classList.add('cart-item');
          
          const itemTotal = item.price * item.quantity;
          total += itemTotal;
          
          cartItem.innerHTML = `
              <div class="cart-item-info">
                  <div class="cart-item-name">${item.name}</div>
                  <div class="cart-item-price">₹${item.price} x ${item.quantity} = ₹${itemTotal}</div>
              </div>
              <div class="cart-item-actions">
                  <button class="remove-item" data-name="${item.name}">×</button>
              </div>
          `;
          
          cartItemsContainer.appendChild(cartItem);
      });
      
      // Update total
      cartTotal.textContent = `Total: ₹${total}`;
      
      // Add event listeners to remove buttons
      document.querySelectorAll('.remove-item').forEach(btn => {
          btn.addEventListener('click', removeFromCart);
      });
  }

  // Remove item from cart
  function removeFromCart(e) {
      const name = e.target.getAttribute('data-name');
      cart = cart.filter(item => item.name !== name);
      updateCart();
  }

  // Filter menu by category
  function filterMenu(e) {
      const category = e.target.getAttribute('data-category');
      
      // Update active button
      categoryBtns.forEach(btn => {
          btn.classList.remove('active');
      });
      e.target.classList.add('active');
      
      // Filter items
      let filteredItems;
      if (category === 'all') {
          filteredItems = menuItems;
      } else {
          filteredItems = menuItems.filter(item => item.category === category);
      }
      
      displayMenuItems(filteredItems);
  }

  // Display menu items
  function displayMenuItems(items) {
      menuItemsContainer.innerHTML = '';
      
      items.forEach(item => {
          const menuItem = document.createElement('div');
          menuItem.classList.add('menu-item-card');
          
          menuItem.innerHTML = `
              <img src="${item.image}" alt="${item.name}" class="menu-item-img">
              <div class="menu-item-info">
                  <h3>${item.name}</h3>
                  <p>₹${item.price}</p>
                  <div class="quantity-selector">
                      <button class="quantity-btn minus">-</button>
                      <input type="number" class="quantity-input" value="1" min="1" max="10">
                      <button class="quantity-btn plus">+</button>
                  </div>
                  <button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">
                      <span class="cart-icon">🛒</span>
                      Add to Cart
                  </button>
              </div>
          `;
          
          menuItemsContainer.appendChild(menuItem);
      });
      
      // Add event listeners to new add to cart buttons
      document.querySelectorAll('.menu-items .add-to-cart').forEach(btn => {
          btn.addEventListener('click', addToCart);
      });
      
      // Set up quantity selectors for new items
      setupQuantitySelectors();
  }

  // Checkout function
  function checkout() {
      if (cart.length === 0) {
          showNotification('Your cart is empty!');
          return;
      }
      
      showNotification(`Order placed! Total: ₹${cart.reduce((total, item) => total + (item.price * item.quantity), 0)}`);
      cart = [];
      updateCart();
      toggleCart();
  }

  // Testimonial slider functions
  function startTestimonialSlider() {
      testimonialInterval = setInterval(() => {
          currentTestimonial = (currentTestimonial + 1) % testimonials.length;
          showTestimonial(currentTestimonial);
      }, 5000);
  }

  function showTestimonial(index) {
      // Update current testimonial
      currentTestimonial = index;
      
      // Hide all testimonials
      testimonials.forEach(testimonial => {
          testimonial.classList.remove('active');
      });
      
      // Show selected testimonial
      testimonials[index].classList.add('active');
      
      // Update dots
      testimonialDots.forEach(dot => {
          dot.classList.remove('active');
      });
      testimonialDots[index].classList.add('active');
      
      // Reset interval
      clearInterval(testimonialInterval);
      testimonialInterval = setInterval(() => {
          currentTestimonial = (currentTestimonial + 1) % testimonials.length;
          showTestimonial(currentTestimonial);
      }, 5000);
  }

  // User functions
  function login(email) {
      // In a real app, you would verify credentials with a server
      currentUser = {
          email: email,
          name: email.split('@')[0],
          profilePic: `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk=${email}`
      };
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(currentUser));
      
      // Update UI
      updateUserUI();
      
      // Close login modal
      loginModal.classList.remove('active');
      overlay.classList.remove('active');
      
      // Clear form
      loginForm.reset();
      
      showNotification(`Welcome back, ${currentUser.name}!`);
  }

  function logout() {
      currentUser = null;
      localStorage.removeItem('user');
      updateUserUI();
      profileDropdown.classList.remove('active');
      showNotification('You have been logged out.');
  }

  function updateUserUI() {
      if (currentUser) {
          // User is logged in
          loginBtn.style.display = 'none';
          profilePic.src = currentUser.profilePic;
          profilePic.style.display = 'block';
          usernameEl.textContent = currentUser.name;
          usernameEl.style.display = 'block';
          dropdownUsername.textContent = currentUser.name;
      } else {
          // User is not logged in
          loginBtn.style.display = 'block';
          profilePic.style.display = 'none';
          usernameEl.style.display = 'none';
      }
  }

  // Show notification
  function showNotification(message) {
      const notification = document.createElement('div');
      notification.className = 'notification';
      notification.textContent = message;
      notification.style.position = 'fixed';
      notification.style.bottom = '20px';
      notification.style.right = '20px';
      notification.style.backgroundColor = 'var(--accent-red)';
      notification.style.color = 'white';
      notification.style.padding = '15px 25px';
      notification.style.borderRadius = '5px';
      notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
      notification.style.zIndex = '1002';
      notification.style.animation = 'fadeIn 0.3s ease';
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
          notification.style.animation = 'fadeIn 0.3s ease reverse';
          setTimeout(() => {
              notification.remove();
          }, 300);
      }, 3000);
  }

  // Initialize the page
  init();
  