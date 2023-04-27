import AccountMenu from './includes/accountmenu'
import SearchBar from '@/components/SearchBar'
import styleHeader from '@/styles/header.module.css'

export default function Home() {
  return (
    <>
      <div className={styleHeader.HeaderContainer}>
        <SearchBar></SearchBar>
        <AccountMenu></AccountMenu>
      </div>
    </>
  )
}