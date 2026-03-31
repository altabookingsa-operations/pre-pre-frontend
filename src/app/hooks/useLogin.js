import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import cookieInstance from "@/utils/cookieInstance";
import CryptoJS from "crypto-js";
export const useLogin = (options = {}) => {
    return useMutation({
        mutationFn: async (data) => {
            return await axiosInstance
                .post("/auth/login", data,)
                .then((res) => {
                    // if (res.data.res_code !== 200) {
                    //     console.log("login error response", res);
                    //     throw new Error(res.response || "Login failed");
                    // }
                    const encrypkey =
                        process.env.ENCRYPTION_KEY || process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
                    const encryptedUserData = CryptoJS.AES.encrypt(
                        JSON.stringify(res),
                        encrypkey,
                    ).toString();
 
                    const encryptedToken = CryptoJS.AES.encrypt(
                        res?.data?.profile?.token,
                        encrypkey,
                    ).toString();
                    console.log("encryptedUserData", typeof encryptedUserData, encryptedUserData, typeof encryptedToken, encryptedToken);
                    const encryptedUserId = CryptoJS.AES.encrypt(
                        res?.data?.profile?.id?.toString(),
                        encrypkey,
                    ).toString();
                    cookieInstance?.setStorageObj("authDataTokenNode", encryptedToken);
                    cookieInstance?.setStorageObj("authDataTokenHolderIdNode", encryptedUserId);
                    localStorage.setItem("authDataNode", encryptedUserData);
                    //localStorage.setItem("authDataTokenNode", res?.data?.profile?.token);
                    //localStorage.setItem("authDataUserRoleIdNode", res?.data?.profile?.role_id);
 
                    return res;
                })
                .catch((error) => {
                    console.log("login error", error?.response);
 
                    throw error
                });
        },
        ...options,
    });
}
 