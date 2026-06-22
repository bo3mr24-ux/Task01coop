import { useState } from "react";
import { FaSave, FaUndo } from "react-icons/fa";
import { getAbout, saveAbout, DEFAULT_ABOUT } from "../../../data/conferenceStore";

export default function AdminAbout() {
  const [text, setText] = useState(() => getAbout());
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    saveAbout(text);
    setSaved(true);
  };

  const handleReset = () => {
    setText(DEFAULT_ABOUT);
    setSaved(false);
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2 className="admin-panel-title">عن المؤتمر</h2>
      </div>

      <form onSubmit={handleSave}>
        <label className="form-label fw-semibold">نص التعريف بالمؤتمر</label>
        <textarea
          className="form-control"
          rows={10}
          dir="rtl"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setSaved(false);
          }}
          placeholder="اكتب نص التعريف بالمؤتمر..."
        />

        <div className="d-flex gap-2 mt-3">
          <button type="submit" className="btn btn-primary d-inline-flex align-items-center gap-2">
            <FaSave aria-hidden="true" />
            حفظ التغييرات
          </button>
          <button
            type="button"
            className="btn btn-outline-success d-inline-flex align-items-center gap-2"
            onClick={handleReset}
          >
            <FaUndo aria-hidden="true" />
            استعادة النص الافتراضي
          </button>
        </div>
      </form>

      {saved && (
        <div className="admin-saved-alert">تم حفظ نص "عن المؤتمر" بنجاح ✓</div>
      )}
    </div>
  );
}
