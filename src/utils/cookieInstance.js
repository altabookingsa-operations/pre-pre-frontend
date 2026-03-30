import CryptoJS from "crypto-js";
import Cookies from "universal-cookie";

function getKey() {
  return (
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY ||
    process.env.ENCRYPTION_KEY ||
    ""
  );
}

const cookieInstance = {
  setStorage(key, value) {
    if (typeof window === "undefined") return;

    const cookies = new Cookies();
    const encryptedValue = CryptoJS.AES.encrypt(value, getKey()).toString();

    cookies.set(key, encryptedValue, {
      maxAge: 172800,
      path: "/",
    });
  },

  setStorageObj(key, value) {
    if (typeof window === "undefined") return;

    const cookies = new Cookies();
    const encryptedValue = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      getKey()
    ).toString();

    cookies.set(key, encryptedValue, {
      maxAge: 172800,
      path: "/",
    });
  },

  getStorage(key) {
    if (typeof window === "undefined") return "";

    try {
      const cookies = new Cookies();
      const encrypted = cookies.get(key);
      if (!encrypted) return "";

      const bytes = CryptoJS.AES.decrypt(encrypted, getKey());
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch {
      return "";
    }
  },

  getStorageObj(key) {
    if (typeof window === "undefined") return "";

    try {
      const cookies = new Cookies();
      const encrypted = cookies.get(key);
      if (!encrypted) return "";

      const bytes = CryptoJS.AES.decrypt(encrypted, getKey());
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch {
      return "";
    }
  },

  removeStorage(key) {
    if (typeof window === "undefined") return;

    const cookies = new Cookies();
    cookies.remove(key, { path: "/" });
  },
};

export default cookieInstance;