import "./HomeHero.css";


const PATTERN_LINES = Array.from({ length: 36 }, (_, i) => {
  const baseX = 6 + i * 13;
  const amp = 22 + (i % 6) * 5;
  const phase = i * 0.5;
  let d = `M ${baseX} -20`;
  for (let y = 0; y <= 820; y += 22) {
    const x = baseX + Math.sin(y / 135 + phase) * amp;
    d += ` L ${x.toFixed(1)} ${y}`;
  }
  return d;
});

export default function HomeHero() {
  return (
    <section className="home-hero" dir="rtl">
      
      <div className="hero-pattern" aria-hidden="true">
        <svg
          viewBox="0 0 470 800"
          preserveAspectRatio="xMaxYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="none"
            stroke="#6fb6c2"
            strokeWidth="1.4"
            strokeLinecap="round"
          >
            {PATTERN_LINES.map((d, idx) => (
              <path key={idx} d={d} />
            ))}
          </g>
        </svg>
      </div>

      <div className="container hero-content">
        <h1 className="hero-title">
          المؤتمر الإقليمي الأول للري والصرف الزراعي بالشرق الأوسط
        </h1>

        <p className="hero-subtitle">
          الإداره المتكاملة لقطاع الري لتنمية مرنة ومستدامة
        </p>

        <div className="hero-actions">
          <div className="hero-actions-row">
            <button type="button" className="hero-btn">
              تسجيل الأفراد
            </button>
            <button type="button" className="hero-btn">
              تسجيل الرعاة
            </button>
          </div>
          <button type="button" className="hero-btn">
            عرض البث المرئي
          </button>
        </div>
      </div>
    </section>
  );
}
