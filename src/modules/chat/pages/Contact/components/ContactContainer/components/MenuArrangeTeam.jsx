import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';

// icon
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";

import "../assets/styles/MenuArrangeTeam.scss"
const MenuArrangeTeam = () => {
    const options = [
        {
            icon: <BsSortAlphaDown />,
            label: "Arrange Ascending with name (A-Z)"
        },
        {
            icon: <BsSortAlphaDownAlt />,
            label: "Arrange Descending with name (Z-A)"
        }
    ];
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='menuArrangeTeam'>
            <List
                component="nav"
                aria-label="Device settings"
                sx={{ bgcolor: 'transparent' }}
            >
                <ListItem
                    button
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickListItem}
                >
                    <ListItemIcon>
                        {options[selectedIndex].icon}
                    </ListItemIcon>
                    <ListItemText
                    >
                        {options[selectedIndex].label}
                    </ListItemText>
                </ListItem>
            </List>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                }}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={index}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        <ListItemIcon>
                            {option.icon}
                        </ListItemIcon>
                        <ListItemText>{option.label}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default MenuArrangeTeam