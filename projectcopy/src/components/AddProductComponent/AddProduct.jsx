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
    formdata.append('reviews', reviews);
    formdata.append('producticon', imageFile);
    formdata.append('addedby', userEmail);
    formdata.append('role', userRole);

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
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />

        <select value={catnm} onChange={e => setCatnm(e.target.value)}>
          <option value="">Category</option>
          {catList.map(c => (
            <option key={c._id} value={c.catnm}>
              {c.catnm}
            </option>
          ))}
        </select>

        <select value={subcatnm} onChange={e => setSubcatnm(e.target.value)}>
          <option value="">Subcategory</option>
          {subcatList.map(s => (
            <option key={s._id} value={s.subcatnm}>
              {s.subcatnm}
            </option>
          ))}
        </select>

        <input
          type="file"
          ref={fileRef}
          onChange={e => setImageFile(e.target.files[0])}
        />

        {/* ✅ Rating input added */}
        <input
          type="number"
          min="0"
          max="5"
          placeholder="Rating (0–5)"
          value={rating}
          onChange={handleRating}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <textarea
          placeholder="Reviews"
          value={reviews}
          onChange={e => setReviews(e.target.value)}
        />

        <button disabled={loading}>
          {loading ? 'Saving...' : 'Add Product'}
        </button>

      </form>
    </div>
  );
}

export default AddProduct;