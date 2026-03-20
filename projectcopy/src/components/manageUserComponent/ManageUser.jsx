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
      .then((response) => {
        setUsers(response.data.userDetails || []);
      })
      .catch((error) => {
        console.log(error);
        showToast('Failed to load users.', 'error');
      })
      .finally(() => setLoading(false));

  }, [showToast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const updateStatus = (_id, action) => {
    if (action === 'delete') {
      axios.delete(__userapiurl + "delete", { data: { _id } })
        .then(() => {
          showToast('User deleted.', 'success');
          fetchUsers();
        })
        .catch(() => showToast('Failed to delete user.', 'error'));
    } else {
      const status = action === 'active' ? 1 : 0;

      axios.patch(__userapiurl + "update", {
        condition_obj: { _id },
        content_obj: { status }
      })
        .then(() => {
          showToast('Status updated.', 'success');
          fetchUsers();
        })
        .catch(() => showToast('Failed to update user.', 'error'));
    }
  };

  const filtered = users.filter(u =>
    [u.name, u.email, u.city].some(f =>
      f?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const shown = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div>
      <h2>Manage Users</h2>

      <input
        placeholder="Search"
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {loading ? <p>Loading...</p> : shown.map(u => (
        <div key={u._id}>
          {u.name}

          <button onClick={() => updateStatus(u._id, 'delete')}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ManageUser;