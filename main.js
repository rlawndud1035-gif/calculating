// Calculator Registry
const calculators = [
  {
    id: 'standard-calc',
    url: '/standard-calculator.html',
    title: '표준 계산기',
    description: '사칙연산(+, -, *, /)을 지원하는 기본 사무용 계산기입니다.',
    category: 'business',
    icon: 'calculator',
    render: () => `
      <div class="calc-header">
        <h2>표준 계산기</h2>
      </div>
      <div class="standard-calc-ui">
        <input type="text" id="calc-display" readonly value="0">
        <div class="calc-buttons">
          <button class="btn-op" data-val="C">C</button>
          <button class="btn-op" data-val="back">←</button>
          <button class="btn-op" data-val="/">/</button>
          <button class="btn-op" data-val="*">*</button>
          <button data-val="7">7</button>
          <button data-val="8">8</button>
          <button data-val="9">9</button>
          <button class="btn-op" data-val="-">-</button>
          <button data-val="4">4</button>
          <button data-val="5">5</button>
          <button data-val="6">6</button>
          <button class="btn-op" data-val="+">+</button>
          <button data-val="1">1</button>
          <button data-val="2">2</button>
          <button data-val="3">3</button>
          <button class="btn-equal" id="calc-equal">=</button>
          <button data-val="0" style="grid-column: span 2;">0</button>
          <button data-val=".">.</button>
        </div>
      </div>
    `,
    init: () => {
      const display = document.getElementById('calc-display');
      const buttons = document.querySelectorAll('.calc-buttons button');
      let currentInput = '0';
      
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const val = btn.dataset.val;
          if (val === 'C') {
            currentInput = '0';
          } else if (val === 'back') {
            currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
          } else if (val === '=') {
            try {
              currentInput = eval(currentInput).toString();
            } catch {
              currentInput = 'Error';
            }
          } else {
            if (currentInput === '0' && !isNaN(val)) {
              currentInput = val;
            } else {
              currentInput += val;
            }
          }
          display.value = currentInput;
        });
      });
    }
  },
  {
    id: 'vat-calc',
    url: '/vat-calculator.html',
    title: '부가세 계산기',
    description: '공급가액 또는 합계금액을 기준으로 부가세(10%)를 계산합니다.',
    category: 'business',
    icon: 'percent',
    render: () => `
      <div class="calc-header">
        <h2>부가세 계산기</h2>
      </div>
      <div class="input-group">
        <label>기준 금액 (원)</label>
        <input type="number" id="vat-amount" placeholder="금액 입력">
      </div>
      <div class="input-group">
        <label>계산 방식</label>
        <select id="vat-type">
          <option value="supply">공급가액 기준 (세금 별도)</option>
          <option value="total">합계금액 기준 (세금 포함)</option>
        </select>
      </div>
      <button class="btn-calculate" id="calc-vat">계산하기</button>
      <div id="result" class="result-area hidden"></div>
    `,
    init: () => {
      document.getElementById('calc-vat').addEventListener('click', () => {
        const amount = parseFloat(document.getElementById('vat-amount').value) || 0;
        const type = document.getElementById('vat-type').value;
        let supply, vat, total;

        if (type === 'supply') {
          supply = amount;
          vat = amount * 0.1;
          total = supply + vat;
        } else {
          total = amount;
          supply = amount / 1.1;
          vat = total - supply;
        }

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
          <h4>부가세 계산 결과</h4>
          <div class="result-item"><span class="result-label">공급가액</span><span class="result-value">${Math.floor(supply).toLocaleString()}원</span></div>
          <div class="result-item"><span class="result-label">부가세 (10%)</span><span class="result-value">${Math.floor(vat).toLocaleString()}원</span></div>
          <div class="result-item"><span class="result-label">합계금액</span><span class="result-value" style="color: #2563eb;">${Math.floor(total).toLocaleString()}원</span></div>
        `;
        resultDiv.classList.remove('hidden');
      });
    }
  },
  {
    id: 'pyeong-calc',
    url: '/pyeong-to-m2-calculator.html',
    title: '평수 ↔ 제곱미터 변환기',
    description: '아파트 평수와 제곱미터(㎡)를 상호 변환합니다.',
    category: 'finance',
    icon: 'home',
    render: () => `
      <div class="calc-header">
        <h2>평수 ↔ 제곱미터 변환기</h2>
      </div>
      <div class="input-group">
        <label>평수 (평)</label>
        <input type="number" id="val-pyeong" placeholder="예: 34">
      </div>
      <div class="input-group">
        <label>제곱미터 (㎡)</label>
        <input type="number" id="val-m2" placeholder="예: 112">
      </div>
      <div class="calc-guide">
        <strong>정보:</strong> 1평 = 3.305785㎡ / 1㎡ = 0.3025평
      </div>
    `,
    init: () => {
      const pInput = document.getElementById('val-pyeong');
      const mInput = document.getElementById('val-m2');
      
      pInput.addEventListener('input', () => {
        const val = parseFloat(pInput.value) || 0;
        mInput.value = (val * 3.305785).toFixed(2);
      });
      
      mInput.addEventListener('input', () => {
        const val = parseFloat(mInput.value) || 0;
        pInput.value = (val * 0.3025).toFixed(2);
      });
    }
  },
  {
    id: 'savings-calc',
    url: '/interest-calculator.html',
    title: '예적금 이자 계산기',
    description: '단리/복리 이자와 세후 실수령액을 계산합니다.',
    category: 'finance',
    icon: 'banknote',
    render: () => `
      <div class="calc-header">
        <h2>예적금 이자 계산기</h2>
      </div>
      <div class="input-group">
        <label>예치 금액 (원)</label>
        <input type="number" id="save-principal" placeholder="예: 10000000">
      </div>
      <div class="input-group">
        <label>연 이자율 (%)</label>
        <input type="number" id="save-rate" placeholder="예: 4.0">
      </div>
      <div class="input-group">
        <label>예치 기간 (개월)</label>
        <input type="number" id="save-period" placeholder="예: 12">
      </div>
      <div class="input-group">
        <label>이자 방식</label>
        <select id="interest-type">
          <option value="simple">단리</option>
          <option value="compound">월 복리</option>
        </select>
      </div>
      <button class="btn-calculate" id="calc-savings">이자 계산하기</button>
      <div id="result" class="result-area hidden"></div>
    `,
    init: () => {
      document.getElementById('calc-savings').addEventListener('click', () => {
        const principal = parseFloat(document.getElementById('save-principal').value) || 0;
        const rate = parseFloat(document.getElementById('save-rate').value) / 100 || 0;
        const period = parseFloat(document.getElementById('save-period').value) || 0;
        const type = document.getElementById('interest-type').value;

        let interest = 0;
        if (type === 'simple') {
          interest = principal * rate * (period / 12);
        } else {
          interest = principal * (Math.pow(1 + rate / 12, period) - 1);
        }

        const tax = interest * 0.154; // 일반과세 15.4%
        const net = principal + interest - tax;

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
          <h4>만기 수령액 상세</h4>
          <div class="result-item"><span class="result-label">세전 이자</span><span class="result-value">${Math.floor(interest).toLocaleString()}원</span></div>
          <div class="result-item"><span class="result-label">이자소득세 (15.4%)</span><span class="result-value">-${Math.floor(tax).toLocaleString()}원</span></div>
          <div class="result-item"><span class="result-label">만기 실수령액</span><span class="result-value" style="color: #10b981;">${Math.floor(net).toLocaleString()}원</span></div>
        `;
        resultDiv.classList.remove('hidden');
      });
    }
  },
  {
    id: 'split-bill-calc',
    url: '/split-bill-calculator.html',
    title: '더치페이/팁 계산기',
    description: '식사 비용을 인원수대로 정확하게 나눕니다.',
    category: 'life',
    icon: 'users',
    render: () => `
      <div class="calc-header">
        <h2>더치페이/팁 계산기</h2>
      </div>
      <div class="input-group">
        <label>총 결제 금액 (원)</label>
        <input type="number" id="total-bill" placeholder="예: 85000">
      </div>
      <div class="input-group">
        <label>인원 수 (명)</label>
        <input type="number" id="split-count" placeholder="예: 4">
      </div>
      <div class="input-group">
        <label>추가 팁 (원, 옵션)</label>
        <input type="number" id="tip-amount" value="0">
      </div>
      <button class="btn-calculate" id="calc-split">나누기</button>
      <div id="result" class="result-area hidden"></div>
    `,
    init: () => {
      document.getElementById('calc-split').addEventListener('click', () => {
        const total = parseFloat(document.getElementById('total-bill').value) || 0;
        const people = parseFloat(document.getElementById('split-count').value) || 1;
        const tip = parseFloat(document.getElementById('tip-amount').value) || 0;
        
        const perPerson = (total + tip) / people;

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
          <h4>더치페이 결과</h4>
          <div class="result-item"><span class="result-label">총 합계액</span><span class="result-value">${(total + tip).toLocaleString()}원</span></div>
          <div class="result-item"><span class="result-label">1인당 금액</span><span class="result-value" style="color: #f59e0b;">${Math.ceil(perPerson / 10) * 10}원</span></div>
          <p style="font-size: 0.8rem; color: #64748b; margin-top: 1rem;">* 10원 단위 절상(올림)된 금액입니다.</p>
        `;
        resultDiv.classList.remove('hidden');
      });
    }
  },
  {
    id: 'discount-calc',
    url: '/discount-calculator.html',
    title: '할인율 계산기',
    description: '원가와 할인율을 기반으로 최종 가격을 계산합니다.',
    category: 'life',
    icon: 'shopping-tag',
    render: () => `
      <div class="calc-header">
        <h2>할인율 계산기</h2>
      </div>
      <div class="input-group">
        <label>정가 (원)</label>
        <input type="number" id="original-price" placeholder="예: 50000">
      </div>
      <div class="input-group">
        <label>할인율 (%)</label>
        <input type="number" id="discount-rate" placeholder="예: 20">
      </div>
      <button class="btn-calculate" id="calc-discount">할인액 확인</button>
      <div id="result" class="result-area hidden"></div>
    `,
    init: () => {
      document.getElementById('calc-discount').addEventListener('click', () => {
        const price = parseFloat(document.getElementById('original-price').value) || 0;
        const rate = parseFloat(document.getElementById('discount-rate').value) || 0;
        
        const discountAmount = price * (rate / 100);
        const finalPrice = price - discountAmount;

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
          <h4>할인 정보</h4>
          <div class="result-item"><span class="result-label">할인 금액</span><span class="result-value">-${discountAmount.toLocaleString()}원</span></div>
          <div class="result-item"><span class="result-label">최종 결제액</span><span class="result-value" style="color: #ef4444;">${finalPrice.toLocaleString()}원</span></div>
        `;
        resultDiv.classList.remove('hidden');
      });
    }
  },
  {
    id: 'water-calc',
    url: '/water-intake-calculator.html',
    title: '하루 물 권장량 계산기',
    description: '체격 조건에 맞는 일일 수분 섭취량을 계산합니다.',
    category: 'health',
    icon: 'droplets',
    render: () => `
      <div class="calc-header">
        <h2>물 권장량 계산기</h2>
      </div>
      <div class="input-group">
        <label>체중 (kg)</label>
        <input type="number" id="water-weight" placeholder="예: 70">
      </div>
      <button class="btn-calculate" id="calc-water">권장량 확인</button>
      <div id="result" class="result-area hidden"></div>
    `,
    init: () => {
      document.getElementById('calc-water').addEventListener('click', () => {
        const weight = parseFloat(document.getElementById('water-weight').value) || 0;
        const amount = weight * 0.033; // 체중 1kg당 33ml

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
          <h4>권장 섭취량</h4>
          <div class="result-item"><span class="result-label">하루 권장량</span><span class="result-value" style="color: #3b82f6;">${amount.toFixed(2)} L</span></div>
          <p style="font-size: 0.85rem; color: #64748b; margin-top: 1rem;">* 일반적인 성인 기준이며 활동량에 따라 다를 수 있습니다.</p>
        `;
        resultDiv.classList.remove('hidden');
      });
    }
  },
  {
    id: 'stock-dividend',
    url: '/stock-dividend-calculator.html',
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
    url: '/salary-calculator.html',
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
    url: '/hourly-wage-calculator.html',
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
    url: '/loan-calculator.html',
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
    url: '/fuel-cost-calculator.html',
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
    url: '/percent-calculator.html',
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
    url: '/bmi-calculator.html',
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
  },
  {
    id: 'currency-calc',
    url: '/currency-calculator.html',
    title: '환율 계산기',
    description: '주요 국가의 환율을 바탕으로 한화 환산 금액을 계산합니다.',
    category: 'finance',
    icon: 'globe',
    render: () => `
      <div class="calc-header">
        <h2>환율 계산기</h2>
      </div>
      <div class="input-group">
        <label>외화 종류</label>
        <select id="currency-unit">
          <option value="1400">미국 달러 (USD)</option>
          <option value="950">일본 엔 (100 JPY)</option>
          <option value="1500">유럽 유로 (EUR)</option>
          <option value="195">중국 위안 (CNY)</option>
        </select>
      </div>
      <div class="input-group">
        <label>외화 금액</label>
        <input type="number" id="foreign-amount" placeholder="예: 100">
      </div>
      <button class="btn-calculate" id="calc-currency">원화로 환산</button>
      <div id="result" class="result-area hidden"></div>
    `,
    init: () => {
      document.getElementById('calc-currency').addEventListener('click', () => {
        const rate = parseFloat(document.getElementById('currency-unit').value) || 0;
        const amount = parseFloat(document.getElementById('foreign-amount').value) || 0;
        let krw = rate * amount;
        if(document.getElementById('currency-unit').value === "950") krw = krw / 100;

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
          <h4>환산 결과</h4>
          <div class="result-item"><span class="result-label">예상 원화 금액</span><span class="result-value">${Math.floor(krw).toLocaleString()}원</span></div>
          <p style="font-size: 0.8rem; color: #64748b; margin-top: 1rem;">* 가상 환율 기준이며 실제 환율과 차이가 있을 수 있습니다.</p>
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
const grid = document.getElementById('calculator-grid');
const gridContainer = document.getElementById('calculator-grid-container');
const activeView = document.getElementById('active-calculator');
const calcContainer = document.getElementById('calculator-container');
const backBtn = document.getElementById('back-to-list');
const searchInput = document.getElementById('search-input');
const categoryItems = document.querySelectorAll('.category-item');
const logo = document.querySelector('.logo');

// SEO: Update Title and Description dynamically
function updateMetadata(calc) {
  const metaTitle = document.getElementById('meta-title');
  const metaDesc = document.querySelector('meta[name="description"]');
  
  if (calc) {
    document.title = `${calc.title} - 다재다능 계산기`;
    if (metaDesc) metaDesc.setAttribute('content', calc.description);
  } else {
    document.title = '다재다능 계산기';
    if (metaDesc) metaDesc.setAttribute('content', '2026 연봉, 대출, 배당금 등 모든 필수 계산을 한곳에서 쉽고 빠르게!');
  }
}

// Render Grid
function renderGrid() {
  if (!grid) return;
  grid.innerHTML = '';
  const filtered = calculators.filter(c => {
    const matchesCategory = currentCategory === 'all' || c.category === currentCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  filtered.forEach(calc => {
    // SEO: Use <a> tag with direct link for better crawling and AdSense
    const card = document.createElement('a');
    card.href = calc.url;
    card.className = 'calc-card';
    card.innerHTML = `
      <div class="icon-box">
        <i data-lucide="${calc.icon || 'calculator'}"></i>
      </div>
      <h3>${calc.title}</h3>
      <p>${calc.description}</p>
    `;
    grid.appendChild(card);
  });
  
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Show Calculator (Legacy for SPA support if needed, but now links directly)
function showCalculator(calc) {
  if (!gridContainer || !activeView || !calcContainer) return;
  gridContainer.classList.add('hidden');
  activeView.classList.remove('hidden');
  calcContainer.innerHTML = calc.render();
  calc.init();
  updateMetadata(calc);
  if (window.lucide) {
    window.lucide.createIcons();
  }
  window.scrollTo(0, 0);
}

// Back to list function
function goBackToList() {
  if (!activeView || !gridContainer) return;
  activeView.classList.add('hidden');
  gridContainer.classList.remove('hidden');
  updateMetadata(null);
  window.scrollTo(0, 0);
}

// Logo click -> Home
if (logo) {
  logo.style.cursor = 'pointer';
  logo.addEventListener('click', () => {
    window.location.href = '/';
  });
}

// Back to list button
if (backBtn) {
  backBtn.addEventListener('click', () => {
    goBackToList();
  });
}

// Search
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderGrid();
  });
}

// Category Filter
categoryItems.forEach(item => {
  item.addEventListener('click', () => {
    if (activeView) activeView.classList.add('hidden');
    if (gridContainer) gridContainer.classList.remove('hidden');
    categoryItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    currentCategory = item.dataset.category;
    renderGrid();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Init
renderGrid();
