import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

const cookieInstance = (() => {
  if (typeof window !== 'undefined') {
    function cookieInstance() {}

    // Set encrypted cookie
    cookieInstance.setStorage = function (key, value, options = {}) {
      const encrypkey = process.env.ENCRYPTION_KEY || process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
      const encryptedValue = CryptoJS.AES.encrypt(value, encrypkey).toString();
      return Cookies.set(key, encryptedValue, options);
    };

    // Set encrypted object in cookie
    cookieInstance.setStorageObj = function (key, value, options = {}) {
      const encrypkey = process.env.ENCRYPTION_KEY || process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
      const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), encrypkey).toString();
      return Cookies.set(key, encryptedValue, options);
    };

    // Get decrypted cookie
    cookieInstance.getStorage = function (key) {
      const encrypkey = process.env.ENCRYPTION_KEY || process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
      const cookieValue = Cookies.get(key);
      if (cookieValue) {
        try {
          const bytes = CryptoJS.AES.decrypt(cookieValue, encrypkey);
          const decryptedText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          return decryptedText;
        } catch (error) {
          console.error('Error decrypting cookie:', error);
          return '';
        }
      }
      return '';
    };

    // Get decrypted object from cookie
    cookieInstance.getStorageObj = function (key) {
      const encrypkey = process.env.ENCRYPTION_KEY || process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
      const cookieValue = Cookies.get(key);
      console.log("cookieValue", cookieValue)
      if (cookieValue) {
        try {
          const bytes = CryptoJS.AES.decrypt(cookieValue, encrypkey);
          const decryptedText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          return decryptedText;
        } catch (error) {
          console.error('Error decrypting cookie:', error);
          return '';
        }
      }
      return '';
    };

    // Remove cookie
    cookieInstance.removeStorage = function (key) {
      return Cookies.remove(key);
    };

    // Clear all cookies (note: this only removes cookies set by this domain)
    cookieInstance.clearStorage = function () {
      const allCookies = Cookies.get();
      Object.keys(allCookies).forEach(key => {
        Cookies.remove(key);
      });
    };

    return cookieInstance;
  }
})();

export default cookieInstance;
