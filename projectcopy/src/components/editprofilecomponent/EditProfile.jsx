import React, { useEffect, useState } from "react";
import { __userapiurl } from "../../API_URL";
import axios from "axios";
import "./EditProfile.css";
import { useToast } from '../../ToastContext';

function EditProfile() {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(localStorage.getItem("name") || "");
    setMobile(localStorage.getItem("mobile") || "");
    setAddress(localStorage.getItem("address") || "");
    setCity(localStorage.getItem("city") || "");
    setGender(localStorage.getItem("gender") || "");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !mobile) {
      showToast("Name and mobile are required.", "warning");
      return;
    }

    const _id = localStorage.getItem("_id");

    const data = {
      "condition_obj": { "_id": _id },
      "content_obj": { name, mobile, address, city, gender }
    };

    setLoading(true);
    axios.patch(__userapiurl + "update", data)
      .then((response) => {
        if (response.data.status === "OK") {
          localStorage.setItem("name", name);
          localStorage.setItem("mobile", mobile);
          localStorage.setItem("address", address);
          localStorage.setItem("city", city);
          localStorage.setItem("gender", gender);
          showToast("Profile updated successfully!", "success");
        }
      })
      .catch(() => {
        showToast("Update failed. Please try again.", "error");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="page-section edit-profile-page">
      <div className="edit-profile-header">
        <span className="edit-profile-icon">✏️</span>
        <h2>Edit Profile</h2>
        <p className="subtitle">Update your personal information.</p>
      </div>

      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              onChange={e => setName(e.target.value)}
              value={name}
              placeholder="Enter your name"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Mobile</label>
            <input
              type="text"
              onChange={e => setMobile(e.target.value)}
              value={mobile}
              placeholder="Enter your mobile number"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              onChange={e => setAddress(e.target.value)}
              value={address}
              placeholder="Enter your address"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <select onChange={e => setCity(e.target.value)} value={city}>
              <option value="">Select City</option>
              <option value="Indore">Indore</option>
              <option value="Bhopal">Bhopal</option>
              <option value="Ujjain">Ujjain</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Gender</label>
            <div className="gender-group">
              <label className="gender-option">
                <input
                  type="radio"
                  name="gender"
                  onChange={e => setGender(e.target.value)}
                  value="male"
                  checked={gender === "male"}
                />
                Male
              </label>
              <label className="gender-option">
                <input
                  type="radio"
                  name="gender"
                  onChange={e => setGender(e.target.value)}
                  value="female"
                  checked={gender === "female"}
                />
                Female
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn-submit"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}

export default EditProfile;