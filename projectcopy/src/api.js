// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3001"
// });

// export default api;

// src/api.js — Axios instance with token auto-attached
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:3001'
// });

// // Attach token to every request automatically
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Auto logout if token expired
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.clear();
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
// ```

// ---

// **Poora flow ab kuch aisa hai:**
// ```
// // Register → bcrypt hash → save → email bhejo (verify link)
// //     ↓
// // User clicks verify link → /vemail/:email → backend status=1
// //     ↓
// // Login → bcrypt compare → JWT generate → login email bhejo
// //     ↓
// // Protected routes → Bearer token → authMiddleware verify
// //     ↓
// // ChangePassword → bcrypt compare old → bcrypt hash new → save

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001'
});

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto logout if token expired
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;