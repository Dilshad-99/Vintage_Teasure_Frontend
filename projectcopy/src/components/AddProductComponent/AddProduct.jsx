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

  const [form, setForm] = useState({
    title: '', price: '', catnm: '', subcatnm: '',
    description: '', rating: '', reviews: ''
  });
  const [imageFile, setImageFile]   = useState(null);
  const [catList, setCatList]       = useState([]);
  const [subcatList, setSubcatList] = useState([]);
  const [loading, setLoading]       = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRating = (e) => {
    const v = e.target.value;
    setForm(prev => ({ ...prev, rating: v === '' ? '' : Math.min(5, Math.max(0, Number(v))) }));
  };

  useEffect(() => {
    if (userRole === 'admin') navigate(-1);
  }, [userRole, navigate]);

  useEffect(() => {
    axios.get(__categoryapiurl + "fetch")
      .then(res => setCatList(res.data.userDetails || []))
      .catch(err => showToast(err?.response?.data?.message || 'Could not load categories.', 'error'));
  }, [showToast]);

  useEffect(() => {
    if (!form.catnm) { setSubcatList([]); return; }

    axios.get(__subcategoryapiurl + "fetch", { params: { catnm: form.catnm } })
      .then(res => setSubcatList(res.data.userDetails || []))
      .catch(err => {
        showToast(
          err?.response?.status === 404
            ? 'No subcategories found.'
            : err?.response?.data?.message || 'Could not load subcategories.',
          'warning'
        );
        setSubcatList([]);
      });
  }, [form.catnm, showToast]);

  const resetForm = () => {
    setForm({ title: '', price: '', catnm: '', subcatnm: '', description: '', rating: '', reviews: '' });
    setImageFile(null);
    fileRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, price, catnm, subcatnm, description, rating, reviews } = form;

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

    if (reviews) {
      formdata.append('reviews', JSON.stringify({
        reviewer: userEmail,
        comment: reviews,
        rating: rating ? Number(rating) : 0,
        info: Date()
      }));
    }

    setLoading(true);

    axios.post(__productapiurl + "save", formdata, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(() => { showToast('Product added!', 'success'); resetForm(); })
      .catch(err => showToast(err?.response?.data?.message || 'Failed to add product.', 'error'))
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
            name="title"
            placeholder="Product title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Price *</label>
          <input
            type="text"
            name="price"
            placeholder="e.g. 499"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="form-group">
            <label>Category *</label>
            <select name="catnm" value={form.catnm} onChange={handleChange}>
              <option value="">Select Category</option>
              {catList.map(c => <option key={c._id} value={c.catnm}>{c.catnm}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Subcategory *</label>
            <select name="subcatnm" value={form.subcatnm} onChange={handleChange}>
              <option value="">Select Subcategory</option>
              {subcatList.map(s => <option key={s._id} value={s.subcatnm}>{s.subcatnm}</option>)}
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
            name="rating"
            min="0"
            max="5"
            placeholder="0"
            value={form.rating}
            onChange={handleRating}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Product description..."
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Reviews</label>
          <textarea
            name="reviews"
            placeholder="Write a review..."
            value={form.reviews}
            onChange={handleChange}
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