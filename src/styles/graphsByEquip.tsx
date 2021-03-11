
import { makeStyles } from '@material-ui/core/styles';

const stylesGraphsByEquip = makeStyles((theme) => ({
    customTooltip: {
        flex:1,
        flexGrow:1,
        lineHeight:'1rem',
        border: '0.5em solid #275ab0',
        borderRadius:'10px',
        backgroundColor: 'rgba(76, 133, 244,0.7)',
    },
    label:{
        fontSize:'1rem',
        margin:'1.5em',
        fontWeight:'bold',
        color:'#FFF'
    },
    desc:{
        color:'#FFF',
        margin:'1.5em',
    }
}));

export default stylesGraphsByEquip;
