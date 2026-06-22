import { Link } from "react-router-dom";
import {
  FaThLarge,
  FaUsers,
  FaHandshake,
  FaRegClock,
  FaInfoCircle,
  FaListUl,
  FaMicrophone,
  FaArrowRight,
} from "react-icons/fa";

/* عناصر القائمة الجانبية للوحة التحكم */
export const ADMIN_MENU = [
  { key: "overview", label: "لوحة التحكم", icon: FaThLarge },
  { key: "individuals", label: "المسجلون الأفراد", icon: FaUsers },
  { key: "sponsors", label: "الرعاة المسجلون", icon: FaHandshake },
  { key: "time", label: "وقت بدء المؤتمر", icon: FaRegClock },
  { key: "about", label: "عن المؤتمر", icon: FaInfoCircle },
  { key: "agenda", label: "الأجندة", icon: FaListUl },
  { key: "speakers", label: "المتحدثون", icon: FaMicrophone },
];

export default function AdminSidebar({ active, onSelect }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <span className="admin-brand-mark" aria-hidden="true">
          <FaThLarge />
        </span>
        <span className="admin-brand-text">
          <span className="admin-brand-title">لوحة التحكم</span>
          <span className="admin-brand-sub">مؤتمر الري والصرف الزراعي</span>
        </span>
      </div>

      <nav className="admin-nav" aria-label="قائمة لوحة التحكم">
        {ADMIN_MENU.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            className={`admin-nav-link ${active === key ? "is-active" : ""}`}
            onClick={() => onSelect(key)}
            aria-current={active === key ? "page" : undefined}
          >
            <span className="admin-nav-icon" aria-hidden="true">
              <Icon />
            </span>
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="admin-sidebar-foot">
        <Link to="/" className="admin-back-link">
          <FaArrowRight aria-hidden="true" />
          <span>العودة إلى الموقع</span>
        </Link>
      </div>
    </aside>
  );
}
