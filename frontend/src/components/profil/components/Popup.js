import { IconButton, Modal, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Popup({ open, setOpen, children, setFenetre }) {
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper
                sx={{
                    position: 'relative',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    minWidth: 400,
                    maxWidth: 800,
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    border: 'none',
                }}
            >
                <IconButton
                    aria-label="close"
                    color="inherit"
                    onClick={() => {
                        setOpen(false);
                        setFenetre(1);
                    }}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
                {children}
            </Paper>
        </Modal>
    );
}
export default Popup;
