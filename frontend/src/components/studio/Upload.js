import React, { useEffect } from "react";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import UploadIcon from "@mui/icons-material/Upload";
import TextField from '@mui/material/TextField';
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function Upload({ user }) {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [open, setOpen] = React.useState(false);


  const handleClose = () => {
    setOpen(false);
  };

    const onUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        const file = event.target.files[0];
        if (file !== undefined) {
            if (title) {
                if (file.type === "video/mp4" || file.type === "video/avi") {
                    formData.append('inputFile', file);
                    try {
                        const response = await axios.post('http://localhost:3001/api/upload', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                            params: {
                                UserIdentifier: user.identifier,
                                title: title,
                                description: description
                            }
                        });
                        if (response.status === 200) {
                            setOpen(true);
                        }
                    } catch (error) {
                        console.error('Error uploading video:', error);
                    }
                }
            }
        }
    };

    return (
        <div>
            <h1 style={{ fontWeight: 500, fontSize: 20, marginRight: 16, whiteSpace: "nowrap" }}>
                Importer des vidéos
            </h1>
            <hr />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                {
                    title !== '' ?
                        <IconButton color="primary" aria-label="upload picture" component="label" sx={{ backgroundColor: "#161616" }}>
                            <input hidden accept="video/mp4,video/avi" multiple type="file" onChange={onUpload} />
                            <UploadIcon sx={{ width: "136px", height: "136px", color: "#aaa" }} />
                        </IconButton>
                        :
                        <IconButton color="primary" aria-label="upload picture" component="label" sx={{ backgroundColor: "#161616" }} disabled>
                            <input hidden accept="video/mp4,video/avi" multiple type="file" onChange={onUpload} />
                            <UploadIcon sx={{ width: "136px", height: "136px", color: "#aaa" }} />
                        </IconButton>
                }
                <p style={{ fontWeight: 400, fontSize: 15, marginTop: 23 }}>
                    Glissez-déposez les fichiers vidéo que vous souhaitez mettre en ligne
                </p>
                <p style={{ fontWeight: 400, fontSize: 13, marginTop: 2, color: "#aaa" }}>
                    Vos vidéos resteront privées jusqu'à leur publication.
                </p>
                <div style={{ marginBottom: "15px" }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Title"
                        onChange={(event) => setTitle(event.target.value)}
                        value={title}
                    />
                    <TextField
                        id="outlined-textarea"
                        label="Description"
                        multiline
                        onChange={(event) => setDescription(event.target.value)}
                        value={description}
                    />
                </div>

                {
                    title !== '' ?
                        <Button variant="contained" component="label">
                            Selectionner une vidéo
                            <input hidden accept="video/mp4,video/avi" multiple type="file" onChange={onUpload} />
                        </Button>
                        :
                        <Button variant="contained" component="label" disabled>
                            Selectionner une vidéo
                            <input hidden accept="video/mp4,video/avi" multiple type="file" onChange={onUpload} />
                        </Button>
                }
            </div>
                            <Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-describedby="alert-dialog-slide-description"
                                radius={25}
                            >
                                <DialogTitle>{"La vidéo a été importer avec succès !"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Parfait</Button>
                                </DialogActions>
                            </Dialog>
        </div >
    )
}