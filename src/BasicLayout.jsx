import { Outlet, Link, NavLink} from "react-router-dom"
import {Avatar, Box, Menu, MenuItem, IconButton} from '@mui/material';
import * as React from 'react';

export function BasicLayout(){

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);};
    const handleMenuClick = (event) => {
        alert("Signed out!");
        setAnchorEl(event.currentTarget);};
    const handleClose = () => {
    setAnchorEl(null);};

    return (
        <>
            <header>
                <h1>React tutorial</h1>
                <nav className="sidebar">
                    <NavLink to="/products"
                    style={({ isActive }) => {return isActive ? { color: "rgb(130, 56, 81)" } : {textDecoration: 'none', color: '#585858'};}}>
                        Products
                    </NavLink>
                </nav>
                <React.Fragment>
                    <Box sx = {{ display: 'flex', alignItems: 'center', textAlign: 'center', marginRight: 2}}>
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                        <Avatar sx={{ width: 35, height: 35}}>M</Avatar>
                        </IconButton>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open = {open}
                        onClose={handleClose}
                        onClick={handleClose}
                        slotProps = {{
                        paper: {
                            elevation: 0,
                            sx: {
                            overflow: 'visible',
                            border: ' 1px black solid',
                            mt: 1,
                            padding: 'auto',
                            },
                        },
                        }}
                        transformOrigin = {{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin = {{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleMenuClick} sx={{width: '150px'}}>
                            Logout
                        </MenuItem>
                    </Menu>
                </React.Fragment>
            </header>
            <main style={{ flex: 1, padding: '20px' }}>
            {/*main content - different za svaku stranu*/}
            <Outlet />
            </main>
            <footer >Footer</footer>
        </>
    )
}