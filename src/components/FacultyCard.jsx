import { BriefcaseBusiness } from 'lucide-react';
import { siteData } from '../data/siteData';

function FacultyCard() {
  return (
    <div className="info-card accent-slate">
      <div className="card-header-row">
        <div className="card-icon soft-slate">
          <BriefcaseBusiness size={18} />
        </div>
        <div>
          <p className="eyebrow">Faculty Information</p>
          <h3>Faculty Details</h3>
        </div>
      </div>

      <div className="info-stack">
        <div>
          <span>Faculty Name</span>
          <strong>{siteData.faculty.name}</strong>
        </div>
        <div>
          <span>Designation</span>
          <strong>{siteData.faculty.designation}</strong>
        </div>
      </div>
    </div>
  );
}

export default FacultyCard;
