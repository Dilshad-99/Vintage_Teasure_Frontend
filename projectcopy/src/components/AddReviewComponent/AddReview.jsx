import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { __productapiurl } from '../../API_URL';
import { useToast } from '../../ToastContext';

function AddReview() {

  const { showToast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  const userRole  = localStorage.getItem('role');
  const userEmail = localStorage.getItem('email');

  const [reviewer, setReviewer] = useState(userEmail || '');
  const [comment, setComment]   = useState('');
  const [rating, setRating]     = useState('');
  const [info, setInfo]         = useState('');
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    if (userRole !== 'admin') {
      showToast('Only admins can add reviews.', 'error');
      navigate(-1);
    }
  }, [userRole, navigate, showToast]);

  if (userRole !== 'admin') return null;

  const handleRating = (e) => {
    const v = e.target.value;
    setRating(v === '' ? '' : Math.min(5, Math.max(0, Number(v))));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment || !rating) {
      showToast('Comment and rating are required.', 'warning');
      return;
    }

    setLoading(true);

    axios.patch(__productapiurl + "update", {
      condition_obj: { _id: Number(id) },
      reviews: { reviewer: reviewer || 'Admin', comment, rating: Number(rating), info },
    })
      .then(() => {
        showToast('Review added!', 'success');
        navigate(`/productdetail/${id}`);
      })
      .catch(err => showToast(err?.response?.data?.message || 'Failed to submit review.', 'error'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="page-section add-product-page">
      <div className="add-product-header">
        <span className="add-product-icon">✍️</span>
        <h2>Add Review</h2>
        <p className="subtitle">Reviewing as <strong>{userEmail}</strong></p>
      </div>

      <form className="add-product-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Reviewer Name</label>
          <input
            type="text"
            value={reviewer}
            onChange={e => setReviewer(e.target.value)}
            placeholder="Your name or email"
          />
        </div>

        <div className="form-group">
          <label>Comment *</label>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Write your review here..."
            rows={4}
          />
        </div>

        <div className="form-group">
          <label>Rating (0–5) *</label>
          <input
            type="number"
            min="0"
            max="5"
            value={rating}
            onChange={handleRating}
            placeholder="e.g. 4"
          />
        </div>

        <div className="form-group">
          <label>Additional Info (optional)</label>
          <input
            type="text"
            value={info}
            onChange={e => setInfo(e.target.value)}
            placeholder="Any extra notes..."
          />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="button" className="add-product-btn" style={{ background: '#888' }} onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="add-product-btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>

      </form>
    </div>
  );
}

export default AddReview;