import './ProductDetails.css';
import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { __productapiurl } from '../../API_URL';
import { useToast } from '../../ToastContext';

function ProductDetail() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const params   = useParams();
  const printRef = useRef(null);

  const userRole = localStorage.getItem('role');

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!params.id || isNaN(Number(params.id))) {
      showToast('Invalid product ID.', 'error');
      navigate(-1);
      return;
    }

    axios.get(__productapiurl + "fetch", { params: { "_id": params.id } })
      .then((response) => {
        const data = response.data.userDetails;
        if (data && data.length > 0) {
          setProduct(data[0]);
        } else {
          showToast('Product not found.', 'error');
          navigate(-1);
        }
      })
      .catch((error) => {
        console.log(error);
        showToast(error?.response?.data?.message || 'Failed to load product.', 'error');
        navigate(-1);
      })
      .finally(() => setIsLoading(false));
  }, [params.id, navigate, showToast]); // Added missing dependencies

  if (isLoading) return <p className="loading-msg">Loading product details...</p>;
  if (!product) return null;

  return (
    <div className="product-detail-page">
      <div className="product-detail-actions">
        <button className="back-link" onClick={() => navigate(-1)}>← Back to Products</button>
        <button className="download-btn" onClick={() => window.print()}>⬇️ Download PDF</button>
        {userRole === 'admin' && (
          <Link to={`/addreview/${product._id}`} className="add-review-btn">✍️ Add Review</Link>
        )}
      </div>

      <div className="product-detail-card" ref={printRef} id="print-root">
        <div className="product-detail-header">
          <img
            src={`/assets/uploads/producticons/${product.producticonnm}`}
            alt={product.title}
            className="product-detail-image"
            onError={e => e.target.src = '/assets/placeholder.png'}
          />
          <div className="product-detail-title-section">
            <h1 className="product-detail-title">{product.title}</h1>
            <p className="product-detail-breadcrumb">{product.catnm} → {product.subcatnm}</p>
            <p className="product-detail-price">₹{product.price}</p>
            <div className="product-detail-rating">
              {'⭐'.repeat(Math.round(product.ratings || 0))}
              <span className="rating-number">({product.ratings || 0}/5)</span>
            </div>
          </div>
        </div>

        <div className="product-detail-body">
          <div className="product-detail-section">
            <h3>Description</h3>
            <p>{product.description || 'No description available.'}</p>
          </div>

          <div className="product-detail-section">
            <h3>Reviews</h3>
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((r, i) => (
                <div key={i} className="review-item">
                  <p><strong>{r.reviewer || 'Anonymous'}:</strong> {r.comment || 'No comment.'}</p>
                  <span className="review-rating">{'⭐'.repeat(Math.round(r.rating || 0))} ({r.rating || 0}/5)</span>
                  {r.info && <p className="review-info">{r.info}</p>}
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>

          <div className="product-detail-info-grid">
            <div className="info-item"><span className="info-label">Category</span><span className="info-value">{product.catnm}</span></div>
            <div className="info-item"><span className="info-label">SubCategory</span><span className="info-value">{product.subcatnm}</span></div>
            <div className="info-item"><span className="info-label">Price</span><span className="info-value">₹{product.price}</span></div>
            <div className="info-item"><span className="info-label">Rating</span><span className="info-value">{product.ratings || 0}/5</span></div>
            <div className="info-item"><span className="info-label">Added By</span><span className="info-value">{product.addedby || 'N/A'}</span></div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;