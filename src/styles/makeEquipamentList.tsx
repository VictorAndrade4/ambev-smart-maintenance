import { makeStyles } from '@material-ui/core/styles';

const stylesMakeEquipament = makeStyles((theme) => ({
    
    MuiAccordionSummary:{
        boxSizing: 'border-box',
        display:'flex'
    },
    content: {
        display: 'flex',
        flexWrap:'wrap',
        flexGrow: 1,
        justifyContent: 'space-between',
        fontSize:'0.9rem',
    },
    AcordionNode: {
        marginBottom: '5%'
    },
    
    destaque: {
        fontWeight: 'bold'
    },
    flexAdjust: {
        flexGrow:1,
    },
    margin: {
        margin: 'auto 0'
    },
    line: {
        display: 'flex',
        flexBasis: '70%',
        flexGrow: 1,
        justifyContent:'space-around'
    }
}));
export default stylesMakeEquipament;