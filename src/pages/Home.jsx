import { Printer, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import StudentCard from '../components/StudentCard';
import FacultyCard from '../components/FacultyCard';
import DownloadButton from '../components/DownloadButton';
import { siteData } from '../data/siteData';
import { modules } from '../data/modules';

function Home() {
  const handlePrintResume = () => {
    document.body.dataset.printTarget = 'resume';
    window.addEventListener('afterprint', () => {
      delete document.body.dataset.printTarget;
    }, { once: true });
    window.print();
  };

  const handleResumeDownload = () => {
    const { student, resume } = siteData;
    const content = [
      student.name,
      `${resume.degree} | ${student.branch} | ${resume.specialization}`,
      `${resume.institution}, ${resume.location} | Expected graduation: ${resume.graduation}`,
      '',
      'PROFESSIONAL SUMMARY',
      resume.summary,
      '',
      'EDUCATION',
      `${resume.degree} in ${student.branch}`,
      `Specialization: ${resume.specialization}`,
      `${resume.institution}, ${resume.location}`,
      `Expected graduation: ${resume.graduation}`,
      '',
      'TECHNICAL SKILLS',
      ...resume.skills.map(({ category, values }) => `${category}: ${values.join(', ')}`),
      '',
      'PROJECTS',
      ...resume.projects.flatMap(({ name, description }) => [name, description, '']),
      'LEADERSHIP AND ACTIVITIES',
      ...resume.leadership,
      '',
      'CURRENT LEARNING',
      ...resume.currentLearning.map((item) => `- ${item}`),
      '',
      'CAREER OBJECTIVE',
      resume.goal,
      '',
      'PROFESSIONAL PROFILES',
      `GitHub: ${student.github}`,
      `LinkedIn: ${student.linkedin}`,
      `LeetCode: ${student.leetcode}`,
      ...(student.instagram ? [`Instagram: ${student.instagram}`] : []),
    ].join('\n');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'munga-anusha-resume.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
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
            <Link to="/modules" className="primary-button">Explore Modules</Link>
            <Link to="/experiments" className="secondary-button">View Experiments</Link>
          </div>
        </div>
      </section>

      <StudentCard />

      <section id="resume-section" className="resume-sheet" aria-labelledby="resume-heading">
        <div className="resume-heading-row">
          <div>
            <p className="eyebrow">About Me · Resume</p>
            <h2 id="resume-heading">{siteData.student.name}</h2>
            <p className="resume-subheading">
              {siteData.resume.degree} · {siteData.student.branch} · {siteData.resume.specialization}
            </p>
          </div>
          <div className="resume-actions no-print">
            <button type="button" className="secondary-button small-button" onClick={handleResumeDownload}>
              Download Resume
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
            </section>
            <section className="resume-block">
              <h3>Education</h3>
              <div className="resume-entry">
                <strong>{siteData.resume.degree}</strong>
                <span>Branch: {siteData.student.branch}</span>
                <span>Specialization: {siteData.resume.specialization}</span>
                <span>{siteData.resume.institution} · {siteData.resume.location}</span>
                <span>Expected graduation: {siteData.resume.graduation}</span>
              </div>
            </section>
            <section className="resume-block">
              <h3>Projects</h3>
              {siteData.resume.projects.map((project) => (
                <div className="resume-entry" key={project.name}>
                  <strong>{project.name}</strong>
                  <span>{project.description}</span>
                </div>
              ))}
            </section>
            <section className="resume-block">
              <h3>Career Objective</h3>
              <p className="resume-goal">{siteData.resume.goal}</p>
            </section>
          </div>

          <aside className="resume-side-column">
            <section className="resume-block">
              <h3>Technical Skills</h3>
              {siteData.resume.skills.map(({ category, values }) => (
                <div className="resume-entry" key={category}>
                  <strong>{category}</strong>
                  <ul className="resume-chip-list">
                    {values.map((skill) => <li key={skill}>{skill}</li>)}
                  </ul>
                </div>
              ))}
            </section>
            <section className="resume-block">
              <h3>Leadership and Activities</h3>
              <ul className="resume-interest-list">
                {siteData.resume.leadership.map((activity) => <li key={activity}>{activity}</li>)}
              </ul>
            </section>
            <section className="resume-block">
              <h3>Current Learning</h3>
              <ul className="resume-interest-list">
                {siteData.resume.currentLearning.map((topic) => <li key={topic}>{topic}</li>)}
              </ul>
              <p>
                <a href="https://www.hackerrank.com/" target="_blank" rel="noopener noreferrer">HackerRank</a>
                {' · '}
                <a href="https://www.freecodecamp.org/" target="_blank" rel="noopener noreferrer">freeCodeCamp</a>
              </p>
            </section>
            <section className="resume-block">
              <h3>Professional Profiles</h3>
              <div className="resume-profile-links">
                {[
                  ['GitHub', siteData.student.github],
                  ['LinkedIn', siteData.student.linkedin],
                  ['Instagram', siteData.student.instagram],
                  ['LeetCode', siteData.student.leetcode],
                ].filter(([, href]) => href).map(([label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </section>

      <section className="cards-grid two-up">
        <FacultyCard />
        <section className="course-panel info-card">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Course Information</p>
              <h2>Laboratory Overview</h2>
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
      </section>

      <section className="syllabus-panel info-card">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Academic Outline</p>
            <h2>Syllabus</h2>
          </div>
          <DownloadButton label={siteData.syllabusLabel} href={siteData.syllabusFile} filename="syllabus.pdf" className="primary-button" />
        </div>
        <div className="syllabus-list">
          {modules.map((module) => (
            <div key={module.id} className="syllabus-module">
              <h3>Module {module.number}: {module.title}</h3>
              <ul>{module.syllabusTopics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
