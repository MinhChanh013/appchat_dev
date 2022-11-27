import React, { useState } from 'react'
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { FileIcon } from "react-file-icon";
import defaultStyles from './defaultStyles';
import { styleDefObj } from "./style-customize";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ModalImage from './ModalImage';
import "../assets/styles/NavigationShare.scss"
const NavigationShare = ({ dataAllFile, dataAllImage }) => {
    const [value, setValue] = React.useState(0);
    const [data, setData] = useState(dataAllImage);
    const ref = React.useRef(null);

    return (
        <Box sx={{ pt: 7 }} ref={ref} className="NavigationShare">
            <CssBaseline />
            {value === 1 || value === 2 ? (
                <List>
                    {data && data.map((course, index) => (
                        <ListItem button key={index}>
                            <ListItemAvatar className='icon-file__setting'>
                                <FileIcon extension={course.type_message.name.split(".")[course.type_message.name.split(".").length - 1]}
                                    {...defaultStyles[course.type_message.name.split(".")[course.type_message.name.split(".").length - 1]]}
                                    {...styleDefObj[course.type_message.name.split(".")[course.type_message.name.split(".").length - 1]]} />
                            </ListItemAvatar>
                            <ListItemText primary={course.type_message.name} secondary={`${course.type_message.size} KB`} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <ImageList
                    cols={3}
                    gap={8}
                    rowHeight={100}
                >
                    <>
                        {dataAllImage && data && data.map((course, index) => {
                            let newArrImg = course.mess_content.split(",")
                            return (
                                <div key={index}>
                                    {
                                        newArrImg.map((img, indexImg) => (
                                            indexImg > 0 && <ImageListItem key={indexImg} >
                                                <ModalImage image={<img src={img} alt="" />} />
                                            </ImageListItem>
                                        ))
                                    }
                                </div>
                            )
                        }
                        )}
                    </>
                </ImageList>
            )}

            <Paper
                sx={{ position: "absolute", top: 10, left: 0, right: 0 }}
                elevation={3}
            >
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        if (newValue === 0) {
                            setData(dataAllImage && dataAllImage);
                        } else if (newValue === 1) {
                            setData(dataAllFile && dataAllFile);
                        }
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="image" icon={<RestoreIcon />} />
                    <BottomNavigationAction label="file" icon={<FavoriteIcon />} />
                </BottomNavigation>
            </Paper>
        </Box>

    )
}


export default NavigationShare