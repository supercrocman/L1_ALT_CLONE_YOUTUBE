import axios from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/',
    params: {},
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const accessToken = getCookie('AccessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            error.response.data.error === 'refresh'
        ) {
            try {
                const response = await axiosInstance({
                    url: '/profil/refresh',
                    method: 'post',
                    withCredentials: true,
                });
                if (response.status === 201) {
                    const newAccessToken = getCookie('AccessToken');
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (error) {
                console.log('axios', error);
                return Promise.reject(error);
            }
        } else if (
            error.response.status === 401 &&
            error.response.data.error === 'reconnexion'
        ) {
            deleteCookie('user');
            deleteCookie('AccessToken');
            setCookie('isLoggIn', false);
            if (typeof window === 'undefined') {
                return Promise.reject(error);
            } else {
                window.location.href = '/';
            }
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;
