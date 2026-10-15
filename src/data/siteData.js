const defaultStudentPhoto = '/student-photo.jpg';
const legacyStudentPhoto = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80';

const defaultSiteData = {
  collegeName: 'Mohan Babu University',
  collegeLogo: '/logo.png',
  laboratoryName: 'DS Laboratory',
  department: 'School of Computing',
  courseId: 'DS-101',
  academicYear: '2026-2027',
  semester: 'Semester 5',
  collegeTag: 'A professional academic laboratory portal',
  student: {
    name: 'Munga Anusha',
    rollNo: 'Not provided',
    section: 'A',
    branch: 'CSE - Data Science',
    department: 'Data Science',
    courseId: 'DS-101',
    photo: defaultStudentPhoto,
    aboutMe: 'I am Munga Anusha, a B.Tech Computer Science and Engineering student specializing in Data Science at Mohan Babu University. I am focused on improving my programming logic, building practical projects, and preparing for technical internships and placements in AI/ML, Python, and software development.',
    leetcode: '',
    linkedin: '',
    instagram: '',
    github: '',
  },
  resume: {
    degree: 'B.Tech in Computer Science and Engineering',
    specialization: 'Data Science',
    institution: 'Mohan Babu University',
    location: 'Tirupati, Andhra Pradesh',
    graduation: '2028',
    email: '',
    phone: '',
    summary: 'Computer Science and Engineering student specializing in Data Science at Mohan Babu University. Building a strong foundation in programming, data structures, and data analysis, with an interest in applying these skills to practical software and data projects.',
    skills: ['Python', 'Java', 'C', 'MS Excel'],
    interests: ['Data Science', 'Python Development', 'Data Structures and Algorithms', 'Machine Learning'],
    project: 'Data Science Subject Laboratory',
    goal: 'Seeking software engineering and data-focused internship opportunities.',
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

function normalizeLaboratoryName(value) {
  const name = normalizeString(value, defaultSiteData.laboratoryName);
  return name === 'Data Science Laboratory' ? defaultSiteData.laboratoryName : name;
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

function normalizeStudentPhoto(value) {
  if (typeof value !== 'string') {
    return defaultStudentPhoto;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return defaultStudentPhoto;
  }

  if (trimmed === legacyStudentPhoto) {
    return defaultStudentPhoto;
  }

  const validPatterns = [/^\//, /^https?:\/\//i, /^data:/i];
  if (validPatterns.some((pattern) => pattern.test(trimmed))) {
    return trimmed;
  }

  return defaultStudentPhoto;
}

function normalizeProfileUrl(value) {
  if (typeof value !== 'string') {
    return '';
  }

  const trimmed = value.trim();
  if (!trimmed || /yourusername/i.test(trimmed)) {
    return '';
  }

  return trimmed;
}

function normalizeSiteData(data = {}) {
  const resume = data.resume || {};
  const student = data.student || {};
  const studentName = normalizeString(student.name, defaultSiteData.student.name);
  const rollNumber = normalizeString(student.rollNo, defaultSiteData.student.rollNo);
  const merged = {
    ...defaultSiteData,
    ...data,
    collegeLogo: normalizeLogoUrl(data.collegeLogo),
    collegeName: normalizeString(data.collegeName, defaultSiteData.collegeName),
    laboratoryName: normalizeLaboratoryName(data.laboratoryName),
    department: normalizeString(data.department, defaultSiteData.department),
    academicYear: normalizeString(data.academicYear, defaultSiteData.academicYear),
    semester: normalizeString(data.semester, defaultSiteData.semester),
    collegeTag: normalizeString(data.collegeTag, defaultSiteData.collegeTag),
    student: {
      ...defaultSiteData.student,
      ...(data.student || {}),
      name: studentName === 'YOUR STUDENT NAME' ? defaultSiteData.student.name : studentName,
      rollNo: rollNumber === 'YOUR ROLL NUMBER' ? defaultSiteData.student.rollNo : rollNumber,
      section: normalizeString((data.student || {}).section, defaultSiteData.student.section),
      branch: normalizeString((data.student || {}).branch, defaultSiteData.student.branch),
      department: normalizeString((data.student || {}).department, defaultSiteData.student.department),
      courseId: normalizeString((data.student || {}).courseId, defaultSiteData.student.courseId),
      photo: normalizeStudentPhoto((data.student || {}).photo),
      aboutMe: normalizeString((data.student || {}).aboutMe, defaultSiteData.student.aboutMe),
      leetcode: normalizeProfileUrl((data.student || {}).leetcode),
      linkedin: normalizeProfileUrl((data.student || {}).linkedin),
      instagram: normalizeProfileUrl((data.student || {}).instagram),
      github: normalizeProfileUrl((data.student || {}).github),
    },
    resume: {
      ...defaultSiteData.resume,
      ...resume,
      email: normalizeString(resume.email, defaultSiteData.resume.email),
      phone: normalizeString(resume.phone, defaultSiteData.resume.phone),
      skills: Array.isArray(resume.skills) ? resume.skills : defaultSiteData.resume.skills,
      interests: Array.isArray(resume.interests) ? resume.interests : defaultSiteData.resume.interests,
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
    resume: { ...(siteData.resume || {}), ...(nextData.resume || {}) },
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
