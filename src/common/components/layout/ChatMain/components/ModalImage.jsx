import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import "../assets/styles/ModalImage.scss"
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    // height: "80%",
    border: '0px solid #000',
};

const ModalImage = ({ image }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <div className='image__modal' onClick={handleOpen} >{image}</div >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='image-modal__container' sx={style}>{image}</Box>
            </Modal>
        </div>
    )
}

export default ModalImage