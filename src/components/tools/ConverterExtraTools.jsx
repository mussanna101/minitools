import { useState } from 'react';

// Reusable unit converter. units items: { id, label, toBase, fromBase } (base = SI).
function UnitConverter({ title, units, defaultFrom, defaultTo }) {
  const [val, setVal] = useState('');
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const fromU = units.find((u) => u.id === from);
  const toU = units.find((u) => u.id === to);
  const base = fromU ? fromU.toBase(Number(val) || 0) : 0;
  const result = toU ? toU.fromBase(base) : 0;
  const swap = () => { setFrom(to); setTo(from); };
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="grid gap-2 sm:grid-cols-5 items-end">
        <div className="sm:col-span-2"><input value={val} onChange={(e) => setVal(e.target.value)} type="number" step="any" placeholder="0" className="input-field" /></div>
        <select value={from} onChange={(e) => setFrom(e.target.value)} className="input-field">
          <option value="" disabled>Pick unit</option>
          {units.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
        </select>
        <button onClick={swap} className="btn-secondary text-sm">⇄</button>
        <select value={to} onChange={(e) => setTo(e.target.value)} className="input-field">
          {units.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
        </select>
      </div>
      <div className="card p-4 text-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">Result</div>
        <div className="text-2xl font-bold break-all">{val === '' ? '—' : result.toFixed(6)}</div>
      </div>
    </div>
  );
}

// Pressure units (base = Pascal)
const PRESSURE = [
  { id: 'Pa', label: 'Pascal (Pa)', toBase: (v) => v, fromBase: (v) => v },
  { id: 'kPa', label: 'Kilopascal (kPa)', toBase: (v) => v * 1e3, fromBase: (v) => v / 1e3 },
  { id: 'MPa', label: 'Megapascal (MPa)', toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
  { id: 'bar', label: 'Bar', toBase: (v) => v * 1e5, fromBase: (v) => v / 1e5 },
  { id: 'mbar', label: 'Millibar', toBase: (v) => v * 1e2, fromBase: (v) => v / 1e2 },
  { id: 'atm', label: 'Atmosphere (atm)', toBase: (v) => v * 101325, fromBase: (v) => v / 101325 },
  { id: 'psi', label: 'PSI', toBase: (v) => v * 6894.757, fromBase: (v) => v / 6894.757 },
  { id: 'torr', label: 'Torr', toBase: (v) => v * 133.322, fromBase: (v) => v / 133.322 },
  { id: 'inhg', label: 'Inch Hg (inHg)', toBase: (v) => v * 3386.36, fromBase: (v) => v / 3386.36 },
];

export function PressureConverter() {
  return <UnitConverter title="Pressure Converter" units={PRESSURE} defaultFrom="kPa" defaultTo="atm" />;
}
// Energy units (base = Joule)
const ENERGY = [
  { id: 'J', label: 'Joule (J)', toBase: (v) => v, fromBase: (v) => v },
  { id: 'kJ', label: 'Kilojoule (kJ)', toBase: (v) => v * 1e3, fromBase: (v) => v / 1e3 },
  { id: 'cal', label: 'Calorie (cal)', toBase: (v) => v * 4.184, fromBase: (v) => v / 4.184 },
  { id: 'kcal', label: 'Kilocalorie (kcal)', toBase: (v) => v * 4184, fromBase: (v) => v / 4184 },
  { id: 'BTU', label: 'BTU', toBase: (v) => v * 1055.056, fromBase: (v) => v / 1055.056 },
  { id: 'Wh', label: 'Watt-hour (Wh)', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
  { id: 'kWh', label: 'Kilowatt-hour (kWh)', toBase: (v) => v * 3.6e6, fromBase: (v) => v / 3.6e6 },
  { id: 'ftlb', label: 'Foot-pound (ft·lb)', toBase: (v) => v * 1.355818, fromBase: (v) => v / 1.355818 },
];

export function EnergyConverter() {
  return <UnitConverter title="Energy Converter" units={ENERGY} defaultFrom="kWh" defaultTo="kcal" />;
}

// Time Zone Converter (real, uses Intl)
const ALL_ZONES =
  typeof Intl.supportedValuesOf === 'function'
    ? Intl.supportedValuesOf('timeZone')
    : [
        'UTC', 'Europe/London', 'Europe/Paris', 'Asia/Kolkata', 'Asia/Dubai',
        'Asia/Tokyo', 'Asia/Shanghai', 'America/New_York', 'America/Chicago',
        'America/Sao_Paulo', 'Australia/Sydney', 'Pacific/Auckland',
      ];

function fmt(dt, zone) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: zone,
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZoneName: 'shortOffset',
  }).format(dt);
}

export function TimeZoneConverter() {
  const now = new Date();
  const [moment, setMoment] = useState(now.toISOString().slice(0, 16));
  const [selected, setSelected] = useState([
    Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    'UTC',
    'Asia/Kolkata',
    'America/New_York',
    'Asia/Tokyo',
  ]);
  const refDate = new Date(moment);
  const addZone = (zone) => {
    if (zone && !selected.includes(zone)) setSelected([...selected, zone]);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <label className="text-sm">Reference date & time (your browser local)</label>
          <input type="datetime-local" value={moment} onChange={(e) => setMoment(e.target.value)} className="input-field w-full" />
        </div>
        <button onClick={() => setMoment(now.toISOString().slice(0, 16))} className="btn-secondary text-sm">Now</button>
      </div>
      <select onChange={(e) => addZone(e.target.value)} className="input-field">
        <option value="">+ Add time zone…</option>
        {ALL_ZONES.map((z) => <option key={z} value={z}>{z}</option>)}
      </select>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr><th className="text-left p-2">Zone</th><th className="text-left p-2">Local time</th><th className="w-8"></th></tr></thead>
          <tbody>
            {selected.map((z) => (
              <tr key={z}>
                <td className="p-2 font-mono">{z}</td>
                <td className="p-2">{fmt(refDate, z)}</td>
                <td><button onClick={() => setSelected(selected.filter((x) => x !== z))} className="text-red-500 text-xs">✕</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
// __CONV_APPEND_LAST__