import Link from 'next/link'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import { deepOrange } from '@mui/material/colors'
import AccountMenu from '../includes/accountmenu'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function Home() {
    return (
        <div className={roboto.className}>
                <AccountMenu></AccountMenu>
            <div style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", width: "25%" }}>
                    <Avatar sx={{ bgcolor: deepOrange[500], width: 128, height: 128, marginRight: "5%" }} alt="Remy Sharp" src="/broken-image.jpg" >R</Avatar>
                <div style={{display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "space-evenly", height: "100%" }}>
                        <p style={{}}>Remy Sharp</p>
                        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", color: "#606060" }}>
                            <p style={{ marginRight: 8 }}>@RemySharp</p>
                            <p style={{ marginRight: 8 }}>Aucun vidéo</p>
                            <p style={{ marginRight: 8 }}>Aucune abonné</p>
                        </div>
                        <Link href="#">Découvrir tout ces petits secrets</Link>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", width: "25%", justifyContent: "space-evenly" }}>
                    <Button variant="contained" style={{ borderRadius: "50px" }}>Personalize</Button>
                </div>
            </div>
        </div>

    )
}