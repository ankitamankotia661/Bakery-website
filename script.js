// script.js
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ once: true, duration: 700 });

  const loader = document.getElementById('loader');
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 400);
  });

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    updateActiveNav();
  });

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active'));
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    let current = 'home';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.dataset.section === current) link.classList.add('active');
    });
  }

  const products = [
    { name: 'Chocolate Cake', price: '$6.99', rating: 4.5, desc: 'Rich Belgian layers.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop' },
    { name: 'Donut', price: '$2.99', rating: 4, desc: 'Glazed happiness.', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=400&auto=format&fit=crop' },
    { name: 'Cinnamon Roll', price: '$4.50', rating: 5, desc: 'Warm, spiced delight.', img: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=400&auto=format&fit=crop' },
    { name: 'Cappuccino', price: '$4.25', rating: 4.5, desc: 'Espresso & velvet foam.', img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=400&auto=format&fit=crop' },
    { name: 'Latte', price: '$4.75', rating: 4.5, desc: 'Smooth espresso with milk.', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=400&auto=format&fit=crop' }
  ];

  const productGrid = document.getElementById('productGrid');
  if (productGrid) {
    productGrid.innerHTML = products.map(p => `
      <div class="product-card" data-aos="fade-up">
        <div class="product-img"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
        <div class="product-info">
          <h3>${p.name}</h3>
          <span class="price">${p.price}</span>
          <div class="rating">${'<i class="fas fa-star"></i>'.repeat(Math.floor(p.rating))}${p.rating % 1 ? '<i class="fas fa-star-half-alt"></i>' : ''}</div>
          <p class="desc">${p.desc}</p>
          <button class="btn btn-outline">Order</button>
        </div>
      </div>
    `).join('');
  }

  const testimonials = [
    { name: 'Emily Rose', text: 'Best croissants in town! Lily is incredibly cozy.', img: 'https://randomuser.me/api/portraits/women/44.jpg', stars: 5 },
    { name: 'Mark Daniels', text: 'Their cappuccino is perfection. I come every morning.', img: 'https://randomuser.me/api/portraits/men/32.jpg', stars: 4 },
    { name: 'Sophie Lee', text: 'The chocolate cake melted my heart. Highly recommend!', img: 'https://randomuser.me/api/portraits/women/68.jpg', stars: 5 }
  ];
  const testimonialContainer = document.getElementById('testimonialContainer');
  if (testimonialContainer) {
    testimonialContainer.innerHTML = testimonials.map(t => `
      <div class="testimonial-card" data-aos="fade-up">
        <img src="${t.img}" alt="${t.name}" loading="lazy">
        <h4>${t.name}</h4>
        <div class="stars">${'<i class="fas fa-star"></i>'.repeat(t.stars)}</div>
        <p>“${t.text}”</p>
      </div>
    `).join('');
  }


  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    document.querySelectorAll('.error-message').forEach(s => s.textContent = '');

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const showErr = (id, msg) => {
      document.getElementById(id).parentElement.querySelector('.error-message').textContent = msg;
    };

    if (!name) { showErr('name', 'Name required'); valid = false; }
    if (!email) { showErr('email', 'Email required'); valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showErr('email', 'Invalid email'); valid = false; }
    if (!message) { showErr('message', 'Message required'); valid = false; }

    formFeedback.textContent = valid ? 'Thank you! Message sent.' : 'Please fix the errors above.';
    formFeedback.style.color = valid ? '#2d6a4f' : '#c0392b';
    if (valid) contactForm.reset();
  });
});
