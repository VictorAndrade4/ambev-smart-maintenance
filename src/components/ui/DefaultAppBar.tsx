import React, { FC } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import stylesDashboard from '../../styles/dashboard';
import logo from '../../img/logo.png';
import UserMenu from './UserMenu';

interface PropsDefaultAppBar {
    open: boolean;
    handleDrawerOpen: () => void;
}

type AllProps = PropsDefaultAppBar;

const DefaultAppBar: FC<AllProps> = (props: AllProps) => {
    const classes = stylesDashboard();

    return (
        <AppBar position="absolute" className={clsx(classes.appBar, props.open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.handleDrawerOpen}
                    className={clsx(classes.menuButton, props.open && classes.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    <img src={logo} alt={logo} width="80px" height="50%" />
                </Typography>
                <UserMenu />
            </Toolbar>
        </AppBar>
    );
};

export default DefaultAppBar;
