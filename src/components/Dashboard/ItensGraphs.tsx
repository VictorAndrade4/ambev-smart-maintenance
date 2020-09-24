import React from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Title from '../ui/Title';
import UserData from '../../contexts/UserData';
import { Check } from '../../types';
import PieGraphic from '../Dashboard/PieGraphic'
import CircularProgress from '@material-ui/core/CircularProgress';

interface GraphFilter {
    type: string;
    often: string;
}

const MakeItensPieGraphs = (props:GraphFilter ) => {
    const userData = React.useContext(UserData);
    let data;
    let allItens;
    const [itens, setItens] = React.useState<Check[] | null>(null);   
    React.useEffect(() => {
    const month = new Date().getMonth()
    axios.get(`/check/getChecksByMonth?month=${month}&field=${userData.user.field}`).then(response => {
        setItens(response.data.filter((dat: any) => {
            return dat.field === String(userData.user.field)
        }));
    });
    },[userData.user.field]);

   const calculaItens = (item: Check) => {
        if(item.period === "1 x turno"){
            return (90*item.procedures.length);
        }else if(item.period === "2 x turno"){
            return (180*item.procedures.length);    
        }else if(item.period === "diário"){
            return (30*item.procedures.length);    
        }else if(item.period === "semanal"){
            return (4*item.procedures.length);    
        }else if(item.period === "quinzenal"){
            return (2*item.procedures.length);    
        }else if(item.period === "mensal"){
            return (item.procedures.length);    
        }else{
            return 0;
        }
    }
    if(itens){
        let itensTotal = 0;
        const itensDone = itens.reduce((total, item) => {
            var alreadyDone = 0;
            var valor = calculaItens(item);     
            itensTotal = itensTotal + (valor ? valor: 0);
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
        allItens.itensTotal = itensTotal;
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
            { !allItens?.itensDone && <CircularProgress /> }
            { allItens?.itensDone && <PieGraphic data={data} />}
        </React.Fragment>
    )


}
export default MakeItensPieGraphs;