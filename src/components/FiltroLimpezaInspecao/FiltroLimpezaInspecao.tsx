import React, { useContext, useState, ChangeEvent } from 'react';
import { Container, TextField, Divider, Button } from '@material-ui/core';
import axios from 'axios';
import UserData from '../../contexts/UserData';
import { Relatorio } from '../../types';
import stylesFiltroLimpezaInspecao from '../../styles/filtroLimpezaInspecao';
import Title from '../ui/Title';
import TabelaChecklistsLimpInsp from './TabelaChecklistsLimpInsp';
import Alert from '@material-ui/lab/Alert';

interface StateFiltroLimpeza {
    initialDate: string;
    finalDate: string;
    name: string | undefined;
    result: Relatorio[];
    error: boolean;
}

const FiltroLimpezaInspecao = () => {
    const classes = stylesFiltroLimpezaInspecao();
    const userData = useContext(UserData);

    const [state, setState] = useState<StateFiltroLimpeza>({
        initialDate: new Date().toISOString().split('T')[0],
        finalDate: new Date().toISOString().split('T')[0],
        name: '',
        result: [],
        error: false,
    });

    const handleChangeInitialDate = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState({ ...state, initialDate: event.currentTarget.value });
    };
    const handleChangeFinalDate = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState({ ...state, finalDate: event.currentTarget.value });
    };

    const handleChangeName = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState({ ...state, name: event.currentTarget.value });
    };

    const handleSearchButton = () => {
        axios
            .get(
                `check/indexDates?initialDate=${state.initialDate}&finalDate=${state.finalDate}&name=${state.name}&field=${userData.user.field}`
            )
            .then((response) => {
                if (response.data?.length < 1) setState({ ...state, result: response.data, error: true });
                else {
                    setState({ ...state, result: [] }); // só pra recarregar o componente
                    setState({ ...state, result: response.data, error: false });
                }
            })
            .catch((e) => {
                setState({ ...state, error: true });
                console.error(e);
            });
    };

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Title>{`Checklists Limpeza e Inspeção - ${userData.user.field}`}</Title>
            <TextField
                label="Data Inicial"
                type="date"
                required
                variant="outlined"
                className={classes.textFieldSecondary}
                value={state.initialDate}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleChangeInitialDate}
            />
            <TextField
                label="Data Final"
                type="date"
                required
                variant="outlined"
                className={classes.textFieldSecondary}
                value={state.finalDate}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleChangeFinalDate}
            />
            <TextField
                label="Nome do Equipamento (Deixe vazio para não aplicar o filtro)"
                variant="outlined"
                className={classes.textFieldLista}
                value={state.name || ' '}
                onChange={handleChangeName}
            />
            <Button onClick={handleSearchButton} variant="outlined" color="primary" className={classes.searchButton}>
                {state.initialDate}
            </Button>
            <Divider />
            {state.result.length < 1 ? (
                ''
            ) : (
                <TabelaChecklistsLimpInsp checklists={state.result} reloadTable={handleSearchButton} />
            )}
            <Alert
                onClose={() => {
                    setState({ ...state, error: false });
                }}
                className={state.error ? undefined : classes.hide}
                variant="filled"
                severity="warning"
            >
                Não encontramos nenhum checklist com esses parâmetros
            </Alert>
        </Container>
    );
};

export default FiltroLimpezaInspecao;
