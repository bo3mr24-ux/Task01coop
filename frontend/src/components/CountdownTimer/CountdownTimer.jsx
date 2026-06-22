import { useEffect, useState } from "react";
import { getConferenceStartISO } from "../../data/conferenceStore";
import "./CountdownTimer.css";


// التاريخ الافتراضي يُقرأ من المحتوى القابل للتحرير (localStorage) مع قيمة احتياطية.
const CONFERENCE_DATE = getConferenceStartISO() || "2026-11-04T09:00:00";

const UNITS = [
  { key: "days", label: "يوم" },
  { key: "hours", label: "ساعة" },
  { key: "minutes", label: "دقيقة" },
  { key: "seconds", label: "ثانية" },
];

function getRemaining(target) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    finished: diff === 0,
  };
}

export default function CountdownTimer({ targetDate = CONFERENCE_DATE }) {
  const [time, setTime] = useState(() => getRemaining(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <section className="countdown" dir="rtl">
      <div className="container countdown-inner">
        <h2 className="countdown-title">
          {time.finished ? "انطلق المؤتمر" : "الوقت المتبقي على انطلاق المؤتمر"}
        </h2>

        <div className="countdown-grid row g-3 g-md-4 justify-content-center">
          {UNITS.map(({ key, label }) => (
            <div className="col-6 col-md-3" key={key}>
              <div className="countdown-box">
                <span className="countdown-value">
                  {String(time[key]).padStart(2, "0")}
                </span>
                <span className="countdown-label">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
