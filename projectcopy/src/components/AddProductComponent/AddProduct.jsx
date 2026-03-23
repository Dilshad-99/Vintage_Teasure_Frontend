import './AddProduct.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { __categoryapiurl, __productapiurl, __subcategoryapiurl } from '../../API_URL';
import { useToast } from '../../ToastContext';

function AddProduct() {

  const { showToast } = useToast();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const userEmail = localStorage.getItem('email');
  const userRole  = localStorage.getItem('role');

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [catnm, setCatnm] = useState('');
  const [subcatnm, setSubcatnm] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [reviews, setReviews] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [catList, setCatList] = useState([]);
  const [subcatList, setSubcatList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Redirect admin
  useEffect(() => {
    if (userRole === 'admin') {
      navigate(-1);
    }
  }, [userRole, navigate]);

  // Fetch categories
  useEffect(() => {
    axios.get(__categoryapiurl + "fetch")
      .then((response) => setCatList(response.data.userDetails || []))
      .catch((error) => {
        console.log(error);
        showToast(error?.response?.data?.message || 'Could not load categories.', 'error');
      });
  }, [showToast]);

  // Fetch subcategories
  useEffect(() => {
    if (!catnm) {
      setSubcatList([]);
      return;
    }

    axios.get(__subcategoryapiurl + "fetch", { params: { catnm } })
      .then((response) => setSubcatList(response.data.userDetails || []))
      .catch((error) => {
        console.log(error);
        showToast(
          error?.response?.status === 404
            ? 'No subcategories found.'
            : error?.response?.data?.message || 'Could not load subcategories.',
          'warning'
        );
        setSubcatList([]);
      });
  }, [catnm, showToast]);

  // ✅ USED NOW
  const handleRating = (e) => {
    const v = e.target.value;
    if (v === '') {
      setRating('');
      return;
    }
    setRating(Math.min(5, Math.max(0, Number(v))));
  };

  const resetForm = () => {
    setTitle('');
    setPrice('');
    setCatnm('');
    setSubcatnm('');
    setDescription('');
    setRating('');
    setReviews('');
    setImageFile(null);
    fileRef.current.value = '';
  };

 const handleSubmit = (e) => {
    e.preventDefault();

    if (!catnm || !subcatnm || !title || !imageFile || !price) {
      showToast('Please fill in all required fields.', 'warning');
      return;
    }

    const formdata = new FormData();
    formdata.append('title', title);
    formdata.append('price', price);
    formdata.append('catnm', catnm);
    formdata.append('subcatnm', subcatnm);
    formdata.append('description', description);
    formdata.append('ratings', rating);
    formdata.append('addedby', userEmail);
    formdata.append('role', userRole);
    formdata.append('producticon', imageFile);

    // ✅ reviews ko object format mein bhejo
    if (reviews) {
      const reviewObj = JSON.stringify({
        reviewer: userEmail,
        comment: reviews,
        rating: rating ? Number(rating) : 0,
        info: Date()
      });
      formdata.append('reviews', reviewObj);
    }

    setLoading(true);

    axios.post(__productapiurl + "save", formdata, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(() => {
        showToast('Product added!', 'success');
        resetForm();
      })
      .catch((error) => {
        console.log(error);
        showToast(error?.response?.data?.message || 'Failed to add product.', 'error');
      })
      .finally(() => setLoading(false));
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
          <input
            type="text"
            placeholder="Product title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Price *</label>
          <input
            type="text"
            placeholder="e.g. 499"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>

        <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="form-group">
            <label>Category *</label>
            <select value={catnm} onChange={e => setCatnm(e.target.value)}>
              <option value="">Select Category</option>
              {catList.map(c => (
                <option key={c._id} value={c.catnm}>{c.catnm}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Subcategory *</label>
            <select value={subcatnm} onChange={e => setSubcatnm(e.target.value)}>
              <option value="">Select Subcategory</option>
              {subcatList.map(s => (
                <option key={s._id} value={s.subcatnm}>{s.subcatnm}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Product Image *</label>
          <input
            type="file"
            ref={fileRef}
            onChange={e => setImageFile(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>Rating (0–5)</label>
          <input
            type="number"
            min="0"
            max="5"
            placeholder="0"
            value={rating}
            onChange={handleRating}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Product description..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Reviews</label>
          <textarea
            placeholder="Write a review..."
            value={reviews}
            onChange={e => setReviews(e.target.value)}
          />
        </div>

        <button className="add-product-btn" disabled={loading}>
          {loading ? 'Saving...' : 'Add Product'}
        </button>

      </form>
    </div>
  );
}

export default AddProduct;