import React from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Title from '../ui/Title';
import UserData from '../../contexts/UserData';
import { Check } from '../../types';
import BarGraphic from '../Dashboard/BarGraphic';
import CircularProgress from '@material-ui/core/CircularProgress';

interface GraphFilter {
    type: string;
    often: string;
}

const MakeChecksPieGraphs = (props:GraphFilter ) => {
    const userData = React.useContext(UserData);
    const [checks, setcheck] = React.useState<Check[] | null>(null);  
    //const [totalChecks, setTotalCheck] = React.useState<number | null>(null);  
    React.useEffect(() => {
    const month = new Date().getMonth()
    axios.get(`/check/getChecksByMonth?month=${month}&field=${userData.user.field}`).then(response => {
            setcheck(response.data.filter((dat: any) => {
                return dat.field === String(userData.user.field)
            }));
        });    
    /* axios.get(`/machines/count?field=${userData.user.field}`).then(response => {
        setTotalCheck(response.data);
        }); */

    },[userData.user.field]); 
  let totalChecksByArea = (user:any) => { 
        if(String(user) === String('Packaging 501')){
            return 244;
        }else if(String(user) === String('Packaging 502')){
            return 477;
        }else if(String(user) === String('Xaroparia')){
            return 149;
        }else if(String(user) === String('Utilidades')){
            return 32;
        }else if(String(user) === String('Meio Ambiente')){
            return 10;
        }else if(String(user) === String('Packaging 503')){
            return 398;
        }else if(String(user) === String('Packaging 511')){
            return 5;
        }else if(String(user) === String('Packaging 512')){
            return 0;
        }else if(String(user) === String('Packaging 561')){
            return 1;
        }else if(String(user) === String('Packaging 562')){
            return 0;
        }else if(String(user) === String('Processo Cervejaria')){
            return 0;
        }else if(String(user) === String('Blend')){
            return 0;
        }else if(String(user) === String('Engenharia')){
            return 4;
        }else{
            return 0;
        }
    } 

    let dataCheck = [
        {name: 'Checks (%)', Realizados : (checks? (checks.length / totalChecksByArea(userData.user.field) * 100) : 0).toFixed(2), "Não Realizados": (100 - (checks ? (checks.length / totalChecksByArea(userData.user.field) * 100):0)).toFixed(2)}
    ]

    return(
        <React.Fragment>
            <Title>{props.type} - {userData.user.field}</Title>
            <Typography component="p" variant="h6">
                {`${props.type} realizados no mês: ${checks ?checks.length: ''}`}
                <br />
                {`${props.type} esperados no mês: ${totalChecksByArea(userData.user.field)}`}
            </Typography>
            { !checks?.length && <CircularProgress /> }
            { checks?.length && <BarGraphic data={dataCheck} />}
        </React.Fragment>
    )


}
export default MakeChecksPieGraphs;