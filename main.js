class LottoNumber extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.wrapper = document.createElement('div');

    const style = document.createElement('style');
    style.textContent = `
      div {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--white, #fff);
        background-color: var(--primary-color, #007bff);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(this.wrapper);
  }

  static get observedAttributes() {
    return ['number'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.wrapper.textContent = this.getAttribute('number') || '';
  }
}

customElements.define('lotto-number', LottoNumber);

const generateBtn = document.getElementById('generate-btn');
const numbersContainer = document.getElementById('numbers-container');
const themeToggle = document.getElementById('theme-toggle');

const setTheme = (theme) => {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  themeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  themeToggle.setAttribute(
    'aria-label',
    isDark ? 'Switch to light mode' : 'Switch to dark mode'
  );
  localStorage.setItem('theme', theme);
};

const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  setTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark');
});

generateBtn.addEventListener('click', () => {
  numbersContainer.innerHTML = '';
  const numbers = new Set();
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }

  for (const number of Array.from(numbers).sort((a, b) => a - b)) {
    const lottoNumber = document.createElement('lotto-number');
    lottoNumber.setAttribute('number', number);
    numbersContainer.appendChild(lottoNumber);
  }
});
