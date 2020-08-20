import React, { useContext, useState, ChangeEvent } from 'react';
import { Container, Paper, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import stylesUserProfile from '../../styles/userProfile';
import { User } from '../../types';
import UserData from '../../contexts/UserData';

interface State {
    user: User;
    password: string;
    passwordRetype: string;
    passwordError: boolean;
    success: boolean | undefined;
}

const UserProfileDetails = () => {
    const classes = stylesUserProfile();
    const userData = useContext(UserData);

    const [state, setState] = useState<State>({
        user: {
            name: userData.user.name || '',
            userId: userData.user.userId || '',
            field: userData.user.field || '',
            admin: userData.user.admin,
            _id: userData.user._id,
        },
        password: '',
        passwordRetype: '',
        passwordError: false,
        success: undefined,
    });

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

    const onSave = () => {
        if (!state.passwordError && state.password !== '') {
            axios
                .put(`/users/update/${userData.user._id}`, {
                    userId: state.user.userId,
                    name: state.user.name,
                    fields: [state.user.field],
                    admin: userData.user.admin, // Não é editável
                    password: state.password,
                })
                .then(() => {
                    setState({ ...state, success: true });
                })
                .catch((e) => {
                    console.error(e);
                    setState({ ...state, success: false });
                });
        } else {
            setState({ ...state, passwordError: true });
        }
    };

    return (
        <Container className={classes.container}>
            <Paper>
                <TextField
                    className={classes.textField}
                    variant="outlined"
                    label="Nome Completo"
                    value={state.user.name}
                />
                <TextField className={classes.textField} variant="outlined" label="ID" value={state.user.userId} />
                <TextField className={classes.textField} variant="outlined" label="Área" value={state.user.field} />
                <TextField
                    className={classes.textField}
                    variant="outlined"
                    label="Nova Senha"
                    type="password"
                    value={state.password}
                    onChange={handlePasswordChange}
                />
                <TextField
                    className={classes.textField}
                    variant="outlined"
                    label="Repetir Nova Senha"
                    type="password"
                    value={state.passwordRetype}
                    error={state.passwordError}
                    helperText={state.passwordError ? 'As senhas precisam coincidir e não pode ser vazia' : undefined}
                    onChange={handlePasswordRetypeChange}
                />
                <Button onClick={onSave} color="primary" className={classes.textField}>
                    Salvar
                </Button>
            </Paper>
            {state.success !== undefined && (
                <Alert variant="filled" severity={state.success ? 'success' : 'error'}>
                    {state.success
                        ? 'Informações salvas com sucesso'
                        : 'Algo deu errado. Poderia tentar salvar novamente?'}
                </Alert>
            )}
        </Container>
    );
};

export default UserProfileDetails;
