import React, { useContext, useState, ChangeEvent } from 'react';
import { Container, TextField, Divider, Button } from '@material-ui/core';
import axios from 'axios';
import UserData from '../../contexts/UserData';
import { CincoPorquesInfo } from '../../types';
import Title from '../ui/Title';
import Alert from '@material-ui/lab/Alert';
import stylesFiltroCincoPorques from '../../styles/filtroCincoPorques';
import TabelaCincoPorques from './TabelaCincoPorques';
import ImportCsv from '../ui/ImportCsv';

export interface StateFiltro5W {
    initialDate: string;
    finalDate: string;
    result: CincoPorquesInfo[];
    error: boolean;
    chosenField: string;
}

const FiltroCincoPorques = () => {
    const classes = stylesFiltroCincoPorques();
    const userData = useContext(UserData);

    const [state, setState] = useState<StateFiltro5W>({
        initialDate: new Date().toISOString().split('T')[0],
        finalDate: new Date().toISOString().split('T')[0],
        result: [],
        error: false,
        chosenField: '',
    });

    const handleChangeInitialDate = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState({ ...state, initialDate: event.currentTarget.value });
    };

    const handleChangeFinalDate = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState({ ...state, finalDate: event.currentTarget.value });
    };

    const handleChangeField = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState({ ...state, chosenField: event.currentTarget.value });
    };

    const handleSearchButton = () => {
        axios
            .get(
                `/why/indexDates?initialDate=${state.initialDate}&finalDate=${state.finalDate}&field=${
                    state.chosenField === '' ? userData.user.field : state.chosenField
                }`
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
            <Title>{`5 Porquês - Administração: ${userData.user.field}`}</Title>
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
            {(userData.user.field === 'Engenharia' || userData.user.admin) && (
                <TextField
                    label={`Área Escolhida`}
                    variant="outlined"
                    className={classes.textFieldLista}
                    value={state.chosenField || userData.user.field}
                    onChange={handleChangeField}
                />
            )}
            <Button onClick={handleSearchButton} variant="outlined" color="primary" className={classes.searchButton}>
                Mostrar resultados
            </Button>

            <Button
                onClick={() => {
                    // Este passo só precisar ser feito pq estamos usando o proxy https cors-anywhere
                    // sem ele basta usar o axios.defaults.baseURL
                    const url = axios.defaults.baseURL?.replace('https://cors-anywhere.herokuapp.com/', '');
                    window.open(
                        `${url}/backup?initialDate=${state.initialDate}&finalDate=${state.finalDate}&userId=&field=${
                            state.chosenField === '' ? userData.user.field : state.chosenField
                        }&type=5w`
                    );
                }}
                variant="outlined"
                color="secondary"
                className={classes.searchButton}
            >
                Exportar resultado para .csv
            </Button>
            <ImportCsv url="/fileupload/5w/" />
            <Divider />
            {state.result.length > 0 && (
                <TabelaCincoPorques cincoPorquesInfo={state.result} reloadTable={handleSearchButton} />
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

export default FiltroCincoPorques;
