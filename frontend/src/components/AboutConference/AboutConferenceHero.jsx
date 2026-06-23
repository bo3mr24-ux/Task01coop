import heroBg from "../../assets/irrr.jpg";
import "./AboutConference.css";

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

export default function AboutConferenceHero() {
  return (
    <section id="about" className="about-hero" dir="rtl" style={{ "--about-hero-bg": `url(${heroBg})` }}>
      <div className="about-hero-pattern" aria-hidden="true">
        <svg
          viewBox="0 0 470 800"
          preserveAspectRatio="xMaxYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="none"
            stroke="#9ed6c4"
            strokeWidth="1.4"
            strokeLinecap="round"
          >
            {PATTERN_LINES.map((d, idx) => (
              <path key={idx} d={d} />
            ))}
          </g>
        </svg>
      </div>

      <div className="container about-hero-inner">
        <h1 className="about-hero-title">عن المؤتمر</h1>
      </div>
    </section>
  );
}
