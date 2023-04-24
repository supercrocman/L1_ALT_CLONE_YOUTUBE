import Link from 'next/link'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import { deepOrange } from '@mui/material/colors'
import AccountMenu from './includes/accountmenu'

export default function Home() {
    return (
        <div>
                <AccountMenu></AccountMenu>
            <div style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", width: "25%" }}>
                    <Avatar sx={{ bgcolor: deepOrange[500], width: 128, height: 128, marginRight: "5%" }} alt="Remy Sharp" src="/broken-image.jpg" >R</Avatar>
                <div style={{display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "space-evenly", height: "100%" }}>
                        <p style={{}}>Remy Sharp</p>
                        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", color: "#606060" }}>
                            <p>@RemySharp</p>
                            <p>Aucun vidéo</p>
                            <p>Aucune abonné</p>
                        </div>
                        <p>Découvrir tout ces petits secrets</p>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", width: "25%", justifyContent: "space-evenly" }}>
                    <Button variant="outlined">Outlined</Button>
                    <Button variant="outlined">Outlined</Button>
                </div>
            </div>
        </div>

    )
}