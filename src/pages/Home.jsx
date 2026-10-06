import { useState } from 'react';
import { ArrowRight, BookOpen, FolderOpen, GraduationCap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import StudentCard from '../components/StudentCard';
import FacultyCard from '../components/FacultyCard';
import DownloadButton from '../components/DownloadButton';
import { siteData, saveSiteData } from '../data/siteData';
import { modules } from '../data/modules';

function Home() {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [formData, setFormData] = useState({
    ...siteData,
    student: { ...siteData.student },
    faculty: { ...siteData.faculty },
    course: { ...siteData.course },
  });

  const openEditor = () => {
    setFormData({
      ...siteData,
      student: { ...siteData.student },
      faculty: { ...siteData.faculty },
      course: { ...siteData.course },
    });
    setIsEditorOpen(true);
  };

  const handleFieldChange = (section, key, value) => {
    setFormData((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [key]: value,
      },
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    saveSiteData(formData);
    setIsEditorOpen(false);
    window.dispatchEvent(new Event('site-data-updated'));
  };

  return (
    <div className="page-section">
      <section className="hero-panel">
        <div className="hero-content">
          <span className="hero-tag">{siteData.department}</span>
          <h1>{siteData.collegeName}</h1>
          <h2>{siteData.laboratoryName}</h2>
          <p>{siteData.collegeTag}</p>
          <div className="hero-actions">
            <Link to="/modules" className="primary-button">
              Explore Modules <ArrowRight size={16} />
            </Link>
            <Link to="/experiments" className="secondary-button">
              View Experiments
            </Link>
            <button type="button" className="secondary-button" onClick={openEditor}>
              Edit Details
            </button>
            <Link to="/admin" className="secondary-button">
              Admin Panel
            </Link>
          </div>
        </div>

        <div className="hero-meta">
          <div className="mini-stat">
            <BookOpen size={18} />
            <div>
              <strong>{modules.length}</strong>
              <span>Modules</span>
            </div>
          </div>
          <div className="mini-stat">
            <FolderOpen size={18} />
            <div>
              <strong>10</strong>
              <span>Experiments</span>
            </div>
          </div>
          <div className="mini-stat">
            <GraduationCap size={18} />
            <div>
              <strong>{siteData.academicYear}</strong>
              <span>Academic Year</span>
            </div>
          </div>
        </div>
      </section>

      {isEditorOpen && (
        <section className="info-card editor-panel">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Edit Details</p>
              <h3>Update College and Lab Information</h3>
            </div>
            <button type="button" className="secondary-button small-button" onClick={() => setIsEditorOpen(false)}>
              Close
            </button>
          </div>

          <form className="details-form" onSubmit={handleSave}>
            <div className="form-grid">
              <label>
                College Name
                <input value={formData.collegeName} onChange={(event) => setFormData({ ...formData, collegeName: event.target.value })} />
              </label>
              <label>
                College Logo URL
                <input value={formData.collegeLogo} onChange={(event) => setFormData({ ...formData, collegeLogo: event.target.value })} />
              </label>
              <label>
                Subject Laboratory Name
                <input value={formData.laboratoryName} onChange={(event) => setFormData({ ...formData, laboratoryName: event.target.value })} />
              </label>
              <label>
                Department
                <input value={formData.department} onChange={(event) => setFormData({ ...formData, department: event.target.value })} />
              </label>
              <label>
                Academic Year
                <input value={formData.academicYear} onChange={(event) => setFormData({ ...formData, academicYear: event.target.value })} />
              </label>
              <label>
                Semester
                <input value={formData.semester} onChange={(event) => setFormData({ ...formData, semester: event.target.value })} />
              </label>
              <label className="full-width">
                Tagline
                <input value={formData.collegeTag} onChange={(event) => setFormData({ ...formData, collegeTag: event.target.value })} />
              </label>
            </div>

            <div className="form-section-title">Student Details</div>
            <div className="form-grid">
              <label>
                Student Name
                <input value={formData.student.name} onChange={(event) => handleFieldChange('student', 'name', event.target.value)} />
              </label>
              <label>
                Roll Number
                <input value={formData.student.rollNo} onChange={(event) => handleFieldChange('student', 'rollNo', event.target.value)} />
              </label>
              <label>
                Section
                <input value={formData.student.section} onChange={(event) => handleFieldChange('student', 'section', event.target.value)} />
              </label>
              <label>
                Branch
                <input value={formData.student.branch} onChange={(event) => handleFieldChange('student', 'branch', event.target.value)} />
              </label>
              <label>
                Department
                <input value={formData.student.department} onChange={(event) => handleFieldChange('student', 'department', event.target.value)} />
              </label>
              <label>
                Course ID
                <input value={formData.student.courseId} onChange={(event) => handleFieldChange('student', 'courseId', event.target.value)} />
              </label>
            </div>

            <div className="form-section-title">Faculty Details</div>
            <div className="form-grid">
              <label>
                Faculty Name
                <input value={formData.faculty.name} onChange={(event) => handleFieldChange('faculty', 'name', event.target.value)} />
              </label>
              <label>
                Designation
                <input value={formData.faculty.designation} onChange={(event) => handleFieldChange('faculty', 'designation', event.target.value)} />
              </label>
            </div>

            <div className="form-section-title">Course Information</div>
            <div className="form-grid">
              <label>
                Course Name
                <input value={formData.course.name} onChange={(event) => handleFieldChange('course', 'name', event.target.value)} />
              </label>
              <label>
                Course ID
                <input value={formData.course.courseId} onChange={(event) => handleFieldChange('course', 'courseId', event.target.value)} />
              </label>
              <label>
                Department
                <input value={formData.course.department} onChange={(event) => handleFieldChange('course', 'department', event.target.value)} />
              </label>
              <label>
                Academic Year
                <input value={formData.course.academicYear} onChange={(event) => handleFieldChange('course', 'academicYear', event.target.value)} />
              </label>
              <label>
                Semester
                <input value={formData.course.semester} onChange={(event) => handleFieldChange('course', 'semester', event.target.value)} />
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-button">Save Changes</button>
              <button type="button" className="secondary-button" onClick={() => setIsEditorOpen(false)}>Cancel</button>
            </div>
          </form>
        </section>
      )}

      <section className="cards-grid two-up">
        <StudentCard />
        <FacultyCard />
      </section>

      <section className="course-panel info-card">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Course Information</p>
            <h3>Laboratory Overview</h3>
          </div>
          <Sparkles size={18} className="sparkle" />
        </div>

        <div className="course-grid">
          <div><span>Course/Laboratory Name</span><strong>{siteData.course.name}</strong></div>
          <div><span>Course ID</span><strong>{siteData.course.courseId}</strong></div>
          <div><span>Department</span><strong>{siteData.course.department}</strong></div>
          <div><span>Academic Year</span><strong>{siteData.course.academicYear}</strong></div>
          <div><span>Semester</span><strong>{siteData.course.semester}</strong></div>
        </div>
      </section>

      <section className="syllabus-panel info-card">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Academic Outline</p>
            <h3>Syllabus</h3>
          </div>
          <DownloadButton label={siteData.syllabusLabel} href={siteData.syllabusFile} filename="syllabus.pdf" className="primary-button" />
        </div>

        <div className="syllabus-list">
          {modules.map((module) => (
            <div key={module.id} className="syllabus-module">
              <h4>Module {module.number}: {module.title}</h4>
              <ul>
                {module.syllabusTopics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
