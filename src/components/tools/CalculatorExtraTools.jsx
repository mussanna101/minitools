import { useState } from 'react';

const GRADE_POINTS = [
  ['A+', 4.0], ['A', 4.0], ['A-', 3.7],
  ['B+', 3.3], ['B', 3.0], ['B-', 2.7],
  ['C+', 2.3], ['C', 2.0], ['C-', 1.7],
  ['D+', 1.3], ['D', 1.0], ['F', 0.0],
];

export function GPACalculator() {
  const [courses, setCourses] = useState([{ id: 1, credit: '', grade: 4.0 }]);
  const addCourse = () => setCourses([...courses, { id: Date.now(), credit: '', grade: 4.0 }]);
  const update = (id, field, value) => setCourses(courses.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  const remove = (id) => setCourses(courses.filter((c) => c.id !== id).length ? courses.filter((c) => c.id !== id) : courses);

  const totalCred = courses.reduce((s, c) => s + Number(c.credit || 0), 0);
  const gpa = totalCred ? courses.reduce((s, c) => s + Number(c.credit || 0) * Number(c.grade), 0) / totalCred : 0;

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr><th className="text-left p-1">Credits</th><th className="text-left p-1">Grade</th><th className="w-10"></th></tr></thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id}>
                <td><input type="number" min="0" step="0.5" value={c.credit} onChange={(e) => update(c.id, 'credit', e.target.value)} className="input-field" /></td>
                <td><select value={c.grade} onChange={(e) => update(c.id, 'grade', Number(e.target.value))} className="input-field"><option value={4.0}>4.0 scale</option>{GRADE_POINTS.map(([g, p]) => <option key={g} value={p}>{g} ({p})</option>)}</select></td>
                <td>{courses.length > 1 && <button onClick={() => remove(c.id)} className="text-red-500 text-xs">✕</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
            <div className="flex gap-2">
        <button onClick={addCourse} className="btn-secondary">Add Course</button>
        <button onClick={() => setCourses([{ id: 1, credit: '', grade: 4.0 }])} className="text-xs underline">Reset</button>
      </div>
      <div className="card p-4 text-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">Cumulative GPA</div>
        <div className="text-3xl font-bold">{totalCred ? gpa.toFixed(3) : '—'}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total credits: {totalCred || 0}</div>
      </div>
    </div>
  );
}
// Compound Interest Calculator
export function CompoundInterestCalculator() {
  const [P, setP] = useState('');
  const [R, setR] = useState(8);
  const [T, setT] = useState(10);
  const [N, setN] = useState(12);
  const p = Number(P) || 0;
  const r = Number(R) || 0;
  const t = Number(T) || 0;
  const n = Number(N) || 1;
  const amount = p * Math.pow(1 + r / (100 * n), n * t);
  const interest = amount - p;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <label className="space-y-1"><span className="text-sm">Principal (₹):</span><input type="number" value={P} onChange={(e) => setP(e.target.value)} className="input-field" placeholder="10000" /></label>
      <label className="space-y-1"><span className="text-sm">Annual Rate (%):</span><input type="number" value={R} onChange={(e) => setR(e.target.value)} className="input-field" /></label>
      <label className="space-y-1"><span className="text-sm">Time (years):</span><input type="number" value={T} onChange={(e) => setT(e.target.value)} className="input-field" /></label>
      <label className="space-y-1"><span className="text-sm">Compounds/year (n):</span><input type="number" value={N} onChange={(e) => setN(e.target.value)} className="input-field" /></label>
      <div className="sm:col-span-2 card p-4 space-y-1">
        <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Final Amount</span><span className="font-bold">₹{amount.toFixed(2)}</span></div>
        <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Total Interest</span><span className="font-bold text-green-600">₹{interest.toFixed(2)}</span></div>
        <div className="text-xs text-gray-600 dark:text-gray-400">A = P(1 + r/n)^(nt)</div>
      </div>
    </div>
  );
}

// Date Difference Calculator
export function DateDifferenceCalculator() {
  const today = new Date().toISOString().slice(0, 10);
  const [d1, setD1] = useState(today);
  const [d2, setD2] = useState(today);
  const parse = (s) => new Date(s + 'T00:00:00');
  const a = parse(d1);
  const b = parse(d2);
  const diffMs = a && b ? b - a : 0;
  const absDays = Math.abs(Math.round(diffMs / 86400000));
  const weeks = absDays / 7;
  const months = absDays / 30.4375;
  const years = absDays / 365.25;
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1"><span className="text-sm">Start date</span><input type="date" value={d1} onChange={(e) => setD1(e.target.value)} className="input-field" /></label>
        <label className="space-y-1"><span className="text-sm">End date</span><input type="date" value={d2} onChange={(e) => setD2(e.target.value)} className="input-field" /></label>
      </div>
      <div className="card p-4 grid grid-cols-2 gap-2 text-center">
        <div><span className="text-2xl font-bold">{absDays}</span><span className="text-xs text-gray-500">days</span></div>
        <div><span className="text-2xl font-bold">{weeks.toFixed(1)}</span><span className="text-xs text-gray-500">weeks</span></div>
        <div><span className="text-2xl font-bold">{months.toFixed(1)}</span><span className="text-xs text-gray-500">months</span></div>
        <div><span className="text-2xl font-bold">{years.toFixed(2)}</span><span className="text-xs text-gray-500">years</span></div>
      </div>
    </div>
  );
}
// __CALC_APPEND_LAST__
