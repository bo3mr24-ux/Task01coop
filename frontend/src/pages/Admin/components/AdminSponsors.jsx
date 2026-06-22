/* صفحة الرعاة المسجلين — بيانات تجريبية (Mock) للعرض فقط */

export const MOCK_SPONSORS = [
  {
    company: "شركة المياه المتقدمة",
    contact: "فيصل العمري",
    email: "faisal@aqua-adv.com",
    phone: "+966 11 456 7788",
    type: "رعاية ذهبية",
    message: "نرغب بجناح عرض في المعرض المصاحب",
    date: "2026-01-10",
  },
  {
    company: "مجموعة الري الذكي",
    contact: "منى الشمري",
    email: "mona@smartirrigation.sa",
    phone: "+966 12 333 2211",
    type: "رعاية فضية",
    message: "اهتمام برعاية إحدى الجلسات الرئيسية",
    date: "2026-01-14",
  },
  {
    company: "تقنيات البيئة الخضراء",
    contact: "عبدالرحمن الزهراني",
    email: "a.zahrani@greentech.com",
    phone: "+971 4 555 8899",
    type: "رعاية برونزية",
    message: "",
    date: "2026-01-19",
  },
  {
    company: "شركة حلول الصرف الزراعي",
    contact: "نورة الغامدي",
    email: "noura@agridrain.com",
    phone: "+966 13 222 4455",
    type: "رعاية ذهبية",
    message: "طلب كلمة افتتاحية باسم الجهة الراعية",
    date: "2026-01-23",
  },
];

const COLUMNS = [
  "اسم الشركة",
  "اسم الشخص المسؤول",
  "البريد الإلكتروني",
  "رقم الجوال",
  "نوع الرعاية",
  "رسالة إضافية",
  "تاريخ التسجيل",
];

export default function AdminSponsors() {
  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2 className="admin-panel-title">الرعاة المسجلون</h2>
        <span className="admin-badge">{MOCK_SPONSORS.length} راعٍ</span>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              {COLUMNS.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_SPONSORS.map((row, i) => (
              <tr key={i}>
                <td>{row.company}</td>
                <td>{row.contact}</td>
                <td dir="ltr">{row.email}</td>
                <td dir="ltr">{row.phone}</td>
                <td>
                  <span className="admin-badge">{row.type}</span>
                </td>
                <td>{row.message || "—"}</td>
                <td dir="ltr">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
