import './AddSubCategory.css';
import React, { useEffect, useRef, useState } from "react";
import { __categoryapiurl, __subcategoryapiurl } from "../../API_URL";
import axios from "axios";
import { useToast } from '../../ToastContext';

function AddSubCategory() {
  const { showToast } = useToast();
  const [cList, setCategoryList] = useState([]);
  const [subcatnm, setSubCatnm] = useState("");
  const [catnm, setCatnm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    axios.get(__categoryapiurl + "fetch")
      .then((response) => {
        setCategoryList(response.data.userDetails || []);
      })
      .catch((error) => {
        console.error(error);
        showToast("Failed to load categories.", "error");
        setCategoryList([]);
      });
  }, [showToast]);

  const handleChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!catnm || !subcatnm || !selectedFile) {
      showToast("All fields are required.", "warning");
      return;
    }

    const formdata = new FormData();
    formdata.append("catnm", catnm);
    formdata.append("subcatnm", subcatnm);
    formdata.append("caticon", selectedFile);

    setLoading(true);
    axios.post(__subcategoryapiurl + "save", formdata, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(() => {
        showToast("Subcategory added successfully!", "success");
        setCatnm("");
        setSubCatnm("");
        setSelectedFile(null);
        fileInputRef.current.value = "";
      })
      .catch(() => {
        showToast("Failed to add subcategory. Try again.", "error");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="add-subcategory-page">
      <div className="add-subcategory-header">
        <span className="add-subcategory-icon">📂</span>
        <h2>Add SubCategory</h2>
      </div>

      <form className="add-subcategory-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category List</label>
          <select onChange={e => setCatnm(e.target.value)} value={catnm}>
            <option value="">Select Category</option>
            {cList.map((row) => (
              <option key={row._id} value={row.catnm}>{row.catnm}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Sub Category Name</label>
          <input
            type="text"
            onChange={e => setSubCatnm(e.target.value)}
            value={subcatnm}
            placeholder="Enter subcategory name"
          />
        </div>

        <div className="form-group">
          <label>SubCategory Icon</label>
          <input
            type="file"
            onChange={handleChange}
            ref={fileInputRef}
          />
        </div>

        <button
          type="submit"
          className="add-subcategory-btn"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Add SubCategory'}
        </button>
      </form>
    </div>
  );
}

export default AddSubCategory;