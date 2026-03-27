import './ManageUser.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { __userapiurl } from '../../API_URL';
import { useToast } from '../../ToastContext';

const PER_PAGE = 5;

function ManageUser() {
  const { showToast } = useToast();

  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState('');
  const [page,    setPage]    = useState(1);

  const fetchUsers = () => {
    setLoading(true);
    axios.get(__userapiurl + "fetch", { params: { role: "user" } })
      .then(res => setUsers(res.data.userDetails || []))
      .catch(() => showToast("Failed to load users", "error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  },[]);

  const handleAction = (id, type) => {
    if (type === "delete") {
      axios.delete(__userapiurl + "delete", { data: { _id: id } })
        .then(() => { showToast("User deleted", "success"); fetchUsers(); })
        .catch(() => showToast("Delete failed", "error"));
    } else {
      axios.patch(__userapiurl + "update", {
        condition_obj: { _id: id },
        content_obj: { status: type === "active" ? 1 : 0 }
      })
        .then(() => { showToast("Status updated", "success"); fetchUsers(); })
        .catch(() => showToast("Update failed", "error"));
    }
  };

  const filteredUsers = users.filter(u =>
    !search ||
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.city?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages  = Math.ceil(filteredUsers.length / PER_PAGE);
  const start       = (page - 1) * PER_PAGE;
  const currentUsers = filteredUsers.slice(start, start + PER_PAGE);

  return (
    <div className="manage-user-section">

      <div className="manage-user-header">
        <span className="manage-user-icon">👥</span>
        <h2>Manage Users</h2>
        <p className="manage-user-count">{filteredUsers.length} users found</p>
      </div>

      <div className="manage-user-search">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, email or city..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : currentUsers.length === 0 ? (
        <div className="manage-user-empty">
          <span>👤</span>
          <p>No users found</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((u, i) => (
                <tr key={u._id}>
                  <td>{start + i + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.city}</td>
                  <td>{u.role}</td>
                  <td>
                    <span className={u.status === 1 ? 'status-active' : 'status-inactive'}>
                      {u.status === 1 ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="action-cell">
                      <button
                        className="btn-change-status"
                        onClick={() => handleAction(u._id, u.status === 1 ? "inactive" : "active")}
                      >
                        {u.status === 1 ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleAction(u._id, "delete")}
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

      {totalPages > 1 && (
        <div className="pagination">
          <button className="page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`page-btn ${page === i + 1 ? 'active' : ''}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button className="page-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
            Next
          </button>

          <span className="page-info">Page {page} of {totalPages}</span>
        </div>
      )}

    </div>
  );
}

export default ManageUser;