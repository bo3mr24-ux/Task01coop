import { useState, useRef } from "react";
import { DgaTextInput, DgaTextarea, DgaButtonV2, DgaInlineAlert } from "platformscode-new-react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import heroBg from "../assets/irrr.jpg";
import "./IndividualRegister.css";

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

const INITIAL = {
  name: "",
  email: "",
  phone: "",
  nationality: "",
  organization: "",
  jobTitle: "",
  reason: "",
};

export default function IndividualRegister() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  // مفتاح لإعادة تركيب النموذج بعد الإرسال الناجح (يُفرّغ حقول مكوّنات المكتبة).
  const [formKey, setFormKey] = useState(0);
  const formRef = useRef(null);

  // مكوّنات الإدخال من المكتبة تمرّر حدث <input> الداخلي، فيعمل name/value كالعادي.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "يرجى إدخال الاسم الكامل";
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
      setFormKey((k) => k + 1);
    }
  };

  return (
    <div className="app-page" dir="rtl">
      <Header />

      <section className="individual-hero" dir="rtl" style={{ "--individual-hero-bg": `url(${heroBg})` }}>
        <div className="individual-hero-pattern" aria-hidden="true">
          <svg viewBox="0 0 470 800" preserveAspectRatio="xMaxYMid slice" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="#9ed6c4" strokeWidth="1.4" strokeLinecap="round">
              {PATTERN_LINES.map((d, idx) => (
                <path key={idx} d={d} />
              ))}
            </g>
          </svg>
        </div>

        <div className="container individual-hero-inner">
          <h1 className="individual-hero-title">تسجيل الأفراد</h1>
          <p className="individual-hero-subtitle">
            سجّل حضورك في المؤتمر الإقليمي للري والصرف الزراعي
          </p>
        </div>
      </section>

      <section className="individual-form-section" dir="rtl">
        <div className="container">
          <div className="individual-card card border-0">
            <div className="card-body p-0">
              <h2 className="individual-card-title">نموذج تسجيل فردي</h2>
              <p className="individual-card-desc">
                يرجى تعبئة البيانات التالية لإتمام عملية التسجيل في المؤتمر.
              </p>

              {submitted && (
                <div className="mb-4">
                  <DgaInlineAlert
                    type="success"
                    colored
                    leadText="تم تسجيلك بنجاح! نتطلع لرؤيتك في المؤتمر."
                  />
                </div>
              )}

              <form
                key={formKey}
                ref={formRef}
                className="row g-3"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="col-12">
                  <DgaTextInput
                    name="name"
                    label="الاسم الكامل"
                    required
                    fullwidth
                    placeholder="أدخل اسمك الكامل"
                    error={!!errors.name}
                    helperText={errors.name || undefined}
                    onInput={handleChange}
                  />
                </div>

                <div className="col-md-6 ltr-field">
                  <DgaTextInput
                    name="email"
                    label="البريد الإلكتروني"
                    required
                    fullwidth
                    type="text"
                    placeholder="name@example.com"
                    error={!!errors.email}
                    helperText={errors.email || undefined}
                    onInput={handleChange}
                  />
                </div>

                <div className="col-md-6 ltr-field">
                  <DgaTextInput
                    name="phone"
                    label="رقم الجوال"
                    required
                    fullwidth
                    type="text"
                    placeholder="+966 5X XXX XXXX"
                    error={!!errors.phone}
                    helperText={errors.phone || undefined}
                    onInput={handleChange}
                  />
                </div>

                <div className="col-12">
                  <DgaTextInput
                    name="nationality"
                    label="الجنسية"
                    fullwidth
                    placeholder="أدخل الجنسية"
                    onInput={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <DgaTextInput
                    name="organization"
                    label="جهة العمل (اختياري)"
                    fullwidth
                    placeholder="اسم جهة العمل"
                    onInput={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <DgaTextInput
                    name="jobTitle"
                    label="المسمى الوظيفي (اختياري)"
                    fullwidth
                    placeholder="المسمى الوظيفي"
                    onInput={handleChange}
                  />
                </div>

                <div className="col-12">
                  <DgaTextarea
                    name="reason"
                    label="سبب الحضور"
                    fullwidth
                    rows={4}
                    placeholder="اذكر سبب رغبتك في حضور المؤتمر..."
                    onInput={handleChange}
                  />
                </div>

                <div className="col-12 d-grid mt-2">
                  <DgaButtonV2
                    className="individual-submit-btn"
                    variant="primary"
                    size="lg"
                    label="تسجيل"
                    onClick={() => formRef.current?.requestSubmit()}
                  />
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
