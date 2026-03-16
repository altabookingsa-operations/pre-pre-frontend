import axiosFrontNodeInstance from '@/utils/axiosFrontNodeInstance';
import cookieInstance from '@/utils/cookieInstance';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetEventsName = () => {
  return useMutation({
    mutationFn: async value => {
      return axiosFrontNodeInstance
        .post('xs2event/get-events-name', value)
        .then(res => {
          if (res?.res_code == 200) {
            return res.data;
          }
          return null;
        })
        .catch(e => {
          console.log(e);
          return null;
        });
    },
  });
};

export const useGetEventsSports = () => {
  return useQuery({
    queryKey: ['getEventsSportsList'],
    queryFn: async () => {
      return axiosFrontNodeInstance
        .get('xs2event/get-sports')
        .then(res => {
          if (res?.res_code == 200) {
            return res.data;
          }
          return null;
        })
        .catch(e => {
          console.log(e);
          return null;
        });
    },
    enabled: cookieInstance?.getStorageObj('authDataTokenNode')
      ? Boolean(cookieInstance?.getStorageObj('authDataTokenNode'))
      : true,
    refetchOnWindowFocus: false,
  });
};

export const useGetEventCountryList = () => {
  return useQuery({
    queryKey: ['getEventsCountryList'],
    queryFn: async () => {
      return axiosFrontNodeInstance
        .get('xs2event/get-countries')
        .then(res => {
          if (res?.res_code == 200) {
            return res.data;
          }
          return null;
        })
        .catch(e => {
          console.log(e);
          return null;
        });
    },
    enabled: cookieInstance?.getStorageObj('authDataTokenNode')
      ? Boolean(cookieInstance?.getStorageObj('authDataTokenNode'))
      : true,
    refetchOnWindowFocus: false,
  });
};

export const useGetBusesCountryList = () => {
  const token = cookieInstance?.getStorageObj('authDataTokenNode');

  return useQuery({
    queryKey: ['bus', 'city-list'],

    queryFn: async () => {
      const response = await axiosFrontNodeInstance.get('bus/city-list');

      if (response?.res_code !== 200) {
        throw new Error('API Error');
      }

      return response.data;
    },

    enabled: !!token || true,
    refetchOnWindowFocus: false,
  });
};
