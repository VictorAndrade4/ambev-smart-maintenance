import React from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { Box, Grid, Typography, Paper, Container } from '@material-ui/core';
import ContadorChecksDiario from './ContadorChecksDiario';
import ListaChecksRecentes from './ListaChecks';
import stylesDashboard from '../../styles/dashboard';
import Copyright from '../ui/Copyright';
import Title from '../ui/Title';

const Dashboard = () => {
    const classes = stylesDashboard();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [checks, setcheck] = React.useState<any[] | null>(null);
    React.useEffect(() => {
        axios.get("/checkmanip/sendChecks").then(response => {
            setcheck(response.data);
        });
    },[])
    return (
        <Container maxWidth="lg" className={classes.container}>
            <Title>Bem vindo ao Smart Maintenance</Title>
            <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        {
                            
                        }
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        semanal
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        mensal
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
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