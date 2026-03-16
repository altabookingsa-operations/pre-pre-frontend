import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CryptoJS from 'crypto-js';

/* The `toastConfig` constant is an object that defines the configuration options for displaying toast
notifications using the `react-toastify` library. Each property in the object represents a specific
configuration option: */
export const toastConfig = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'colored',
  type: 'info',
  progress: undefined,
};

/**
 * The function `setToast` displays a toast message with the given configuration and message.
 * @param config - The `config` parameter is an object that contains configuration options for the
 * toast. It can include properties such as `position` (to specify where the toast should be displayed
 * on the screen), `duration` (to specify how long the toast should be visible), `theme` (to specify
 * the color
 * @param message - The message parameter is a string that represents the content of the toast message.
 */
export const setToast = (config, message) => {
  toast(message, config);
};

/**
 * The roundOff function rounds a number to two decimal places.
 * @param num - The parameter "num" is a number that you want to round off.
 * @returns The function `roundOff` returns a rounded off number with two decimal places.
 */
export const roundOff = num => {
  return +(Math.round(num + 'e+2') + 'e-2');
};

/**
 * The function "roundOffTwo" takes a number as input and returns the number rounded off to two decimal
 * places.
 * @param num - The parameter "num" is a number that you want to round off to two decimal places.
 * @returns the input number rounded off to two decimal places.
 */
export const roundOffTwo = num => {
  return +parseFloat(num).toFixed(2);
};
export const roundOffTwo2 = num => {
  return parseFloat(num).toFixed(2);
};
/**
 * The function generates a random string of a specified length using a combination of uppercase
 * letters, lowercase letters, and numbers.
 * @param length - The `length` parameter is the desired length of the random string that you want to
 * generate.
 * @returns The function `generateRandomString` returns a randomly generated string of the specified
 * length.
 */
export const generateRandomString = length => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

/* The line `export const cartObject = { transfers: [], userData: {} };` is exporting a constant
variable named `cartObject`. */
export const cartObject = { transfers: [], userData: {} };

/* The `bookingObject` variable is an object that stores information related to a booking. It has the
following properties: */
export var bookingObject = {
  invoice_number: '',
  car: [],
  limo: [],
  customer_details: {
    user_title: '',
    user_id: null,
    first_name: '',
    last_name: '',
    mobile: '',
    country_code: '',
    email: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zip: '',
  },
};

export function secondsToDhms(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);

  var dDisplay = d > 0 ? d + (d == 1 ? ' day ' : ' days ') : '';
  var hDisplay = h > 0 ? h + (h == 1 ? ' hour ' : ' hours ') : '00 hour ';
  var mDisplay = m > 0 ? m + (m == 1 ? ' min ' : ' mins ') : '00 min ';
  var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
  return dDisplay + hDisplay + mDisplay;
}
export function flightsecondsToDhms(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);

  var dDisplay = d > 0 ? d + 'd ' : '';
  var hDisplay = h > 0 ? h + 'h ' : '00h ';
  var mDisplay = m > 0 ? m + 'm ' : '00m ';
  var sDisplay = s > 0 ? s + 's ' : '';
  return dDisplay + hDisplay + mDisplay;
}
export function scrollFunction(id) {
  var scrollDiv = document.getElementById(id).offsetTop;
  window.scrollTo({ top: scrollDiv - 70, behavior: 'smooth' });
}

export function timeAgo(dateString) {
  // Parse the input date string into a Date object
  let date = new Date(dateString);

  // Get the current time
  let now = new Date();

  // Calculate the difference in seconds
  let diffInSeconds = Math.floor((now - date) / 1000);

  // Determine the time unit and calculate the value
  let unit, value;

  if (diffInSeconds < 60) {
    value = diffInSeconds;
    unit = 'second';
  } else if (diffInSeconds < 3600) {
    value = Math.floor(diffInSeconds / 60);
    unit = 'minute';
  } else if (diffInSeconds < 86400) {
    value = Math.floor(diffInSeconds / 3600);
    unit = 'hour';
  } else {
    value = Math.floor(diffInSeconds / 86400);
    unit = 'day';
  }

  // Pluralize the unit if necessary
  if (value !== 1) {
    unit += 's';
  }

  // Return the formatted string
  return `${value} ${unit} ago`;
}

// helper function to handle total & tax
export const calculatedtotal = allCartList => {
  let basePrices = allCartList?.map(item => {
    const object = item?.object;
    if (object?.price_altabooking_float_format) {
      return parseFloat(object?.price_altabooking_float_format);
    } else if (object?.selectedTickets?.length > 0) {
      const totalPrice = object?.selectedTickets?.reduce((acc, item) => {
        return acc + item.sale_price * item.quantity;
      }, 0);
      return parseFloat(totalPrice);
    } else if (object?.sale_price) {
      return parseFloat(object?.sale_price);
    } else if (object?.sell_price) {
      return parseFloat(object?.sell_price);
    } else if (object?.roomItem?.Total?.AmountAfterTax) {
      return parseFloat(object?.roomItem?.Total?.AmountAfterTax);
    }
    return 0; // Default if neither key is found
  });

  let totalBasePrice = basePrices?.reduce((sum, price) => sum + price, 0);

  return Number(roundOffTwo2(totalBasePrice));
};

export const calculatedTaxTotal = allCartList => {
  let totalTaxes = allCartList?.map(item => {
    const object = item?.object;
    return object.taxData && object.taxData.total_tax ? parseFloat(object.taxData.total_tax) : 0;
  });

  let sumTotalTax = totalTaxes?.reduce((sum, tax) => sum + tax, 0);

  return Number(roundOffTwo2(sumTotalTax));
};

export function isStringifiedObject(value) {
  if (typeof value !== 'string') {
    return false; // Not a string, hence cannot be a stringified object
  }

  try {
    const parsed = JSON.parse(value);
    return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed);
  } catch (error) {
    return false; // Parsing failed, not a stringified object
  }
}

export const decryptValue = param => {
  const bytes = CryptoJS.AES.decrypt(param, process.env.NEXT_PUBLIC_ENCRYPTION_KEY);
  const decryptedResponse = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedResponse;
};

export const encryptValue = param => {
  const encryptedRequest = CryptoJS.AES.encrypt(
    JSON.stringify(param),
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY
  ).toString();
  return encryptedRequest;
};
