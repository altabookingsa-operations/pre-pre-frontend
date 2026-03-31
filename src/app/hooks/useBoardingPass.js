import { useMutation, useQuery } from '@tanstack/react-query';
import axiosFrontNodeInstance from '../../utils/axiosFrontNodeInstance';
import CryptoJS from 'crypto-js';

const decryptId = (id) => {
    if (!id) return '';
    // If it's a number or doesn't look encrypted (no base64 chars or too short), return as is
    if (typeof id === 'number' || id.toString().length < 10) return id.toString();
    
    try {
        const encrypkey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || process.env.ENCRYPTION_KEY || '';
        const bytes = CryptoJS.AES.decrypt(id.toString(), encrypkey);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedText || id.toString();
    } catch (error) {
        // console.error('Error decrypting ID:', error);
        return id.toString();
    }
};

export const useBoardingPassCreate = (options = {}) => {
    return useMutation({
        mutationFn: async (id) => {
            const decryptedUserId = decryptId(id);
            const response = await axiosFrontNodeInstance.post('/boarding-pass/create', { 'user_id': decryptedUserId });
            return response.data;
        },
        ...options
    });
};

export const useBoardingPassDetails = (options = {}) => {
    return useMutation({
        mutationFn: async (id) => {
            const decryptedUserId = decryptId(id);
            const response = await axiosFrontNodeInstance.post('/boarding-pass/details', { 'user_id': decryptedUserId });
            return response.data;
        },
        ...options
    });
};

export const useGetBoardingPassDetails = (userId, options = {}) => {
    return useQuery({
        queryKey: ['boardingPassDetails', userId],
        queryFn: async () => {
            const decryptedUserId = decryptId(userId);
            const response = await axiosFrontNodeInstance.post('/boarding-pass/details', { 'user_id': decryptedUserId });
            return response.data;
        },
        enabled: !!userId,
        ...options
    });
};
