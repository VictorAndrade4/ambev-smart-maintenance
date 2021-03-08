import React, { useState, useEffect, useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../ui/Title';
import { CheckDashboardHome } from '../../types';
import axios from 'axios';
import UserData from '../../contexts/UserData';

const ListaChecksRecentes = () => {
    const userData = useContext(UserData);
    const [rows, setRows] = useState<CheckDashboardHome[]>([]);

    useEffect(() => {
        axios.all([ 
        axios.get(`/check/getChecksOfTheDay?field=${userData.user.field}`),
        axios.get(`/lubrification/getChecksOfTheDay?field=${userData.user.field}`)
        ]).then(axios.spread((...response) => {
            let dados = [...response[0].data,...response[1].data];
            setRows(dados);
        }));
    }, [userData.user.field]);

    return (
        <React.Fragment>
            <Title>Relatório Recente (Últimas 24h)</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Data</TableCell>
                        <TableCell>Usuário</TableCell>
                        <TableCell>Área</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Equipamento</TableCell>
                        <TableCell>Turno</TableCell>
                        <TableCell>Período</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows && rows.map((row : CheckDashboardHome, index) => {
                       let hour = Number(new Date(row.date).getUTCHours());
                       let minutes = Number(new Date(row.date).getMinutes());
                       return <TableRow key={`ultimos-5checks-lista-${index}`}>
                            <TableCell>{new Date(row.date).toLocaleString('pt-br',{timeZone:'UTC'})}</TableCell>
                            <TableCell>{row.userId}</TableCell>
                            <TableCell>{row.field}</TableCell>
                            <TableCell>{row.kind}</TableCell>
                            <TableCell>{row.machineName}</TableCell>
                            <TableCell>{(hour * 60 + minutes > 1400 && hour * 60 + minutes <= 1439) || (hour * 60 + minutes >= 0 && hour * 60 + minutes <= 440) ? 'Turno A' :
          (hour * 60 + minutes > 440 && hour * 60 + minutes <= 920) ? 'Turno B' : 'Turno C'}</TableCell> 
                            <TableCell>{row.period}</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </React.Fragment>
    );
};

export default ListaChecksRecentes;
