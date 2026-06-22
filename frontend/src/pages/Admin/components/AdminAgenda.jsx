import { useState } from "react";
import { FaSave, FaPlus, FaTrash } from "react-icons/fa";
import { getAgenda, saveAgenda } from "../../../data/conferenceStore";

export default function AdminAgenda() {
  // نسخة عميقة قابلة للتحرير
  const [days, setDays] = useState(() =>
    getAgenda().map((d) => ({ ...d, items: [...d.items] }))
  );
  const [saved, setSaved] = useState(false);

  const markDirty = () => setSaved(false);

  const updateItem = (dayIndex, itemIndex, value) => {
    setDays((prev) => {
      const next = prev.map((d) => ({ ...d, items: [...d.items] }));
      next[dayIndex].items[itemIndex] = value;
      return next;
    });
    markDirty();
  };

  const addItem = (dayIndex) => {
    setDays((prev) => {
      const next = prev.map((d) => ({ ...d, items: [...d.items] }));
      next[dayIndex].items.push("بند جديد");
      return next;
    });
    markDirty();
  };

  const deleteItem = (dayIndex, itemIndex) => {
    setDays((prev) => {
      const next = prev.map((d) => ({ ...d, items: [...d.items] }));
      next[dayIndex].items.splice(itemIndex, 1);
      return next;
    });
    markDirty();
  };

  const handleSave = () => {
    saveAgenda(days);
    setSaved(true);
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2 className="admin-panel-title">الأجندة</h2>
        <button
          type="button"
          className="btn btn-primary d-inline-flex align-items-center gap-2"
          onClick={handleSave}
        >
          <FaSave aria-hidden="true" />
          حفظ التغييرات
        </button>
      </div>

      {days.map((day, dayIndex) => (
        <div className="admin-day-block" key={day.id}>
          <div className="admin-day-title">
            {day.label} — {day.date}
          </div>

          {day.items.length === 0 && (
            <div className="admin-empty">لا توجد بنود — أضف بنداً جديداً.</div>
          )}

          {day.items.map((item, itemIndex) => (
            <div className="admin-editable-row" key={itemIndex}>
              <input
                type="text"
                className="form-control"
                value={item}
                onChange={(e) => updateItem(dayIndex, itemIndex, e.target.value)}
              />
              <button
                type="button"
                className="admin-icon-btn danger"
                onClick={() => deleteItem(dayIndex, itemIndex)}
                aria-label="حذف البند"
                title="حذف البند"
              >
                <FaTrash />
              </button>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-outline-success btn-sm d-inline-flex align-items-center gap-2 mt-3"
            onClick={() => addItem(dayIndex)}
          >
            <FaPlus aria-hidden="true" />
            إضافة بند
          </button>
        </div>
      ))}

      {saved && <div className="admin-saved-alert">تم حفظ الأجندة بنجاح ✓</div>}
    </div>
  );
}
