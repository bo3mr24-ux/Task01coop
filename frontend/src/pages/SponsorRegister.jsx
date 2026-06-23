import { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import heroBg from "../assets/irrr.jpg";
import "./SponsorRegister.css";

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

const SPONSORSHIP_TYPES = [
  "الرعاية البلاتينية",
  "الرعاية الذهبية",
  "الرعاية الفضية",
  "الرعاية البرونزية",
  "رعاية إعلامية",
];

const INITIAL = {
  company: "",
  contact: "",
  email: "",
  phone: "",
  type: "",
  message: "",
};

export default function SponsorRegister() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.company.trim()) next.company = "يرجى إدخال اسم الشركة";
    if (!form.contact.trim()) next.contact = "يرجى إدخال اسم الشخص المسؤول";
    if (!form.email.trim()) {
      next.email = "يرجى إدخال البريد الإلكتروني";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "البريد الإلكتروني غير صحيح";
    }
    if (!form.phone.trim()) {
      next.phone = "يرجى إدخال رقم الجوال";
    } else if (!/^[0-9+\s-]{8,}$/.test(form.phone)) {
      next.phone = "رقم الجوال غير صحيح";
    }
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSubmitted(true);
      setForm(INITIAL);
    }
  };

  return (
    <div className="app-page" dir="rtl">
      <Header />

      {/* ===== الهيرو ===== */}
      <section className="sponsor-hero" dir="rtl" style={{ "--sponsor-hero-bg": `url(${heroBg})` }}>
        <div className="sponsor-hero-pattern" aria-hidden="true">
          <svg viewBox="0 0 470 800" preserveAspectRatio="xMaxYMid slice" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="#9ed6c4" strokeWidth="1.4" strokeLinecap="round">
              {PATTERN_LINES.map((d, idx) => (
                <path key={idx} d={d} />
              ))}
            </g>
          </svg>
        </div>

        <div className="container sponsor-hero-inner">
          <h1 className="sponsor-hero-title">تسجيل الرعاة</h1>
          <p className="sponsor-hero-subtitle">
            انضم إلى نخبة الشركات الراعية للمؤتمر الإقليمي للري والصرف الزراعي،
            وعزّز حضور علامتك التجارية أمام صنّاع القرار والخبراء. سجّل اهتمامك
            وسيتواصل معك فريق الرعاية لاختيار الباقة الأنسب لك.
          </p>
        </div>
      </section>

      {/* ===== نموذج التسجيل ===== */}
      <section className="sponsor-form-section" dir="rtl">
        <div className="container">
          <div className="sponsor-card card border-0">
            <div className="card-body p-0">
              <h2 className="sponsor-card-title">نموذج طلب الرعاية</h2>
              <p className="sponsor-card-desc">
                يرجى تعبئة البيانات التالية وسنعاود التواصل معك في أقرب وقت.
              </p>

              {submitted && (
                <div className="alert alert-conf-success text-center fw-semibold" role="status">
                  تم إرسال طلبك بنجاح! شكراً لاهتمامك بالرعاية.
                </div>
              )}

              <form className="row g-3" onSubmit={handleSubmit} noValidate>
                <div className="col-12">
                  <label htmlFor="company" className="form-label">اسم الشركة *</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    className={`form-control ${errors.company ? "is-invalid" : ""}`}
                    value={form.company}
                    onChange={handleChange}
                    placeholder="أدخل اسم الشركة"
                  />
                  {errors.company && <div className="invalid-feedback">{errors.company}</div>}
                </div>

                <div className="col-12">
                  <label htmlFor="contact" className="form-label">اسم الشخص المسؤول *</label>
                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    className={`form-control ${errors.contact ? "is-invalid" : ""}`}
                    value={form.contact}
                    onChange={handleChange}
                    placeholder="الاسم الكامل"
                  />
                  {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">البريد الإلكتروني *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    dir="ltr"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">رقم الجوال *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    dir="ltr"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+966 5X XXX XXXX"
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>

                <div className="col-12">
                  <label htmlFor="type" className="form-label">نوع الرعاية</label>
                  <select
                    id="type"
                    name="type"
                    className="form-select"
                    value={form.type}
                    onChange={handleChange}
                  >
                    <option value="">اختر نوع الرعاية</option>
                    {SPONSORSHIP_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="col-12">
                  <label htmlFor="message" className="form-label">رسالة إضافية</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="form-control"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="اكتب أي تفاصيل أو استفسارات إضافية..."
                  />
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-lg w-100 sponsor-submit">
                    إرسال الطلب
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
