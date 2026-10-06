import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { saveSiteData, siteData } from '../data/siteData';

function Admin() {
  const [formData, setFormData] = useState({
    ...siteData,
    student: { ...siteData.student },
    faculty: { ...siteData.faculty },
    course: { ...siteData.course },
  });

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
    window.dispatchEvent(new Event('site-data-updated'));
  };

  return (
    <div className="page-section admin-page">
      <section className="info-card editor-panel admin-panel">
        <div className="section-heading-row page-heading-inline">
          <div>
            <p className="eyebrow">Admin Dashboard</p>
            <h3>Manage College and Lab Details</h3>
          </div>
          <Link to="/" className="secondary-button small-button">
            <ArrowLeft size={16} /> Back Home
          </Link>
        </div>

        <form className="details-form admin-form" onSubmit={handleSave}>
          <div className="form-grid">
            <label>
              College Name
              <input value={formData.collegeName} onChange={(event) => setFormData({ ...formData, collegeName: event.target.value })} />
            </label>
            <label>
              Department
              <input value={formData.department} onChange={(event) => setFormData({ ...formData, department: event.target.value })} />
            </label>
            <label>
              Laboratory Name
              <input value={formData.laboratoryName} onChange={(event) => setFormData({ ...formData, laboratoryName: event.target.value })} />
            </label>
            <label>
              Academic Year
              <input value={formData.academicYear} onChange={(event) => setFormData({ ...formData, academicYear: event.target.value })} />
            </label>
            <label>
              Semester
              <input value={formData.semester} onChange={(event) => setFormData({ ...formData, semester: event.target.value })} />
            </label>
            <label>
              College Logo URL
              <input value={formData.collegeLogo} onChange={(event) => setFormData({ ...formData, collegeLogo: event.target.value })} />
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
              Student Department
              <input value={formData.student.department} onChange={(event) => handleFieldChange('student', 'department', event.target.value)} />
            </label>
            <label>
              Student Course ID
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
              Course Department
              <input value={formData.course.department} onChange={(event) => handleFieldChange('course', 'department', event.target.value)} />
            </label>
            <label>
              Course Academic Year
              <input value={formData.course.academicYear} onChange={(event) => handleFieldChange('course', 'academicYear', event.target.value)} />
            </label>
            <label>
              Course Semester
              <input value={formData.course.semester} onChange={(event) => handleFieldChange('course', 'semester', event.target.value)} />
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-button">
              <Save size={16} /> Save Details
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Admin;
