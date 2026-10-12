import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { saveSiteData, siteData } from '../data/siteData';

function Admin() {
  const [formData, setFormData] = useState({
    ...siteData,
    student: { ...siteData.student },
    resume: { ...siteData.resume },
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
            <label>
              Student Photo URL
              <input value={formData.student.photo} onChange={(event) => handleFieldChange('student', 'photo', event.target.value)} />
            </label>
            <label className="full-width">
              About Me (Resume)
              <textarea
                value={formData.student.aboutMe}
                onChange={(event) => handleFieldChange('student', 'aboutMe', event.target.value)}
                placeholder="Write a short introduction about your skills, interests, and career goals."
                rows={4}
              />
            </label>
            <label>
              LeetCode URL
              <input value={formData.student.leetcode} onChange={(event) => handleFieldChange('student', 'leetcode', event.target.value)} />
            </label>
            <label>
              LinkedIn URL
              <input value={formData.student.linkedin} onChange={(event) => handleFieldChange('student', 'linkedin', event.target.value)} />
            </label>
            <label>
              GitHub URL
              <input value={formData.student.github} onChange={(event) => handleFieldChange('student', 'github', event.target.value)} />
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

          <div className="form-section-title">Resume Profile</div>
          <div className="form-grid">
            <label>
              Degree
              <input value={formData.resume.degree} onChange={(event) => handleFieldChange('resume', 'degree', event.target.value)} />
            </label>
            <label>
              Specialization
              <input value={formData.resume.specialization} onChange={(event) => handleFieldChange('resume', 'specialization', event.target.value)} />
            </label>
            <label>
              Institution
              <input value={formData.resume.institution} onChange={(event) => handleFieldChange('resume', 'institution', event.target.value)} />
            </label>
            <label>
              Institution Location
              <input value={formData.resume.location} onChange={(event) => handleFieldChange('resume', 'location', event.target.value)} />
            </label>
            <label>
              Expected Graduation
              <input value={formData.resume.graduation} onChange={(event) => handleFieldChange('resume', 'graduation', event.target.value)} />
            </label>
            <label>
              Contact Email
              <input type="email" value={formData.resume.email} onChange={(event) => handleFieldChange('resume', 'email', event.target.value)} placeholder="Add a professional email before publishing" />
            </label>
            <label>
              Contact Phone (optional)
              <input type="tel" value={formData.resume.phone} onChange={(event) => handleFieldChange('resume', 'phone', event.target.value)} placeholder="Add a phone number if you want it public" />
            </label>
            <label>
              Project Title
              <input value={formData.resume.project} onChange={(event) => handleFieldChange('resume', 'project', event.target.value)} />
            </label>
            <label className="full-width">
              Professional Summary
              <textarea
                value={formData.resume.summary}
                onChange={(event) => handleFieldChange('resume', 'summary', event.target.value)}
                rows={4}
              />
            </label>
            <label className="full-width">
              Technical Skills (comma separated)
              <input
                value={formData.resume.skills.join(', ')}
                onChange={(event) => handleFieldChange('resume', 'skills', event.target.value.split(',').map((item) => item.trim()).filter(Boolean))}
              />
            </label>
            <label className="full-width">
              Areas of Interest (comma separated)
              <input
                value={formData.resume.interests.join(', ')}
                onChange={(event) => handleFieldChange('resume', 'interests', event.target.value.split(',').map((item) => item.trim()).filter(Boolean))}
              />
            </label>
            <label className="full-width">
              Professional Goal
              <textarea
                value={formData.resume.goal}
                onChange={(event) => handleFieldChange('resume', 'goal', event.target.value)}
                rows={3}
              />
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
