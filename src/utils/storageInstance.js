import CryptoJS from 'crypto-js';
import { reactLocalStorage } from 'reactjs-localstorage';

var storageInstance = /** @class */ (function () {
  if (typeof window !== 'undefined') {
    /**
     * The function "storageInstance" is defined in JavaScript.
     */
    function storageInstance() {}
    /* The `storageInstance.setStorage` function is used to store a value in the local storage. */
    storageInstance.setStorage = function (key, value) {
      var encrypkey = process.env.ENCRYPTION_KEY || process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
      var encryptedValue = CryptoJS.AES.encrypt(value, encrypkey).toString();
      return reactLocalStorage.set(key, encryptedValue);
    };
    /* The `storageInstance.setStorageObj` function is used to store an encrypted object in the local
 storage. */
    storageInstance.setStorageObj = function (key, value) {
      var encrypkey = process.env.ENCRYPTION_KEY || process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
      var encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), encrypkey).toString();
      return reactLocalStorage.set(key, encryptedValue);
    };
    /* The `storageInstance.getStorage` function is used to retrieve a value from the local storage. */
    storageInstance.getStorage = function (key) {
      var encrypkey = process.env.ENCRYPTION_KEY || process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
      if (reactLocalStorage.get(key)) {
        var bytes = CryptoJS.AES.decrypt(reactLocalStorage.get(key), encrypkey);
        var decryptedText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedText;
      } else {
        return '';
      }
    };
    /* The `storageInstance.getStorageObj` function is used to retrieve an encrypted object from the local
storage. */
    storageInstance.getStorageObj = function (key) {
      var encrypkey = process.env.ENCRYPTION_KEY || process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
      if (reactLocalStorage.get(key)) {
        var bytes = CryptoJS.AES.decrypt(reactLocalStorage.get(key), encrypkey);
        var decryptedText = JSON?.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedText;
      } else {
        return '';
      }
    };
    /* The `storageInstance.removeStorege` function is used to remove a value from the local storage. It
takes a `key` parameter, which is the key of the value to be removed, and calls the
`reactLocalStorage.remove` function to remove the value associated with that key from the local
storage. The function returns the result of the `reactLocalStorage.remove` function. */
    storageInstance.removeStorege = function (key) {
      return reactLocalStorage.remove(key);
    };
    /* The `storageInstance.clearStorege` function is used to clear all the values stored in the local
storage. It calls the `reactLocalStorage.clear()` function, which removes all the key-value pairs
from the local storage. */
    storageInstance.clearStorege = function () {
      reactLocalStorage.clear();
    };
  }

  return storageInstance;
})();

export default storageInstance;
