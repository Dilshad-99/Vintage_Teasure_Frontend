import axios from "axios";
import React, { useEffect, useState } from "react";
import { __categoryapiurl } from "../../API_URL";
import { Link } from 'react-router-dom';
import './ViewCategory.css';
import { useToast } from '../../ToastContext';

function ViewCategory() {
  const { showToast } = useToast();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(__categoryapiurl + "fetch")
      .then((response) => {
        const data = response.data.userDetails || [];
        setCategoryList(data);
        if (data.length > 0) {
          showToast(`${data.length} categories loaded!`, "success");
        } else {
          showToast("No categories found.", "warning");
        }
      })
      .catch((error) => {
        console.error(error);
        showToast("Failed to load categories.", "error");
        setError("Failed to load categories.");
        setCategoryList([]);
      })
      .finally(() => setLoading(false));
  }, [showToast]);

  return (
    <div className="view-category-page">
      <div className="view-category-header">
        <span className="view-category-icon">📁</span>
        <h2>View Category List</h2>
      </div>

      {loading && <p className="loading-msg">Loading...</p>}
      {error && <p className="error-msg">{error}</p>}

      <div className="category-grid">
        {!loading && categoryList.length > 0 ? (
          categoryList.map((row) => (
            <Link
              to={`/viewsubcategory/${row.catnm}`}
              className="category-card"
              key={row._id}
            >
              <img
                src={`/assets/uploads/caticons/${row.caticonnm}`}
                alt={row.catnm}
                className="category-card-image"
                onError={(e) => e.target.src = "/assets/placeholder.png"}
              />
              <span className="category-card-name">{row.catnm}</span>
            </Link>
          ))
        ) : (
          !loading && (
            <div className="category-empty">
              <span className="category-empty-icon">📭</span>
              <p>No categories found</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ViewCategory;