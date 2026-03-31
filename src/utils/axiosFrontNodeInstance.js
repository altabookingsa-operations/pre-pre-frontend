import axios from 'axios';
import CryptoJS from 'crypto-js';
import storageInstance from './storageInstance';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

/* ===============================
   AXIOS INSTANCE (WITH ENCRYPTION)
================================= */

const axiosFrontNodeInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_FRONT_NODE_BASE_URL,
  headers: {
    apikey: process.env.NEXT_PUBLIC_API_KEY,
    'ngrok-skip-browser-warning': 'true',
  },
});

/* ===============================
   REQUEST INTERCEPTOR (HEADERS)
================================= */

axiosFrontNodeInstance.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
      const token = storageInstance?.getStorage('authDataTokenNode');

      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }

      const tempValidation = cookies.get('tempValidation');
      if (tempValidation) {
        config.headers.admin_token = tempValidation;
      }

      const selectedCurrency = localStorage.getItem('selectedCurrency');
      if (selectedCurrency) {
        config.headers.currency = selectedCurrency;
      }
    }

    return config;
  },
  error => Promise.reject(error)
);

/* ===============================
   REQUEST INTERCEPTOR (ENCRYPTION)
================================= */

axiosFrontNodeInstance.interceptors.request.use(
  request => {
    if (!request.data) return request;

    const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

    // 🔥 Prevent crash if key missing
    if (!encryptionKey) {
      console.error('Encryption key is missing.');
      return request;
    }

    try {
      const encryptedRequest = CryptoJS.AES.encrypt(
        JSON.stringify(request.data),
        encryptionKey
      ).toString();

      request.data = {
        request_data: encryptedRequest,
      };
    } catch (error) {
      console.error('Encryption failed:', error);
    }

    return request;
  },
  error => Promise.reject(error)
);

/* ===============================
   RESPONSE INTERCEPTOR (DECRYPT)
================================= */

axiosFrontNodeInstance.interceptors.response.use(
  response => {
    if (response?.data?.type === 'text/html') return response;

    if (!response?.data?.response_data) {
      return response.data;
    }

    const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

    if (!encryptionKey) {
      console.error('Decryption key missing.');
      return response.data;
    }

    try {
      const bytes = CryptoJS.AES.decrypt(response.data.response_data, encryptionKey);

      const decryptedResponse = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      return decryptedResponse;
    } catch (error) {
      console.error('Decryption failed:', error);
      return response.data;
    }
  },
  error => Promise.reject(error)
);

export default axiosFrontNodeInstance;

/* ===============================
   AXIOS INSTANCE (NO ENCRYPTION)
================================= */

export const axiosNodeImgInstanceNoEncryption = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_FRONT_NODE_BASE_URL,
  headers: {
    apikey: process.env.NEXT_PUBLIC_API_KEY,
    'Content-Type': 'multipart/form-data',
  },
});

axiosNodeImgInstanceNoEncryption.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
      const token = storageInstance?.getStorage('authDataTokenNode');

      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }

      const selectedCurrency = localStorage.getItem('selectedCurrency');
      if (selectedCurrency) {
        config.headers.currency = selectedCurrency;
      }
    }

    return config;
  },
  error => Promise.reject(error)
);

axiosNodeImgInstanceNoEncryption.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);
