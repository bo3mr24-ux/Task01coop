/* =========================================================
   مخزن محتوى المؤتمر (Frontend)
   مصدر واحد للقيم الافتراضية الاحتياطية + دوال جلب من الـ API.
   الصفحة العامة تقرأ المحتوى الحيّ من /api/content/* مع قيم
   افتراضية تُعرض فوراً وعند فشل الشبكة (لا تُترك الصفحة فارغة).
   ========================================================= */

/* ===== القيم الافتراضية (تطابق المحتوى المبدئي في قاعدة البيانات) ===== */

export const DEFAULT_CONFERENCE_TIME = {
  startDate: "2026-02-04",
  startTime: "07:00",
  endDate: "2026-02-05",
  endTime: "19:00",
};

export const DEFAULT_ABOUT =
  "يُعد المؤتمر الإقليمي الأول للري والصرف الزراعي بالشرق الأوسط منصةً علميةً ومهنيةً رائدةً تجمع نخبةً من الخبراء والمختصين وصنّاع القرار من مختلف دول المنطقة، بهدف مناقشة التحديات المتزايدة التي تواجه قطاع المياه والري، واستعراض أحدث الحلول والتقنيات المستدامة في مجال الإدارة المتكاملة للموارد المائية.";

const DAY_LABELS = [
  "اليوم الأول",
  "اليوم الثاني",
  "اليوم الثالث",
  "اليوم الرابع",
  "اليوم الخامس",
];

const AR_MONTHS = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];

// تنسيق ISO (YYYY-MM-DD) إلى صيغة عربية: "04 فبراير 2026"
function formatArabicDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${String(d).padStart(2, "0")} ${AR_MONTHS[m - 1]} ${y}`;
}

// تاريخ يوم في الأجندة = تاريخ بداية المؤتمر + (رقم اليوم - 1)
function agendaDate(dayNumber, startDate) {
  const base = startDate || DEFAULT_CONFERENCE_TIME.startDate;
  const d = new Date(`${base}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  d.setDate(d.getDate() + (dayNumber - 1));
  const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  return formatArabicDate(iso);
}

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
  { name: "محمد", title: "خبير الموارد المائية", image: "" },
  { name: "عمر", title: "استشاري تقنيات الري الحديثة", image: "" },
  { name: "د. خالد", title: "مهندس", image: "" },
  { name: "متحدث", title: "مدير مشاريع", image: "" },
  { name: "عبدالله", title: "مهندس", image: "" },
  { name: "سعد", title: "مهندس", image: "" },
];

export const DEFAULT_OBJECTIVES = [
  {
    title: "حلول مستدامة",
    description:
      "حلول مستدامة لإدارة الموارد المائية المتاحة وتعظيم الاستفادة من المصادر المتجددة لمواجهة زيادة الطلب على المياه في القطاع الزراعي.",
  },
  {
    title: "تعزيز التقنيات الحديثة",
    description:
      "تعزيز الاعتماد على نظم الري الحديثة والتقنيات الذكية لمواجهة التحديات المائية بأساليب مبتكرة.",
  },
  {
    title: "توفير منصة",
    description:
      "توفير منصة للمهنيين بالري والصرف والتوعية لتبادل الخبرات والمعرفة وخلق الشراكات.",
  },
  {
    title: "حلول لمواجهة آثار المناخ",
    description:
      "تقديم حلول لمواجهة آثار تغير المناخ ومدى تأثيره على الموارد المائية واستدامة المياه في قطاع الري.",
  },
  {
    title: "إدارة مياه الري والصرف",
    description:
      "دعم وتنفيذ سياسات الإدارة المتكاملة لمياه الري وتحسين الطلب والاستهلاك وتحقيق التنمية الاقتصادية والاجتماعية والبيئية.",
  },
];

/* ===== أداة جلب عامة آمنة (تعيد القيمة الاحتياطية عند الفشل) ===== */
async function getJSON(url) {
  const res = await fetch(url, { cache: "no-store", headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

/* ===== وقت المؤتمر ===== */
export async function fetchConferenceTime() {
  try {
    const data = await getJSON("/api/content/settings");
    return { ...DEFAULT_CONFERENCE_TIME, ...(data || {}) };
  } catch {
    return DEFAULT_CONFERENCE_TIME;
  }
}

export async function fetchConferenceStartISO() {
  const t = await fetchConferenceTime();
  if (!t.startDate) return null;
  return `${t.startDate}T${t.startTime || "00:00"}:00`;
}

/* ===== عن المؤتمر ===== */
export async function fetchAbout() {
  try {
    const data = await getJSON("/api/content/about");
    return data?.contentAr || DEFAULT_ABOUT;
  } catch {
    return DEFAULT_ABOUT;
  }
}

/* ===== الأجندة ===== */
export async function fetchAgenda() {
  try {
    const [groups, t] = await Promise.all([
      getJSON("/api/content/agenda"),
      fetchConferenceTime(),
    ]);
    if (!Array.isArray(groups) || groups.length === 0) return DEFAULT_AGENDA;
    return groups.map((g) => ({
      id: `day${g.dayNumber}`,
      label: DAY_LABELS[g.dayNumber - 1] || `اليوم ${g.dayNumber}`,
      date: agendaDate(g.dayNumber, t.startDate),
      items: (g.items || []).map((i) => i.title),
    }));
  } catch {
    return DEFAULT_AGENDA;
  }
}

/* ===== المتحدثون ===== */
export async function fetchSpeakers() {
  try {
    const data = await getJSON("/api/content/speakers");
    if (!Array.isArray(data) || data.length === 0) return DEFAULT_SPEAKERS;
    return data.map((s) => ({ name: s.name, title: s.title, image: s.imagePath || "" }));
  } catch {
    return DEFAULT_SPEAKERS;
  }
}

/* ===== أهداف المؤتمر ===== */
export async function fetchObjectives() {
  try {
    const data = await getJSON("/api/content/objectives");
    if (!Array.isArray(data) || data.length === 0) return DEFAULT_OBJECTIVES;
    return data.map((o) => ({ title: o.title, description: o.description }));
  } catch {
    return DEFAULT_OBJECTIVES;
  }
}

/* ===== خطّاف عام: يعرض القيمة الاحتياطية فوراً ثم يستبدلها بالبيانات الحيّة ===== */
import { useEffect, useState } from "react";

export function useRemoteContent(fetchFn, fallback) {
  const [data, setData] = useState(fallback);
  useEffect(() => {
    let alive = true;
    Promise.resolve()
      .then(fetchFn)
      .then((value) => {
        if (alive && value != null) setData(value);
      })
      .catch(() => {
        /* نُبقي القيمة الاحتياطية */
      });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return data;
}
