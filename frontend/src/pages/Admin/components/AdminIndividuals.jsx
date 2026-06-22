/* صفحة المسجلين الأفراد — بيانات تجريبية (Mock) للعرض فقط */

export const MOCK_INDIVIDUALS = [
  {
    name: "أحمد بن سالم العتيبي",
    email: "ahmed.alotaibi@example.com",
    phone: "+966 50 123 4567",
    nationality: "سعودي",
    organization: "وزارة البيئة والمياه والزراعة",
    jobTitle: "مهندس موارد مائية",
    reason: "الاطلاع على أحدث تقنيات الري المستدام",
    date: "2026-01-12",
  },
  {
    name: "سارة محمد الدوسري",
    email: "sara.aldosari@example.com",
    phone: "+966 55 987 6543",
    nationality: "سعودية",
    organization: "جامعة الملك سعود",
    jobTitle: "باحثة في الهندسة الزراعية",
    reason: "تبادل الخبرات البحثية",
    date: "2026-01-15",
  },
  {
    name: "خالد إبراهيم المنصور",
    email: "khalid.mansour@example.com",
    phone: "+971 50 222 3344",
    nationality: "إماراتي",
    organization: "هيئة البيئة - أبوظبي",
    jobTitle: "أخصائي إدارة مياه",
    reason: "بناء شراكات إقليمية",
    date: "2026-01-18",
  },
  {
    name: "ليلى عبدالله القحطاني",
    email: "laila.q@example.com",
    phone: "+966 53 444 1212",
    nationality: "سعودية",
    organization: "شركة المياه الوطنية",
    jobTitle: "مديرة مشاريع",
    reason: "متابعة الابتكارات في الصرف الزراعي",
    date: "2026-01-20",
  },
  {
    name: "يوسف ناصر الحربي",
    email: "yousef.alharbi@example.com",
    phone: "+966 56 778 9090",
    nationality: "سعودي",
    organization: "مستقل",
    jobTitle: "استشاري ري",
    reason: "التعرف على الممارسات الفضلى",
    date: "2026-01-22",
  },
];

const COLUMNS = [
  "الاسم الكامل",
  "البريد الإلكتروني",
  "رقم الجوال",
  "الجنسية",
  "جهة العمل",
  "المسمى الوظيفي",
  "سبب الحضور",
  "تاريخ التسجيل",
];

export default function AdminIndividuals() {
  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2 className="admin-panel-title">المسجلون الأفراد</h2>
        <span className="admin-badge">{MOCK_INDIVIDUALS.length} مسجّل</span>
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
            {MOCK_INDIVIDUALS.map((row, i) => (
              <tr key={i}>
                <td>{row.name}</td>
                <td dir="ltr">{row.email}</td>
                <td dir="ltr">{row.phone}</td>
                <td>{row.nationality}</td>
                <td>{row.organization}</td>
                <td>{row.jobTitle}</td>
                <td>{row.reason}</td>
                <td dir="ltr">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
