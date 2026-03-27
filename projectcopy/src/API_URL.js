export const BASE_URL = process.env.BACKEND_URL || "http://localhost:3001";

export const __userapiurl        = `${BASE_URL}/user/`;
export const __categoryapiurl    = `${BASE_URL}/category/`;
export const __subcategoryapiurl = `${BASE_URL}/subcategory/`;
export const __productapiurl     = `${BASE_URL}/product/`;
export const __paymentapiurl     = `${BASE_URL}/payment/processPayment`;
export const __forgetpasswordurl = `${BASE_URL}/forgetpassword`;

// ✅ Images base URL
export const __uploadsurl = `${BASE_URL}/uploads/producticons/`;