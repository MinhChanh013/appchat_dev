import React from 'react'
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
import Avatar from "@mui/material/Avatar";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ModalImage from './ModalImage';
import "../assets/styles/NavigationShare.scss"
const NavigationShare = () => {
    const [value, setValue] = React.useState(0);
    const [data, setData] = React.useState(image);
    const ref = React.useRef(null);


    return (
        <Box sx={{ pt: 7 }} ref={ref} className="NavigationShare">
            <CssBaseline />
            {value === 1 || value === 2 ? (
                <List>
                    {data.map((course, index) => (
                        <ListItem button key={index}>
                            <ListItemAvatar>
                                <Avatar alt="Profile Picture" src={course.avatar} />
                            </ListItemAvatar>
                            <ListItemText primary={course.name} secondary={course.content} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <ImageList
                    cols={3}
                    gap={8}
                    rowHeight={100}
                >
                    {data.map((course, index) => (
                        <ImageListItem key={index} >
                            <ModalImage image={<img src={course.image} alt="" />} />
                        </ImageListItem>
                    ))}
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
                            setData(image);
                        } else if (newValue === 1) {
                            setData(file);
                        } else setData(link);
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="image" icon={<RestoreIcon />} />
                    <BottomNavigationAction label="file" icon={<FavoriteIcon />} />
                    <BottomNavigationAction label="link" icon={<ArchiveIcon />} />
                </BottomNavigation>
            </Paper>
        </Box>

    )
}


const image = [
    {
        image:
            "https://cdn.dribbble.com/userupload/3699788/file/original-e6c1c03f28b4c8ce80bbe7464159161e.png?compress=1&resize=1200x900"
    },
    {
        image:
            "https://cdn.dribbble.com/userupload/3661773/file/original-e9ae13219ac519c2342070c48dba7fef.png?compress=1&resize=1200x900"
    },
    {
        image:
            "https://cdn.dribbble.com/userupload/3001921/file/original-b21731c2edd851069f3f8991eb9476c9.png?compress=1&resize=1200x900"
    },
    {
        image:
            "https://cdn.dribbble.com/userupload/3536610/file/original-e7ef8e8737ff4c9bc8c933e011ed9a44.png?compress=1&resize=1200x900"
    },
    {
        image:
            "https://cdn.dribbble.com/userupload/2769977/file/original-32b712fe41b21ec1691a62742b46bc17.png?compress=1&resize=1200x900"
    },
    {
        image:
            "https://cdn.dribbble.com/userupload/3024720/file/original-f5570810f4bd1899bed579586512dee6.png?compress=1&resize=1200x900"
    },
    {
        image:
            "https://cdn.dribbble.com/userupload/3264730/file/original-2bd3443b4b260a9b4372ca36917d8db6.png?compress=1&resize=1200x900"
    },
    {
        image:
            "https://cdn.dribbble.com/users/4835348/screenshots/17654597/media/c950f8c83af3196aba7385dafc6b5528.png?compress=1&resize=1000x750&vertical=top"
    },
    {
        image:
            "https://cdn.dribbble.com/users/4835348/screenshots/17068312/media/68fd616b39133c5a7ec33c05db5584fb.png?compress=1&resize=1000x750&vertical=top"
    },
    {
        image:
            "https://cdn.dribbble.com/userupload/3363507/file/original-e6dfe63fd49b75f053bfd3ca82251492.png?compress=1&resize=1200x900"
    },
];

const file = [
    {
        avatar:
            "https://play-lh.googleusercontent.com/1nfAdJs2Ep2q1skM7QwJ1uHooWSbpFkbIBHhAX6EmdzEKmtk42713TiTU28mWlkcFKPA",
        content: "demo",
        name: "name"
    }
];

const link = [
    {
        avatar:
            "https://play-lh.googleusercontent.com/1nfAdJs2Ep2q1skM7QwJ1uHooWSbpFkbIBHhAX6EmdzEKmtk42713TiTU28mWlkcFKPA",
        content: "https://mui.com/material-ui/react-bottom-navigation/",
        name: "name"
    }
];


export default NavigationShare