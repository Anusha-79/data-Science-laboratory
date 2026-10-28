import { ExternalLink, Github, IdCard, Instagram, Linkedin } from 'lucide-react';
import { siteData } from '../data/siteData';

function StudentCard() {
  const { student, resume } = siteData;
  const profileLinks = [
    { key: 'github', label: 'GitHub', href: student.github, icon: Github },
    { key: 'linkedin', label: 'LinkedIn', href: student.linkedin, icon: Linkedin },
    { key: 'instagram', label: 'Instagram', href: student.instagram, icon: Instagram },
    { key: 'leetcode', label: 'LeetCode', href: student.leetcode },
  ].filter((link) => link.href);

  return (
    <section className="info-card accent-blue student-card-shell" aria-labelledby="student-card-heading">
      <div className="card-header-row">
        <div className="card-icon soft-blue">
          <IdCard size={18} />
        </div>
        <div>
          <p className="eyebrow">Digital Student ID</p>
          <h2 id="student-card-heading">Student ID Card</h2>
        </div>
      </div>

      <div className="student-id-card">
        <div className="student-id-card-header">
          <img src={siteData.collegeLogo} alt="" className="student-id-logo" />
          <div className="student-id-college">
            <strong>{siteData.collegeName}</strong>
            <span>{student.department}</span>
          </div>
          <span className="student-id-label">STUDENT ID</span>
        </div>

        <div className="student-id-card-main">
          <div className="student-id-photo-wrap">
            <img src={student.photo} alt={`${student.name} profile`} className="student-id-photo" />
          </div>
          <div className="student-id-details">
            <h3>{student.name}</h3>
            <p>{resume.degree} · {student.branch}</p>
            <div className="student-id-fields">
              <div><span>Roll No</span><strong>{student.rollNo}</strong></div>
              <div><span>Section</span><strong>{student.section}</strong></div>
              <div><span>Specialization</span><strong>{resume.specialization}</strong></div>
              <div><span>Location</span><strong>{resume.location}</strong></div>
              <div><span>Expected Graduation</span><strong>{resume.graduation}</strong></div>
            </div>
          </div>
        </div>

        <div className="student-id-card-footer">
          <span>{siteData.laboratoryName}</span>
          <span>{student.department}</span>
        </div>
      </div>

      <div className="social-links" aria-label="Professional profiles">
        {profileLinks.map(({ key, label, href, icon: Icon }) => (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer">
            {Icon ? <Icon size={14} aria-hidden="true" /> : <ExternalLink size={14} aria-hidden="true" />}
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}

export default StudentCard;
