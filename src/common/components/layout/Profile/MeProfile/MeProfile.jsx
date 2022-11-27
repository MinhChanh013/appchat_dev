import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CAvatar from "../../../controls/CAvatar"
import CButton from "../../../controls/CButton"
import CIconButton from '../../../controls/CIconButton';
import EditProfile from './EditMyProfile';

import { VscAccount } from "react-icons/vsc";
import { GiSmartphone } from "react-icons/gi";
import { BsGenderTrans, BsChat, BsCameraVideo } from "react-icons/bs";
import { HiOutlineCake } from "react-icons/hi";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

import "../../../../assets/styles/layout/MeProfile.scss"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'unset',
  borderRadius: 1,
  boxShadow: 24,
};

const MeProfile = ({ socket, refetch, data, activeModal = false, me, children }) => {

  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    setOpen(activeModal)
  }, [activeModal])

  React.useEffect(() => {
    socket.on("receive_editProfile", data => {
      handleClose()
    })
  })

  const handleClose = () => { setOpen(false); }
  return (
    <div className='meProfile'>
      <div onClick={() => {
        setOpen(true)
        refetch && refetch()
      }}>{children}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="meProfile-container">
            <div className="meProfile-container__header">
              <VscAccount />
              {me ? <span>My profile</span> : <span>Friend profile</span>}
            </div>
            <div className="meProfile-container__main">
              <div className="meProfile-background">
                <div className='meProfile-infor__avatar'><CAvatar image={data && data.avatar} /></div>
              </div>
              <div className="meProfile-information">
                <div className='meProfile-information__name'>
                  <h3>{data && `${data.first_name} ${data.last_name}`}</h3>
                  {me ? "" : <CIconButton icon={<AiOutlineEdit />} />}
                </div>
                {me ? "" : <div className="meProfile-function">
                  <CButton variant="outlined" icon={<BsCameraVideo />} children="Call" />
                  <CButton variant="outlined" icon={<BsChat />} children="Chat" />
                </div>}
                <div className="meProfile-information__content">
                  <div className='meProfile-content__infor'>
                    <div className="meProfile-infor__title">
                      <GiSmartphone />
                      <span>Phone number : </span>
                    </div>
                    <h4>{data && data.phone}</h4>
                  </div>
                  <div className='meProfile-content__infor'>
                    <div className="meProfile-infor__title">
                      <BsGenderTrans />
                      <span>Gender : </span>
                    </div>
                    <h4>{data && data.gender ? data.gender : "Nam"}</h4>
                  </div>
                  <div className='meProfile-content__infor'>
                    <div className="meProfile-infor__title">
                      <HiOutlineCake />
                      <span>Date of birth : </span>
                    </div>
                    <h4>{data && new Date(data.dateOfBirth).getDate()}/
                      {data && new Date(data.dateOfBirth).getMonth() + 1}/
                      {data && new Date(data.dateOfBirth).getFullYear()}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="meProfile-container__footer">
              {me ?
                <EditProfile socket={socket} avatar={data && data.avatar} first_name={data && data.first_name} phone={data && data.phone}
                  last_name={data && data.last_name} dateOfBirth={data && new Date(data.dateOfBirth)} gender={data && data.gender} child={<CButton icon={<AiOutlineEdit />} children="Edit profile" />} />
                : <CButton icon={<AiOutlineDelete />} children="Delete friend" />}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default MeProfile