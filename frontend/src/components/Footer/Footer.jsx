import {
  FaLinkedin,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaPlus,
  FaMinus,
  FaAdjust,
  FaUniversalAccess,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../../assets/Main_Logo.png";
import "./Footer.css";

const NAV_LINKS = [
  { label: "الرئيسية", href: "#home" },
  { label: "عن المؤتمر", href: "#about" },
  { label: "الأجندة", href: "#agenda" },
  { label: "المتحدثون", href: "#speakers" },
];

const CONTACTS = [
  { icon: FaEnvelope, text: "FAB@irrigation.com", href: "mailto:FAB@irrigation.com" },
  { icon: FaMapMarkerAlt, text: "فندق الانتركونتيننتال - الأحساء - السعودية" },
  { icon: FaPhone, text: "+966", href: "tel:+966" },
];

const SOCIALS = [
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaXTwitter, href: "#", label: "X" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

// أزرار أدوات الوصول (واجهة فقط)
const ACCESSIBILITY_TOOLS = [
  { icon: FaPlus, label: "تكبير حجم الخط" },
  { icon: FaMinus, label: "تصغير حجم الخط" },
  { icon: FaAdjust, label: "تباين الألوان" },
  { icon: FaUniversalAccess, label: "خيارات الوصول" },
];

const LEGAL_LINKS = [
  { label: "سياسة الخصوصية", href: "#privacy" },
  { label: "الشروط والأحكام", href: "#terms" },
];

export default function Footer() {
  return (
    <footer className="site-footer" dir="rtl">
      <div className="container">
        {/* ===== المنطقة العلوية: أعمدة الفوتر ===== */}
        <div className="row g-4 footer-top">
          {/* العمود: الشعار والوصف */}
          <div className="footer-col footer-brand col-12 col-lg-4">
            <span className="footer-logo-chip">
              <img src={logo} className="footer-logo" alt="شعار المؤتمر" />
            </span>
           
          
          </div>

          {/* العمود: روابط سريعة */}
          <nav
            className="footer-col footer-nav col-6 col-lg-2"
            aria-label="روابط الموقع"
          >
            <h4 className="footer-heading">روابط سريعة</h4>
            <ul className="footer-links">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a className="footer-link" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* العمود: معلومات التواصل */}
          <div className="footer-col footer-contact col-6 col-lg-3">
            <h4 className="footer-heading">تواصل معنا</h4>
            <ul className="footer-contact-list">
              {CONTACTS.map(({ icon: Icon, text, href }) => (
                <li className="footer-contact-item" key={text}>
                  <span className="footer-contact-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  {href ? (
                    <a className="footer-contact-text" href={href}>
                      {text}
                    </a>
                  ) : (
                    <span className="footer-contact-text">{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* العمود: التواصل الاجتماعي وأدوات الوصول */}
          <div className="footer-col footer-connect col-12 col-lg-3">
            <h4 className="footer-heading">تابعنا</h4>
            <ul className="footer-socials">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <li key={label}>
                  <a
                    className="footer-icon-btn"
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="footer-heading footer-heading--sub">أدوات الوصول</h4>
            <div className="footer-access">
              {ACCESSIBILITY_TOOLS.map(({ icon: Icon, label }) => (
                <button
                  type="button"
                  className="footer-icon-btn"
                  key={label}
                  aria-label={label}
                  title={label}
                >
                  <Icon aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===== الشريط السفلي: الشعار والروابط القانونية والحقوق ===== */}
        <div className="footer-bottom">
          <div className="footer-bottom-brand">
            <img src={logo} className="footer-bottom-logo" alt="شعار المؤتمر" />
          </div>

          <ul className="footer-legal">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <a className="footer-legal-link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="footer-copy">
             {new Date().getFullYear()}المؤتمر الإقليمي الأول للري والصرف
           جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
