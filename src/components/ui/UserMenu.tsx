import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UserData from '../../contexts/UserData';
import stylesUserMenu from '../../styles/userMenu';
import { useHistory } from 'react-router-dom';

const UserMenu = () => {
    const classes = stylesUserMenu();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const userData = useContext(UserData);
    const history = useHistory();

    const handleLogOut = () => {
        setAnchorEl(null);
        userData.setUser(undefined);
    };

    const handleUserProfile = () => {
        setAnchorEl(null);
        history.push('/perfil');
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton aria-haspopup="true" onClick={handleClick}>
                <AccountCircleIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
                <MenuItem onClick={handleUserProfile}>
                    <ListItem className={classes.item}>
                        <ListItemIcon>
                            <AssignmentIndIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText>Meu Perfil</ListItemText>
                    </ListItem>
                </MenuItem>
                <MenuItem onClick={handleLogOut}>
                    <ListItem className={classes.item}>
                        <ListItemIcon>
                            <ExitToAppIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText>Sair</ListItemText>
                    </ListItem>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default UserMenu;
