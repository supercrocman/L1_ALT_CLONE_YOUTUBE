import React from "react";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import UploadIcon from "@mui/icons-material/Upload";
import axios from "axios";

export default function Upload({ user }) {

    const onUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        const file = event.target.files[0];
        if (file !== undefined) {
            if (file.type === "video/mp4" || file.type === "video/avi") {
                formData.append('inputFile', file);
                console.log('Vidéos importées:', file);
                try {
                    const response = await axios.post('http://localhost:3001/api/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        params: {
                            UserIdentifier: user.identifier
                        }
                    });
                    console.log('Video uploaded successfully:', response);
                    console.log(user)
                } catch (error) {
                    console.error('Error uploading video:', error);
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
                <IconButton color="primary" aria-label="upload picture" component="label" sx={{ backgroundColor: "#161616" }}>
                    <input hidden accept="video/mp4,video/avi" multiple type="file" onChange={onUpload} />
                    <UploadIcon sx={{ width: "136px", height: "136px", color: "#aaa" }} />
                </IconButton>
                <p style={{ fontWeight: 400, fontSize: 15, marginTop: 23 }}>
                    Glissez-déposez les fichiers vidéo que vous souhaitez mettre en ligne
                </p>
                <p style={{ fontWeight: 400, fontSize: 13, marginTop: 2, color: "#aaa" }}>
                    Vos vidéos resteront privées jusqu'à leur publication.
                </p>
                <Button variant="contained" component="label">
                    Selectionner une vidéo
                    <input hidden accept="video/mp4,video/avi" multiple type="file" onChange={onUpload} />
                </Button>
            </div>
        </div >
    )
}