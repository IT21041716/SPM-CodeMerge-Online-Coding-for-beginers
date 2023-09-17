import React, { useState } from 'react';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import FlexBetween from './FlexBetween';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, IconButton, Toolbar, useTheme, Box, Button, Typography, Menu, MenuItem } from '@mui/material';
// import { signout ,deleteSeller} from '../actions/authActions';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';

const Navbar = (props) => {
    const dispatch = useDispatch();
    const id = localStorage.Seller_ID
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const menuOnClick = (event) => {
        const option = event.currentTarget.textContent;
        if (option === 'Delete Account') {
            Swal.fire({
                title: 'Are you sure want to Delete this Account?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#008000',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!',
                cancelButtonText: 'No!'
    
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // dispatch(deleteSeller(id))
                   
                }
            })
        } else {
        //   dispatch(signout());
        }
      };

    return (
        <AppBar sx={{
            position: 'static',
            background: '#131b25',
            boxShadow: '0px 50px -50px rgba(0, 0, 0, 0.6)', 
        }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <FlexBetween>
                    <IconButton onClick={() => props.setIsSidebarOpen(!props.isSidebarOpen)} >
                        <MenuOutlinedIcon sx={{ color: "white" }} />
                    </IconButton>
                </FlexBetween>

                <FlexBetween gap='1.5rem'>
                    <IconButton>
                        <NotificationsNoneOutlinedIcon sx={{ color: "white" }} />
                    </IconButton>

                    <IconButton>
                        <SettingsOutlinedIcon sx={{ color: "white" }} />
                    </IconButton>

                    <IconButton
                        aria-controls="profile-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <PersonOutlineOutlinedIcon sx={{ color: "white" }} />
                    </IconButton>

                    <Menu
                        id="profile-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={isOpen}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>View Profile</MenuItem>
                        <MenuItem onClick={menuOnClick}>Delete Account</MenuItem>
                        <MenuItem onClick={menuOnClick}>Logout</MenuItem>
                    </Menu>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
