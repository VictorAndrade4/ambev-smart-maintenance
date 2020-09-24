import React from 'react';
import clsx from 'clsx';
import { Box, Grid, Paper, Container } from '@material-ui/core';
import ContadorChecksDiario from './ContadorChecksDiario';
import ListaChecksRecentes from './ListaChecks';
import stylesDashboard from '../../styles/dashboard';
import Copyright from '../ui/Copyright';
import Title from '../ui/Title';
import MakeChecksPieGraphs from './ChecksGraphs';
import MakeItensPieGraphs from './ItensGraphs';

const Dashboard = () => {
    const classes = stylesDashboard();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight, classes.centerItens);

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Title>Bem vindo ao Smart Maintenance</Title>
            <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4}>
                    <Paper className={fixedHeightPaper}>
                       <MakeChecksPieGraphs type="Checks" often ="week" />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Paper className={fixedHeightPaper}>
                    <MakeItensPieGraphs type="Itens" often ="week"  />
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