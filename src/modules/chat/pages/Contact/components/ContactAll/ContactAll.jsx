import React, { useState } from 'react'
// components
import ContactContainer from "../../components/ContactContainer/ContactContainer"
import BackgroundIcon from "@common/components/others/BackgroundIcon"
import CAutoComplete from "@common/components/controls/CAutocomplete"
import CAvatar from "@common/components/controls/CAvatar"
import ModalAddPhone from "./components/ModalAddPhone"

// images
import person1 from "@common/assets/images/person1.png"
import person2 from "@common/assets/images/person2.png"
import person3 from "@common/assets/images/person3.png"
import person4 from "@common/assets/images/person4.png"

// icon
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { FaAirbnb } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import { AiOutlineTeam } from "react-icons/ai";
import { BsListCheck } from "react-icons/bs";

import "./assets/ContactAll.scss"
const ContactAll = () => {
    const person = [
        {
            avatar: person1,
            name: "James"
        },
        {
            avatar: person2,
            name: "Robert"
        },
        {
            avatar: person3,
            name: "John"
        },
        {
            avatar: person4,
            name: "Michael"
        },
        {
            avatar: person1,
            name: "David"
        },
        {
            avatar: person2,
            name: "William"
        },
        {
            avatar: person3,
            name: "Richard"
        },
        {
            avatar: person4,
            name: "Joseph"
        },
        {
            avatar: person1,
            name: "Thomas"
        },
        {
            avatar: person2,
            name: "Charles"
        },
        {
            avatar: person3,
            name: "Christopher"
        },
        {
            avatar: person4,
            name: "Daniel"
        },
        {
            avatar: person1,
            name: "Matthew"
        },
        {
            avatar: person2,
            name: "Anthony"
        },
        {
            avatar: person3,
            name: "Mark"
        },
        {
            avatar: person4,
            name: "Donald"
        },

    ]
    const [activeFunction, setActiveFuntion] = useState("list-chat")
    return (
        <div className='ContactAll'>
            <div className='contactAll-control'>
                <div className="contactAll-control__container">
                    <div className="contactAll-container__header">
                        <h3>Contact</h3>
                        <div className="contact-header__function">
                            <BackgroundIcon />
                            <PersonAddAlt1Icon />
                            <GroupAddIcon />
                        </div>
                    </div>
                    <div className="contactAll-container__function">
                        <div className="contact-function__header">
                            <FaAirbnb /><span>Function Contact</span>
                        </div>
                        <ModalAddPhone Children={<div className="contactAll-function__main">
                            <IoPersonAddOutline />
                            <span>Add friend with phone number</span>
                        </div>} />
                        <div onClick={() => setActiveFuntion("list-chat")} className={`contactAll-function__main ${activeFunction === "list-chat" ? "active" : ""}`}>
                            <AiOutlineTeam />
                            <span>List chat team</span>
                        </div>
                    </div>
                    <div className="contactAll-container__friend">
                        <div className="contactAll-friend__header">
                            <BsListCheck /><span>List contact</span>
                        </div>
                        <div className="contactAll-friend__list">
                            <div className="chatAll-list__search">
                                <CAutoComplete data={[]} placeholder="Enter name ..." />
                            </div>
                            <div className="chatAll-list__main">
                                {person.map((course, index) => (
                                    <div key={index} className="chatAll-main__person">
                                        <CAvatar image={course.avatar} /> <span>{course.name}</span>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='contactAll-main'><ContactContainer /></div>
        </div>
    )
}

export default ContactAll