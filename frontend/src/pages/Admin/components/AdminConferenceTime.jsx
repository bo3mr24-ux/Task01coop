import { useState } from "react";
import { FaSave } from "react-icons/fa";
import {
  getConferenceTime,
  saveConferenceTime,
} from "../../../data/conferenceStore";

export default function AdminConferenceTime() {
  const [form, setForm] = useState(() => getConferenceTime());
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveConferenceTime(form);
    setSaved(true);
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2 className="admin-panel-title">وقت بدء المؤتمر</h2>
      </div>

      <form className="row g-3" onSubmit={handleSave}>
        <div className="col-md-6">
          <label className="form-label fw-semibold">تاريخ بداية المؤتمر</label>
          <input
            type="date"
            name="startDate"
            className="form-control"
            value={form.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">وقت بداية المؤتمر</label>
          <input
            type="time"
            name="startTime"
            className="form-control"
            value={form.startTime}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">تاريخ نهاية المؤتمر</label>
          <input
            type="date"
            name="endDate"
            className="form-control"
            value={form.endDate}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">وقت نهاية المؤتمر</label>
          <input
            type="time"
            name="endTime"
            className="form-control"
            value={form.endTime}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary d-inline-flex align-items-center gap-2">
            <FaSave aria-hidden="true" />
            حفظ التغييرات
          </button>
        </div>
      </form>

      {saved && (
        <div className="admin-saved-alert">تم حفظ وقت المؤتمر بنجاح ✓</div>
      )}
    </div>
  );
}
