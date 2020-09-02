import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../ui/Title';
import { Check } from '../../types';
import axios from 'axios';
import UserData from '../../contexts/UserData';

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

const ListaChecksRecentes = () => {
    const userData = useContext(UserData);
    const classes = useStyles();
    const [rows, setRows] = useState<Check[]>([]);

    useEffect(() => {
        axios.get(`/check/getChecksOfTheDay?field=${userData.user.field}`).then((response) => {
            setRows(response.data);
        });
    }, []);

    return (
        <React.Fragment>
            <Title>Relatórios Recentes (Limpeza e Inspeção)</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Data</TableCell>
                        <TableCell>UserID</TableCell>
                        <TableCell>Área</TableCell>
                        <TableCell>Período</TableCell>
                        <TableCell align="right">Frequência</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={`ultimos-5checks-lista-${index}`}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.userId}</TableCell>
                            <TableCell>{row.field}</TableCell>
                            <TableCell>{row.period}</TableCell>
                            <TableCell align="right">{row.frequency}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
};

export default ListaChecksRecentes;
