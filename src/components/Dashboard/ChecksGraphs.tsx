import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from '../ui/Title';
import UserData from '../../contexts/UserData';
import { Check } from '../../types';
import { ChecksAndItensTotais } from '../../types';
import BarGraphic from '../Dashboard/BarGraphic';
import CircularProgress from '@material-ui/core/CircularProgress';

interface GraphFilter {
    type: string;
    often: string;
    dados: Check[] | null;
    totais: ChecksAndItensTotais | undefined;
}

const MakeChecksPieGraphs = (props:GraphFilter ) => {
    const userData = React.useContext(UserData);
    const [checks, setcheck] = React.useState<Check[] | null>(null);   
    React.useEffect(() => {
            setcheck(props.dados);    
    },[props.dados]); 

  let totalChecksByArea = props.totais? props.totais?.checks : 0;

    let dataCheck = [
        {name: `${props.type} (%) - Clique para mais detalhes`, Realizados : String((checks? (checks.length / totalChecksByArea * 100) : 0).toFixed(2)), "Não Realizados" : (100 - (checks ? (checks.length / totalChecksByArea * 100):0)).toFixed(2)}
    ]

    return(
        <React.Fragment>
            <Title>{props.type} - {userData.user.field}</Title>
            <Typography component="p" variant="h6">
                {`${props.type} realizados no mês: ${checks ?checks.length: ''}`}
                <br />
                {`${props.type} esperados no mês: ${totalChecksByArea}`}
            </Typography>
            { totalChecksByArea===undefined && <CircularProgress /> }
            { totalChecksByArea!==undefined && <BarGraphic data={dataCheck} modal={checks} kind={props.type} />}
        </React.Fragment>
    )


}
export default MakeChecksPieGraphs;