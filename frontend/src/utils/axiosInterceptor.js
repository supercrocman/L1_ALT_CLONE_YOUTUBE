import axios from 'axios';
import jsonwebtoken from 'jsonwebtoken';
import { deleteCookie } from 'cookies-next';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/',
    params: {},
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
            const token = originalRequest.headers.Authorization.split(' ')[1];
            const identifier = jsonwebtoken.decode(token).identifier;

            axiosInstance
                .post('/profil/refresh', {
                    userIdentifier: identifier,
                })
                .then((res) => {
                    if (res.status === 201) {
                        axiosInstance.defaults.headers.common[
                            'Authorization'
                        ] = `Bearer ${res.data.accessToken}`;
                        const newRequest = {
                            ...originalRequest,
                            headers: {
                                ...originalRequest.headers,
                                Authorization: `Bearer ${res.data.accessToken}`,
                            },
                        };
                        return axios(newRequest);
                    }
                })
                .catch((err) => {
                    console.log('interceptor', err);
                    if (err.response.status === 401) {
                        deleteCookie('user');
                        if (typeof window === 'undefined') {
                            return Promise.reject(error);
                        } else {
                            window.location.href = '/';
                        }
                        return;
                    }
                });
        } else if (error.response.status === 401) {
            deleteCookie('user');
            if (typeof window === 'undefined') {
                return Promise.reject(error);
            } else {
                window.location.href = '/';
            }
            return;
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;
