import React from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import editGif from "../assets/images/edit.gif"
import CButton from '../../../controls/CButton';

// api
import { requestChangeRole } from "@/apis/chat.api"

const options = ['Admin', 'Member'];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    p: 3.5,
    border: '0px solid #000',
    borderRadius: "8px",
    backgroundColor: "#fff",
};

const AutoCompleteRole = ({ role, me, Room, dataRoom, data, socket, myUser }) => {
    const [value, setValue] = React.useState(role === "Admin" ? options[0] : options[1]);
    const [inputValue, setInputValue] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            {
                <>
                    <Autocomplete
                        disabled={me ? true : false}
                        value={value}
                        disableClearable
                        onChange={(event, newValue) => {
                            newValue === "Admin" && handleOpen()
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={options}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Role" />}
                    />

                    <div>
                        <div style={{ display: 'flex' }} onClick={handleOpen} ></div >
                        <Modal
                            open={open}
                            onClose={() => {
                                handleClose()
                            }}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <div className="inform__container">
                                    <img src={editGif} alt="" />
                                    <div className="inform__content">
                                        <div className="inform__title">
                                            <span>Are you sure the roles transfer rights to this member?</span>
                                            <div className="inform__function">
                                                <CButton children="No" onClick={() => { handleClose() }} />
                                                <CButton children="Yes" onClick={() => {
                                                    requestChangeRole({ room_id: Room._id, phone: data.phone })
                                                    socket.emit("change_role", { data: { id_room: Room._id, phone_Chane: myUser && myUser.phone, phone_receive: data.phone } })
                                                    handleClose()
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </div>

                </>
            }
        </>

    )
}

export default AutoCompleteRole