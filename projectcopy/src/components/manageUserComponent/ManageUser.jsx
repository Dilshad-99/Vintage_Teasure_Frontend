import './ManageUser.css';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { __userapiurl } from '../../API_URL';
import { useToast } from '../../ToastContext';

const PER_PAGE = 5;

function ManageUser() {
  const { showToast } = useToast();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const fetchUsers = useCallback(() => {
    setLoading(true);
    axios.get(__userapiurl + "fetch", { params: { role: "user" } })
      .then((response) => setUsers(response.data.userDetails || []))
      .catch(() => showToast('Failed to load users.', 'error'))
      .finally(() => setLoading(false));
  }, [showToast]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const updateStatus = (_id, action) => {
    if (action === 'delete') {
      axios.delete(__userapiurl + "delete", { data: { _id } })
        .then(() => { showToast('User deleted.', 'success'); fetchUsers(); })
        .catch(() => showToast('Failed to delete user.', 'error'));
    } else {
      const status = action === 'active' ? 1 : 0;
      axios.patch(__userapiurl + "update", {
        condition_obj: { _id },
        content_obj: { status }
      })
        .then(() => { showToast('Status updated.', 'success'); fetchUsers(); })
        .catch(() => showToast('Failed to update user.', 'error'));
    }
  };

  const filtered = users.filter(u =>
    [u.name, u.email, u.city].some(f =>
      f?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const shown = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="manage-user-section">

      {/* Header */}
      <div className="manage-user-header">
        <span className="manage-user-icon">👥</span>
        <h2>Manage Users</h2>
        <p className="manage-user-count">{filtered.length} user(s) found</p>
      </div>

      {/* Search */}
      <div className="manage-user-search">
        <input
          className="search-input"
          placeholder="🔍 Search by name, email or city..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="manage-user-empty">
          <span>⏳</span>
          <p>Loading users...</p>
        </div>
      ) : shown.length === 0 ? (
        <div className="manage-user-empty">
          <span>🙅</span>
          <p>No users found.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((u, i) => (
                <tr key={u._id}>
                  <td>{(page - 1) * PER_PAGE + i + 1}</td>
                  <td>{u.name || '—'}</td>
                  <td>{u.email}</td>
                  <td>{u.city || '—'}</td>
                  <td>{u.role}</td>
                  <td>
                    <span className={u.status === 1 ? 'status-active' : 'status-inactive'}>
                      {u.status === 1 ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="action-cell">
                      {u.status === 1 ? (
                        <button
                          className="btn-change-status"
                          onClick={() => updateStatus(u._id, 'inactive')}
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          className="btn-change-status"
                          onClick={() => updateStatus(u._id, 'active')}
                        >
                          Activate
                        </button>
                      )}
                      <button
                        className="btn-delete"
                        onClick={() => updateStatus(u._id, 'delete')}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => setPage(p => p - 1)}
            disabled={page === 1}
          >
            ←
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              className={`page-btn ${page === p ? 'active' : ''}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}

          <button
            className="page-btn"
            onClick={() => setPage(p => p + 1)}
            disabled={page === totalPages}
          >
            →
          </button>

          <span className="page-info">
            Page {page} of {totalPages}
          </span>
        </div>
      )}

    </div>
  );
}

export default ManageUser;