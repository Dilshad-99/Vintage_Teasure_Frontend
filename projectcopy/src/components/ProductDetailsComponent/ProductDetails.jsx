import './ProductDetails.css';
import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { __productapiurl } from '../../API_URL';
import { useToast } from '../../ToastContext';

function ProductDetail() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const params = useParams();
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
  }, [params.id, navigate, showToast]);

  if (isLoading) return <p className="loading-msg">Loading product details...</p>;
  if (!product) return null;

  return (
    <div className="product-detail-page">
      <div className="product-detail-actions">
        <button className="back-link" onClick={() => navigate(-1)}>← Back</button>
        <button className="download-btn" onClick={() => window.print()}>⬇️ Download</button>

        {userRole === 'admin' && (
          <Link to={`/addreview/${product._id}`} className="add-review-btn">
            ✍️ Add Review
          </Link>
        )}
      </div>

      <div className="product-detail-card" ref={printRef}>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
      </div>
    </div>
  );
}

export default ProductDetail;