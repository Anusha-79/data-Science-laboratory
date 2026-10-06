const defaultSiteData = {
  collegeName: 'Mohan Babu University',
  collegeLogo: '/logo.png',
  laboratoryName: 'Data Science Laboratory',
  department: 'School of Computing',
  courseId: 'DS-101',
  academicYear: '2026-2027',
  semester: 'Semester 5',
  collegeTag: 'A professional academic laboratory portal',
  student: {
    name: 'YOUR STUDENT NAME',
    rollNo: 'YOUR ROLL NUMBER',
    section: 'A',
    branch: 'CSE - Data Science',
    department: 'Data Science',
    courseId: 'DS-101',
  },
  faculty: {
    name: 'FACULTY NAME',
    designation: 'Assistant Professor',
  },
  course: {
    name: 'Data Science Laboratory',
    courseId: 'DS-101',
    department: 'Data Science',
    academicYear: '2026-2027',
    semester: 'Semester 5',
  },
  syllabusLabel: 'Download Syllabus',
  syllabusFile: '/resources/syllabus-placeholder.txt',
};

const storageKey = 'ds-lab-site-data';

function normalizeString(value, fallback) {
  return value === undefined || value === null || value === '' ? fallback : value;
}

function normalizeLogoUrl(value) {
  const fallback = defaultSiteData.collegeLogo;

  if (typeof value !== 'string') {
    return fallback;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return fallback;
  }

  const validPatterns = [/^\//, /^https?:\/\//i, /^data:/i];

  if (validPatterns.some((pattern) => pattern.test(trimmed))) {
    return trimmed;
  }

  return fallback;
}

function normalizeSiteData(data = {}) {
  const merged = {
    ...defaultSiteData,
    ...data,
    collegeLogo: normalizeLogoUrl(data.collegeLogo),
    collegeName: normalizeString(data.collegeName, defaultSiteData.collegeName),
    laboratoryName: normalizeString(data.laboratoryName, defaultSiteData.laboratoryName),
    department: normalizeString(data.department, defaultSiteData.department),
    academicYear: normalizeString(data.academicYear, defaultSiteData.academicYear),
    semester: normalizeString(data.semester, defaultSiteData.semester),
    collegeTag: normalizeString(data.collegeTag, defaultSiteData.collegeTag),
    student: {
      ...defaultSiteData.student,
      ...(data.student || {}),
      name: normalizeString((data.student || {}).name, defaultSiteData.student.name),
      rollNo: normalizeString((data.student || {}).rollNo, defaultSiteData.student.rollNo),
      section: normalizeString((data.student || {}).section, defaultSiteData.student.section),
      branch: normalizeString((data.student || {}).branch, defaultSiteData.student.branch),
      department: normalizeString((data.student || {}).department, defaultSiteData.student.department),
      courseId: normalizeString((data.student || {}).courseId, defaultSiteData.student.courseId),
    },
    faculty: {
      ...defaultSiteData.faculty,
      ...(data.faculty || {}),
      name: normalizeString((data.faculty || {}).name, defaultSiteData.faculty.name),
      designation: normalizeString((data.faculty || {}).designation, defaultSiteData.faculty.designation),
    },
    course: {
      ...defaultSiteData.course,
      ...(data.course || {}),
      name: normalizeString((data.course || {}).name, defaultSiteData.course.name),
      courseId: normalizeString((data.course || {}).courseId, defaultSiteData.course.courseId),
      department: normalizeString((data.course || {}).department, defaultSiteData.course.department),
      academicYear: normalizeString((data.course || {}).academicYear, defaultSiteData.course.academicYear),
      semester: normalizeString((data.course || {}).semester, defaultSiteData.course.semester),
    },
    syllabusLabel: normalizeString(data.syllabusLabel, defaultSiteData.syllabusLabel),
    syllabusFile: normalizeString(data.syllabusFile, defaultSiteData.syllabusFile),
  };

  return merged;
}

function loadSavedSiteData() {
  if (typeof window === 'undefined') {
    return normalizeSiteData();
  }

  try {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return normalizeSiteData();

    const parsed = JSON.parse(saved);
    return normalizeSiteData(parsed);
  } catch {
    return normalizeSiteData();
  }
}

export const siteData = loadSavedSiteData();

export function saveSiteData(nextData) {
  const merged = normalizeSiteData({
    ...siteData,
    ...nextData,
    collegeLogo: normalizeLogoUrl(nextData.collegeLogo || siteData.collegeLogo),
    student: { ...(siteData.student || {}), ...(nextData.student || {}) },
    faculty: { ...(siteData.faculty || {}), ...(nextData.faculty || {}) },
    course: { ...(siteData.course || {}), ...(nextData.course || {}) },
  });

  Object.keys(siteData).forEach((key) => delete siteData[key]);
  Object.assign(siteData, merged);

  if (typeof window !== 'undefined') {
    localStorage.setItem(storageKey, JSON.stringify(siteData));
  }

  return siteData;
}
