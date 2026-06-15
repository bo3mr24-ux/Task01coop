import logo from "../../assets/Logo01.png";
import "./Header.css";

export default function Header() {
  return (
    <header className="site-header" dir="rtl">
      <nav className="navbar navbar-expand-lg site-navbar">
        <div className="container-fluid header-inner">
          {/* ===== الشعار (يمين) ===== */}
          <a className="navbar-brand brand" href="#">
            <img src={logo} className="brand-icon" alt="شعار المؤتمر" />
          
            
            
          </a>

          {/* زر القائمة للجوال */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* ===== الروابط (وسط) + زر اللغة (يسار) ===== */}
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav nav-list mx-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  الرئيسية
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  المؤتمر
                </a>
                <ul className="dropdown-menu site-dropdown" dir="rtl">
                  <li><a className="dropdown-item" href="#">عن المؤتمر</a></li>
                  <li><a className="dropdown-item" href="#">أهداف المؤتمر</a></li>
                  <li><a className="dropdown-item" href="#">محاور المؤتمر</a></li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  المركز الاعلامي
                </a>
                <ul className="dropdown-menu site-dropdown" dir="rtl">
                  <li><a className="dropdown-item" href="#">الصور</a></li>
                  <li><a className="dropdown-item" href="#">الفيديوهات</a></li>
                  <li><a className="dropdown-item" href="#">الأخبار</a></li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">الزيارة الميدانية</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">الرعاة</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">المعرض</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">الأجندة</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">المتحدثون</a>
              </li>
            </ul>

            <div className="lang-switch">
              <button type="button" className="btn-en">
                EN
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
