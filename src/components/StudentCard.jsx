import { IdCard, Pencil } from 'lucide-react';
import { siteData } from '../data/siteData';

function StudentCard({ onEdit }) {
  const student = siteData.student;

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
        <button type="button" className="secondary-button small-button" onClick={onEdit}>
          <Pencil size={15} /> Edit
        </button>
      </div>

      <div className="student-id-card">
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
            <img src={student.photo} alt={student.name} className="student-id-photo" />
            <button type="button" className="student-photo-edit-button" onClick={onEdit} aria-label="Edit student photo">
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
        {student.leetcode && <a href={student.leetcode} target="_blank" rel="noopener noreferrer">LeetCode</a>}
        {student.linkedin && <a href={student.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
        {student.github && <a href={student.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
      </div>
    </div>
  );
}

export default StudentCard;
