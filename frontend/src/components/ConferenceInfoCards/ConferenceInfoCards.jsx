import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { getConferenceTime } from "../../data/conferenceStore";
import "./ConferenceInfoCards.css";

const AR_MONTHS = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];

// تنسيق تاريخ ISO (YYYY-MM-DD) إلى صيغة عربية: "04 فبراير 2026"
function formatArabicDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${String(d).padStart(2, "0")} ${AR_MONTHS[m - 1]} ${y}`;
}

// تنسيق وقت 24 ساعة (HH:mm) إلى 12 ساعة عربية: "7:00 ص"
function formatArabicTime(time) {
  if (!time) return "";
  const [h, min] = time.split(":").map(Number);
  if (Number.isNaN(h)) return time;
  const period = h < 12 ? "ص" : "م";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(min || 0).padStart(2, "0")} ${period}`;
}

export default function ConferenceInfoCards() {
  // التاريخ والوقت يُقرآن من المحتوى القابل للتحرير (localStorage) مع قيم افتراضية.
  const t = getConferenceTime();
  const CARDS = [
    {
      icon: FaCalendarAlt,
      title: "التاريخ",
      text: `${formatArabicDate(t.startDate)} - ${formatArabicDate(t.endDate)}`,
    },
    {
      icon: FaClock,
      title: "الوقت",
      text: `${formatArabicTime(t.startTime)} - ${formatArabicTime(t.endTime)}`,
    },
    {
      icon: FaMapMarkerAlt,
      title: "الموقع",
      text: "فندق الانتركونتينتال - مدينة الاحساء - المملكة العربية السعودية",
    },
  ];

  return (
    <section className="info-cards" dir="rtl">
      <div className="container">
        <div className="row g-4 justify-content-center">
          {CARDS.map(({ icon: Icon, title, text }) => (
            <div className="col-12 col-md-6 col-lg-4" key={title}>
              <div className="info-card h-100">
                <span className="info-card-shape info-card-shape-a" aria-hidden="true" />
                <span className="info-card-shape info-card-shape-b" aria-hidden="true" />

                <div className="info-card-body">
                  <div className="info-card-icon">
                    <Icon aria-hidden="true" />
                  </div>
                  <h3 className="info-card-title">{title}</h3>
                  <p className="info-card-text">{text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
