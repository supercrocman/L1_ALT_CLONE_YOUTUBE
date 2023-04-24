import Popup from './Popup';

function Subscribe() {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    return <Popup open={open}></Popup>;
}
export default Subscribe;
