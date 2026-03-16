import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../utils/axiosFrontNodeInstance';
import cookieInstance from '../utils/cookieInstance';
import { setToast, toastConfig } from '../utils/commonUtil';
import storageInstance from '../utils/storageInstance';
import axiosFrontNodeInstance from '../utils/axiosFrontNodeInstance';
import * as constants from '../utils/constants';
import { useSocket } from './useSocket';

/**
 * The function `useGetAllCartList` fetches all cart items for a user and updates the state with the
 * retrieved data.
 * @returns The `useGetAllCartList` function returns a custom hook that uses the `useQuery` hook from a
 * library like React Query. This custom hook fetches cart items by making a POST request to the
 * "cart/findAll" endpoint using an axios instance. It then updates the cart items in the application
 * state using the dispatch function provided by the Context. If the response status code is 200
 */
export const useGetAllCartList = () => {
  return useQuery({
    queryKey: ['getCartList'],
    queryFn: async () => {
      return await axiosInstance
        .post('cart/find-all', {
          user_key: storageInstance?.getStorageObj('altaCartVal'),
          user_id: storageInstance?.getStorage('authDataTokenHolderIdNode')
            ? storageInstance?.getStorage('authDataTokenHolderIdNode')
            : null,
        })
        .then(res => {
          if (res?.res_code == 200) {
            let data = [];
            let rand = '';
            for (let index = 0; index < res?.data?.items?.length; index++) {
              const element = res?.data?.items[index];
              data.push({
                id: element?.id,
                ...element?.cart_item,
                booking_id: element?.cart_item?.booking_id,
                created_at: element?.created_at,
              });
            }

            if (res?.data?.items?.length > 0) {
              const paidItem = res.data.items.find(item => !!item?.cart_item?.booking_group_number);
              rand = paidItem?.cart_item?.booking_group_number;

              if (rand) {
                storageInstance?.setStorageObj(constants.BOOKING_KEY, rand);
              }
            }

            return {
              total: res.data.total,
              data: data,
              taxTotal: res.data.taxTotal,
              booking_group_number: rand,
            };
          }
        })
        .catch(e => {});
    },
    // refetchOnWindowFocus: true,
  });
};

export const useGetAllSharedCartList = slug => {
  const keyFromSession = typeof window !== 'undefined' && sessionStorage.getItem('shareCartSlug');

  return useQuery({
    queryKey: ['getSharedCartList', slug || keyFromSession],
    queryFn: async () => {
      const token = slug?.join('/') || keyFromSession;

      const response = await axiosInstance.post('cart/find-all', {
        sharing_token: token,
      });

      if (response?.res_code === 200) {
        let data = [];
        let rand = '';

        for (const item of response?.data?.items || []) {
          data.push({
            id: item?.id,
            ...item?.cart_item,
            booking_id: item?.cart_item?.booking_id,
            created_at: item?.created_at,
          });
        }

        if (data.length > 0) {
          const paidItem = response.data.items.find(
            item => !!item?.cart_item?.booking_group_number
          );
          rand = paidItem?.cart_item?.booking_group_number;
        }

        if (rand) {
          sessionStorage.setItem('shareCartBKG', rand);
        } else {
          sessionStorage.removeItem('shareCartBKG');
        }

        if ((slug || keyFromSession) && data.length > 0) {
          const value = slug ? slug.join('/') : keyFromSession;
          sessionStorage.setItem('shareCartSlug', value);
        } else {
          sessionStorage.removeItem('shareCartSlug');
        }

        return {
          total: response.data.total,
          data: data,
          taxTotal: response.data.taxTotal,
          booking_group_number: rand,
        };
      }

      return null;
    },
    enabled: !!slug || !!keyFromSession, // ✅ enable if either exists
    refetchOnWindowFocus: false,
  });
};

/**
 * The useAddToCart function is a custom hook in JavaScript that handles adding items to a cart using
 * axios for API calls and queryClient for managing queries.
 * @returns The `useAddToCart` function is returning a custom hook that utilizes `useMutation` from
 * React Query. This custom hook is responsible for making a POST request to save cart data using
 * axiosInstance. Upon successful response with status code 200, a success toast message is displayed,
 * otherwise an error toast message is displayed. Finally, the `onSuccess` callback function triggers a
 * refetch of the
 */
export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async cartData => {
      axiosFrontNodeInstance.defaults.headers.common['Authorization'] =
        'Bearer ' + cookieInstance?.getStorageObj('authDataTokenNode');

      return axiosFrontNodeInstance.post('/cart/save', cartData).then(res => {
        if (res?.res_code == 200) {
          // toastConfig.type = "success";
          // setToast(toastConfig, res?.response);
        } else {
          toastConfig.type = 'error';
          setToast(toastConfig, res?.response);
        }
        return res;
      });
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries('getCartList');
        queryClient.refetchQueries('getSharedCartList');
      },
    }
  );
};

