import { useState } from 'react';
import { unitGroups, convertUnit } from '../../utils/conversionFactors';
import CopyButton from '../common/CopyButton';

// Reusable Unit Converter Component
function UnitConverter({ group }) {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState(Object.keys(unitGroups[group].units)[0]);
  const [toUnit, setToUnit] = useState(Object.keys(unitGroups[group].units)[1]);

  const result = convertUnit(value, fromUnit, toUnit, group);
  const units = unitGroups[group].units;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <div className="flex gap-2">
            <input type="number" className="input-field" placeholder="Enter value" value={value} onChange={(e) => setValue(e.target.value)} />
            <select className="input-field md:w-48" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
              {Object.entries(units).map(([key, u]) => (
                <option key={key} value={key}>{u.symbol} - {key}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <div className="flex gap-2">
            <input className="input-field" value={result ? Number(result).toLocaleString(undefined, { maximumFractionDigits: 6 }) : ''} readOnly placeholder="Result" />
            <select className="input-field md:w-48" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
              {Object.entries(units).map(([key, u]) => (
                <option key={key} value={key}>{u.symbol} - {key}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {result !== '' && (
        <div className="card text-center p-4">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {value} {units[fromUnit].symbol} = {Number(result).toLocaleString(undefined, { maximumFractionDigits: 6 })} {units[toUnit].symbol}
          </div>
          <CopyButton text={`${value} ${units[fromUnit].symbol} = ${result} ${units[toUnit].symbol}`} className="mt-2" />
        </div>
      )}
    </div>
  );
}

// ===== 1. Length Converter =====
export function LengthConverter() {
  return <UnitConverter group="length" />;
}

// ===== 2. Weight Converter =====
export function WeightConverter() {
  return <UnitConverter group="weight" />;
}

// ===== 3. Temperature Converter =====
export function TemperatureConverter() {
  return <UnitConverter group="temperature" />;
}

// ===== 4. Speed Converter =====
export function SpeedConverter() {
  return <UnitConverter group="speed" />;
}

// ===== 5. Area Converter =====
export function AreaConverter() {
  return <UnitConverter group="area" />;
}

// ===== 6. Volume Converter =====
export function VolumeConverter() {
  return <UnitConverter group="volume" />;
}

// ===== 7. Time Converter =====
export function TimeConverter() {
  return <UnitConverter group="time" />;
}

// ===== 8. Data Storage Converter =====
export function DataConverter() {
  return <UnitConverter group="data" />;
}

// ===== 9. Currency Converter =====
export function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('PKR');
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currencies = {
    USD: { symbol: '$', name: 'US Dollar' },
    EUR: { symbol: 'EUR', name: 'Euro' },
    GBP: { symbol: 'GBP', name: 'British Pound' },
    PKR: { symbol: 'PKR', name: 'Pakistani Rupee' },
    INR: { symbol: 'INR', name: 'Indian Rupee' },
    JPY: { symbol: 'JPY', name: 'Japanese Yen' },
    CNY: { symbol: 'CNY', name: 'Chinese Yuan' },
    AUD: { symbol: 'AUD', name: 'Australian Dollar' },
    CAD: { symbol: 'CAD', name: 'Canadian Dollar' },
    AED: { symbol: 'AED', name: 'UAE Dirham' },
    SAR: { symbol: 'SAR', name: 'Saudi Riyal' },
    TRY: { symbol: 'TRY', name: 'Turkish Lira' },
  };

  const fetchRates = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const data = await response.json();
      setRates(data.rates);
    } catch {
      setError('Rates fetch karne me error. Internet check karein.');
    }
    setLoading(false);
  };

  const result = rates && amount ? parseFloat(amount) * rates[toCurrency] : null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input type="number" className="input-field" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <select className="input-field" value={fromCurrency} onChange={(e) => { setFromCurrency(e.target.value); setRates(null); }}>
            {Object.entries(currencies).map(([code, c]) => (
              <option key={code} value={code}>{c.symbol} {code} - {c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <select className="input-field" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            {Object.entries(currencies).map(([code, c]) => (
              <option key={code} value={code}>{c.symbol} {code} - {c.name}</option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={fetchRates} disabled={loading} className="btn-primary w-full">
        {loading ? 'Loading rates...' : 'Get Exchange Rate'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {result !== null && (
        <div className="card text-center p-4">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {currencies[fromCurrency].symbol}{parseFloat(amount).toFixed(2)} = {currencies[toCurrency].symbol}{result.toFixed(2)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            1 {fromCurrency} = {rates[toCurrency].toFixed(4)} {toCurrency}
          </div>
          <CopyButton text={`${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`} className="mt-2" />
        </div>
      )}
    </div>
  );
}

// ===== 10. Number Base Converter =====
export function NumberBaseConverter() {
  const [value, setValue] = useState('');
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);

  const convert = () => {
    if (!value) return '';
    try {
      const decimal = parseInt(value, fromBase);
      if (isNaN(decimal)) return 'Invalid input';
      return decimal.toString(toBase).toUpperCase();
    } catch {
      return 'Invalid input';
    }
  };

  const result = convert();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Value</label>
          <input className="input-field font-mono" placeholder="Enter number" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">From Base</label>
          <select className="input-field" value={fromBase} onChange={(e) => setFromBase(parseInt(e.target.value))}>
            {[2, 8, 10, 16].map(b => (
              <option key={b} value={b}>Base {b} - {b === 2 ? 'Binary' : b === 8 ? 'Octal' : b === 10 ? 'Decimal' : 'Hexadecimal'}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">To Base</label>
          <select className="input-field" value={toBase} onChange={(e) => setToBase(parseInt(e.target.value))}>
            {[2, 8, 10, 16].map(b => (
              <option key={b} value={b}>Base {b} - {b === 2 ? 'Binary' : b === 8 ? 'Octal' : b === 10 ? 'Decimal' : 'Hexadecimal'}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="card text-center p-4">
        <div className="text-2xl font-bold font-mono text-primary-600 dark:text-primary-400 break-all">
          {result || 'Enter a number to convert'}
        </div>
        {result && result !== 'Invalid input' && <CopyButton text={result} className="mt-2" />}
      </div>
      <div className="grid grid-cols-4 gap-2 text-center text-sm">
        {[2, 8, 10, 16].map(b => {
          const val = value ? parseInt(value, fromBase) : '';
          const converted = val !== '' && !isNaN(val) ? val.toString(b).toUpperCase() : '-';
          return (
            <div key={b} className="card p-2">
              <div className="font-semibold mb-1">{b === 2 ? 'Binary' : b === 8 ? 'Octal' : b === 10 ? 'Decimal' : 'Hex'}</div>
              <div className="font-mono text-xs break-all">{converted}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
