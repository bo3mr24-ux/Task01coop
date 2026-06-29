import { useState, useEffect } from "react";

const API_BASE = "/api/content";

export const DEFAULT_CONFERENCE_TIME = {
  startDate: "2026-02-04",
  startTime: "07:00",
  endDate: "2026-02-05",
  endTime: "19:00",
};

export const DEFAULT_ABOUT =
  "يُعد المؤتمر الإقليمي الأول للري والصرف الزراعي بالشرق الأوسط منصةً علميةً ومهنيةً رائدةً تجمع نخبةً من الخبراء والمختصين وصنّاع القرار من مختلف دول المنطقة، بهدف مناقشة التحديات المتزايدة التي تواجه قطاع المياه والري، واستعراض أحدث الحلول والتقنيات المستدامة في مجال الإدارة المتكاملة للموارد المائية.";

const DAY_LABELS = ["", "اليوم الأول", "اليوم الثاني", "اليوم الثالث"];

export const DEFAULT_AGENDA = [
  {
    id: "day1",
    label: "اليوم الأول",
    date: DEFAULT_CONFERENCE_TIME.startDate,
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
    date: DEFAULT_CONFERENCE_TIME.endDate,
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
  { name: "محمد", title: "خبير الموارد المائية", image: null },
  { name: "عمر", title: "استشاري تقنيات الري الحديثة", image: null },
  { name: "د. خالد", title: "مهندس", image: null },
  { name: "متحدث", title: "مدير مشاريع", image: null },
  { name: "عبدالله", title: "مهندس", image: null },
  { name: "سعد", title: "مهندس", image: null },
];

export async function fetchConferenceTime() {
  const res = await fetch(`${API_BASE}/settings`);
  if (!res.ok) throw new Error("settings fetch failed");
  return res.json();
}

export async function fetchConferenceStartISO() {
  const t = await fetchConferenceTime();
  if (!t.startDate) return null;
  return `${t.startDate}T${t.startTime || "00:00"}:00`;
}

export async function fetchAbout() {
  const res = await fetch(`${API_BASE}/about`);
  if (!res.ok) throw new Error("about fetch failed");
  const { contentAr } = await res.json();
  return contentAr || DEFAULT_ABOUT;
}

export async function fetchAgenda() {
  const res = await fetch(`${API_BASE}/agenda`);
  if (!res.ok) throw new Error("agenda fetch failed");
  const days = await res.json();
  return days.map((d) => ({
    id: `day${d.dayNumber}`,
    label: DAY_LABELS[d.dayNumber] ?? `اليوم ${d.dayNumber}`,
    date:
      d.dayNumber === 1
        ? DEFAULT_CONFERENCE_TIME.startDate
        : DEFAULT_CONFERENCE_TIME.endDate,
    items: d.items.map((i) => (i.time ? `${i.time} - ${i.title}` : i.title)),
  }));
}

export async function fetchSpeakers() {
  const res = await fetch(`${API_BASE}/speakers`);
  if (!res.ok) throw new Error("speakers fetch failed");
  const speakers = await res.json();
  return speakers.map((s) => ({
    name: s.name,
    title: s.title,
    image: s.imagePath ?? null,
  }));
}

export function useRemoteContent(fetchFn, defaultValue) {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    let alive = true;
    fetchFn()
      .then((data) => {
        if (alive && data != null) setValue(data);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return value;
}
