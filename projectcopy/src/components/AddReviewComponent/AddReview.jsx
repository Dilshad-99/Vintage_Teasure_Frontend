import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { __productapiurl } from '../../API_URL';
import { useToast } from '../../ToastContext';

function AddReview() {

  const { showToast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);

  // only admin
  useEffect(() => {
    if (role !== "admin") {
      showToast("Only admin allowed", "error");
      navigate(-1);
    }
  }, []);

  if (role !== "admin") return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment || !rating) {
      showToast("Fill all fields", "warning");
      return;
    }

    setLoading(true);

    axios.patch(__productapiurl + "update", {
      condition_obj: { _id: Number(id) },
      reviews: {
        reviewer: email,
        comment: comment,
        rating: Number(rating)
      }
    })
    .then(() => {
      showToast("Review added", "success");
      navigate("/productdetail/" + id);
    })
    .catch(() => {
      showToast("Error adding review", "error");
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="page-section add-product-page">

      <div className="add-product-header">
        <span>✍️</span>
        <h2>Add Review</h2>
      </div>

      <form className="add-product-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Rating (0-5)</label>
          <input
            type="number"
            min="0"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>

          <button type="button" onClick={() => navigate(-1)}>
            Cancel
          </button>

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Submit"}
          </button>

        </div>

      </form>
    </div>
  );
}

export default AddReview;