import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import CountryNumber from './CountryNumber';
import CTextField from '@common/components/controls/CTextField';
import CAvatar from '@common/components/controls/CAvatar';
import CButton from '@common/components/controls/CButton';

import { AiOutlineUserAdd, AiOutlineHistory } from "react-icons/ai";
import "../assets/ModalAddPhone.scss"
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    p: 4,
    borderRadius: 2,
};

const ModalAddPhone = ({ Children }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className='modal-addPhone'>
            <div onClick={handleOpen}>{Children}</div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="modal-addPhone__container">
                    <div className="modal-addPhone__header">
                        <AiOutlineUserAdd />
                        <span>Add friend</span>
                    </div>
                    <CountryNumber />
                    <CTextField label="Enter number phone..." className="form_chat" />
                    <div className="modal-addPhone__main">
                        <div className="modal-addPhone__title">
                            <AiOutlineHistory />
                            <span>Search results</span>
                        </div>
                        <div className="modal-addPhone__results">
                            <div className='modal-card__results'>
                                <div className="modal-results__infor">
                                    <CAvatar image="" />
                                    <div className="modal-results__name">
                                        <h4>Milad Ghanbari</h4>
                                        <span className='modal-results__number'>0123 456 789</span>
                                    </div>
                                </div>
                                <div className="modal-results__status">
                                    <CButton children="Add" />
                                </div>
                            </div>
                            <div className='modal-card__results'>
                                <div className="modal-results__infor">
                                    <CAvatar image="" />
                                    <div className="modal-results__name">
                                        <h4>Milad Ghanbari</h4>
                                        <span className='modal-results__number'>0123 456 789</span>
                                    </div>
                                </div>
                                <div className="modal-results__status">
                                    <CButton children="Add" />
                                </div>
                            </div>
                            <div className='modal-card__results'>
                                <div className="modal-results__infor">
                                    <CAvatar image="" />
                                    <div className="modal-results__name">
                                        <h4>Milad Ghanbari</h4>
                                        <span className='modal-results__number'>0123 456 789</span>
                                    </div>
                                </div>
                                <div className="modal-results__status">
                                    <CButton children="Add" />
                                </div>
                            </div>
                            <div className='modal-card__results'>
                                <div className="modal-results__infor">
                                    <CAvatar image="" />
                                    <div className="modal-results__name">
                                        <h4>Milad Ghanbari</h4>
                                        <span className='modal-results__number'>0123 456 789</span>
                                    </div>
                                </div>
                                <div className="modal-results__status">
                                    <CButton children="Add" />
                                </div>
                            </div>
                            <div className='modal-card__results'>
                                <div className="modal-results__infor">
                                    <CAvatar image="" />
                                    <div className="modal-results__name">
                                        <h4>Milad Ghanbari</h4>
                                        <span className='modal-results__number'>0123 456 789</span>
                                    </div>
                                </div>
                                <div className="modal-results__status">
                                    <CButton children="Add" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>

    )
}

export default ModalAddPhone