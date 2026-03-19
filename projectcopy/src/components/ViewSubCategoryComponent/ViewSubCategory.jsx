import './ViewSubCategory.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { __subcategoryapiurl } from '../../API_URL';
import { Link, useParams } from 'react-router-dom';
import { useToast } from '../../ToastContext';

function ViewSubCategory() {
  const { showToast } = useToast();
  const params = useParams();
  const [scList, setSubCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(__subcategoryapiurl + "fetch", {
      params: { "catnm": params.cnm }
    })
      .then((response) => {
        const data = response.data.userDetails || [];
        setSubCategoryList(data);
        if (data.length > 0) {
          showToast(`${data.length} subcategories loaded!`, "success");
        } else {
          showToast("No subcategories found.", "warning");
        }
      })
      .catch((error) => {
        console.error(error);
        showToast("Failed to load subcategories.", "error");
        setError("Failed to load subcategories.");
        setSubCategoryList([]);
      })
      .finally(() => setLoading(false));
  }, [params.cnm, showToast]);

  return (
    <div className="view-subcategory-page">
      <Link to="/viewcategory" className="back-link">← Back to Categories</Link>
      <div className="view-subcategory-header">
        <span className="view-subcategory-icon">📂</span>
        <h2>SubCategory List</h2>
        <p className="category-breadcrumb">{params.cnm}</p>
      </div>

      {loading && <p className="loading-msg">Loading...</p>}
      {error && <p className="error-msg">{error}</p>}

      <div className="subcategory-grid">
        {!loading && scList.length > 0 ? (
          scList.map((row) => (
            <Link
              to={`/viewproduct/${row.subcatnm}`}
              className="subcategory-card"
              key={row._id}
            >
              <img
                src={`/assets/uploads/subcaticons/${row.subcaticonnm}`}
                alt={row.subcatnm}
                className="subcategory-card-image"
                onError={(e) => e.target.src = "/assets/placeholder.png"}
              />
              <span className="subcategory-card-name">{row.subcatnm}</span>
            </Link>
          ))
        ) : (
          !loading && (
            <div className="subcategory-empty">
              <span className="subcategory-empty-icon">📭</span>
              <p>No subcategories found for {params.cnm}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ViewSubCategory;