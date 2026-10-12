import { useState } from 'react';
import { ArrowRight, BookOpen, Download, ExternalLink, FileText, FolderOpen, GraduationCap, Pencil, Printer, Save, Sparkles, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import StudentCard from '../components/StudentCard';
import FacultyCard from '../components/FacultyCard';
import DownloadButton from '../components/DownloadButton';
import { siteData, saveSiteData } from '../data/siteData';
import { modules } from '../data/modules';

function Home() {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isAboutMeEditing, setIsAboutMeEditing] = useState(false);
  const [aboutMeDraft, setAboutMeDraft] = useState(siteData.student.aboutMe);
  const [formData, setFormData] = useState({
    ...siteData,
    student: { ...siteData.student },
    resume: { ...siteData.resume },
    faculty: { ...siteData.faculty },
    course: { ...siteData.course },
  });

  const openEditor = () => {
    setFormData({
      ...siteData,
      student: { ...siteData.student },
      resume: { ...siteData.resume },
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

  const handlePrintResume = () => {
    document.body.dataset.printTarget = 'resume';
    window.addEventListener('afterprint', () => {
      delete document.body.dataset.printTarget;
    }, { once: true });
    window.print();
  };

  const handleResumeDownload = () => {
    const resume = siteData.resume;
    const content = [
      siteData.student.name,
      `${resume.degree} | ${resume.specialization}`,
      `${resume.institution}, ${resume.location} | Expected graduation: ${resume.graduation}`,
      '',
      'PROFILE',
      resume.summary,
      '',
      'EDUCATION',
      `${resume.degree}, ${resume.specialization}`,
      `${resume.institution}, ${resume.location}`,
      `Expected graduation: ${resume.graduation}`,
      ...(resume.email ? [`Email: ${resume.email}`] : ['Contact email: Add in Admin before sharing']),
      ...(resume.phone ? [`Phone: ${resume.phone}`] : []),
      '',
      'TECHNICAL SKILLS',
      resume.skills.join(', '),
      '',
      'PROJECT',
      resume.project,
      '',
      'AREAS OF INTEREST',
      resume.interests.join(', '),
      '',
      'PROFESSIONAL GOAL',
      resume.goal,
      ...(siteData.student.github ? ['', `GitHub: ${siteData.student.github}`] : []),
      ...(siteData.student.linkedin ? [`LinkedIn: ${siteData.student.linkedin}`] : []),
    ].join('\n');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${siteData.student.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-resume.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleSave = (event) => {
    event.preventDefault();
    saveSiteData(formData);
    setIsEditorOpen(false);
    window.dispatchEvent(new Event('site-data-updated'));
  };

  const handleStudentPhotoUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageDataUrl = typeof reader.result === 'string' ? reader.result : '';
      if (imageDataUrl) {
        setFormData((current) => ({
          ...current,
          student: {
            ...current.student,
            photo: imageDataUrl,
          },
        }));
      }
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const resetStudentPhoto = () => {
    setFormData((current) => ({
      ...current,
      student: {
        ...current.student,
        photo: '/student-photo.jpg',
      },
    }));
  };

  const openAboutMeEditor = () => {
    setAboutMeDraft(siteData.student.aboutMe);
    setIsAboutMeEditing(true);
  };

  const handleAboutMeSave = (event) => {
    event.preventDefault();
    saveSiteData({
      student: { ...siteData.student, aboutMe: aboutMeDraft },
    });
    setIsAboutMeEditing(false);
    window.dispatchEvent(new Event('site-data-updated'));
  };

  return (
    <div className="page-section">
      <section className="hero-panel">
        <div className="hero-content">
          <span className="hero-tag">{siteData.department}</span>
          <h1>{siteData.laboratoryName}</h1>
          <h2>{siteData.collegeName}</h2>
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
              <div className="full-width student-photo-edit-panel">
                <div className="student-photo-preview-wrap">
                  <img src={formData.student.photo} alt="Student preview" className="student-photo-preview" />
                </div>
                <div className="student-photo-tools">
                  <label className="secondary-button small-button upload-button">
                    <Upload size={15} /> Upload Photo
                    <input type="file" accept="image/*" onChange={handleStudentPhotoUpload} />
                  </label>
                  <button type="button" className="secondary-button small-button" onClick={resetStudentPhoto}>
                    Use Default Photo
                  </button>
                </div>
              </div>
              <label className="full-width">
                Photo URL
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
        <StudentCard onEdit={openEditor} />
        <FacultyCard />
      </section>

      <section className="info-card resume-about-panel">
        <div className="section-heading-row">
          <div className="card-header-row">
            <div className="card-icon soft-blue">
              <FileText size={18} />
            </div>
            <div>
              <p className="eyebrow">Resume Profile</p>
              <h3>About Me</h3>
            </div>
          </div>
          {!isAboutMeEditing && (
            <button type="button" className="secondary-button small-button" onClick={openAboutMeEditor}>
            <Pencil size={15} /> Edit About Me
            </button>
          )}
        </div>
        {isAboutMeEditing ? (
          <form className="about-me-editor" onSubmit={handleAboutMeSave}>
            <label className="about-me-label" htmlFor="about-me-draft">About Me</label>
            <textarea
              id="about-me-draft"
              value={aboutMeDraft}
              onChange={(event) => setAboutMeDraft(event.target.value)}
              placeholder="Write a short introduction about your skills, interests, and career goals."
              rows={5}
              autoFocus
            />
            <div className="form-actions">
              <button type="submit" className="primary-button">
                <Save size={16} /> Save About Me
              </button>
              <button type="button" className="secondary-button" onClick={() => setIsAboutMeEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <p className="resume-about-text">
            {siteData.student.aboutMe || 'Add a short introduction about your skills, interests, and career goals using Edit About Me.'}
          </p>
        )}
      </section>

      <section className="resume-sheet" aria-labelledby="resume-heading">
        <div className="resume-heading-row">
          <div>
            <p className="eyebrow">Academic Profile</p>
            <h2 id="resume-heading">{siteData.student.name}</h2>
            <p className="resume-subheading">{siteData.resume.degree} · {siteData.resume.specialization}</p>
          </div>
          <div className="resume-actions no-print">
            <button type="button" className="secondary-button small-button" onClick={handleResumeDownload}>
              <Download size={15} /> Download resume
            </button>
            <button type="button" className="primary-button small-button" onClick={handlePrintResume}>
              <Printer size={15} /> Print / Save as PDF
            </button>
          </div>
        </div>

        <div className="resume-content-grid">
          <div className="resume-main-column">
            <section className="resume-block">
              <h3>Professional Summary</h3>
              <p>{siteData.resume.summary}</p>
              <p className="resume-goal">{siteData.resume.goal}</p>
            </section>
            <section className="resume-block">
              <h3>Education</h3>
              <div className="resume-entry">
                <strong>{siteData.resume.degree}</strong>
                <span>{siteData.resume.specialization}</span>
                <span>{siteData.resume.institution} · {siteData.resume.location}</span>
                <span>Expected graduation: {siteData.resume.graduation}</span>
              </div>
            </section>
            <section className="resume-block">
              <h3>Project</h3>
              <div className="resume-entry">
                <strong>{siteData.resume.project}</strong>
                <span>Academic laboratory portal featuring course modules, practical experiments, learning resources, and interactive code examples.</span>
              </div>
            </section>
          </div>
          <aside className="resume-side-column">
            <section className="resume-block">
              <h3>Contact</h3>
              <div className="resume-entry">
                {siteData.resume.email && <span>{siteData.resume.email}</span>}
                {siteData.resume.phone && <span>{siteData.resume.phone}</span>}
                {!siteData.resume.email && !siteData.resume.phone && (
                  <span>Contact information not provided. Add an email in Admin before sharing your resume.</span>
                )}
              </div>
            </section>
            <section className="resume-block">
              <h3>Technical Skills</h3>
              <ul className="resume-chip-list">
                {siteData.resume.skills.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
            </section>
            <section className="resume-block">
              <h3>Areas of Interest</h3>
              <ul className="resume-interest-list">
                {siteData.resume.interests.map((interest) => <li key={interest}>{interest}</li>)}
              </ul>
            </section>
            {(siteData.student.github || siteData.student.linkedin) && (
              <section className="resume-block">
                <h3>Professional Links</h3>
                <div className="resume-profile-links">
                  {siteData.student.github && (
                    <a href={siteData.student.github} target="_blank" rel="noopener noreferrer">
                      GitHub <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  )}
                  {siteData.student.linkedin && (
                    <a href={siteData.student.linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </section>
            )}
          </aside>
        </div>
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
