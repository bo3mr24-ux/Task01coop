import { getAbout } from "../../data/conferenceStore";
import "./AboutConferenceSection.css";


export default function AboutConferenceSection() {
  // النص يُقرأ من المحتوى القابل للتحرير (localStorage) مع قيمة افتراضية.
  const aboutText = getAbout();
  return (
    <section className="about-section" dir="rtl">
      <div className="container">
        <header className="about-section-head">
          <h2 className="about-section-title">عن المؤتمر</h2>
          <span className="about-section-divider" aria-hidden="true" />
        </header>

        <div className="about-section-card">
          <p className="about-section-text">{aboutText}</p>
        </div>
      </div>
    </section>
  );
}
