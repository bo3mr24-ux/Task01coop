import { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSidebar, { ADMIN_MENU } from "./components/AdminSidebar";
import AdminOverview from "./components/AdminOverview";
import AdminIndividuals from "./components/AdminIndividuals";
import AdminSponsors from "./components/AdminSponsors";
import AdminConferenceTime from "./components/AdminConferenceTime";
import AdminAbout from "./components/AdminAbout";
import AdminAgenda from "./components/AdminAgenda";
import AdminSpeakers from "./components/AdminSpeakers";
import "./AdminDashboard.css";

const SECTIONS = {
  overview: { title: "لوحة التحكم", sub: "نظرة عامة على المؤتمر", Component: AdminOverview },
  individuals: { title: "المسجلون الأفراد", sub: "قائمة الأفراد المسجلين في المؤتمر", Component: AdminIndividuals },
  sponsors: { title: "الرعاة المسجلون", sub: "قائمة الجهات الراعية", Component: AdminSponsors },
  time: { title: "وقت بدء المؤتمر", sub: "تعديل تواريخ وأوقات المؤتمر", Component: AdminConferenceTime },
  about: { title: "عن المؤتمر", sub: "تعديل نص التعريف بالمؤتمر", Component: AdminAbout },
  agenda: { title: "الأجندة", sub: "تعديل جدول أعمال المؤتمر", Component: AdminAgenda },
  speakers: { title: "المتحدثون", sub: "إدارة قائمة المتحدثين", Component: AdminSpeakers },
};

export default function AdminDashboard() {
  const [active, setActive] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const section = SECTIONS[active] || SECTIONS.overview;
  const ActiveComponent = section.Component;

  const handleSelect = (key) => {
    setActive(key);
    setSidebarOpen(false);
  };

  return (
    <div
      className={`admin-shell ${sidebarOpen ? "sidebar-open" : ""}`}
      dir="rtl"
    >
      <div
        className="admin-backdrop"
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      <AdminSidebar active={active} onSelect={handleSelect} />

      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <h1>{section.title}</h1>
            <p className="admin-topbar-sub">{section.sub}</p>
          </div>
          <button
            type="button"
            className="admin-menu-toggle"
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label="فتح القائمة"
          >
            <FaBars />
          </button>
        </div>

        {/* key=active يضمن إعادة قراءة البيانات من localStorage عند تبديل القسم */}
        <ActiveComponent key={active} />
      </main>
    </div>
  );
}

export { SECTIONS, ADMIN_MENU };
