import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Alert, AlertTitle } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from '../ui/Copyright';
import stylesLogin from '../../styles/login';
import axios from 'axios';
import UserData from '../../contexts/UserData';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const classes = stylesLogin();
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const [error, setError] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const history = useHistory();

    const userData = useContext(UserData);

    const handleEntrarClick = () => {
        if (login === '') setError(true);
        if (password === '') setError(true);

        axios
            .post('/session/login', { userId: login, password: password })
            .then((response) => {
                setError(false);
                userData.setUser({
                    userId: login,
                    admin: response.data.admin,
                    field: response.data.field,
                    name: response.data.name,
                    _id: response.data._id,
                });
                history.push('/');
            })
            .catch((e) => {
                setError(true);
                console.error(e);
            });
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    };
    const handleLoginChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setLogin(event.currentTarget.value.replace(' ', ''));
    };
    const handleForgotPassword = () => {
        setForgotPassword(true);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Smart Maintenance
                </Typography>
                {error && (
                    <Alert severity="error">
                        <AlertTitle>Falha no login</AlertTitle>
                        Por favor, confira os dados e tente novamente
                    </Alert>
                )}
                <Container className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="id"
                        autoComplete="login"
                        autoFocus
                        value={login}
                        onChange={handleLoginChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="senha"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <Button
                        onClick={handleEntrarClick}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Entrar
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link onClick={handleForgotPassword} variant="body2">
                                Esqueceu a senha?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/cadastrar" variant="body2">
                                {'Cadastrar-se'}
                            </Link>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
            {forgotPassword && (
                <Alert variant="filled" severity="info">
                    <AlertTitle>Esqueceu a senha?</AlertTitle>
                    Comunique a um administrador e peça para o mesmo mudar sua senha. Após o reset, você pode redefinir
                    sua senha entrando 'Editar Perfil'.
                </Alert>
            )}
        </Container>
    );
};

export default Login;
