import "./AgendaSection.css";

const DAYS = [
  {
    id: "day1",
    label: "اليوم الأول",
    date: "04 فبراير 2026",
    items: [
      "التسجيل",
      "الافتتاح",
      "مواجهة مخاطر المناخ وتخفيف آثارها على موارد المياه",
      "استراتيجيات فعالة لإعادة استخدام المياه المعالجة وحوكمتها",
      "ابتكارات رائدة في تقنيات الري نحو استدامة الموارد المائية",
      "استراتيجيات الحوكمة الفعالة لتمويل قطاع الري رؤى للمستقبل",
    ],
  },
  {
    id: "day2",
    label: "اليوم الثاني",
    date: "05 فبراير 2026",
    items: [
      "التسجيل",
      "الجلسة الأولى",
      "الجلسة الثانية",
      "جلسة نقاش",
      "التوصيات الختامية",
    ],
  },
];

export default function AgendaSection() {
  return (
    <section id="agenda" className="agenda-section" dir="rtl">
      <div className="container">

        <header className="agenda-head">
          <h2 className="agenda-title">الأجندة</h2>
          <span className="agenda-accent" aria-hidden="true" />
        </header>

        <div className="accordion agenda-accordion" id="agendaAccordion">
          {DAYS.map((day, index) => {
            const isFirst = index === 0;
            return (
              <div className="accordion-item" key={day.id}>
                <h2 className="accordion-header" id={`${day.id}-header`}>
                  <button
                    className={`accordion-button ${isFirst ? "" : "collapsed"}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${day.id}`}
                    aria-expanded={isFirst ? "true" : "false"}
                    aria-controls={day.id}
                  >
                    <span className="d-flex flex-column gap-1">
                      <span className="agenda-panel-label">{day.label}</span>
                      <span className="agenda-panel-date">{day.date}</span>
                    </span>
                  </button>
                </h2>
                <div
                  id={day.id}
                  className={`accordion-collapse collapse ${isFirst ? "show" : ""}`}
                  aria-labelledby={`${day.id}-header`}
                  data-bs-parent="#agendaAccordion"
                >
                  <div className="accordion-body">
                    <ul className="agenda-list list-unstyled m-0">
                      {day.items.map((item, idx) => (
                        <li className="agenda-item d-flex" key={idx}>
                          <span className="agenda-item-dot" aria-hidden="true" />
                          <span className="agenda-item-text">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
