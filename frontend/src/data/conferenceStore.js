/* =========================================================
   مخزن محتوى المؤتمر القابل للتحرير (Frontend only)
   مصدر واحد للقيم الافتراضية + قراءة/كتابة localStorage.
   تستخدمه لوحة التحكم (للتحرير) والصفحة العامة (للعرض).
   لا يوجد Backend بعد — كل شيء على المتصفح.
   ========================================================= */

export const STORAGE_KEYS = {
  conferenceTime: "conf_conference_time",
  about: "conf_about",
  agenda: "conf_agenda",
  speakers: "conf_speakers",
};

/* ===== القيم الافتراضية (تطابق المحتوى الموجود في الصفحة العامة) ===== */

export const DEFAULT_CONFERENCE_TIME = {
  startDate: "2026-02-04",
  startTime: "07:00",
  endDate: "2026-02-05",
  endTime: "19:00",
};

export const DEFAULT_ABOUT =
  "يُعد المؤتمر الإقليمي الأول للري والصرف الزراعي بالشرق الأوسط منصةً علميةً ومهنيةً رائدةً تجمع نخبةً من الخبراء والمختصين وصنّاع القرار من مختلف دول المنطقة، بهدف مناقشة التحديات المتزايدة التي تواجه قطاع المياه والري، واستعراض أحدث الحلول والتقنيات المستدامة في مجال الإدارة المتكاملة للموارد المائية. ويسعى المؤتمر إلى تعزيز التعاون الإقليمي وتبادل الخبرات والمعارف بما يدعم تحقيق تنميةٍ زراعيةٍ مرنةٍ ومستدامةٍ قادرةٍ على مواجهة آثار التغير المناخي وندرة المياه. كما يوفّر المؤتمر فرصةً لعرض المشروعات الناجحة والممارسات الفضلى، وبناء شراكاتٍ استراتيجيةٍ بين القطاعين العام والخاص، بما يسهم في رسم ملامح مستقبلٍ أكثر استدامةً لقطاع الري والصرف الزراعي في الشرق الأوسط.";

export const DEFAULT_AGENDA = [
  {
    id: "day1",
    label: "اليوم الأول",
    date: "04 فبراير 2026",
    items: [
      "التسجيل",
      "الافتتاح",
      "مواجهة مخاطر المناخ وتخفيف آثارها على موارد المياه",
      "استراتيجيات فعالة لإعادة استخدام المياه المعالجة وحوكمتها",
      "ابتكارات رائدة في تقنيات الري نحو استدامة الموارد المائية",
      "استراتيجيات الحوكمة الفعالة لتمويل قطاع الري رؤى للمستقبل",
    ],
  },
  {
    id: "day2",
    label: "اليوم الثاني",
    date: "05 فبراير 2026",
    items: [
      "التسجيل",
      "الجلسة الأولى",
      "الجلسة الثانية",
      "جلسة نقاش",
      "التوصيات الختامية",
    ],
  },
];

export const DEFAULT_SPEAKERS = [
  { name: "محمد", title: "   المائية", image: "" },
  { name: "عمر", title: "استشاري تقنيات الري الحديثة", image: "" },
  { name: "د. خالد ", title: " مهندس  ", image: "" },
  { name: "", title: "مدير مشاريع  ", image: "" },
  { name: "عبدالله", title: "مهندس  ", image: "" },
  { name: "سعد", title: "مهندس   ", image: "" },
];

/* ===== أدوات قراءة/كتابة عامة آمنة ===== */

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* تجاهل أخطاء التخزين (وضع التصفح الخاص مثلاً) */
  }
}

/* ===== وقت المؤتمر ===== */
export const getConferenceTime = () =>
  ({ ...DEFAULT_CONFERENCE_TIME, ...readJSON(STORAGE_KEYS.conferenceTime, {}) });
export const saveConferenceTime = (value) =>
  writeJSON(STORAGE_KEYS.conferenceTime, value);

/* يبني تاريخ ISO لبداية المؤتمر (لاستخدام العدّاد التنازلي) */
export const getConferenceStartISO = () => {
  const t = getConferenceTime();
  if (!t.startDate) return null;
  return `${t.startDate}T${t.startTime || "00:00"}:00`;
};

/* ===== عن المؤتمر ===== */
export const getAbout = () => readJSON(STORAGE_KEYS.about, DEFAULT_ABOUT);
export const saveAbout = (value) => writeJSON(STORAGE_KEYS.about, value);

/* ===== الأجندة ===== */
export const getAgenda = () => readJSON(STORAGE_KEYS.agenda, DEFAULT_AGENDA);
export const saveAgenda = (value) => writeJSON(STORAGE_KEYS.agenda, value);

/* ===== المتحدثون ===== */
export const getSpeakers = () => readJSON(STORAGE_KEYS.speakers, DEFAULT_SPEAKERS);
export const saveSpeakers = (value) => writeJSON(STORAGE_KEYS.speakers, value);
