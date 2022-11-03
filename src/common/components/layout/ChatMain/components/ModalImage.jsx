import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import "../assets/styles/ModalImage.scss"
// import { BsDownload } from "react-icons/bs";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "61%",
    border: '0px solid #000',
    borderRadius: "8px",
};
const ModalImage = ({ image, imageMess, me, href }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <div className='image__modal' onClick={handleOpen} >{image}</div >
            <div className={`image__modal_message ${me ? "me" : ""}`} onClick={handleOpen} >{imageMess}</div >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='image-modal__container' sx={style}>{image}{imageMess}</Box>
            </Modal>
        </div>
    )
}

export default ModalImage