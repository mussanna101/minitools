import { useState } from 'react';

// ===== 1. Basic Calculator =====
export function BasicCalculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');

  const handleClick = (value) => {
    if (value === '=') {
      try {
        const result = Function(`"use strict"; return (${expression})`)();
        setDisplay(String(result));
        setExpression(String(result));
      } catch {
        setDisplay('Error');
      }
    } else if (value === 'C') {
      setDisplay('0');
      setExpression('');
    } else if (value === '⌫') {
      const newExpr = expression.slice(0, -1);
      setExpression(newExpr);
      setDisplay(newExpr || '0');
    } else {
      const newExpr = expression + value;
      setExpression(newExpr);
      setDisplay(newExpr);
    }
  };

  const buttons = [
    ['C', '⌫', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=', ''],
  ].flat().filter(Boolean);

  return (
    <div className="max-w-sm mx-auto space-y-4">
      <div className="card p-4 bg-gray-100 dark:bg-gray-700">
        <div className="text-right font-mono text-3xl truncate">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleClick(btn)}
            className={`p-4 rounded-lg font-semibold text-xl transition-colors ${
              btn === '='
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : ['/', '*', '-', '+', '%'].includes(btn)
                ? 'bg-amber-500 text-white hover:bg-amber-600'
                : ['C', '⌫'].includes(btn)
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

// ===== 2. Percentage Calculator =====
export function PercentageCalculator() {
  const [mode, setMode] = useState('percentOf');
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');

  const calculate = () => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) return null;
    switch (mode) {
      case 'percentOf': return `${a}% of ${b} = ${(a / 100 * b).toFixed(2)}`;
      case 'whatPercent': return `${a} is ${((a / b) * 100).toFixed(2)}% of ${b}`;
      case 'increase': return `${a} increased by ${b}% = ${(a + (a * b / 100)).toFixed(2)}`;
      case 'decrease': return `${a} decreased by ${b}% = ${(a - (a * b / 100)).toFixed(2)}`;
      case 'change': return `Change from ${a} to ${b} = ${(((b - a) / a) * 100).toFixed(2)}%`;
      default: return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'percentOf', label: 'X% of Y' },
          { id: 'whatPercent', label: 'X is what % of Y' },
          { id: 'increase', label: '% Increase' },
          { id: 'decrease', label: '% Decrease' },
          { id: 'change', label: '% Change' },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === m.id ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input type="number" className="input-field" placeholder="First number" value={num1} onChange={(e) => setNum1(e.target.value)} />
        <input type="number" className="input-field" placeholder="Second number" value={num2} onChange={(e) => setNum2(e.target.value)} />
      </div>
      <div className="card text-center p-4 text-xl font-bold">
        {calculate() || 'Enter numbers to calculate'}
      </div>
    </div>
  );
}

// ===== 3. BMI Calculator =====
export function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('metric');

  const calculate = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) return null;
    const hMeters = unit === 'metric' ? h / 100 : h * 0.0254;
    const wKg = unit === 'metric' ? w : w * 0.453592;
    const bmi = wKg / (hMeters * hMeters);
    let category = '';
    let color = '';
    if (bmi < 18.5) { category = 'Underweight'; color = 'text-blue-500'; }
    else if (bmi < 25) { category = 'Normal weight'; color = 'text-green-500'; }
    else if (bmi < 30) { category = 'Overweight'; color = 'text-amber-500'; }
    else { category = 'Obese'; color = 'text-red-500'; }
    return { bmi: bmi.toFixed(1), category, color };
  };

  const result = calculate();

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setUnit('metric')} className={`px-4 py-2 rounded-lg font-medium ${unit === 'metric' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>Metric (cm/kg)</button>
        <button onClick={() => setUnit('imperial')} className={`px-4 py-2 rounded-lg font-medium ${unit === 'imperial' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>Imperial (ft/lb)</button>
      </div>
      <input type="number" className="input-field" placeholder={unit === 'metric' ? 'Height (cm)' : 'Height (inches)'} value={height} onChange={(e) => setHeight(e.target.value)} />
      <input type="number" className="input-field" placeholder={unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'} value={weight} onChange={(e) => setWeight(e.target.value)} />
      {result && (
        <div className={`card text-center p-4 ${result.color}`}>
          <div className="text-4xl font-bold">{result.bmi}</div>
          <div className="text-xl font-semibold mt-2">{result.category}</div>
        </div>
      )}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        {[
          { label: 'Underweight', range: '< 18.5', color: 'bg-blue-500' },
          { label: 'Normal', range: '18.5-24.9', color: 'bg-green-500' },
          { label: 'Overweight', range: '25-29.9', color: 'bg-amber-500' },
          { label: 'Obese', range: '> 30', color: 'bg-red-500' },
        ].map((item) => (
          <div key={item.label} className="card p-2">
            <div className={`h-2 rounded-full mb-1 ${item.color}`} />
            <div className="font-semibold">{item.label}</div>
            <div className="text-gray-500 dark:text-gray-400">{item.range}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== 4. Age Calculator =====
export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [asOf, setAsOf] = useState(new Date().toISOString().split('T')[0]);

  const calculate = () => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const end = new Date(asOf);
    if (birth > end) return null;
    let years = end.getFullYear() - birth.getFullYear();
    let months = end.getMonth() - birth.getMonth();
    let days = end.getDate() - birth.getDate();
    if (days < 0) { months--; days += new Date(end.getFullYear(), end.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalDays = Math.floor((end - birth) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    return { years, months, days, totalDays, totalWeeks, totalMonths };
  };

  const result = calculate();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date of Birth</label>
          <input type="date" className="input-field" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Age as of</label>
          <input type="date" className="input-field" value={asOf} onChange={(e) => setAsOf(e.target.value)} />
        </div>
      </div>
      {result && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="card p-4">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">{result.years}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Years</div>
            </div>
            <div className="card p-4">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">{result.months}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Months</div>
            </div>
            <div className="card p-4">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">{result.days}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Days</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="card p-3">
              <div className="text-xl font-bold">{result.totalDays.toLocaleString()}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Total Days</div>
            </div>
            <div className="card p-3">
              <div className="text-xl font-bold">{result.totalWeeks.toLocaleString()}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Total Weeks</div>
            </div>
            <div className="card p-3">
              <div className="text-xl font-bold">{result.totalMonths.toLocaleString()}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Total Months</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== 5. Discount Calculator =====
export function DiscountCalculator() {
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');

  const calculate = () => {
    const p = parseFloat(price);
    const d = parseFloat(discount);
    if (isNaN(p) || isNaN(d)) return null;
    const discountAmount = p * d / 100;
    const finalPrice = p - discountAmount;
    const saved = p - finalPrice;
    return { discountAmount, finalPrice, saved };
  };

  const result = calculate();

  return (
    <div className="space-y-4">
      <input type="number" className="input-field" placeholder="Original Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input type="number" className="input-field" placeholder="Discount %" value={discount} onChange={(e) => setDiscount(e.target.value)} />
      {result && (
        <div className="card space-y-2">
          <div className="flex justify-between"><span>Original Price:</span><span className="font-semibold">${parseFloat(price).toFixed(2)}</span></div>
          <div className="flex justify-between text-red-500"><span>Discount ({discount}%):</span><span className="font-semibold">-${result.discountAmount.toFixed(2)}</span></div>
          <div className="flex justify-between text-green-500"><span>You Save:</span><span className="font-semibold">${result.saved.toFixed(2)}</span></div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between text-lg font-bold"><span>Final Price:</span><span className="text-primary-600 dark:text-primary-400">${result.finalPrice.toFixed(2)}</span></div>
        </div>
      )}
    </div>
  );
}

// ===== 6. Tip Calculator =====
export function TipCalculator() {
  const [bill, setBill] = useState('');
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState(1);

  const calculate = () => {
    const b = parseFloat(bill);
    if (isNaN(b) || b <= 0) return null;
    const tipAmount = b * tipPercent / 100;
    const total = b + tipAmount;
    const perPerson = total / people;
    const tipPerPerson = tipAmount / people;
    return { tipAmount, total, perPerson, tipPerPerson };
  };

  const result = calculate();

  return (
    <div className="space-y-4">
      <input type="number" className="input-field" placeholder="Bill Amount" value={bill} onChange={(e) => setBill(e.target.value)} />
      <div>
        <label className="block text-sm font-medium mb-2">Tip: {tipPercent}%</label>
        <div className="flex flex-wrap gap-2">
          {[10, 15, 18, 20, 25].map(pct => (
            <button key={pct} onClick={() => setTipPercent(pct)} className={`px-3 py-2 rounded-lg font-medium ${tipPercent === pct ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>{pct}%</button>
          ))}
          <input type="number" value={tipPercent} onChange={(e) => setTipPercent(parseInt(e.target.value) || 0)} className="input-field w-20" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">People: {people}</label>
        <input type="range" min="1" max="20" value={people} onChange={(e) => setPeople(parseInt(e.target.value))} className="w-full" />
      </div>
      {result && (
        <div className="card space-y-2">
          <div className="flex justify-between"><span>Tip Amount:</span><span className="font-semibold">${result.tipAmount.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Total:</span><span className="font-semibold">${result.total.toFixed(2)}</span></div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between text-lg font-bold"><span>Per Person:</span><span className="text-primary-600 dark:text-primary-400">${result.perPerson.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400"><span>Tip per person:</span><span>${result.tipPerPerson.toFixed(2)}</span></div>
        </div>
      )}
    </div>
  );
}

// ===== 7. Loan Calculator =====
export function LoanCalculator() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');

  const calculate = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate);
    const n = parseFloat(years);
    if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || n <= 0) return null;
    const monthlyRate = r / 100 / 12;
    const months = n * 12;
    const emi = monthlyRate === 0 ? p / months : p * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - p;
    return { emi, totalPayment, totalInterest };
  };

  const result = calculate();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input type="number" className="input-field" placeholder="Loan Amount ($)" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <input type="number" className="input-field" placeholder="Interest Rate (%/yr)" value={rate} onChange={(e) => setRate(e.target.value)} />
        <input type="number" className="input-field" placeholder="Years" value={years} onChange={(e) => setYears(e.target.value)} />
      </div>
      {result && (
        <div className="card space-y-2">
          <div className="flex justify-between"><span>Monthly EMI:</span><span className="text-2xl font-bold text-primary-600 dark:text-primary-400">${result.emi.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Total Payment:</span><span className="font-semibold">${result.totalPayment.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Total Interest:</span><span className="font-semibold text-red-500">${result.totalInterest.toFixed(2)}</span></div>
          <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div className="h-full bg-primary-600" style={{ width: `${Math.min(100, (amount / result.totalPayment) * 100)}%` }} />
          </div>
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>Principal: ${parseFloat(amount).toFixed(2)}</span>
            <span>Interest: ${result.totalInterest.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== 8. Scientific Calculator =====
export function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');

  const handleClick = (value) => {
    if (value === '=') {
      try {
        const sanitized = expression.replace(/sin\(/g, 'Math.sin(').replace(/cos\(/g, 'Math.cos(').replace(/tan\(/g, 'Math.tan(').replace(/log\(/g, 'Math.log10(').replace(/ln\(/g, 'Math.log(').replace(/√\(/g, 'Math.sqrt(').replace(/\^/g, '**').replace(/π/g, 'Math.PI');
        const result = Function(`"use strict"; return (${sanitized})`)();
        setDisplay(String(result));
        setExpression(String(result));
      } catch {
        setDisplay('Error');
      }
    } else if (value === 'C') {
      setDisplay('0');
      setExpression('');
    } else if (value === '⌫') {
      const newExpr = expression.slice(0, -1);
      setExpression(newExpr);
      setDisplay(newExpr || '0');
    } else if (value === 'π') {
      const newExpr = expression + value;
      setExpression(newExpr);
      setDisplay(newExpr);
    } else {
      const newExpr = expression + value;
      setExpression(newExpr);
      setDisplay(newExpr);
    }
  };

  const buttons = [
    ['sin(', 'cos(', 'tan(', '√('],
    ['log(', 'ln(', 'π', '^'],
    ['C', '⌫', '(', ')'],
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ];

  return (
    <div className="max-w-sm mx-auto space-y-4">
      <div className="card p-4 bg-gray-100 dark:bg-gray-700">
        <div className="text-right font-mono text-2xl truncate">{display}</div>
      </div>
      <div className="space-y-2">
        {buttons.map((row, i) => (
          <div key={i} className="grid grid-cols-4 gap-2">
            {row.map((btn) => (
              <button
                key={btn}
                onClick={() => handleClick(btn)}
                className={`p-3 rounded-lg font-semibold text-sm transition-colors ${
                  btn === '='
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : ['sin(', 'cos(', 'tan(', 'log(', 'ln(', '√(', 'π', '^'].includes(btn)
                    ? 'bg-purple-500 text-white hover:bg-purple-600'
                    : ['C', '⌫'].includes(btn)
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : ['/', '*', '-', '+'].includes(btn)
                    ? 'bg-amber-500 text-white hover:bg-amber-600'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}