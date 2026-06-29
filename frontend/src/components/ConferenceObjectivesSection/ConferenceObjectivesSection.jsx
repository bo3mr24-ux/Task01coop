import { fetchObjectives, DEFAULT_OBJECTIVES, useRemoteContent } from "../../data/conferenceStore";
import "./ConferenceObjectivesSection.css";

export default function ConferenceObjectivesSection() {
  // الأهداف تُجلب من قاعدة البيانات عبر الـ API مع قيمة افتراضية احتياطية.
  const objectives = useRemoteContent(fetchObjectives, DEFAULT_OBJECTIVES);

  return (
    <section id="conference-objectives" className="objectives-section" dir="rtl">
      <div className="container">
        <header className="objectives-head">
          <h2 className="objectives-section-title">أهداف المؤتمر</h2>
          <span className="objectives-section-divider" aria-hidden="true" />
        </header>

        <div className="row g-4 justify-content-center">
          {objectives.map((objective, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={index}>
              <article className="objective-card">
                <h3 className="objective-card-title">{objective.title}</h3>
                <p className="objective-card-text">{objective.description}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
