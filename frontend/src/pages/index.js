import AccountMenu from '@/components/AccountMenu';
import SearchBar from '@/components/SearchBar';
import styleHeader from '@/styles/header.module.css';
import Profil from '@/components/profil';
import { Button } from '@mui/material';
import axiosInstance from '@/utils/axiosInterceptor';

export default function Home() {
    return (
        <>
            <div className={styleHeader.HeaderContainer}>
                <SearchBar></SearchBar>
                <AccountMenu></AccountMenu>
                <Profil />
                <Button
                    onClick={async () => {
                        try {
                            const response = await axiosInstance({
                                method: 'GET',
                                url: '/profil/hi',
                            });
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                >
                    Salut
                </Button>
            </div>
        </>
    );
}
