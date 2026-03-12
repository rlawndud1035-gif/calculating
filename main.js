// Calculator Registry
const calculators = [
  {
    id: 'stock-dividend',
    title: '주식 배당금 계산기',
    description: '배당 수익과 세금을 제외한 실수령액을 즉시 계산합니다.',
    category: 'finance',
    icon: 'trending-up',
    render: () => `
      <div class="calc-header">
        <h2>주식 배당금 계산기</h2>
        <p>투자하신 주식의 배당금 수익과 세금을 간편하게 확인하세요.</p>
      </div>
      <div class="calc-guide">
        <strong>도움말:</strong> 한국의 배당소득세율은 15.4%(지방소득세 포함)입니다. 연간 금융소득이 2,000만원을 초과할 경우 금융소득종합과세 대상이 될 수 있습니다.
      </div>
      <div class="input-grid">
        <div class="input-group">
          <label>총 보유 주식 수 (주)</label>
          <input type="number" id="shares" placeholder="예: 100" min="0">
        </div>
        <div class="input-group">
          <label>주당 배당금 (원)</label>
          <input type="number" id="dividend-per-share" placeholder="예: 2500" min="0">
        </div>
      </div>
      <button class="btn-calculate" id="calc-dividend">계산하기</button>
      <div id="result" class="result-area hidden"></div>
    `,
    init: () => {
      document.getElementById('calc-dividend').addEventListener('click', () => {
        const shares = parseFloat(document.getElementById('shares').value) || 0;
        const dps = parseFloat(document.getElementById('dividend-per-share').value) || 0;
        const total = shares * dps;
        const tax = total * 0.154;
        const net = total - tax;
        
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
          <h4>분석 결과</h4>
          <div class="result-item"><span class="result-label">세전 총 배당금</span><span class="result-value">${total.toLocaleString()}원</span></div>
          <div class="result-item"><span class="result-label">배당소득세 (15.4%)</span><span class="result-value" style="color: #ef4444;">-${Math.floor(tax).toLocaleString()}원</span></div>
          <div class="result-item" style="border-top: 2px solid #bae6fd; margin-top: 1rem; padding-top: 1.5rem;">
            <span class="result-label" style="font-weight: 700; color: #0369a1;">예상 실수령액</span>
            <span class="result-value" style="font-size: 1.75rem; color: #2563eb;">${Math.floor(net).toLocaleString()}원</span>
          </div>
        `;
        resultDiv.classList.remove('hidden');
      });
    }
  },
  {
    id: 'salary-calc',
    title: '연봉/실수령액 계산기',
    description: '4대 보험과 세금을 제외한 실제 월 수령액을 정교하게 계산합니다.',
    category: 'tax',
    icon: 'banknote',
    render: () => `
      <div class="calc-header">
        <h2>연봉/실수령액 계산기</h2>
        <p>각종 공제액을 제외한 실제 통장에 찍히는 금액을 확인하세요.</p>
      </div>
      <div class="calc-guide">
        <strong>2026년 기준:</strong> 국민연금(4.75%), 건강보험(3.595%), 고용보험(0.9%) 등이 반영된 추정치입니다.
      </div>
      <div class="input-grid">
        <div class="input-group">
          <label>연봉 (만원)</label>
          <input type="number" id="annual-salary" placeholder="예: 4500" min="0">
        </div>
        <div class="input-group">
          <label>비과세액 (원/월)</label>
          <input type="number" id="non-taxable" value="200000" min="0">
        </div>
      </div>
      <button class="btn-calculate" id="calc-salary">계산하기</button>
      <div id="result" class="result-area hidden"></div>
    `,
    init: () => {
      document.getElementById('calc-salary').addEventListener('click', () => {
        const annual = (parseFloat(document.getElementById('annual-salary').value) || 0) * 10000;
        const nonTaxable = parseFloat(document.getElementById('non-taxable').value) || 0;
        const monthlyBase = (annual / 12) - nonTaxable;
        
        const nationalPension = Math.min(monthlyBase * 0.0475, 302575); 
        const healthInsurance = monthlyBase * 0.03595;
        const longTermCare = healthInsurance * 0.1314;
        const employmentInsurance = monthlyBase * 0.009;
        const incomeTax = monthlyBase * 0.035; 
        const localIncomeTax = incomeTax * 0.1;
        
        const totalDeductions = nationalPension + healthInsurance + longTermCare + employmentInsurance + incomeTax + localIncomeTax;
        const monthlyNet = (annual / 12) - totalDeductions;

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
          <h4>상세 공제 내역</h4>
          <div class="result-item"><span class="result-label">월 급여(세전)</span><span class="result-value" style="font-size: 1.1rem; color: #1e293b;">${Math.floor(annual/12).toLocaleString()}원</span></div>
          <div class="result-item"><span class="result-label">공제액 합계</span><span class="result-value" style="color: #ef4444;">-${Math.floor(totalDeductions).toLocaleString()}원</span></div>
          <div class="result-item" style="border-top: 2px solid #bae6fd; margin-top: 1rem; padding-top: 1.5rem;">
            <span class="result-label" style="font-weight: 700; color: #0369a1;">월 예상 실수령액</span>
            <span class="result-value" style="font-size: 1.75rem; color: #10b981;">${Math.floor(monthlyNet).toLocaleString()}원</span>
          </div>
        `;
        resultDiv.classList.remove('hidden');
      });
    }
  },
  {
    id: 'hourly-to-monthly',
    title: '시급 ↔ 월급 변환기',
    description: '근로기준법에 따른 주휴수당 포함 급여를 변환합니다.',
    category: 'business',
    icon: 'clock',
    render: () => `
      <div class="calc-header">
        <h2>시급 ↔ 월급 변환기</h2>
        <p>주휴수당을 포함한 정확한 급여 변환을 도와드립니다.</p>
      </div>
      <div class="calc-guide">
        <strong>2026년 최저임금:</strong> 10,320원 (주 40시간 근무 시 유급 주휴시간 포함 월 209시간 기준)
      </div>
      <div class="input-grid">
        <div class="input-group">
          <label>시급 (원)</label>
          <input type="number" id="hourly-wage" placeholder="예: 10320" min="0">
        </div>
        <div class="input-group">
          <label>월 근무 시간 (기본 209)</label>
          <input type="number" id="working-hours" value="209" min="0">
        </div>
      </div>
      <button class="btn-calculate" id="calc-wage-monthly">월급으로 변환</button>
      <div id="result" class="result-area hidden"></div>
    `,
    init: () => {
      document.getElementById('calc-wage-monthly').addEventListener('click', () => {
        const hourly = parseFloat(document.getElementById('hourly-wage').value) || 0;
        const hours = parseFloat(document.getElementById('working-hours').value) || 209;
        const monthly = hourly * hours;

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
          <h4>급여 변환 결과</h4>
          <div class="result-item"><span class="result-label">예상 월급 (세전)</span><span class="result-value" style="font-size: 1.75rem;">${Math.floor(monthly).toLocaleString()}원</span></div>
          <p style="font-size: 0.85rem; color: #64748b; margin-top: 1rem; text-align: center;">* 입력하신 ${hours}시간을 기준으로 계산되었습니다.</p>
        `;
        resultDiv.classList.remove('hidden');
      });
    }
  }
];

// App State
let currentCategory = 'all';
let searchQuery = '';

// DOM Elements
const logo = document.getElementById('logo');
const grid = document.getElementById('calculator-grid');
const gridContainer = document.getElementById('calculator-grid-container');
const activeView = document.getElementById('active-calculator');
const calcContainer = document.getElementById('calculator-container');
const backBtn = document.getElementById('back-to-list');
const searchInput = document.getElementById('search-input');
const categoryItems = document.querySelectorAll('.category-item');

// Render Grid
function renderGrid() {
  grid.innerHTML = '';
  const filtered = calculators.filter(c => {
    const matchesCategory = currentCategory === 'all' || c.category === currentCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  filtered.forEach(calc => {
    const card = document.createElement('div');
    card.className = 'calc-card';
    card.innerHTML = `
      <div class="icon-box">
        <i data-lucide="${calc.icon || 'calculator'}"></i>
      </div>
      <h3>${calc.title}</h3>
      <p>${calc.description}</p>
    `;
    card.addEventListener('click', () => showCalculator(calc));
    grid.appendChild(card);
  });
  
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Show Calculator
function showCalculator(calc) {
  gridContainer.classList.add('hidden');
  activeView.classList.remove('hidden');
  calcContainer.innerHTML = calc.render();
  calc.init();
  if (window.lucide) {
    window.lucide.createIcons();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Reset View (Home)
function resetView() {
  activeView.classList.add('hidden');
  gridContainer.classList.remove('hidden');
  currentCategory = 'all';
  searchQuery = '';
  searchInput.value = '';
  categoryItems.forEach(i => {
    i.classList.remove('active');
    if(i.dataset.category === 'all') i.classList.add('active');
  });
  renderGrid();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

logo.addEventListener('click', resetView);

backBtn.addEventListener('click', () => {
  activeView.classList.add('hidden');
  gridContainer.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderGrid();
});

categoryItems.forEach(item => {
  item.addEventListener('click', () => {
    activeView.classList.add('hidden');
    gridContainer.classList.remove('hidden');
    categoryItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    currentCategory = item.dataset.category;
    renderGrid();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Init
renderGrid();
