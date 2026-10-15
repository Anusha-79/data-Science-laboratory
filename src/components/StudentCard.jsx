import { useEffect, useMemo, useState } from 'react';
import { Download, ExternalLink, IdCard, Instagram, Linkedin, Pencil, Save, X } from 'lucide-react';
import { saveSiteData, siteData } from '../data/siteData';

const defaultDraft = () => ({
  name: siteData.student.name,
  rollNo: siteData.student.rollNo,
  section: siteData.student.section,
  branch: siteData.student.branch,
  department: siteData.student.department,
  courseId: siteData.student.courseId,
  photo: siteData.student.photo,
  instagram: siteData.student.instagram,
  linkedin: siteData.student.linkedin,
  github: siteData.student.github,
  leetcode: siteData.student.leetcode,
  email: siteData.resume.email,
  intro: siteData.student.aboutMe,
});

function StudentCard({ onEdit, openInitially = false }) {
  const [isProfileOpen, setIsProfileOpen] = useState(openInitially);
  const [draft, setDraft] = useState(defaultDraft());
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const student = siteData.student;

  useEffect(() => {
    if (openInitially) {
      setIsProfileOpen(true);
      setDraft(defaultDraft());
    }
  }, [openInitially]);

  const profileLinks = useMemo(() => ({
    leetcode: student.leetcode,
    linkedin: student.linkedin,
    github: student.github,
    instagram: student.instagram,
  }), [student]);

  const openProfile = () => {
    setDraft(defaultDraft());
    setError('');
    setIsEditing(false);
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
    setError('');
    setIsEditing(false);
  };

  const validateUrl = (value) => {
    if (!value) return true;
    try {
      const url = new URL(value);
      return ['http:', 'https:'].includes(url.protocol);
    } catch {
      return false;
    }
  };

  const handleProfileSave = (event) => {
    event.preventDefault();
    const urlFields = ['instagram', 'linkedin', 'github', 'leetcode'];
    const invalid = urlFields.find((field) => draft[field] && !validateUrl(draft[field]));

    if (invalid) {
      setError(`Please enter a valid URL for ${invalid}.`);
      return;
    }

    saveSiteData({
      student: {
        ...siteData.student,
        name: draft.name.trim() || siteData.student.name,
        rollNo: draft.rollNo.trim() || siteData.student.rollNo,
        section: draft.section.trim() || siteData.student.section,
        branch: draft.branch.trim() || siteData.student.branch,
        department: draft.department.trim() || siteData.student.department,
        courseId: draft.courseId.trim() || siteData.student.courseId,
        photo: draft.photo.trim() || siteData.student.photo,
        instagram: draft.instagram.trim(),
        linkedin: draft.linkedin.trim(),
        github: draft.github.trim(),
        leetcode: draft.leetcode.trim(),
        aboutMe: draft.intro.trim() || siteData.student.aboutMe,
      },
      resume: {
        ...siteData.resume,
        email: draft.email.trim(),
      },
    });

    setIsEditing(false);
    closeProfile();
    window.dispatchEvent(new Event('site-data-updated'));
  };

  const socialLinks = [
    { key: 'instagram', label: 'Instagram', href: student.instagram, icon: Instagram },
    { key: 'leetcode', label: 'LeetCode', href: student.leetcode },
    { key: 'linkedin', label: 'LinkedIn', href: student.linkedin, icon: Linkedin },
    { key: 'github', label: 'GitHub', href: student.github },
  ].filter((link) => link.href && link.href.trim());

  return (
    <div className="info-card accent-blue student-card-shell">
      <div className="card-header-row">
        <div className="card-icon soft-blue">
          <IdCard size={18} />
        </div>
        <div>
          <p className="eyebrow">Student Information</p>
          <h3>Student ID Card</h3>
        </div>
        <button type="button" className="secondary-button small-button" onClick={onEdit || openProfile}>
          <Pencil size={15} /> {onEdit ? 'Edit' : 'Edit Profile'}
        </button>
      </div>

      <div className="student-id-card" onClick={openProfile} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openProfile(); } }}>
        <div className="student-id-card-header">
          <img src={siteData.collegeLogo} alt="" className="student-id-logo" />
          <div className="student-id-college">
            <strong>{siteData.collegeName}</strong>
            <span>{siteData.department}</span>
          </div>
          <span className="student-id-label">STUDENT ID</span>
        </div>

        <div className="student-id-card-main">
          <div className="student-id-photo-wrap">
              <button
                type="button"
                className="student-id-photo-button"
                onClick={(event) => {
                  event.stopPropagation();
                  const resumeSection = document.getElementById('resume-section');
                  if (resumeSection) {
                    resumeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    return;
                  }
                  window.location.href = '/#resume-section';
                }}
                aria-label="Open resume section"
              >
                <img src={student.photo} alt={student.name} className="student-id-photo" />
              </button>
              <button type="button" className="student-photo-edit-button" onClick={(event) => { event.stopPropagation(); onEdit ? onEdit() : openProfile(); }} aria-label="Edit student photo">
                <Pencil size={12} />
              </button>
            </div>
          <div className="student-id-details">
            <h4>{student.name}</h4>
            <p>{student.branch}</p>
            <div className="student-id-fields">
              <div><span>Roll No</span><strong>{student.rollNo}</strong></div>
              <div><span>Section</span><strong>{student.section}</strong></div>
              <div><span>Department</span><strong>{student.department}</strong></div>
              <div><span>Course ID</span><strong>{student.courseId}</strong></div>
            </div>
          </div>
        </div>

        <div className="student-id-card-footer">
          <span>{siteData.laboratoryName}</span>
          <span>{siteData.academicYear} · {siteData.semester}</span>
        </div>
      </div>

      <div className="social-links">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a key={link.key} href={link.href} target="_blank" rel="noopener noreferrer">
              {Icon ? <Icon size={14} /> : null}
              {link.label}
            </a>
          );
        })}
      </div>

      <div className="student-card-footer-actions">
        <button type="button" className="secondary-button small-button" onClick={() => document.getElementById('resume-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
          <ExternalLink size={15} /> View Resume
        </button>
        <a className="secondary-button small-button" href={siteData.resume ? undefined : '#'} onClick={(event) => { event.preventDefault(); document.getElementById('resume-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
          <Download size={15} /> Download Resume
        </a>
      </div>

      {isProfileOpen && (
        <div className="profile-modal-backdrop" onClick={closeProfile}>
          <div className="profile-modal" onClick={(event) => event.stopPropagation()}>
            <div className="profile-modal-header">
              <div>
                <p className="eyebrow">Student Profile</p>
                <h3>Digital Identity Card</h3>
              </div>
              <button type="button" className="secondary-button small-button" onClick={closeProfile}>
                <X size={15} /> Close
              </button>
            </div>

            {isEditing ? (
              <form className="profile-form" onSubmit={handleProfileSave}>
                <div className="profile-grid">
                  <label>Full Name <input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /></label>
                  <label>Roll Number <input value={draft.rollNo} onChange={(event) => setDraft({ ...draft, rollNo: event.target.value })} /></label>
                  <label>Section <input value={draft.section} onChange={(event) => setDraft({ ...draft, section: event.target.value })} /></label>
                  <label>Branch <input value={draft.branch} onChange={(event) => setDraft({ ...draft, branch: event.target.value })} /></label>
                  <label>Department <input value={draft.department} onChange={(event) => setDraft({ ...draft, department: event.target.value })} /></label>
                  <label>Course ID <input value={draft.courseId} onChange={(event) => setDraft({ ...draft, courseId: event.target.value })} /></label>
                  <label className="full-width">Student Photo URL <input value={draft.photo} onChange={(event) => setDraft({ ...draft, photo: event.target.value })} /></label>
                  <label>Instagram <input value={draft.instagram} onChange={(event) => setDraft({ ...draft, instagram: event.target.value })} /></label>
                  <label>LinkedIn <input value={draft.linkedin} onChange={(event) => setDraft({ ...draft, linkedin: event.target.value })} /></label>
                  <label>GitHub <input value={draft.github} onChange={(event) => setDraft({ ...draft, github: event.target.value })} /></label>
                  <label>LeetCode <input value={draft.leetcode} onChange={(event) => setDraft({ ...draft, leetcode: event.target.value })} /></label>
                  <label>Email <input type="email" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} /></label>
                  <label className="full-width">Professional Introduction <textarea rows={3} value={draft.intro} onChange={(event) => setDraft({ ...draft, intro: event.target.value })} /></label>
                </div>
                {error && <p className="profile-form-error">{error}</p>}
                <div className="form-actions">
                  <button type="submit" className="primary-button"><Save size={15} /> Save</button>
                  <button type="button" className="secondary-button" onClick={() => { setIsEditing(false); setDraft(defaultDraft()); setError(''); }}>Cancel</button>
                </div>
              </form>
            ) : (
              <div className="profile-content">
                <div className="profile-card-header">
                  <img src={siteData.student.photo} alt={siteData.student.name} className="profile-avatar" />
                  <div>
                    <h4>{siteData.student.name}</h4>
                    <p>{siteData.student.branch}</p>
                    <span>{siteData.collegeName}</span>
                  </div>
                </div>

                <div className="profile-meta-grid">
                  <div><span>Degree</span><strong>B.Tech</strong></div>
                  <div><span>Branch</span><strong>Computer Science and Engineering</strong></div>
                  <div><span>Specialization</span><strong>Data Science</strong></div>
                  <div><span>Graduation</span><strong>2028</strong></div>
                  <div><span>Roll Number</span><strong>{siteData.student.rollNo}</strong></div>
                  <div><span>Section</span><strong>{siteData.student.section}</strong></div>
                  <div><span>Email</span><strong>{siteData.resume.email || 'Not configured'}</strong></div>
                  <div><span>Student Photo</span><strong>Included</strong></div>
                </div>

                <div className="profile-intro-box">
                  <h5>Professional Introduction</h5>
                  <p>{siteData.student.aboutMe}</p>
                </div>

                <div className="profile-social-links">
                  {profileLinks.instagram && <a href={profileLinks.instagram} target="_blank" rel="noreferrer noopener">Instagram</a>}
                  {profileLinks.linkedin && <a href={profileLinks.linkedin} target="_blank" rel="noreferrer noopener">LinkedIn</a>}
                  {profileLinks.github && <a href={profileLinks.github} target="_blank" rel="noreferrer noopener">GitHub</a>}
                  {profileLinks.leetcode && <a href={profileLinks.leetcode} target="_blank" rel="noreferrer noopener">LeetCode</a>}
                </div>

                <div className="profile-actions">
                  <button type="button" className="primary-button" onClick={() => setIsEditing(true)}><Pencil size={15} /> Edit Profile</button>
                  <button type="button" className="secondary-button" onClick={() => document.getElementById('resume-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}><ExternalLink size={15} /> View Resume</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentCard;