export const useUpdateToCart = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async cartData => {
      axiosInstance.defaults.headers.common['Authorization'] =
        'Bearer ' + cookieInstance?.getStorageObj('authDataTokenNode');

      return axiosInstance.post(`/cart/update`, cartData).then(res => {
        if (res?.res_code == 200) {
          // toastConfig.type = "success";
          // setToast(toastConfig, res?.response);
        } else {
          toastConfig.type = 'error';
          setToast(toastConfig, res?.response);
        }
        return res;
      });
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries('getCartList');
        queryClient.refetchQueries('getSharedCartList');
      },
    }
  );
};

/**
 * The `useRemoveToCart` function is a custom hook in JavaScript that handles removing an item from the
 * cart using axios for API calls and queryClient for refetching cart data.
 * @returns The `useRemoveToCart` custom hook is being returned. This hook uses `useMutation` from
 * React Query to handle the removal of an item from the cart. It sends a POST request to the server to
 * delete the item with the provided ID. Upon successful deletion, it updates the toast message with a
 * success message, and in case of an error, it updates the toast message with an error
 */
export const useRemoveToCart = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async cartData => {
      axiosInstance.defaults.headers.common['Authorization'] =
        'Bearer ' + cookieInstance?.getStorageObj('authDataTokenNode');
      return axiosInstance
        .post(`/cart/delete-item`, {
          id: cartData?.id,
          user_key: storageInstance?.getStorageObj('altaCartVal'),
          user_id: storageInstance?.getStorage('authDataTokenHolderIdNode')
            ? storageInstance?.getStorage('authDataTokenHolderIdNode')
            : null,
          sharing_token: cartData?.sharing_token,
        })
        .then(res => {
          if (res?.res_code == 200) {
            // toastConfig.type = "success";
            // setToast(toastConfig, res?.response);
          } else {
            toastConfig.type = 'error';
            setToast(toastConfig, res?.response);
          }
          return res;
        });
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries('getCartList');
        queryClient.refetchQueries('getSharedCartList');
      },
    }
  );
};

/**
 * The function `useRemoveToAllCart` is a custom hook in JavaScript that removes all items from the
 * cart and triggers a refetch of the cart list query.
 * @returns The `useRemoveToAllCart` custom hook is being returned. This hook uses `useMutation` from
 * React Query to send a POST request to delete all items from the cart. It also updates the
 * authorization header with a bearer token and handles the response accordingly. Finally, it refetches
 * the "getCartList" query using the `queryClient` on successful deletion.
 */
export const useRemoveToAllCart = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async data => {
      axiosInstance.defaults.headers.common['Authorization'] =
        'Bearer ' + cookieInstance?.getStorageObj('authDataTokenNode');

      return axiosInstance
        .post(`/cart/delete-all-item`, {
          user_key: storageInstance?.getStorageObj('altaCartVal'),
          user_id: storageInstance?.getStorage('authDataTokenHolderIdNode')
            ? storageInstance?.getStorage('authDataTokenHolderIdNode')
            : null,
          ...(data?.bgn && {
            booking_group_number: data?.bgn,
          }),
        })
        .then(res => {
          if (res?.res_code == 200) {
            // toastConfig.type = "success";
            // setToast(toastConfig, res?.response);
            storageInstance?.removeStorege(constants.BOOKING_KEY);
          } else {
            toastConfig.type = 'error';
            setToast(toastConfig, res?.response);
          }
          return res;
        });
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries('getCartList');
        queryClient.refetchQueries('getSharedCartList');
      },
    }
  );
};

export const useShareCart = () => {
  const queryClient = useQueryClient();
  const socketRef = useSocket(process.env.NEXT_PUBLIC_SOCKET_URL);

  return useMutation(
    async data => {
      axiosInstance.defaults.headers.common['Authorization'] =
        'Bearer ' + cookieInstance?.getStorageObj('authDataTokenNode');

      return axiosInstance.post(`/cart/share`, data).then(res => {
        if (res?.res_code == 200) {
          socketRef.current.emit('join-share-cart', res?.data?.sharing_token);
          toastConfig.type = 'success';
          setToast(toastConfig, res?.response);
        } else {
          toastConfig.type = 'error';
          setToast(toastConfig, res?.response);
        }
        return res;
      });
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries('getCartList');
      },
    }
  );
};
