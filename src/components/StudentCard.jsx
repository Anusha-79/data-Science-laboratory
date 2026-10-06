import { UserRound } from 'lucide-react';
import { siteData } from '../data/siteData';

function StudentCard() {
  return (
    <div className="info-card accent-blue">
      <div className="card-header-row">
        <div className="card-icon soft-blue">
          <UserRound size={18} />
        </div>
        <div>
          <p className="eyebrow">Student Information</p>
          <h3>Student Details</h3>
        </div>
      </div>

      <div className="info-grid">
        <div><span>Student Name</span><strong>{siteData.student.name}</strong></div>
        <div><span>Roll No</span><strong>{siteData.student.rollNo}</strong></div>
        <div><span>Section</span><strong>{siteData.student.section}</strong></div>
        <div><span>Branch</span><strong>{siteData.student.branch}</strong></div>
        <div><span>Department</span><strong>{siteData.student.department}</strong></div>
        <div><span>Course ID</span><strong>{siteData.student.courseId}</strong></div>
      </div>
    </div>
  );
}

export default StudentCard;
