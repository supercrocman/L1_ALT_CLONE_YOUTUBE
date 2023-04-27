import AccountMenu from './includes/accountmenu'
import SearchBar from '@/components/SearchBar'

export default function Home() {
  return (
    <div>
      <SearchBar />
      <AccountMenu></AccountMenu>
    </div>
  )
}