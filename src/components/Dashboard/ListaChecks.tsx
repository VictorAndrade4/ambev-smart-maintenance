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
                        <TableCell>Usuário</TableCell>
                        <TableCell>Área</TableCell>
                        <TableCell>Equipamento</TableCell>
                        <TableCell>Turno</TableCell>
                        <TableCell>Período</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows && rows.map((row : CheckDashboardHome, index) => (
                        <TableRow key={`ultimos-5checks-lista-${index}`}>
                            <TableCell>{new Date(row.date).toLocaleString()}</TableCell>
                            <TableCell>{row.userId}</TableCell>
                            <TableCell>{row.field}</TableCell>
                            <TableCell>{row.machineName}</TableCell>
                            <TableCell>{(new Date(row.date).getHours().toLocaleString() >= "23" && new Date(row.date).getHours().toLocaleString() < "7") ? "Turno A" : (new Date(row.date).getHours().toLocaleString() >= "7" && new Date(row.date).getHours().toLocaleString() < "15" ? "Turno B" : "Turno C")}</TableCell>
                            <TableCell>{row.period}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
};

export default ListaChecksRecentes;
