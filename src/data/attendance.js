const storageKey = 'ds-lab-attendance';

export const defaultAttendanceThreshold = 75;

export function isValidAttendanceDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

export function loadAttendanceData() {
  const saved = window.localStorage.getItem(storageKey);
  if (!saved) {
    return { records: [], threshold: defaultAttendanceThreshold };
  }

  let parsed;
  try {
    parsed = JSON.parse(saved);
  } catch {
    throw new Error('Saved attendance data could not be read. It has not been changed.');
  }

  const recordsAreValid = parsed
    && Array.isArray(parsed.records)
    && parsed.records.every((record) => (
    record
    && typeof record.id === 'string'
    && Number.isInteger(record.sessionNumber)
    && record.sessionNumber > 0
    && isValidAttendanceDate(record.date)
    && typeof record.subjectId === 'string'
    && typeof record.subjectName === 'string'
    && ['Present', 'Absent'].includes(record.status)
  ));
  const thresholdIsValid = parsed
    && Number.isFinite(parsed.threshold)
    && parsed.threshold >= 1
    && parsed.threshold <= 100;

  if (!recordsAreValid || !thresholdIsValid) {
    throw new Error('Saved attendance data is invalid. It has not been changed.');
  }

  return { records: parsed.records, threshold: parsed.threshold };
}

export function saveAttendanceData(data) {
  window.localStorage.setItem(storageKey, JSON.stringify(data));
}

export function getAttendanceSummary(records) {
  const present = records.filter((record) => record.status === 'Present').length;
  const total = records.length;

  return {
    total,
    present,
    absent: total - present,
    percentage: total === 0 ? 0 : (present / total) * 100,
  };
}

export function getCumulativeAttendance(records) {
  const ascending = [...records].sort((a, b) => (
    a.date.localeCompare(b.date) || a.sessionNumber - b.sessionNumber
  ));
  let present = 0;

  return new Map(ascending.map((record, index) => {
    if (record.status === 'Present') {
      present += 1;
    }

    return [record.id, (present / (index + 1)) * 100];
  }));
}
