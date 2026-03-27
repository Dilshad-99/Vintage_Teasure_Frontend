import '../AddProductComponent/AddProduct.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { __categoryapiurl, __productapiurl, __subcategoryapiurl } from '../../API_URL';
import { useToast } from '../../ToastContext';

function EditProduct() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  const userRole = localStorage.getItem('role');
  const userEmail = localStorage.getItem('email');

  const [form, setForm] = useState({
    title: '',
    price: '',
    catnm: '',
    subcatnm: '',
    description: '',
    rating: '',
  });

  const [catList, setCatList] = useState([]);
  const [subcatList, setSubcatList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle rating input with limit 0–5
  const handleRating = (e) => {
    const value = e.target.value;
    setForm(prev => ({ ...prev, rating: value === '' ? '' : Math.min(5, Math.max(0, Number(value))) }));
  };

  // Load product details
  useEffect(() => {
    axios.get(`${__productapiurl}fetch`, { params: { _id: id } })
      .then(res => {
        const product = res.data.userDetails?.[0];
        if (!product) {
          showToast('Product not found.', 'error');
          navigate(-1);
          return;
        }

        // Permission check
        if (userRole !== 'admin' && product.addedby !== userEmail) {
          showToast('You are not allowed to edit this product.', 'error');
          navigate(-1);
          return;
        }

        setForm({
          title: product.title || '',
          price: product.price || '',
          catnm: product.catnm || '',
          subcatnm: product.subcatnm || '',
          description: product.description || '',
          rating: product.ratings || '',
        });
      })
      .catch(() => {
        showToast('Failed to load product.', 'error');
        navigate(-1);
      });
  }, [id, userRole, userEmail, navigate, showToast]);

  // Load categories
  useEffect(() => {
    axios.get(`${__categoryapiurl}fetch`)
      .then(res => setCatList(res.data.userDetails || []))
      .catch(() => showToast('Could not load categories.', 'error'));
  }, []);

  // Load subcategories whenever category changes
  useEffect(() => {
    if (!form.catnm) {
      setSubcatList([]);
      return;
    }

    axios.get(`${__subcategoryapiurl}fetch`, { params: { catnm: form.catnm } })
      .then(res => setSubcatList(res.data.userDetails || []))
      .catch(() => setSubcatList([]));
  }, [form.catnm]);

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.price || !form.catnm || !form.subcatnm) {
      showToast('Please fill in all required fields.', 'warning');
      return;
    }

    setLoading(true);

    const updateData = {
      condition_obj: { _id: Number(id) },
      title: form.title,
      price: form.price,
      catnm: form.catnm,
      subcatnm: form.subcatnm,
      description: form.description,
      ratings: form.rating,
    };

    axios.patch(`${__productapiurl}update`, updateData)
      .then(() => {
        showToast('Product updated!', 'success');
        navigate(`/productdetail/${id}`);
      })
      .catch(() => showToast('Failed to update product.', 'error'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="page-section add-product-page">
      <div className="add-product-header">
        <span className="add-product-icon">✏️</span>
        <h2>Edit Product</h2>
      </div>

      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Product title" />
        </div>

        <div className="form-group">
          <label>Price *</label>
          <input type="text" name="price" value={form.price} onChange={handleChange} placeholder="e.g. 499" />
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
          <label>Rating (0–5)</label>
          <input type="number" name="rating" min="0" max="5" value={form.rating} onChange={handleRating} placeholder="0" />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Product description..." />
        </div>

        <button className="add-product-btn" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

export default EditProduct;