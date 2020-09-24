import React from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { Box, Grid, Paper, Container } from '@material-ui/core';
import stylesGraphsByMachine from '../../styles/graphsByMachine'
import UserData from '../../contexts/UserData';
import Title from '../ui/Title';


const GraphsByMachine = () =>{
    const classes = stylesGraphsByMachine();
    const userData = React.useContext(UserData);


    return (
        <Container maxWidth="lg" className={classes.container}>
            <Title>Checks por equipamentos - Área : {userData.user.field}</Title>
            <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={8}>
                    <Paper className={classes.paper}>
                    </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                    <Paper className={classes.paper}>
                    </Paper>
            </Grid>
            </Grid>
        </Container>
    );
};

export default GraphsByMachine;
