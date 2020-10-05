import React from 'react';
import clsx from 'clsx';
import UserData from '../../contexts/UserData';
import { Box, Grid, Paper, Container } from '@material-ui/core';
import ContadorChecksDiario from './ContadorChecksDiario';
import ListaChecksRecentes from './ListaChecks';
import stylesDashboard from '../../styles/dashboard';
import Copyright from '../ui/Copyright';
import Title from '../ui/Title';
import MakeChecksPieGraphs from './ChecksGraphs';
import MakeItensPieGraphs from './ItensGraphs';
import axios from 'axios';
import { Check } from '../../types';
import { ChecksAndItensTotais } from '../../types';

const Dashboard = () => {
    const classes = stylesDashboard();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight, classes.centerItens);
    const userData = React.useContext(UserData);
    const [checksAndItens, setChecksAndItens] = React.useState<Check[] | null>(null);
    const [checksItensTotal, setChecksItensTotal] = React.useState<ChecksAndItensTotais | undefined>();
    React.useEffect(() => {
        const month = new Date().getMonth()
        axios.get(`/check/getChecksByMonth?month=${month}&field=${userData.user.field}`).then(response => {
        setChecksAndItens(response.data.filter((dat: any) => {
            return dat.field === String(userData.user.field)
        }));
        });
        axios.get(`/machines/count?field=${userData.user.field}`).then(response => {
            setChecksItensTotal(response.data);
        });
},[userData.user.field]);

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Title>Bem vindo ao Smart Maintenance</Title>
            <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4}>
                    <Paper className={fixedHeightPaper}>
                       <MakeChecksPieGraphs type="Checks" often ="week" dados={checksAndItens} totais = {checksItensTotal} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Paper className={fixedHeightPaper}>
                    <MakeItensPieGraphs type="Itens" often ="week" dados={checksAndItens} totais = {checksItensTotal} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Paper className={fixedHeightPaper}>
                        <ContadorChecksDiario />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <ListaChecksRecentes />
                    </Paper>
                </Grid>
            </Grid>
            <Box pt={4}>
                <Copyright />
            </Box>
        </Container>
    );
};

export default Dashboard;