import './ProductDetails.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { __productapiurl } from '../../API_URL';
import { useToast } from '../../ToastContext';

function ProductDetail() {

  const { showToast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  const userRole = localStorage.getItem("role");
  const userEmail = localStorage.getItem("email");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch product
  useEffect(() => {

    axios.get(__productapiurl + "fetch", {
      params: { _id: id }
    })
    .then((res) => {
      const data = res.data.userDetails;

      if (data && data.length > 0) {
        setProduct(data[0]);
      } else {
        showToast("Product not found", "error");
        navigate(-1);
      }
    })
    .catch(() => {
      showToast("Error loading product", "error");
      navigate(-1);
    })
    .finally(() => {
      setLoading(false);
    });

  }, []);

  // delete
  const handleDelete = () => {

    if (!window.confirm("Delete this product?")) return;

    axios.delete(__productapiurl + "delete", {
      data: { condition_obj: { _id: Number(id) } }
    })
    .then(() => {
      showToast("Deleted", "success");
      navigate(-1);
    })
    .catch(() => {
      showToast("Delete failed", "error");
    });
  };

  if (loading) return <p className="loading-msg">Loading...</p>;
  if (!product) return null;

  const canEdit =
    userRole === "admin" ||
    product.addedby === userEmail;

  return (
    <div className="product-detail-page">

      {/* top buttons */}
      <div className="product-detail-actions">

        <button onClick={() => navigate(-1)} className="back-link">
          ← Back
        </button>

        <button onClick={() => window.print()} className="download-btn">
          ⬇️ Download
        </button>

        {userRole === "admin" && (
          <Link to={"/addreview/" + product._id} className="add-review-btn">
            ✍️ Add Review
          </Link>
        )}

        {canEdit && (
          <>
            <Link to={"/editproduct/" + product._id} className="edit-btn">
              ✏️ Edit
            </Link>

            <button onClick={handleDelete} className="delete-btn">
              🗑️ Delete
            </button>
          </>
        )}

      </div>

      {/* product */}
      <div className="product-detail-card">

        <img
          src={"/assets/uploads/producticons/" + product.producticonnm}
          alt=""
          className="product-detail-image"
        />

        <div className="product-detail-info">

          <h1>{product.title}</h1>

          <p className="product-detail-price">₹{product.price}</p>

          <p className="product-detail-desc">{product.description}</p>

          <p className="product-detail-meta">Category: {product.catnm}</p>
          <p className="product-detail-meta">Subcategory: {product.subcatnm}</p>
          <p className="product-detail-meta">Added by: {product.addedby}</p>

          <p className="product-detail-rating">
            Rating: {"⭐".repeat(Math.round(product.ratings || 0))}
          </p>

        </div>

      </div>

      {/* reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="product-reviews">

          <h3>Reviews</h3>

          {product.reviews.map((r, i) => (
            <div className="review-card" key={i}>

              <p>{r.reviewer}</p>
              <p>{r.comment}</p>
              <p>{"⭐".repeat(Math.round(r.rating))}</p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default ProductDetail;