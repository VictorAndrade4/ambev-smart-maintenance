import React from 'react';
import axios from 'axios';
import '../styles/App.css';
import Dashboard from './Dashboard/Dashboard';
import stylesDashboard from '../styles/dashboard';
import AppDrawer from './ui/AppDrawer';
import DefaultAppBar from './ui/DefaultAppBar';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import LimpezaInspecao from './LimpezaInspecao/LimpezaInspecao';
import Lubrificacao from './Lubrificacao/Lubrificacao';
import Login from './Login/Login';
import UserData from '../contexts/UserData';
import { isNullOrUndefined } from 'util';
import { useCookies } from 'react-cookie';
import { User } from '../types';
import CincoPorques from './CincoPorques/CincoPorques';
import TabelaChecks from './TabelaChecks/TabelaChecks';
import TabelaLubrificacao from './TabelaLubrificacao/TabelaLubrificacao'
import TabelaOperarios from './TabelaOperarios/TabelaOperarios';
import CssBaseline from '@material-ui/core/CssBaseline';
import FiltroLimpezaInspecao from './FiltroLimpezaInspecao/FiltroLimpezaInspecao';
import FiltroCincoPorques from './FiltroCincoPorques/FiltroCincoPorques';
import Cadastrar from './Cadastrar/Cadastrar';
import UserProfileDetails from './UserProfileDetails/UserProfileDetails';
import GraphsByMachine from './GraphsByMachine/GraphsByMachine';

const App = () => {
    const classes = stylesDashboard();
    const [open, setOpen] = React.useState(false);
    const [cookies, setCookie] = useCookies(['user']);

    const onUserChange = (user: User | undefined) => {
        setCookie('user', user, { path: '/' });
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    axios.defaults.headers = {
        'Content-Type': 'application/json',
    };
    //axios.defaults.baseURL = 'http://localhost:3333';
    axios.defaults.baseURL = 'https://smaintenance.herokuapp.com';
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response) return Promise.reject(error.response);
            else return Promise.reject(error);
        }
    );

    return (
        <Router>
            <UserData.Provider value={{ user: cookies.user, setUser: onUserChange }}>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/cadastrar">
                        <Cadastrar />
                    </Route> 
                    {isNullOrUndefined(cookies.user?.userId) ? (
                        <Redirect to="/login" />                                  
                    ) : (
                        <div className={classes.root}>
                            <CssBaseline />
                            <AppDrawer open={open} handleDrawerClose={handleDrawerClose} />
                            <DefaultAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
                            <main className={classes.content}>
                                <div className={classes.appBarSpacer} />
                                   <Switch>
                                    <Route path="/limp-insp">
                                        <LimpezaInspecao />
                                    </Route>
                                    <Route path="/lubrificacao">
                                        <Lubrificacao/>
                                    </Route>
                                    <Route path="/5w">
                                        <CincoPorques />
                                    </Route>
                                    <Route path="/checks">
                                        <TabelaChecks />
                                    </Route>
                                    <Route path="/lubrificacoes">
                                        <TabelaLubrificacao />
                                    </Route>
                                    <Route path="/graphs">
                                        <GraphsByMachine />
                                    </Route>
                                    <Route path="/perfil">
                                        <UserProfileDetails />
                                    </Route>
                                    {(cookies.user?.admin || cookies.user?.field === 'Engenharia') && (
                                        <Route path="/operarios">
                                            <TabelaOperarios />
                                        </Route>
                                    )}
                                    {(cookies.user?.admin || cookies.user?.field === 'Engenharia') && (
                                        <Route path="/filtro-limp-insp">
                                            <FiltroLimpezaInspecao />
                                        </Route>
                                    )}
                                    
                                    {(cookies.user?.admin || cookies.user?.field === 'Engenharia') && (
                                        <Route path="/filtro-5w">
                                            <FiltroCincoPorques />
                                        </Route>
                                    )}
                                    <Route path="/">
                                        <Dashboard />
                                    </Route>
                                </Switch>
                            </main>
                        </div>
                        )}
                    </Switch>
            </UserData.Provider>
        </Router>
    );
};

export default App;
