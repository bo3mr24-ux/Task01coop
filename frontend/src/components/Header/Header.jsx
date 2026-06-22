import { useState, useRef, useEffect } from "react";
import { Link, NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { DgaButtonV2 } from "platformscode-new-react";
import logo from "../../assets/Main_Logo.png";

const NAV_ITEMS = [
  { label: "الرئيسية", to: "/" },
  {
    label: "المؤتمر",
    children: [
      { label: "عن المؤتمر", to: "/about" },
      { label: "أهداف المؤتمر", href: "#" },
      { label: "محاور المؤتمر", href: "#" },
    ],
  },
  {
    label: "المركز الإعلامي",
    children: [
      { label: "الصور", href: "#" },
      { label: "الفيديوهات", href: "#" },
      { label: "الأخبار", href: "#" },
    ],
  },
  { label: "الزيارة الميدانية", href: "#" },
  { label: "المعرض", href: "#" },
  { label: "الأجندة", href: "#agenda" },
  { label: "المتحدثون", href: "#speakers" },
];

// أزرار التسجيل كمكوّنات DgaButtonV2 رسمية، تظهر مباشرةً داخل شريط التنقّل (آخر عنصرين).
const REGISTER_ACTIONS = [
  { label: "تسجيل الأفراد", to: "/individual-register", variant: "primary" },
  { label: "تسجيل الرعاة", to: "/sponsor-register", variant: "primary" },
];

// رابط مفرد: داخلي عبر RouterNavLink (تفعيل تلقائي حسب المسار) أو <a> للهاش.
function NavItemLink({ item, className, activeClassName = "is-active", onSelect }) {
  if (item.to) {
    return (
      <RouterNavLink
        to={item.to}
        end={item.to === "/"}
        onClick={onSelect}
        className={({ isActive }) =>
          isActive ? `${className} ${activeClassName}` : className
        }
      >
        {item.label}
      </RouterNavLink>
    );
  }
  return (
    <a className={className} href={item.href} onClick={onSelect}>
      {item.label}
    </a>
  );
}

function NavDropdown({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();

  const childActive = item.children.some(
    (c) => c.to && (c.to === "/" ? location.pathname === "/" : location.pathname.startsWith(c.to))
  );

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <li className="nav-item dropdown" ref={ref}>
      <button
        type="button"
        className={`dga-nav-link dga-dropdown-toggle ${childActive ? "is-active" : ""}`}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {item.label}
        <span className="dga-caret" aria-hidden="true" />
      </button>
      <ul className={`dga-dropdown-menu ${open ? "show" : ""}`} dir="rtl">
        {item.children.map((child) => (
          <li key={child.label}>
            <NavItemLink
              item={child}
              className="dga-dropdown-item"
              onSelect={() => setOpen(false)}
            />
          </li>
        ))}
      </ul>
    </li>
  );
}

export default function Header() {
  return (
    <header className="dga-header" dir="rtl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap');

        .dga-header {
          --dga-primary: var(--colors-primary-sa-flag-600-primary, #1b8354);
          --dga-primary-strong: var(--colors-primary-sa-flag-700, #166a45);
          --dga-primary-soft: var(--colors-primary-sa-flag-50, #f3fcf6);
          --dga-text: var(--colors-neutral-700, #384250);
          --dga-text-strong: var(--colors-neutral-900, #111927);
          --dga-border: var(--colors-neutral-200, #e5e7eb);
          --dga-border-strong: var(--colors-neutral-300, #d2d6db);
          --dga-surface: var(--colors-base-white, #ffffff);
          --dga-surface-muted: var(--colors-neutral-50, #f9fafb);
          font-family: "IBM Plex Sans Arabic", "Tajawal", "Cairo", system-ui, "Segoe UI", sans-serif;
        }
        .dga-header #dgaNavbar {
          background: var(--dga-surface);
          border-bottom: 1px solid var(--dga-border);
          box-shadow: 0 1px 2px rgba(16,25,40,.04);
          padding-block: 3px;
        }
        .dga-header .dga-bar {
          display: flex; align-items: center; flex-wrap: wrap;
          gap: .5rem 1rem; width: 100%;
        }
        .dga-header .navbar-brand { flex: 0 0 auto; }
        .dga-header .navbar-brand img { height: 60px; width: auto; object-fit: contain; }

        /* قائمة التنقّل: صف أفقي يلتفّ بدل الاختفاء، تظهر كل العناصر دائماً */
        .dga-header .dga-nav {
          flex: 1 1 auto;
          display: flex; flex-direction: row; flex-wrap: wrap;
          align-items: center; justify-content: center;
          gap: .15rem .1rem; list-style: none; margin: 0; padding: 0;
        }
        .dga-header .dga-nav-link {
          display: inline-flex; align-items: center; gap: .35rem;
          color: var(--dga-text); font-weight: 500; font-size: .92rem;
          line-height: 1; white-space: nowrap; text-decoration: none;
          background: transparent; border: 0;
          padding: .55rem .6rem; border-radius: 8px;
          transition: color .18s ease, background-color .18s ease;
        }
        .dga-header .dga-nav-link:hover,
        .dga-header .dga-nav-link:focus-visible {
          color: var(--dga-primary); background: var(--dga-primary-soft);
        }
        .dga-header .dga-nav-link.is-active { color: var(--dga-primary); font-weight: 700; }
        .dga-header .dga-nav-link:focus-visible { outline: 2px solid var(--dga-primary); outline-offset: 2px; }

        /* سهم القائمة */
        .dga-header .dga-dropdown-toggle { cursor: pointer; }
        .dga-header .dga-caret {
          width: .5rem; height: .5rem; border-inline-start: 1.6px solid currentColor;
          border-bottom: 1.6px solid currentColor; transform: rotate(-45deg);
          transition: transform .18s ease; margin-top: -2px;
        }
        .dga-header .dga-dropdown-toggle[aria-expanded="true"] .dga-caret { transform: rotate(135deg); margin-top: 2px; }

        /* القائمة المنسدلة */
        .dga-header .nav-item.dropdown { position: relative; }
        .dga-header .dga-dropdown-menu {
          position: absolute; top: calc(100% + .4rem); inset-inline-end: 0;
          min-width: 12.5rem; max-width: calc(100vw - 2rem);
          list-style: none; margin: 0; padding: .4rem;
          background: var(--dga-surface); border: 1px solid var(--dga-border);
          border-radius: 12px; box-shadow: 0 12px 28px rgba(16,25,40,.12);
          opacity: 0; visibility: hidden; transform: translateY(-4px);
          transition: opacity .15s ease, transform .15s ease, visibility .15s; z-index: 1031;
        }
        .dga-header .dga-dropdown-menu.show { opacity: 1; visibility: visible; transform: translateY(0); }
        .dga-header .dga-dropdown-item {
          display: block; padding: .6rem .8rem; border-radius: 8px;
          color: var(--dga-text); font-size: .92rem; text-decoration: none;
          transition: background-color .15s ease, color .15s ease;
        }
        .dga-header .dga-dropdown-item:hover,
        .dga-header .dga-dropdown-item:focus-visible,
        .dga-header .dga-dropdown-item.is-active {
          background: var(--dga-primary-soft); color: var(--dga-primary);
        }

        /* روابط التسجيل (CTA) كعناصر ظاهرة داخل الشريط */
        .dga-header .dga-cta { text-decoration: none; display: inline-flex; }

        /* منطقة الإجراءات: زر اللغة */
        .dga-header .dga-actions { flex: 0 0 auto; display: flex; align-items: center; gap: .5rem; }

        /* الشاشات المتوسطة/الصغيرة: تصغير لطيف ليبقى كل شيء ظاهراً دون زر مخفي */
        @media (max-width: 1199.98px) {
          .dga-header .dga-nav-link { font-size: .88rem; padding: .5rem .5rem; }
          .dga-header .navbar-brand img { height: 53px; }
        }
        @media (max-width: 991.98px) {
          .dga-header .dga-bar { justify-content: center; }
          .dga-header .dga-nav { width: 100%; }
        }
      `}</style>

      <nav id="dgaNavbar" className="navbar navbar-expand py-0">
        <div className="container-fluid px-2 px-md-3 px-xl-4">
          <div className="dga-bar">
            <Link className="navbar-brand p-0 m-0" to="/">
              <img src={logo} alt="شعار المؤتمر" />
            </Link>

            {/* كل عناصر التنقّل ظاهرة مباشرةً في الشريط (بلا زر هامبرغر) */}
            <ul className="dga-nav">
              {NAV_ITEMS.map((item) =>
                item.children ? (
                  <NavDropdown key={item.label} item={item} />
                ) : (
                  <li className="nav-item" key={item.label}>
                    <NavItemLink item={item} className="dga-nav-link" />
                  </li>
                )
              )}

              {/* تسجيل الأفراد وتسجيل الرعاة: ظاهران في الشريط كآخر عنصرين */}
              {REGISTER_ACTIONS.map((a) => (
                <li className="nav-item" key={a.to}>
                  <Link to={a.to} className="dga-cta">
                    <DgaButtonV2 variant={a.variant} size="sm" label={a.label} />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="dga-actions">
              <DgaButtonV2 variant="secondary-outline" size="sm" label="EN" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
