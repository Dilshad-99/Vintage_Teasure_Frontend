import './AddProduct.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { __categoryapiurl, __productapiurl, __subcategoryapiurl } from '../../API_URL';
import { useToast } from '../../ToastContext';

function AddProduct() {

  const { showToast } = useToast();
  const navigate = useNavigate();
  const fileRef = useRef();

  const userEmail = localStorage.getItem('email');
  const userRole = localStorage.getItem('role');

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [catnm, setCatnm] = useState("");
  const [subcatnm, setSubcatnm] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [catList, setCatList] = useState([]);
  const [subcatList, setSubcatList] = useState([]);
  const [loading, setLoading] = useState(false);

  // admin block
  useEffect(() => {
    if (userRole === "admin") {
      navigate(-1);
    }
  }, []);

  // load categories
  useEffect(() => {
    axios.get(__categoryapiurl + "fetch")
      .then(res => setCatList(res.data.userDetails || []))
      .catch(() => showToast("Cannot load categories", "error"));
  }, []);

  // load subcategories
  useEffect(() => {

    if (!catnm) {
      setSubcatList([]);
      return;
    }

    axios.get(__subcategoryapiurl + "fetch", { params: { catnm } })
      .then(res => setSubcatList(res.data.userDetails || []))
      .catch(() => {
        showToast("No subcategories", "warning");
        setSubcatList([]);
      });

  }, [catnm]);

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !price || !catnm || !subcatnm || !imageFile) {
      showToast("Fill required fields", "warning");
      return;
    }

    let data = new FormData();

    data.append("title", title);
    data.append("price", price);
    data.append("catnm", catnm);
    data.append("subcatnm", subcatnm);
    data.append("description", description);
    data.append("ratings", rating);
    data.append("addedby", userEmail);
    data.append("role", userRole);
    data.append("producticon", imageFile);

    if (reviews) {
      data.append("reviews", JSON.stringify({
        reviewer: userEmail,
        comment: reviews,
        rating: rating ? Number(rating) : 0,
        info: Date()
      }));
    }

    setLoading(true);

    axios.post(__productapiurl + "save", data)
      .then(() => {
        showToast("Product added", "success");

        // reset
        setTitle("");
        setPrice("");
        setCatnm("");
        setSubcatnm("");
        setDescription("");
        setRating("");
        setReviews("");
        setImageFile(null);

        if (fileRef.current) {
          fileRef.current.value = "";
        }
      })
      .catch(() => {
        showToast("Failed to add product", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="page-section add-product-page">

      <div className="add-product-header">
        <span className="add-product-icon">📦</span>
        <h2>Add Product</h2>
      </div>

      <form className="add-product-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Title *</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Price *</label>
          <input value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>

          <div className="form-group">
            <label>Category *</label>
            <select value={catnm} onChange={(e) => setCatnm(e.target.value)}>
              <option value="">Select</option>
              {catList.map(c => (
                <option key={c._id}>{c.catnm}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Subcategory *</label>
            <select value={subcatnm} onChange={(e) => setSubcatnm(e.target.value)}>
              <option value="">Select</option>
              {subcatList.map(s => (
                <option key={s._id}>{s.subcatnm}</option>
              ))}
            </select>
          </div>

        </div>

        <div className="form-group">
          <label>Product Image *</label>
          <input
            type="file"
            ref={fileRef}
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>Rating</label>
          <input
            type="number"
            min="0"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Reviews</label>
          <textarea value={reviews} onChange={(e) => setReviews(e.target.value)} />
        </div>

        <button className="add-product-btn" disabled={loading}>
          {loading ? "Saving..." : "Add Product"}
        </button>

      </form>
    </div>
  );
}

export default AddProduct;