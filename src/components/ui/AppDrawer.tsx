import React, { FC, useContext } from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, adminListItems } from './DrawerItems';
import { Drawer, List, IconButton, Divider, Typography } from '@material-ui/core';
import clsx from 'clsx';
import stylesDashboard from '../../styles/dashboard';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import UserData from '../../contexts/UserData';

interface PropsAppDrawer {
    open: boolean;
    handleDrawerClose: () => void;
}

type AllProps = PropsAppDrawer;

const AppDrawer: FC<AllProps> = (props: AllProps) => {
    const userData = useContext(UserData);
    const classes = stylesDashboard();

    return (
        <Drawer
            variant="temporary"
            onEscapeKeyDown={props.handleDrawerClose}
            onBackdropClick={props.handleDrawerClose}
            classes={{
                paper: clsx(classes.drawerPaper, !props.open && classes.drawerPaperClose),
            }}
            open={props.open}
        >
            <div className={classes.toolbarIcon}>
                <ImportantDevicesIcon className={classes.drawerIcon} />
                <Typography className={classes.titleDrawer} noWrap>
                    Smart Maintenance
                </Typography>
                <IconButton onClick={props.handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
            {(userData.user.admin || userData.user.field === 'Engenharia') && <List>{adminListItems}</List>}
        </Drawer>
    );
};

export default AppDrawer;
