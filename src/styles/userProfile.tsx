import { makeStyles } from '@material-ui/core/styles';

const stylesUserProfile = makeStyles((theme) => ({
    textField: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(1),
        padding: theme.spacing(1),
        minWidth: '250px',
        width: '95%',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        width: '100%',
    },
}));

export default stylesUserProfile;
