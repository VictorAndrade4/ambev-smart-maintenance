import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from '../ui/Title';
import UserData from '../../contexts/UserData';
import { Check } from '../../types';
import { ChecksAndItensTotais } from '../../types';
import PieGraphic from '../Dashboard/PieGraphic'
import CircularProgress from '@material-ui/core/CircularProgress';

interface GraphFilter {
    type: string;
    often: string;
    dados: Check[] | null;
    totais: ChecksAndItensTotais | undefined;
}

const MakeItensPieGraphs = (props:GraphFilter ) => {
    const userData = React.useContext(UserData);
    let data;
    let allItens;
    const [itens, setItens] = React.useState<Check[] | null>(null);   
    React.useEffect(() => {
        setItens(props.dados);
    },[props.dados]);

    if(itens){
        let itensTotal = 0;
        const itensDone = itens.reduce((total, item) => {
            var alreadyDone = 0;
            item.procedures.forEach((procedure) => {
                if(procedure && procedure.checked){
                     alreadyDone++;           
                } 
            });
            return {
               itensDone: total.itensDone + (alreadyDone || 0),
               itensTotal: total.itensTotal + (itensTotal || 0)
            }
        }, {itensDone: 0, itensTotal: 0});
        allItens = itensDone;
        allItens.itensTotal = (props.totais ? props.totais.itens : 0);
    }
        
        data = [
            {name: "Realizados", value : allItens?.itensDone},
            {name: "Não Realizados", value: (allItens? (allItens.itensTotal - allItens.itensDone) : 0)}
        ]

        return(
        <React.Fragment>
            <Title>{props.type} - {userData.user.field}</Title>
            <Typography component="p" variant="h6">
                {`${props.type} realizados no mês: ${allItens ? allItens.itensDone : ''}` }
                <br />
                {`${props.type} esperados no mês: ${allItens ? allItens.itensTotal : ''}`}
            </Typography>
            { allItens?.itensTotal===undefined && <CircularProgress /> }
            { allItens?.itensTotal!==undefined && <PieGraphic data={data} />}
        </React.Fragment>
    )


}
export default MakeItensPieGraphs;