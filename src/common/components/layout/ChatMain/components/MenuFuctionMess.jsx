import React from 'react'
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// icon
import { BsChatSquareText, BsArrowRepeat } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

import "../assets/styles/MenuFunctionMess.scss"

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .svg': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));
const MenuFuctionMess = ({ me, recall, handelRevokeMess, handelDeleteMessTo, icon, index }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    function CopyToClipboard(id) {
        var r = document.createRange();
        r.selectNode(document.getElementById(id));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    }

    return (
        <div>
            <div
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                onClick={handleClick}
            >
                {icon}
            </div>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {recall ? "" :
                    <MenuItem className='item-function__message' onClick={() => {
                        handleClose()
                        CopyToClipboard(`text-context${index}`)
                        return false
                    }} disableRipple>
                        <BsChatSquareText />
                        Coppy message
                    </MenuItem>
                }
                <MenuItem className='item-function__message' onClick={() => {
                    handelDeleteMessTo(index)
                    handleClose()
                }} disableRipple>
                    <AiOutlineDelete />
                    Delete for me only
                </MenuItem>
                {recall ? "" :
                    me === "me" ?
                        <MenuItem className='item-function__message' onClick={() => {
                            handelRevokeMess(index)
                            handleClose()
                        }} disableRipple>
                            <BsArrowRepeat />
                            Recall
                        </MenuItem> : ""
                }

            </StyledMenu>
        </div>
    );
}

export default MenuFuctionMess