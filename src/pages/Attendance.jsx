import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  CalendarDays,
  Check,
  Download,
  Pencil,
  Printer,
  Save,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import { experiments } from '../data/experiments';
import { modules } from '../data/modules';
import {
  defaultAttendanceThreshold,
  getAttendanceSummary,
  getCumulativeAttendance,
  isValidAttendanceDate,
  loadAttendanceData,
  saveAttendanceData,
} from '../data/attendance';

const subjects = [
  ...modules.map((module) => ({
    id: `module-${module.id}`,
    label: `Module ${module.number}: ${module.title}`,
  })),
  ...experiments.map((experiment) => ({
    id: `experiment-${experiment.id}`,
    label: `Experiment ${experiment.number}: ${experiment.title}`,
  })),
];

function getInitialData() {
  try {
    return { data: loadAttendanceData(), error: '' };
  } catch (error) {
    return {
      data: { records: [], threshold: defaultAttendanceThreshold },
      error: error instanceof Error ? error.message : 'Attendance data could not be loaded.',
    };
  }
}

function formatPercentage(value) {
  return `${value.toFixed(1)}%`;
}

function getLocalDateValue() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${today.getFullYear()}-${month}-${day}`;
}

function escapeCsv(value) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

function downloadCsv(records, cumulative) {
  const rows = [
    ['Session number', 'Date', 'Lab subject or experiment', 'Attendance status', 'Cumulative attendance percentage'],
    ...records.map((record) => [
      record.sessionNumber,
      record.date,
      record.subjectName,
      record.status,
      formatPercentage(cumulative.get(record.id) || 0),
    ]),
  ];
  const content = `\uFEFF${rows.map((row) => row.map(escapeCsv).join(',')).join('\r\n')}`;
  const url = URL.createObjectURL(new Blob([content], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'data-science-lab-attendance.csv';
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function Attendance() {
  const initial = useMemo(getInitialData, []);
  const [records, setRecords] = useState(initial.data.records);
  const [threshold, setThreshold] = useState(initial.data.threshold);
  const [thresholdDraft, setThresholdDraft] = useState(initial.data.threshold);
  const [storageError, setStorageError] = useState(initial.error);
  const [editingId, setEditingId] = useState('');
  const [formError, setFormError] = useState('');
  const [thresholdError, setThresholdError] = useState('');
  const [filters, setFilters] = useState({ from: '', to: '', subject: '', status: '' });
  const [form, setForm] = useState({
    date: getLocalDateValue(),
    subjectId: '',
    status: 'Present',
  });

  useEffect(() => {
    document.body.dataset.printTarget = 'attendance';
    return () => {
      if (document.body.dataset.printTarget === 'attendance') {
        delete document.body.dataset.printTarget;
      }
    };
  }, []);

  const summary = useMemo(() => getAttendanceSummary(records), [records]);
  const cumulative = useMemo(() => getCumulativeAttendance(records), [records]);
  const filteredRecords = useMemo(() => [...records]
    .filter((record) => !filters.from || record.date >= filters.from)
    .filter((record) => !filters.to || record.date <= filters.to)
    .filter((record) => !filters.subject || record.subjectId === filters.subject)
    .filter((record) => !filters.status || record.status === filters.status)
    .sort((a, b) => b.date.localeCompare(a.date) || b.sessionNumber - a.sessionNumber),
  [records, filters]);
  const filteredSummary = useMemo(() => getAttendanceSummary(filteredRecords), [filteredRecords]);
  const invalidRange = Boolean(filters.from && filters.to && filters.from > filters.to);
  const status = summary.total === 0
    ? 'No sessions recorded'
    : summary.percentage >= threshold ? 'Eligible' : 'Shortage';

  const commit = (nextRecords, nextThreshold = threshold) => {
    try {
      saveAttendanceData({ records: nextRecords, threshold: nextThreshold });
      setRecords(nextRecords);
      setThreshold(nextThreshold);
      setThresholdDraft(nextThreshold);
      setStorageError('');
      return true;
    } catch {
      setStorageError('Attendance could not be saved to this browser. Your current page data has not been updated.');
      return false;
    }
  };

  const handleThresholdSave = (event) => {
    event.preventDefault();
    if (!Number.isInteger(thresholdDraft) || thresholdDraft < 1 || thresholdDraft > 100) {
      setThresholdError('Set the minimum attendance requirement between 1% and 100%.');
      return;
    }
    setThresholdError('');
    commit(records, thresholdDraft);
  };

  const resetForm = () => {
    setForm({ date: getLocalDateValue(), subjectId: '', status: 'Present' });
    setEditingId('');
    setFormError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValidAttendanceDate(form.date)) {
      setFormError('Enter a valid attendance date.');
      return;
    }

    const subject = subjects.find((item) => item.id === form.subjectId);
    if (!subject) {
      setFormError('Select a lab subject or experiment.');
      return;
    }

    if (!['Present', 'Absent'].includes(form.status)) {
      setFormError('Select Present or Absent for this session.');
      return;
    }

    const duplicate = records.find((record) => (
      record.id !== editingId && record.date === form.date && record.subjectId === subject.id
    ));
    if (duplicate) {
      setFormError('An attendance record already exists for this subject and date. Edit that record instead.');
      return;
    }

    const existingRecord = records.find((record) => record.id === editingId);
    const nextRecord = {
      id: existingRecord?.id || (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`),
      sessionNumber: existingRecord?.sessionNumber
        || records.reduce((maximum, record) => Math.max(maximum, record.sessionNumber), 0) + 1,
      date: form.date,
      subjectId: subject.id,
      subjectName: subject.label,
      status: form.status,
    };
    const nextRecords = existingRecord
      ? records.map((record) => record.id === editingId ? nextRecord : record)
      : [...records, nextRecord];

    if (commit(nextRecords)) {
      resetForm();
    }
  };

  const handleEdit = (record) => {
    setForm({ date: record.date, subjectId: record.subjectId, status: record.status });
    setEditingId(record.id);
    setFormError('');
    document.getElementById('attendance-form-heading')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleDelete = (record) => {
    if (!window.confirm(`Delete attendance for ${record.subjectName} on ${record.date}? This cannot be undone.`)) {
      return;
    }
    const nextRecords = records.filter((item) => item.id !== record.id);
    if (commit(nextRecords) && editingId === record.id) {
      resetForm();
    }
  };

  const handleExport = () => {
    downloadCsv(filteredRecords, cumulative);
  };

  return (
    <div className="page-section attendance-page">
      <div className="page-heading">
        <p className="eyebrow">Personal Academic Tracker</p>
        <h1>Lab Attendance</h1>
        <p className="attendance-intro">
          Keep a personal record of your Data Science lab sessions. This tracker is stored only in this browser and is
          not official university attendance.
        </p>
      </div>

      {storageError && (
        <div className="attendance-alert attendance-alert-error" role="alert">
          <AlertTriangle size={18} aria-hidden="true" /> {storageError}
        </div>
      )}

      <section className="attendance-dashboard" aria-label="Attendance summary">
        <article className="attendance-stat-card">
          <span>Sessions attended</span>
          <strong>{summary.present}</strong>
          <small>Marked present</small>
        </article>
        <article className="attendance-stat-card">
          <span>Absences</span>
          <strong>{summary.absent}</strong>
          <small>Marked absent</small>
        </article>
        <article className="attendance-stat-card attendance-stat-primary">
          <span>Overall attendance</span>
          <strong>{formatPercentage(summary.percentage)}</strong>
          <small>Minimum requirement: {threshold}%</small>
        </article>
        <article className={`attendance-stat-card attendance-status-card ${status === 'Eligible' ? 'is-eligible' : status === 'Shortage' ? 'is-shortage' : ''}`}>
          <span>Attendance status</span>
          <strong>{status}</strong>
          <small>{summary.total === 0 ? 'Add a session to calculate eligibility' : `${summary.present} attended · ${summary.absent} missed`}</small>
        </article>
      </section>

      <section className="attendance-settings info-card" aria-labelledby="attendance-settings-heading">
        <div>
          <p className="eyebrow">Attendance Rule</p>
          <h2 id="attendance-settings-heading">Minimum requirement</h2>
          <p>Choose the minimum percentage used to calculate your personal eligibility status.</p>
        </div>
        <form className="attendance-threshold-form" onSubmit={handleThresholdSave} noValidate>
          <label htmlFor="attendance-threshold">Minimum attendance (%)</label>
          <div className="attendance-threshold-controls">
            <input
              id="attendance-threshold"
              type="number"
              min="1"
              max="100"
              step="1"
              value={thresholdDraft}
              onChange={(event) => setThresholdDraft(event.target.value === '' ? '' : Number(event.target.value))}
              aria-describedby="attendance-threshold-help"
            />
            <button type="submit" className="secondary-button small-button" disabled={Boolean(storageError)}>
              <Save size={15} aria-hidden="true" /> Save requirement
            </button>
          </div>
          <small id="attendance-threshold-help">Default: 75%. Set a whole percentage from 1 to 100.</small>
          {thresholdError && <p className="attendance-form-error" role="alert">{thresholdError}</p>}
        </form>
      </section>

      <section className="info-card attendance-form-card" aria-labelledby="attendance-form-heading">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">{editingId ? 'Correct Record' : 'Daily Record'}</p>
            <h2 id="attendance-form-heading">{editingId ? 'Edit lab attendance' : 'Record a lab session'}</h2>
          </div>
          <CalendarDays size={22} className="attendance-heading-icon" aria-hidden="true" />
        </div>
        <form className="attendance-record-form" onSubmit={handleSubmit} noValidate>
          <label>
            Lab subject or experiment
            <select value={form.subjectId} onChange={(event) => setForm({ ...form, subjectId: event.target.value })} required>
              <option value="">Select a module or experiment</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>{subject.label}</option>
              ))}
            </select>
          </label>
          <label>
            Attendance date
            <input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} required />
          </label>
          <fieldset className="attendance-status-options">
            <legend>Session attendance</legend>
            <label className={`attendance-choice ${form.status === 'Present' ? 'selected-present' : ''}`}>
              <input type="radio" name="attendance-status" value="Present" checked={form.status === 'Present'} onChange={() => setForm({ ...form, status: 'Present' })} />
              <Check size={16} aria-hidden="true" /> Present
            </label>
            <label className={`attendance-choice ${form.status === 'Absent' ? 'selected-absent' : ''}`}>
              <input type="radio" name="attendance-status" value="Absent" checked={form.status === 'Absent'} onChange={() => setForm({ ...form, status: 'Absent' })} />
              <X size={16} aria-hidden="true" /> Absent
            </label>
          </fieldset>
          {formError && <p className="attendance-form-error" role="alert">{formError}</p>}
          <div className="attendance-form-actions">
            <button type="submit" className="primary-button" disabled={Boolean(storageError)}>
              <Save size={16} aria-hidden="true" /> {editingId ? 'Save correction' : 'Save attendance'}
            </button>
            {editingId && (
              <button type="button" className="secondary-button" onClick={resetForm}>
                Cancel edit
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="info-card attendance-history-card" aria-labelledby="attendance-history-heading">
        <div className="section-heading-row attendance-history-heading-row">
          <div>
            <p className="eyebrow">History and Reports</p>
            <h2 id="attendance-history-heading">Attendance history</h2>
          </div>
          <div className="attendance-report-actions">
            <button type="button" className="secondary-button small-button" onClick={handleExport} disabled={filteredRecords.length === 0}>
              <Download size={15} aria-hidden="true" /> Export CSV
            </button>
            <button type="button" className="secondary-button small-button" onClick={() => window.print()}>
              <Printer size={15} aria-hidden="true" /> Print report
            </button>
          </div>
        </div>

        <div className="attendance-filters" aria-label="Filter attendance history">
          <label>
            From date
            <input type="date" value={filters.from} onChange={(event) => setFilters({ ...filters, from: event.target.value })} />
          </label>
          <label>
            To date
            <input type="date" value={filters.to} onChange={(event) => setFilters({ ...filters, to: event.target.value })} />
          </label>
          <label>
            Subject
            <select value={filters.subject} onChange={(event) => setFilters({ ...filters, subject: event.target.value })}>
              <option value="">All subjects</option>
              {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.label}</option>)}
            </select>
          </label>
          <label>
            Status
            <select value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}>
              <option value="">All statuses</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </label>
          <button type="button" className="attendance-clear-filters" onClick={() => setFilters({ from: '', to: '', subject: '', status: '' })}>
            Clear filters
          </button>
        </div>

        {invalidRange && <p className="attendance-form-error" role="alert">The start date must be on or before the end date.</p>}

        <div className="attendance-filter-summary" aria-live="polite">
          <Users size={17} aria-hidden="true" />
          <span>
            Filtered summary: <strong>{filteredSummary.total} sessions</strong> · {filteredSummary.present} present ·
            {' '}{filteredSummary.absent} absent · {formatPercentage(filteredSummary.percentage)}
          </span>
        </div>

        <div className="attendance-table-wrap">
          <table className="attendance-table">
            <thead>
              <tr>
                <th scope="col">Session</th>
                <th scope="col">Date</th>
                <th scope="col">Lab subject or experiment</th>
                <th scope="col">Attendance</th>
                <th scope="col">Cumulative</th>
                <th scope="col" className="no-print">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!invalidRange && filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td data-label="Session">#{record.sessionNumber}</td>
                  <td data-label="Date">{record.date}</td>
                  <td data-label="Lab subject or experiment">{record.subjectName}</td>
                  <td data-label="Attendance">
                    <span className={`attendance-badge ${record.status === 'Present' ? 'badge-present' : 'badge-absent'}`}>
                      {record.status === 'Present' ? <Check size={14} aria-hidden="true" /> : <X size={14} aria-hidden="true" />}
                      <span>{record.status}</span>
                    </span>
                  </td>
                  <td data-label="Cumulative">{formatPercentage(cumulative.get(record.id) || 0)}</td>
                  <td data-label="Actions" className="attendance-row-actions no-print">
                    <button type="button" className="attendance-icon-button" onClick={() => handleEdit(record)} aria-label={`Edit session ${record.sessionNumber}`}>
                      <Pencil size={15} aria-hidden="true" />
                    </button>
                    <button type="button" className="attendance-icon-button delete-action" onClick={() => handleDelete(record)} aria-label={`Delete session ${record.sessionNumber}`}>
                      <Trash2 size={15} aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
              {!invalidRange && filteredRecords.length === 0 && (
                <tr>
                  <td colSpan="6" className="attendance-empty-state">
                    {records.length === 0
                      ? 'No lab sessions recorded yet. Add your first personal attendance record above.'
                      : 'No sessions match these filters. Adjust the filters to see attendance history.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="attendance-local-note">Personal tracker only. Records are stored in this browser and are not shared with or verified by faculty.</p>
      </section>
    </div>
  );
}

export default Attendance;
