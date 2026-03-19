import axios from "axios";
import React, { useRef, useState } from "react";
import { __categoryapiurl } from "../../API_URL";
import "./AddCategory.css";
import { useToast } from "../../ToastContext";

function AddCategory() {
  const { showToast } = useToast();
  const [catnm, setCatnm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!catnm || !selectedFile) {
      showToast("All fields are required.", "warning");
      return;
    }

    const formdata = new FormData();
    formdata.append("catnm", catnm);
    formdata.append("caticon", selectedFile);

    setLoading(true);
    axios
      .post(__categoryapiurl + "save", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        showToast("Category added successfully!", "success");
        setCatnm("");
        setSelectedFile(null);
        fileInputRef.current.value = "";
      })
      .catch((error) => {
        console.error("Error:", error);
        showToast("Server error. Make sure the API server is running.", "error");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="page-section add-category-page">
      <div className="add-category-header">
        <span className="add-category-icon">📁</span>
        <h2>Add Category</h2>
      </div>

      <form className="add-category-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              onChange={(e) => setCatnm(e.target.value)}
              value={catnm}
              placeholder="Enter category name"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category Icon</label>
            <input
              type="file"
              onChange={handleChange}
              ref={fileInputRef}
            />
          </div>
        </div>

        <div className="form-row">
          <button
            type="submit"
            className="add-category-btn"
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Category"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCategory;