import React, { useState, ChangeEvent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import stylesCadastrar from '../../styles/cadastrar';
import Copyright from '../ui/Copyright';
import Select from '@material-ui/core/Select/Select';
import FormControl from '@material-ui/core/FormControl/FormControl';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import axios from 'axios';
import { isNullOrUndefined } from 'util';
import { useHistory } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';

interface State {
    checkbox: boolean;
    userId: string;
    area: string;
    password: string;
    passwordRetype: string;
    name: string;
    passwordError: boolean;
    alertMessage: string | undefined;
}

const Cadastrar = () => {
    const [state, setState] = useState<State>({
        checkbox: false,
        userId: '',
        area: 'Packaging 501',
        password: '',
        passwordRetype: '',
        name: '',
        passwordError: true,
        alertMessage: undefined,
    });

    const history = useHistory();
    const classes = stylesCadastrar();

    const handleAreaChange = (event: ChangeEvent<{ value: unknown }>) => {
        setState({ ...state, area: event.target.value as string });
    };

    const handleNameChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState({ ...state, name: event.currentTarget.value });
    };

    const handleUserIdChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState({ ...state, userId: event.currentTarget.value });
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (event.currentTarget.value !== state.passwordRetype) {
            setState({ ...state, password: event.currentTarget.value, passwordError: true });
        } else {
            setState({ ...state, password: event.currentTarget.value, passwordError: false });
        }
    };

    const handlePasswordRetypeChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (event.currentTarget.value !== state.password) {
            setState({ ...state, passwordRetype: event.currentTarget.value, passwordError: true });
        } else {
            setState({ ...state, passwordRetype: event.currentTarget.value, passwordError: false });
        }
    };

    const onSubmit = () => {
        if (
            !isNullOrUndefined(state.name) &&
            !isNullOrUndefined(state.password) &&
            state.checkbox &&
            !state.passwordError &&
            !isNullOrUndefined(state.userId)
        ) {
            axios
                .post('/users/create', {
                    fields: [state.area],
                    name: state.name,
                    userId: state.userId,
                    password: state.password,
                })
                .then(() => {
                    setState({ ...state, alertMessage: undefined });
                    setTimeout(() => {
                        history.push('/login');
                    }, 2000);
                })
                .catch((e) => {
                    console.error(e);
                    setState({
                        ...state,
                        alertMessage: 'Algo deu errado! Por favor, confira os dados e tente novamente.',
                    });
                });
        } else {
            setState({ ...state, alertMessage: 'Por favor, preencha todos os campos' });
        }
    };

    // eslint-disable-next-line @typescript-eslint/ban-types
    const handleCheckboxChange = (event: ChangeEvent<{}>, checked: boolean) => {
        setState({ ...state, checkbox: checked });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Cadastrar
                </Typography>
                {state.alertMessage && (
                    <Alert severity="error">
                        <AlertTitle>Algo de errado...</AlertTitle>
                        {state.alertMessage}
                    </Alert>
                )}
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Nome Completo"
                                autoFocus
                                value={state.name}
                                onChange={handleNameChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="userId"
                                label="ID"
                                name="userId"
                                value={state.userId}
                                onChange={handleUserIdChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <Select onChange={handleAreaChange} value={state.area}>
                                    {/* Integrar API para listar essas áreas no futuro */}
                                    <MenuItem value="BBlend">BBlend</MenuItem>
                                    <MenuItem value="Meio ambiente">Meio ambiente</MenuItem>
                                    <MenuItem value="Packaging 501">Packaging 501</MenuItem>
                                    <MenuItem value="Packaging 502">Packaging 502</MenuItem>
                                    <MenuItem value="Packaging 503">Packaging 503</MenuItem>
                                    <MenuItem value="Packaging 503">Packaging 503</MenuItem>
                                    <MenuItem value="Packaging 511">Packaging 511</MenuItem>
                                    <MenuItem value="Packaging 512">Packaging 512</MenuItem>
                                    <MenuItem value="Packaging 561">Packaging 561</MenuItem>
                                    <MenuItem value="Packaging 562">Packaging 562</MenuItem>
                                    <MenuItem value="Processo cerveja">Processo cerveja</MenuItem>
                                    <MenuItem value="Utilidades">Utilidades</MenuItem>
                                    <MenuItem value="Xaroparia">Xaroparia</MenuItem>
                                    <MenuItem value="Engenharia">Engenharia</MenuItem>
                                    <MenuItem value="Almoxarifado">Almoxarifado</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type="password"
                                id="password1"
                                autoComplete="current-password"
                                value={state.password}
                                onChange={handlePasswordChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Confirmação de senha"
                                type="password"
                                id="password2"
                                error={state.passwordError}
                                helperText={state.passwordError ? 'As senhas precisam coincidir' : undefined}
                                value={state.passwordRetype}
                                onChange={handlePasswordRetypeChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                onChange={handleCheckboxChange}
                                value={state.checkbox}
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="Eu aceito os termos e condições"
                            />
                        </Grid>
                    </Grid>
                    <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick={onSubmit}>
                        Cadastrar-se
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/login">Já tem uma conta? Faça login</Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
};

export default Cadastrar;
