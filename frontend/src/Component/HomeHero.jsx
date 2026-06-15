import "./HomeHero.css";

export default function HomeHero() {
  return (
    <section className="home-hero" dir="rtl">
      {/* النقش الموجي التجريدي (يحاكي قنوات الري / خطوط الخريطة) */}
      <div className="hero-pattern" aria-hidden="true">
        <svg
          viewBox="0 0 600 800"
          preserveAspectRatio="xMinYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7fd1d6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#1a3639" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          <g
            fill="none"
            stroke="url(#waveGrad)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M-50,120 C150,60 300,220 600,140" />
            <path d="M-50,180 C160,120 320,280 600,200" />
            <path d="M-50,240 C170,180 340,340 600,260" />
            <path d="M-50,310 C180,240 360,400 600,320" />
            <path d="M-50,380 C190,300 380,460 600,380" />
            <path d="M-50,450 C200,360 400,520 600,440" />
            <path d="M-50,520 C210,420 420,580 600,500" />
            <path d="M-50,590 C220,480 440,640 600,560" />
            <path d="M-50,660 C230,540 460,700 600,620" />
            <path d="M-50,730 C240,600 480,760 600,680" />
          </g>

          {/* نقاط صغيرة تشبه عُقد الشبكة على الخريطة */}
          <g fill="#7fd1d6" opacity="0.55">
            <circle cx="120" cy="170" r="3" />
            <circle cx="260" cy="280" r="3" />
            <circle cx="400" cy="220" r="3" />
            <circle cx="180" cy="380" r="3" />
            <circle cx="350" cy="450" r="3" />
            <circle cx="500" cy="380" r="3" />
            <circle cx="220" cy="560" r="3" />
            <circle cx="420" cy="620" r="3" />
          </g>
        </svg>
      </div>

      <div className="container hero-content text-center">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9">
            <h1 className="hero-title">
              المؤتمر الإقليمي الأول للري والصرف الزراعي بالشرق الأوسط
            </h1>

            <p className="hero-subtitle">
              الإدارة المتكاملة لقطاع الري لتنمية مرنة ومستدامة
            </p>

            <div className="hero-actions">
              <button type="button" className="btn hero-btn">
                تسجيل الأفراد
              </button>
              <button type="button" className="btn hero-btn">
                تسجيل الرعاة
              </button>
              <button type="button" className="btn hero-btn">
                عرض البث المرئي
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
