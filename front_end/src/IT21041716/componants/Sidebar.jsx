import React from "react";
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import {
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    Groups2Outlined,
    AdminPanelSettingsOutlined,
} from "@mui/icons-material";
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { motion } from 'framer-motion'
// import { signout } from '../actions/authActions'
import { useDispatch, useSelector } from "react-redux";
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import logo from '../../../public/Codefest-icon.png'


const navItems = [
    {
        text: "My Profile",
        icon: <HomeOutlined />,
    },
    {
        text: "Activities",
        icon: null,
    },
    {
        text: "Add New Language",
        icon: <InventoryOutlinedIcon />,
    },
    {
        text: "Add New Material",
        icon: <Groups2Outlined />,
    },
    {
        text: "Management",
        icon: null,
    },
    {
        text: "Password Change",
        icon: <AdminPanelSettingsOutlined />,
    }
];

const Sidebar = (props) => {
    const { pathname } = useLocation()
    const [active, setActive] = useState("");
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const signOut = () => {
    //     dispatch(signout()).then(
    //         window.location.href = "http://127.0.0.1:5173/"
    //     )
    // }

    useEffect(() => {
        setActive(pathname.substring(1))
    }, [pathname]);


    return (
        <motion.div
            animate={props.isSidebarOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: .75, ease: 'easeInOut' }}
            initial={{ opacity: 0, scale: 0 }}
        >
            <Box component="nav">
                <Drawer
                    open={props.isSidebarOpen}
                    onClose={() => props.setIsSidebarOpen(false)}
                    varient="persistent"
                    anchor="left"
                    sx={{
                        width: props.drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: 'white',
                            fontFamily: 'Roboto Slab', // Change the font family here
                            backgroundColor: '#131b25',
                            boxSizing: "border-box", // Fix typo in boxSizing
                            borderWidth: props.isNonMobile ? 0 : "2px",
                            width: props.drawerWidth,
                            boxShadow: '20px 50px -50px rgba(0, 0, 0, 0.6)',
                            paddingBottom: '1.5rem'
                        },
                    }}
                >
                    <motion.Box width="100%"
                        animate={props.isSidebarOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.5, ease: 'easeInOut', delay: .25 }}
                        initial={{ y: 30, opacity: 0 }}
                    >
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color="white" sx={{ justifyContent: 'center' }} >
                                <Box display="flex" alignItems="center" gap="0.5rem" >
                                    <Typography variant="h4" fontWeight='600' fontSize="25px" sx={{ textAlign: 'center' }} >
                                        Admin Dashboard
                                    </Typography>
                                </Box>

                                {!props.isNonMobile && (
                                    <IconButton onClick={() => props.setIsSidebarOpen(!props.isSidebarOpen)}>
                                        <ChevronLeft className="p-2" />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">

                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={logo}
                                    style={{ cursor: "pointer", borderRadius: "50%" }}
                                />

                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    fontSize="18"
                                    fontWeight="500"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    Sithanga Rashmika
                                </Typography>

                            </Box>
                        </Box>



                        <List>
                            {navItems.map(({ text, icon }) => {
                                if (!icon) {
                                    return (
                                        <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                                            {text}
                                        </Typography>
                                    );
                                }
                                const lcText = text.toLowerCase();

                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`/${lcText}`);
                                                setActive(lcText);
                                                props.setIsSidebarOpen(false)
                                            }}
                                            sx={{
                                                backgroundColor:
                                                    active === lcText
                                                        ? "#b8b8b86c"
                                                        : "transparent",
                                                color:
                                                    active === lcText
                                                        ? "#3da58a"
                                                        : "white",
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml: "2rem",
                                                    color:
                                                        active === lcText
                                                            ? "#3da58a"
                                                            : "white",
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lcText && (
                                                <ChevronRightOutlined sx={{ ml: "auto" }} />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </motion.Box>
                    <motion.Box
                        position="absolute"
                        bottom="2rem"
                        animate={props.isSidebarOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.5, ease: 'easeInOut', delay: .25 }}
                        initial={{ y: 30, opacity: 0 }}
                    >
                        {/* <Divider />
                        <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                            <ManageAccountsOutlinedIcon
                                sx={{ color: "white", fontSize: "25px" }}
                            />



                        </FlexBetween> */}
                    </motion.Box>
                </Drawer>

            </Box>
        </motion.div>

    );
}

export default Sidebar;
