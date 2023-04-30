import React from "react";
import stringToColor from "../../utils/stringToColor";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function Dashboard({ user }) {
    const [name, setName] = React.useState('');
    const [avatarColor, setAvatarColor] = React.useState('red');
    const [identifier, setIdentifier] = React.useState('');
    const [subCount, setSubCount] = React.useState(0);

    React.useEffect(() => {
        if (user) {
            setName(user.name)
            setAvatarColor(stringToColor(user.name))
            setIdentifier('@' + user.identifier)
            setSubCount(user.subCount);
        }
    }, [user]);

    console.log(name);
    return (
        <div>
            <h1>
                Tableau de bord de {name}
            </h1>
            <Box sx={{ minWidth: 275, maxWidth: 545 }}>
                <Card variant="outlined">
                    <React.Fragment>
                        <CardContent style={{ paddingTop: 22, paddingLeft: 24, paddingRight: 24, paddingBottom: 12 }}>
                            <div style={{ paddingBottom: 40 }}>
                                <Typography sx={{ fontSize: 18, fontWeight: 500 }} color="text.primary">
                                    Données analytiques de la chaîne
                                </Typography>
                                <Typography sx={{ fontSize: 12, paddingTop: "11px" }} color="text.primary">
                                    Abonnés actuels
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {subCount}
                                </Typography>
                            </div>
                            <hr></hr>
                            <div style={{ paddingTop: 13, paddingBottom: 18 }}>
                                <Typography sx={{ fontSize: 15, fontWeight: 500 }} color="text.primary" gutterBottom>
                                    Résumé
                                </Typography>
                                <Typography sx={{ fontSize: 12, paddingTop: "1px" }} color="text.secondary" gutterBottom>
                                    28 derniers jours
                                </Typography>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 400, paddingTop: 5, paddingBottom: 7 }}>
                                    <Typography variant="body2">
                                        Nombre de vues
                                    </Typography>
                                    <Typography variant="body2">
                                        0  -
                                    </Typography>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 400, paddingTop: 5, paddingBottom: 7 }}>
                                    <Typography variant="body2">
                                        Durée de visionnage (heures)
                                    </Typography>
                                    <Typography variant="body2">
                                        0  -
                                    </Typography>
                                </div>
                            </div>
                            <hr></hr>
                            <div style={{ paddingTop: 13, paddingBottom: 6 }}>
                                <Typography sx={{ fontSize: 18, fontWeight: 500 }} color="text.primary">
                                    Vidéos les plus regardées
                                </Typography>
                                <Typography sx={{ fontSize: 12, paddingTop: "1px" }} color="text.primary">
                                    Dernières 48 heures {bull} Vues
                                </Typography>
                            </div>
                        </CardContent>
                        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                            <Button size="small" sx={{ paddingTop: "8px", paddingBottom: "8px" }}>Données d'analyse de la chaîne</Button>
                        </CardActions>
                    </React.Fragment>
                </Card>
            </Box>
        </div>
    )
}