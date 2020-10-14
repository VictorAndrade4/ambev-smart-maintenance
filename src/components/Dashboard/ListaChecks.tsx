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
        axios.get(`/check/getChecksOfTheDay?field=${userData.user.field}`).then((response) => {
            setRows(response.data);
        });
    }, [userData.user.field]);

    return (
        <React.Fragment>
            <Title>Relatórios Recentes (Limpeza e Inspeção)</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Data</TableCell>
                        <TableCell>UserID</TableCell>
                        <TableCell>Área</TableCell>
                        <TableCell>Equipamento</TableCell>
                        <TableCell align="right">Período</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row: CheckDashboardHome, index) => (
                        <TableRow key={`ultimos-5checks-lista-${index}`}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.userId}</TableCell>
                            <TableCell>{row.field}</TableCell>
                            <TableCell>{row.machineName}</TableCell>
                            <TableCell align="right">{row.period}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
};

export default ListaChecksRecentes;
