import Popup from './Popup';

function Subscribe() {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    return <Popup></Popup>;
}
export default Subscribe;
