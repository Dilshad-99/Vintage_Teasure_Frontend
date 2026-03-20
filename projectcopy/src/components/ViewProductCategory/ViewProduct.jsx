import './ViewProduct.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { __productapiurl } from '../../API_URL';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useToast } from '../../ToastContext';

function ViewProduct() {

  const { showToast } = useToast();
  const params   = useParams();
  const navigate = useNavigate();

  const userEmail = localStorage.getItem('email');
  const userRole  = localStorage.getItem('role');

  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');

  // loadProducts function should be inside useEffect dependency array
  useEffect(() => {
    loadProducts();
  }, [params.scnm, userRole, userEmail, showToast, navigate]); // Add necessary dependencies

  const loadProducts = () => {
    const query = { subcatnm: params.scnm, role: userRole };
    if (userRole !== 'admin') query.addedby = userEmail;

    axios.get(__productapiurl + "fetch", { params: query })
      .then((response) => {
        const list = response.data.userDetails || [];
        setProductList(list);
        list.length > 0
          ? showToast(`${list.length} product(s) loaded!`, 'success')
          : showToast('No products found.', 'warning');
      })
      .catch((error) => {
        console.log(error);
        setErrMsg('Could not load products. Please try again.');
        showToast('Failed to load products.', 'error');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="view-product-page">

      <button className="back-link" onClick={() => navigate(-1)}>
        ← Back to Subcategories
      </button>

      <div className="view-product-header">
        <span className="view-product-icon">🛍️</span>
        <h2>Product List</h2>
        <p className="product-breadcrumb">{params.scnm}</p>
      </div>

      {isLoading && <p className="loading-msg">Loading products...</p>}
      {errMsg    && <p className="error-msg">{errMsg}</p>}

      <div className="product-grid">
        {!isLoading && productList.length > 0 ? (
          productList.map((product) => (
            <div className="product-card" key={product._id}>
              <img
                src={`/assets/uploads/producticons/${product.producticonnm}`}
                alt={product.title}
                className="product-card-image"
                onError={e => e.target.src = '/assets/placeholder.png'}
              />
              <span className="product-card-name">{product.title}</span>
              {product.price && <span className="product-card-price">₹{product.price}</span>}
              {product.description && <p className="product-card-desc">{product.description}</p>}

              <Link to={`/productdetail/${product._id}`} className="product-detail-btn">
                View Details
              </Link>

              {userRole === 'admin' && (
                <Link to={`/addreview/${product._id}`} className="add-review-btn">
                  ✍️ Add Review
                </Link>
              )}
            </div>
          ))
        ) : (
          !isLoading && (
            <div className="product-empty">
              <span className="product-empty-icon">📭</span>
              <p>No products found for "{params.scnm}".</p>
            </div>
          )
        )}
      </div>

    </div>
  );
}

export default ViewProduct;