import { useState } from "react";
import { FaSave, FaPlus, FaTrash } from "react-icons/fa";
import { getSpeakers, saveSpeakers } from "../../../data/conferenceStore";

export default function AdminSpeakers() {
  const [speakers, setSpeakers] = useState(() =>
    getSpeakers().map((s) => ({ ...s }))
  );
  const [saved, setSaved] = useState(false);

  const markDirty = () => setSaved(false);

  const updateField = (index, field, value) => {
    setSpeakers((prev) => {
      const next = prev.map((s) => ({ ...s }));
      next[index][field] = value;
      return next;
    });
    markDirty();
  };

  const addSpeaker = () => {
    setSpeakers((prev) => [...prev, { name: "متحدث جديد", title: "", image: "" }]);
    markDirty();
  };

  const deleteSpeaker = (index) => {
    setSpeakers((prev) => prev.filter((_, i) => i !== index));
    markDirty();
  };

  const handleSave = () => {
    saveSpeakers(speakers);
    setSaved(true);
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2 className="admin-panel-title">المتحدثون</h2>
        <button
          type="button"
          className="btn btn-primary d-inline-flex align-items-center gap-2"
          onClick={handleSave}
        >
          <FaSave aria-hidden="true" />
          حفظ التغييرات
        </button>
      </div>

      {speakers.length === 0 && (
        <div className="admin-empty">لا يوجد متحدثون — أضف متحدثاً جديداً.</div>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table" style={{ whiteSpace: "normal" }}>
          <thead>
            <tr>
              <th style={{ width: "5%" }}>#</th>
              <th style={{ width: "35%" }}>الاسم</th>
              <th style={{ width: "45%" }}>المسمى / التخصص</th>
              <th style={{ width: "15%" }}>إجراء</th>
            </tr>
          </thead>
          <tbody>
            {speakers.map((speaker, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={speaker.name}
                    placeholder="اسم المتحدث"
                    onChange={(e) => updateField(index, "name", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={speaker.title}
                    placeholder="المسمى الوظيفي / التخصص"
                    onChange={(e) => updateField(index, "title", e.target.value)}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="admin-icon-btn danger"
                    onClick={() => deleteSpeaker(index)}
                    aria-label="حذف المتحدث"
                    title="حذف المتحدث"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className="btn btn-outline-success btn-sm d-inline-flex align-items-center gap-2 mt-3"
        onClick={addSpeaker}
      >
        <FaPlus aria-hidden="true" />
        إضافة متحدث
      </button>

      {saved && (
        <div className="admin-saved-alert">تم حفظ قائمة المتحدثين بنجاح ✓</div>
      )}
    </div>
  );
}
