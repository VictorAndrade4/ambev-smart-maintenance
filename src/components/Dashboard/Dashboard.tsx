import React from 'react';
import clsx from 'clsx';
import UserData from '../../contexts/UserData';
import { Box, Grid, Paper, Container } from '@material-ui/core';
//import ContadorChecksDiario from './ContadorChecksDiario';
import ListaChecksRecentes from './ListaChecks';
import stylesDashboard from '../../styles/dashboard';
import Copyright from '../ui/Copyright';
import Title from '../ui/Title';
import MakeChecksPieGraphs from './ChecksGraphs';
import axios from 'axios';
import { Check } from '../../types';
import { ChecksAndItensTotais } from '../../types';
import Criticidade from './Criticidade';
import GraphsByEquip from './GraphsByEquip';

const Dashboard = () => {
    const classes = stylesDashboard();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight, classes.centerItens);
    const userData = React.useContext(UserData);
    const [checksAndItens, setChecksAndItens] = React.useState<Check[] | null>(null);
    const [checksItensTotal, setChecksItensTotal] = React.useState<ChecksAndItensTotais | undefined>();
    const [lubchecksItensTotal, setLubChecksItensTotal] = React.useState<ChecksAndItensTotais | undefined>();
    const [lubrifications, setLubrifications] = React.useState<Check[] | null>(null);
    const [graphData, setGraphData] = React.useState<any[] | null>(null);
    React.useEffect(() => {
        const month = new Date().getMonth()
        axios.all([
            axios.get(`/check/getChecksByMonth?month=${month}&field=${userData.user.field}`),
            axios.get(`/machines/count?field=${userData.user.field}`),
            axios.get(`/lubrification/getChecksByMonth?month=${month}&field=${userData.user.field}`),
            axios.get(`/lubmachines/count?field=${userData.user.field}`),
        ]).then(axios.spread((...response) => {
            setChecksAndItens(response[0].data.filter((dat: any) => {
                return dat.field === String(userData.user.field)
            }));
            setChecksItensTotal(response[1].data);
            setLubrifications(response[2].data.filter((dat: any) => {
                return dat.field === String(userData.user.field)
            }));
            setLubChecksItensTotal(response[3].data)
        }));;
},[graphData]);
    return (
        <Container className={classes.container}>
            <Title>Bem vindo ao Smart Maintenance</Title>
            <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4}>
                    <Paper className={fixedHeightPaper}>
                       <MakeChecksPieGraphs type="Checks" often ="week" dados={checksAndItens} totais = {checksItensTotal} />
                    </Paper>
                </Grid>
                
                <Grid item xs={12} md={4} lg={4}>
                    <Paper className={classes.crit}>
                        {/* <ContadorChecksDiario /> */}
                        <Criticidade data={setGraphData}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Paper className={fixedHeightPaper}>
                       <MakeChecksPieGraphs type="Lubrificação" often ="week" dados={lubrifications} totais = {lubchecksItensTotal} />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <GraphsByEquip data={graphData} field={userData.user.field}/>
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