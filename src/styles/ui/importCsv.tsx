import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const styleImportCsv = makeStyles((theme: Theme) =>
    createStyles({
        hide: {
            display: 'none',
        },
        container: {
            display: 'block',
            borderColor: '#2196F3!important',
            borderLeft: '6px solid #ccc!important',
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
        },
        button: {
            minWidth: '200 px',
            margin: theme.spacing(2),
        },
    })
);
export default styleImportCsv;
