// Calculator Registry
const calculators = [
  {
    id: 'stock-dividend',
    title: '주식 배당금 계산기',
    description: '배당금 수익과 세금(15.4%)을 제외한 실수령액을 계산합니다.',
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
      <div class="input-group">
        <label>총 보유 주식 수 (주)</label>
        <input type="number" id="shares" placeholder="예: 100">
      </div>
      <div class="input-group">
        <label>주당 배당금 (원)</label>
        <input type="number" id="dividend-per-share" placeholder="예: 2500">
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
          <h4>계산 결과</h4>
          <div class="result-item"><span class="result-label">세전 총 배당금</span><span class="result-value">${total.toLocaleString()}원</span></div>
          <div class="result-item"><span class="result-label">배당소득세 (15.4%)</span><span class="result-value">${Math.floor(tax).toLocaleString()}원</span></div>
          <div class="result-item"><span class="result-label">실수령액</span><span class="result-value" style="color: #2563eb;">${Math.floor(net).toLocaleString()}원</span></div>
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
    icon: 'wallet',
    render: () => `
      <div class="calc-header">
        <h2>연봉/실수령액 계산기</h2>
        <p>각종 공제액을 제외한 실제 통장에 찍히는 금액을 확인하세요.</p>
      </div>
      <div class="calc-guide">
        <strong>도움말:</strong> 국민연금(4.75%), 건강보험(3.595%), 고용보험(0.9%) 등이 반영된 2026년 기준 추정치입니다.
      </div>
      <div class="input-group">
        <label>연봉 (만원)</label>
        <input type="number" id="annual-salary" placeholder="예: 4500">
      </div>
      <div class="input-group">
        <label>비과세액 (원/월)</label>
        <input type="number" id="non-taxable" value="200000">
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
          <h4>월 실수령액 상세</h4>
          <div class="result-item"><span class="result-label">월 급여(세전)</span><span class="result-value">${Math.floor(annual/12).toLocaleString()}원</span></div>
          <div class="result-item"><span class="result-label">공제액 합계</span><span class="result-value">-${Math.floor(totalDeductions).toLocaleString()}원</span></div>
          <div class="result-item"><span class="result-label">월 실수령액</span><span class="result-value" style="color: #10b981;">${Math.floor(monthlyNet).toLocaleString()}원</span></div>
        `;
        resultDiv.classList.remove('hidden');
      });
    }
  },
  {
    id: 'hourly-to-monthly',
    title: '시급 ↔ 월급 변환기',
    description: '시급을 월급으로, 월급을 시급으로 근로기준법 기준으로 변환합니다.',
    category: 'business',
    icon: 'clock',
    render: () => `
      <div class="calc-header">
        <h2>시급 ↔ 월급 변환기</h2>
        <p>주휴수당을 포함한 정확한 급여 변환을 도와드립니다.</p>
      </div>
      <div class="calc-guide">
        <strong>근로기준법 기준:</strong> 주 40시간 근무 시 유급 주휴시간을 포함하여 한 달 평균 209시간을 기준으로 계산합니다. (2026년 최저임금: 10,320원)
      </div>
      <div class="input-group">
        <label>시급 (원)</label>
        <input type="number" id="hourly-wage" placeholder="예: 10320">
      </div>
      <div class="input-group">
        <label>월 근무 시간 (시간, 기본 209)</label>
        <input type="number" id="working-hours" value="209">
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
          <h4>변환 결과</h4>
          <div class="result-item"><span class="result-label">예상 월급 (세전)</span><span class="result-value">${Math.floor(monthly).toLocaleString()}원</span></div>
          <p style="font-size: 0.8rem; color: #64748b; margin-top: 1rem;">* 주휴수당이 포함된 월 209시간 기준입니다.</p>
        `;
        resultDiv.classList.remove('hidden');
      });
    }
  },
  {
    id: 'mortgage-calc',
    title: '대출 이자/상환 계산기',
    description: '원리금 균등 상환 방식으로 대출 이자와 월 상환액을 계산합니다.',
    category: 'finance',
    icon: 'home',
    render: () => `
      <div class="calc-header">
        <h2>대출 이자/상환 계산기</h2>
        <p>대출금액과 금리에 따른 월 상환 부담액을 확인하세요.</p>
      </div>
      <div class="calc-guide">
        <strong>원리금균등상환:</strong> 매달 원금과 이자의 합계액을 일정하게 상환하는 방식입니다.
      </div>
      <div class="input-group">
        <label>대출 금액 (원)</label>
        <input type="number" id="loan-amount" placeholder="예: 100000000">
      </div>
      <div class="input-group">
        <label>연 이자율 (%)</label>
        <input type="number" id="loan-rate" placeholder="예: 4.5">
      </div>
      <div class="input-group">
        <label>대출 기간 (개월)</label>
        <input type="number" id="loan-months" placeholder="예: 24">
      </div>
      <button class="btn-calculate" id="calc-loan">계산하기</button>
      <div id="result" class="result-area hidden"></div>
    `,
    init: () => {
      document.getElementById('calc-loan').addEventListener('click', () => {
        const principal = parseFloat(document.getElementById('loan-amount').value) || 0;
        const annualRate = parseFloat(document.getElementById('loan-rate').value) || 0;
        const months = parseFloat(document.getElementById('loan-months').value) || 1;
        
        const monthlyRate = annualRate / 100 / 12;
        const x = Math.pow(1 + monthlyRate, months);
        const monthlyPayment = (principal * x * monthlyRate) / (x - 1);
        const totalPayment = monthlyPayment * months;
        const totalInterest = totalPayment - principal;

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
          <h4>상환 상세</h4>
          <div class="result-item"><span class="result-label">월 상환액</span><span class="result-value">${Math.floor(monthlyPayment).toLocaleString()}원</span></div>
          <div class="result-item"><span class="result-label">총 이자액</span><span class="result-value">${Math.floor(totalInterest).toLocaleString()}원</span></div>
          <div class="result-item"><span class="result-label">총 상환금액</span><span class="result-value">${Math.floor(totalPayment).toLocaleString()}원</span></div>
        `;
        resultDiv.classList.remove('hidden');
      });
    }
  },
  {
    id: 'fuel-cost-calc',
    title: '유류비 계산기',
    description: '주행 거리와 연비를 바탕으로 예상 유류비를 계산합니다.',
    category: 'life',
    icon: 'fuel',
    render: () => `
      <div class="calc-header">
        <h2>유류비 계산기</h2>
        <p>이동 거리에 따른 유류비를 미리 계산하여 여행 계획을 세워보세요.</p>
      </div>
      <div class="input-group">
        <label>주행 거리 (km)</label>
        <input type="number" id="distance" placeholder="예: 100">
      </div>
      <div class="input-group">
        <label>차량 연비 (km/L)</label>
        <input type="number" id="efficiency" placeholder="예: 12.5">
      </div>
      <div class="input-group">
        <label>연료 가격 (원/L)</label>
        <input type="number" id="fuel-price" value="1700">
      </div>
      <button class="btn-calculate" id="calc-fuel">계산하기</button>
      <div id="result" class="result-area hidden"></div>
    `,
    init: () => {
      document.getElementById('calc-fuel').addEventListener('click', () => {
        const dist = parseFloat(document.getElementById('distance').value) || 0;
        const eff = parseFloat(document.getElementById('efficiency').value) || 1;
        const price = parseFloat(document.getElementById('fuel-price').value) || 0;
        
        const cost = (dist / eff) * price;

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
          <h4>유류비 결과</h4>
          <div class="result-item"><span class="result-label">필요 연료량</span><span class="result-value">${(dist/eff).toFixed(2)} L</span></div>
          <div class="result-item"><span class="result-label">예상 유류비</span><span class="result-value">${Math.floor(cost).toLocaleString()}원</span></div>
        `;
        resultDiv.classList.remove('hidden');
      });
    }
  },
  {
    id: 'percent-calc',
    title: '퍼센트/증감율 계산기',
    description: '비즈니스 보고서에 필수적인 증감율 및 퍼센트 계산을 지원합니다.',
    category: 'business',
    icon: 'percent',
    render: () => `
      <div class="calc-header">
        <h2>퍼센트/증감율 계산기</h2>
      </div>
      <div class="input-group">
        <label>기준 값 (A)</label>
        <input type="number" id="base-val" placeholder="기존 값">
      </div>
      <div class="input-group">
        <label>변경 값 (B)</label>
        <input type="number" id="change-val" placeholder="현재 값">
      </div>
      <button class="btn-calculate" id="calc-percent">증감율 확인</button>
      <div id="result" class="result-area hidden"></div>
    `,
    init: () => {
      document.getElementById('calc-percent').addEventListener('click', () => {
        const a = parseFloat(document.getElementById('base-val').value) || 0;
        const b = parseFloat(document.getElementById('change-val').value) || 0;
        if(a === 0) return;
        
        const rate = ((b - a) / a) * 100;
        const sign = rate >= 0 ? '+' : '';

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
          <h4>변동 결과</h4>
          <div class="result-item"><span class="result-label">차이</span><span class="result-value">${(b-a).toLocaleString()}</span></div>
          <div class="result-item"><span class="result-label">증감율</span><span class="result-value" style="color: ${rate >= 0 ? '#ef4444' : '#3b82f6'};">${sign}${rate.toFixed(2)}%</span></div>
        `;
        resultDiv.classList.remove('hidden');
      });
    }
  },
  {
    id: 'bmi-calc',
    title: 'BMI 비만도 계산기',
    description: '키와 몸무게를 통해 건강 상태를 체크합니다.',
    category: 'health',
    icon: 'activity',
    render: () => `
      <div class="calc-header">
        <h2>BMI 비만도 계산기</h2>
      </div>
      <div class="input-group">
        <label>키 (cm)</label>
        <input type="number" id="height" placeholder="예: 175">
      </div>
      <div class="input-group">
        <label>몸무게 (kg)</label>
        <input type="number" id="weight" placeholder="예: 70">
      </div>
      <button class="btn-calculate" id="calc-bmi">계산하기</button>
      <div id="result" class="result-area hidden"></div>
    `,
    init: () => {
      document.getElementById('calc-bmi').addEventListener('click', () => {
        const h = parseFloat(document.getElementById('height').value) / 100;
        const w = parseFloat(document.getElementById('weight').value);
        if(!h || !w) return;
        
        const bmi = w / (h * h);
        let status = '';
        let color = '';
        if(bmi < 18.5) { status = '저체중'; color = '#3b82f6'; }
        else if(bmi < 23) { status = '정상'; color = '#10b981'; }
        else if(bmi < 25) { status = '과체중'; color = '#f59e0b'; }
        else { status = '비만'; color = '#ef4444'; }

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
          <h4>건강 진단 결과</h4>
          <div class="result-item"><span class="result-label">나의 BMI</span><span class="result-value">${bmi.toFixed(2)}</span></div>
          <div class="result-item"><span class="result-label">상태</span><span class="result-value" style="color: ${color};">${status}</span></div>
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
  
  // Refresh Lucide icons
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
  window.scrollTo(0, 0);
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

// Logo Click
logo.addEventListener('click', resetView);

// Back to list
backBtn.addEventListener('click', () => {
  activeView.classList.add('hidden');
  gridContainer.classList.remove('hidden');
  window.scrollTo(0, 0);
});

// Search
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderGrid();
});

// Category Filter
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
