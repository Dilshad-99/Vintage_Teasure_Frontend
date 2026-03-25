import './ManageUser.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { __userapiurl } from '../../API_URL';
import { useToast } from '../../ToastContext';

const PER_PAGE = 5;

function ManageUser() {

  const { showToast } = useToast();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // fetch users
  const fetchUsers = () => {
    setLoading(true);

    axios.get(__userapiurl + "fetch", { params: { role: "user" } })
      .then((res) => {
        setUsers(res.data.userDetails || []);
        setLoading(false);
      })
      .catch(() => {
        showToast("Failed to load users", "error");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  });

  // actions (activate, deactivate, delete)
  const handleAction = (id, type) => {

    if (type === "delete") {

      axios.delete(__userapiurl + "delete", { data: { _id: id } })
        .then(() => {
          showToast("User deleted", "success");
          fetchUsers();
        })
        .catch(() => {
          showToast("Delete failed", "error");
        });

    } else {

      let status = 0;
      if (type === "active") {
        status = 1;
      }

      axios.patch(__userapiurl + "update", {
        condition_obj: { _id: id },
        content_obj: { status: status }
      })
        .then(() => {
          showToast("Status updated", "success");
          fetchUsers();
        })
        .catch(() => {
          showToast("Update failed", "error");
        });
    }
  };

  // search filter (beginner way)
  let filteredUsers = [];

  for (let i = 0; i < users.length; i++) {
    let user = users[i];

    if (search === "") {
      filteredUsers.push(user);
    } else {
      if (
        (user.name && user.name.toLowerCase().includes(search.toLowerCase())) ||
        (user.email && user.email.toLowerCase().includes(search.toLowerCase())) ||
        (user.city && user.city.toLowerCase().includes(search.toLowerCase()))
      ) {
        filteredUsers.push(user);
      }
    }
  }

  // pagination (beginner way)
  let totalPages = Math.ceil(filteredUsers.length / PER_PAGE);

  let currentUsers = [];
  let start = (page - 1) * PER_PAGE;
  let end = page * PER_PAGE;

  for (let i = start; i < end; i++) {
    if (filteredUsers[i]) {
      currentUsers.push(filteredUsers[i]);
    }
  }

  return (
    <div className="manage-user-section">

      <h2>Manage Users</h2>
      <p>{filteredUsers.length} users found</p>

      {/* search */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/* data */}
      {loading ? (
        <p>Loading...</p>
      ) : currentUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table border="1">
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
                <td>{u.status === 1 ? "Active" : "Inactive"}</td>

                <td>
                  {u.status === 1 ? (
                    <button onClick={() => handleAction(u._id, "inactive")}>
                      Deactivate
                    </button>
                  ) : (
                    <button onClick={() => handleAction(u._id, "active")}>
                      Activate
                    </button>
                  )}

                  <button onClick={() => handleAction(u._id, "delete")}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* pagination */}
      {totalPages > 1 && (
        <div>

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)}>
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
}

export default ManageUser;