import { makeStyles } from '@material-ui/core/styles';

const stylesFiltroLimpezaInspecao = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    hide: {
        display: 'none',
    },
    dialogField: {
        padding: theme.spacing(2),
        width: '40%',
        minWidth: '200px',
    },
    searchButton: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        width: '100%',
    },
    textFieldLista: {
        width: '100%',
        padding: theme.spacing(2),
        minWidth: '250px',
    },
    textFieldSecondary: {
        marginTop: '30px',
        width: '50%',
        padding: theme.spacing(2),
        minWidth: '250px',
    },
    dialogContainer: {
        width: '100%',
        maxWidth: '100% !important',
    },
    listItem: {
        padding: theme.spacing(1),
        borderRadius: '16px',
        border: '1px solid #ccc!important',
    },
    paperDialog: {
        padding: '10px',
    },
}));

export default stylesFiltroLimpezaInspecao;
