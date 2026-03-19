import './ManageUser.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { __userapiurl } from '../../API_URL';
import { useToast } from '../../ToastContext';

const PER_PAGE = 5;

function ManageUser() {

  const { showToast } = useToast();

  const [ users, setUsers ]     = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ search, setSearch ]   = useState('');
  const [ page, setPage ]       = useState(1);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = () => {
    axios.get(__userapiurl + "fetch", { params : { "role" : "user" } })
      .then((response) => setUsers(response.data.userDetails || []))
      .catch((error) => { console.log(error); showToast('Failed to load users.', 'error'); })
      .finally(() => setLoading(false));
  };

  const updateStatus = (_id, action) => {
    if (action === 'delete') {
      axios.delete(__userapiurl + "delete", { data : { _id } })
        .then(() => { showToast('User deleted.', 'success'); fetchUsers(); })
        .catch((error) => { console.log(error); showToast('Failed to delete user.', 'error'); });
    } else {
      const status = action === 'active' ? 1 : 0;
      axios.patch(__userapiurl + "update", { condition_obj : { _id }, content_obj : { status } })
        .then(() => { showToast(action === 'active' ? 'User activated! ✅' : 'User deactivated.', action === 'active' ? 'success' : 'warning'); fetchUsers(); })
        .catch((error) => { console.log(error); showToast('Failed to update user.', 'error'); });
    }
  };

  const filtered   = users.filter(u => [u.name, u.email, u.city].some(f => f?.toLowerCase().includes(search.toLowerCase())));
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const shown      = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const goTo       = (p) => p >= 1 && p <= totalPages && setPage(p);

  return (
    <div className="manage-user-section">
      <div className="manage-user-header">
        <span className="manage-user-icon">👥</span>
        <h2>Manage Users</h2>
        <p className="manage-user-count">{users.length} user{users.length !== 1 ? 's' : ''} registered</p>
      </div>

      {!loading && users.length > 0 && (
        <input
          type="text"
          placeholder="Search by name, email or city..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="search-input"
        />
      )}

      {loading ? (
        <p className="loading-msg">Loading users...</p>
      ) : users.length === 0 ? (
        <div className="manage-user-empty"><span>📭</span><p>No users found.</p></div>
      ) : filtered.length === 0 ? (
        <div className="manage-user-empty"><span>🔍</span><p>No users match your search.</p></div>
      ) : (
        <>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th><th>Name</th><th>Email</th><th>Mobile</th>
                  <th>Address</th><th>City</th><th>Gender</th><th>Info</th>
                  <th>Status</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((row) => (
                  <tr key={row._id}>
                    <td>{row._id}</td>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.mobile}</td>
                    <td>{row.address}</td>
                    <td>{row.city}</td>
                    <td>{row.gender}</td>
                    <td>{row.info}</td>
                    <td>
                      {row.status
                        ? <span className="status-active">Active</span>
                        : <span className="status-inactive">Inactive</span>}
                    </td>
                    <td className="action-cell">
                      <Link to="#" className="btn-change-status" onClick={() => updateStatus(row._id, row.status ? 'inactive' : 'active')}>
                        {row.status ? 'Deactivate' : 'Activate'}
                      </Link>
                      <Link to="#" className="btn-delete" onClick={() => updateStatus(row._id, 'delete')}>Delete</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button className="page-btn" onClick={() => goTo(1)}        disabled={page === 1}>«</button>
              <button className="page-btn" onClick={() => goTo(page - 1)} disabled={page === 1}>‹</button>
              {Array.from({ length : totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} className={`page-btn ${page === p ? 'active' : ''}`} onClick={() => goTo(p)}>{p}</button>
              ))}
              <button className="page-btn" onClick={() => goTo(page + 1)} disabled={page === totalPages}>›</button>
              <button className="page-btn" onClick={() => goTo(totalPages)} disabled={page === totalPages}>»</button>
              <span className="page-info">Page {page} of {totalPages} — {filtered.length} users</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ManageUser;