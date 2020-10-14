import { makeStyles } from '@material-ui/core/styles';

const stylesMakeEquipament = makeStyles((theme) => ({
    
    MuiAccordionSummary:{
        display:'flex'
    },
    content: {
        display: 'flex',
        flexWrap:'wrap',
        flexGrow: 1,
        justifyContent: 'space-evenly',
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
        flexWrap: 'wrap'
    },
    margin: {
        margin: 'auto 0'
    },
    line: {
        display: 'flex',
        flexBasis: '70%',
        flexGrow: 1,
        justifyContent:'space-evenly'
    }
}));
export default stylesMakeEquipament;