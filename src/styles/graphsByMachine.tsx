import { makeStyles } from '@material-ui/core/styles';

const stylesGraphsByMachine = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        margin: theme.spacing(2),
    },
    card: {
        height: '33%',
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    },
   
    title: {
        display: 'block',
        width: '100%',
        boxSizing:'border-box',
    },
    
    formControl: {
        width:'88%',
        alignSelf: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        boxSizing:'border-box',
    }

}));

export default stylesGraphsByMachine;