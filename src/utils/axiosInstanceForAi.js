import axios from "axios";
import CryptoJS from "crypto-js";
import window from "global";
import storageInstance from "./storageInstance";

/* The code is creating an instance of the Axios library with a custom configuration. */
const axiosInstanceAi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AI_API_BASE_URL,
  headers: {
    apikey: process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY,
  },
});
console.log("AI API Base URL:",  process.env.NEXT_PUBLIC_AI_API_BASE_URL);
// const sessionToken = sessionStorage.getItem("authDataToken");
/* The code block is an interceptor for Axios requests. It is used to modify the request configuration
before the request is sent. */
axiosInstanceAi.interceptors.request.use(
  (config) => {
    // if (window.localStorage || sessionToken) {
    //   const token =
    //     storageInstance?.getStorage("authDataToken") || sessionToken;

    //   if (token) {
    //     config.headers.Authorization = "Bearer " + token;
    //   }
    //   const selectedCurrency = window.localStorage.getItem("selectedCurrency");
    //   if (selectedCurrency) {
    //     config.headers.currency = selectedCurrency;
    //   }
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

/* The code block is an interceptor for Axios requests. It is used to modify the request configuration
before the request is sent. */
axiosInstanceAi.interceptors.request.use(
  /* The code block is an interceptor for Axios requests. It is used to modify the request configuration
 before the request is sent. */
  function (request) {
    // console.log(request.url, request.data)
    if (request.data) {
      if (request.data.profile_image) {
        const encryptObj = new FormData();
        const param = request.data;
        const encrypkey =
          process.env.ENCRYPTION_KEY || process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
        const encryptedRequest = CryptoJS.AES.encrypt(
          JSON.stringify(param),
          encrypkey
        ).toString();
        encryptObj.append("request_data", encryptedRequest);
        encryptObj.append("profile_image", request.data.profile_image);
        request.data = encryptObj;
      } else {
        const param = request.data;
        const encrypkey =
          process.env.ENCRYPTION_KEY || process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
        const encryptedRequest = CryptoJS.AES.encrypt(
          JSON.stringify(param),
          encrypkey
        ).toString();
        request.data = {
          request_data: encryptedRequest,
        };
      }
      return request;
    } else {
      return request;
    }
  },
  /* The code block `function (error) { return Promise.reject(error); }` is an error interceptor for
 Axios requests. It is used to handle errors that occur during the request process. When an error
 occurs, this interceptor will reject the Promise and pass the error object to the next error
 handler in the promise chain. */
  function (error) {
    return Promise.reject(error);
  }
);
axiosInstanceAi.interceptors.response.use(
  /* The code block is an interceptor for Axios responses. It is used to modify the response data before
 it is passed to the `.then()` or `.catch()` methods of the Promise chain. */
  function (response) {
    // For Itinerary Download PDF
    if (response?.data?.type === "text/html") return response;

     console.log("response data",response.data.response_data)

    if (response.data.response_data) {
      const encrypkey =
        process.env.ENCRYPTION_KEY || process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
      const bytes = CryptoJS.AES.decrypt(
        response.data.response_data,
        encrypkey
      );
      const decryptedResponse = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedResponse;
    } else {
      return response.data;
    }
  },
  /* The code block `function (error) { return Promise.reject(error); }` is an error interceptor for
Axios requests. It is used to handle errors that occur during the request process. When an error
occurs, this interceptor will reject the Promise and pass the error object to the next error handler
in the promise chain. */
  function (error) {
    // console.log(error)
    return Promise.reject(error);
  }
);
export default axiosInstanceAi;
