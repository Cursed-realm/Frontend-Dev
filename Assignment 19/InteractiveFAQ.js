// InteractiveFAQ.js
// Implements an interactive FAQ section with behaviors:
// 1. Click question -> toggle answer visibility
// 2. Hover -> change question color
// 3. Double-click question -> collapse all answers
// 4. Focus on an answer input -> highlight parent question
// 5. Blur from input -> reset background color

(function () {
  'use strict';

  function createFAQItem(id, qText, aText, withInput = false) {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.dataset.faqId = id;

    const q = document.createElement('div');
    q.className = 'faq-question';
    q.tabIndex = 0; // make focusable
    q.textContent = qText;

    const a = document.createElement('div');
    a.className = 'faq-answer hidden';
    a.innerHTML = `<p class="answer-text">${aText}</p>`;

    if (withInput) {
      const input = document.createElement('input');
      input.className = 'answer-input';
      input.type = 'text';
      input.placeholder = 'Add a comment or follow-up question...';
      a.appendChild(input);

      // focus -> highlight parent question
      input.addEventListener('focus', function () {
        q.classList.add('focused');
      });
      input.addEventListener('blur', function () {
        q.classList.remove('focused');
      });
    }

    // Click toggles answer
    q.addEventListener('click', function () {
      a.classList.toggle('hidden');
      q.classList.toggle('open');
    });

    // Key support: Enter or Space toggles
    q.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        q.click();
      }
    });

    // Hover color handled by CSS :hover, but add pointer cursor
    q.addEventListener('mouseenter', function () {
      q.classList.add('hovered');
    });
    q.addEventListener('mouseleave', function () {
      q.classList.remove('hovered');
    });

    // Double-click collapses all answers
    q.addEventListener('dblclick', function () {
      collapseAllAnswers();
    });

    item.appendChild(q);
    item.appendChild(a);
    return item;
  }

  function collapseAllAnswers() {
    const answers = document.querySelectorAll('.faq-answer');
    const questions = document.querySelectorAll('.faq-question');
    answers.forEach(ans => ans.classList.add('hidden'));
    questions.forEach(q => q.classList.remove('open'));
  }

  function addStyles() {
    if (document.getElementById('interactive-faq-styles')) return;
    const s = document.createElement('style');
    s.id = 'interactive-faq-styles';
    s.textContent = `
      .faq-wrapper{max-width:900px;margin:28px auto;padding:18px;background:#fff;border-radius:12px;box-shadow:0 10px 30px rgba(10,10,20,0.06)}
      .faq-item{border-bottom:1px solid #f0f2f7;padding:14px 12px}
      .faq-item:last-child{border-bottom:0}
      .faq-question{font-weight:700;font-size:1.05rem;color:#1f2937;cursor:pointer;outline:none;padding:6px;border-radius:8px;transition:background .18s, color .18s, transform .12s}
      .faq-question.hovered{color:#0f62fe}
      .faq-question.open{color:#0f62fe}
      .faq-question.focused{background:linear-gradient(90deg,rgba(15,98,254,0.06),transparent);}
      .faq-answer{margin-top:10px;color:#374151;transition:all .22s ease}
      .hidden{display:none}
      .answer-text{margin:0 0 8px 0}
      .answer-input{width:100%;padding:10px;border-radius:8px;border:1px solid #e5e7eb}
      @media (max-width:600px){.faq-wrapper{padding:12px}}
    `;
    document.head.appendChild(s);
  }

  function initFAQ(selector) {
    addStyles();
    const root = document.querySelector(selector) || document.getElementById('faq-root');
    if (!root) return;
    root.classList.add('faq-wrapper');

    const faqData = [
      { id: 1, q: 'What is your return policy?', a: 'You can return any unused product within 30 days for a full refund.', input: true },
      { id: 2, q: 'How long does shipping take?', a: 'Shipping usually takes 3-5 business days depending on your location.' },
      { id: 3, q: 'Do you offer international shipping?', a: 'Yes, we ship to most countries. International delivery times vary.', input: true },
      { id: 4, q: 'How can I track my order?', a: 'After your order ships we will provide a tracking number via email.' },
      { id: 5, q: 'Can I change my order after placing it?', a: 'Contact support within 2 hours and we will try to accommodate changes.' }
    ];

    faqData.forEach(item => {
      const el = createFAQItem(item.id, item.q, item.a, !!item.input);
      root.appendChild(el);
    });

    // Double-click on wrapper background also collapses all
    root.addEventListener('dblclick', function (e) {
      if (e.target === root) collapseAllAnswers();
    });
  }

  // Auto-init if element exists
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initFAQ('#faq-root');
    });
  } else {
    initFAQ('#faq-root');
  }

  // Expose helpers for console/testing
  window.InteractiveFAQ = { initFAQ, collapseAllAnswers };

})();
