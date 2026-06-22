import { Link } from "react-router-dom";
import aboutImg from "../../assets/irrr.jpg";
import "./AboutConferenceSection.css";

export default function AboutConferenceSection() {
  return (
    <section className="about-section" dir="rtl">
      <div className="container">
        <div className="row align-items-center g-5">

          {/* عمود الصورة — يظهر أولاً على الجوّال (أعلى) وعلى اليسار في الشاشات الكبيرة */}
          <div className="col-12 col-lg-6 order-1 order-lg-2">
            <div className="about-img-wrap">
              <img src={aboutImg} alt="صورة تعبيرية عن مجال الري والصرف الزراعي" />
            </div>
          </div>

          {/* عمود النص — يظهر ثانياً على الجوّال (أسفل) وعلى اليمين في الشاشات الكبيرة */}
          <div className="col-12 col-lg-6 order-2 order-lg-1">
            <div className="about-text-wrap">
              <h2 className="about-section-title">عن المؤتمر</h2>
              <span className="about-section-divider" aria-hidden="true" />
              <p className="about-section-text">
                يُعد المؤتمر الإقليمي الأول للري والصرف الزراعي بالشرق الأوسط منصةً
                علميةً ومهنيةً رائدةً تجمع نخبةً من الخبراء والمختصين وصنّاع القرار من
                مختلف دول المنطقة، بهدف مناقشة التحديات المتزايدة التي تواجه قطاع
                المياه والري، واستعراض أحدث الحلول والتقنيات المستدامة في مجال
                الإدارة المتكاملة للموارد المائية. ويسعى المؤتمر إلى تعزيز التعاون
                الإقليمي وتبادل الخبرات والمعارف بما يدعم تحقيق تنميةٍ زراعيةٍ مرنةٍ
                ومستدامةٍ قادرةٍ على مواجهة آثار التغير المناخي وندرة المياه. كما
                يوفّر المؤتمر فرصةً لعرض المشروعات الناجحة والممارسات الفضلى، وبناء
                شراكاتٍ استراتيجيةٍ بين القطاعين العام والخاص.
              </p>
              <Link to="/about" className="dga-btn dga-btn-outline">
                اقرأ المزيد
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
