import { getCookie, setCookie } from "cookies-next";
import axiosInstance from "./axiosInterceptor";
import { useRouter } from 'next/router';


export default async function handleLogout (){
// const router = useRouter();

    setCookie('isLoggIn', false);
    // setShowProfil(!!getCookie('isLoggIn'));
    await clear();
    window.location.href = '/';
    // router.push('/');
};
async function clear() {
    try {
        await axiosInstance.get('/profil/logout');
    } catch (e) {
        console.log(e);
    }
}