import SearchBar from '@/components/SearchBar';
import styleHeader from '@/styles/header.module.css';
import Profil from '@/components/profil';

export default function Home() {
    return (
        <>
            <div className={styleHeader.HeaderContainer}>
                <SearchBar></SearchBar>
                <Profil />
            </div>
        </>
    );
}
