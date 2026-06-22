import { FaUsers, FaHandshake, FaMicrophone, FaRegClock } from "react-icons/fa";
import { getSpeakers, getConferenceTime } from "../../../data/conferenceStore";
import { MOCK_INDIVIDUALS } from "./AdminIndividuals";
import { MOCK_SPONSORS } from "./AdminSponsors";

function formatStart(time) {
  if (!time?.startDate) return "غير محدد";
  // إظهار التاريخ والوقت بصيغة عربية مبسّطة
  return `${time.startDate} • ${time.startTime || "--:--"}`;
}

export default function AdminOverview() {
  const speakers = getSpeakers();
  const conferenceTime = getConferenceTime();

  const cards = [
    {
      icon: FaUsers,
      label: "عدد المسجلين الأفراد",
      value: MOCK_INDIVIDUALS.length,
    },
    {
      icon: FaHandshake,
      label: "عدد الرعاة",
      value: MOCK_SPONSORS.length,
    },
    {
      icon: FaMicrophone,
      label: "عدد المتحدثين",
      value: speakers.length,
    },
    {
      icon: FaRegClock,
      label: "وقت بدء المؤتمر",
      value: formatStart(conferenceTime),
    },
  ];

  return (
    <div>
      <div className="admin-cards">
        {cards.map(({ icon: Icon, label, value }) => (
          <div className="admin-stat-card" key={label}>
            <span className="admin-stat-icon" aria-hidden="true">
              <Icon />
            </span>
            <span className="admin-stat-meta">
              <span className="admin-stat-value">{value}</span>
              <span className="admin-stat-label">{label}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="admin-panel" style={{ marginTop: "1.25rem" }}>
        <div className="admin-panel-head">
          <h2 className="admin-panel-title">مرحباً بك في لوحة التحكم</h2>
        </div>
        <p style={{ margin: 0, color: "var(--dga-muted, #6c727e)", lineHeight: 1.9 }}>
          من خلال هذه اللوحة يمكنك استعراض المسجلين الأفراد والرعاة، وتعديل وقت
          بدء المؤتمر، ونص "عن المؤتمر"، والأجندة، وقائمة المتحدثين. تُحفظ جميع
          التعديلات حالياً في متصفّحك (localStorage) وتظهر مباشرةً في الصفحة
          الرئيسية للموقع.
        </p>
      </div>
    </div>
  );
}
