import React, { useState, useContext } from 'react';
import { Container } from '@material-ui/core';
import { GrupoLubMachine, LubMachine, LubrificacaoInfo, LubProcedure } from '../../types';
import stylesLimpezaInspecao from '../../styles/limpezaInspecao';
import GrupoLubMachineSelector from './GrupoLubMachineSelector';
import LubMachineSelector from './LubMachineSelector';
import StepperLubrificacao from './StepperLubrificacao';
import clsx from 'clsx';
import Title from '../ui/Title';
import UserData from '../../contexts/UserData';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import { isNullOrUndefined } from 'util';

const Lubrificacao = () => {
    const classes = stylesLimpezaInspecao();
    const userData = useContext(UserData);

    const [grupos, setGrupos] = useState<GrupoLubMachine[] | undefined>(undefined);
    const [selectedGrupo, setSelectedGrupo] = useState('');

    const [lubMachinesDoGrupo, setLubMachinesDoGrupo] = useState<LubMachine[] | undefined>([]);
    const [selectedLubMachineId, setSelectedLubMachineId] = useState<string>('');
    const [selectedLubMachine, setSelectedLubMachine] = useState<LubMachine | undefined>({} as LubMachine);
    const [reportComments, setReportComments] = useState('');

    const [isRequestSent, setIsRequestSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const handleReportComments = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setReportComments(event.currentTarget.value);
    };

    const sendReportToServer = () => {
        const dados: LubrificacaoInfo = {
            period: selectedLubMachine?.period || '',
            frequency: selectedLubMachine?.frequency || -1,
            arrayAllPages: [selectedLubMachine?.procedures] as LubProcedure[][],
            date: new Date(),
            userId: userData.user.userId || '',
            field: userData.user.field || '',
            machineName: selectedLubMachine?.name || '',
            report: reportComments,
        };
        axios
            .post('/lubrification/create', dados)
            .then(() => {
                setIsRequestSent(true);
                setErrorMessage(undefined);
            })
            .catch(() => {
                setIsRequestSent(true);
                setErrorMessage(
                    'Não conseguimos enviar a requisição, por favor confira os dados e a conexão com a internet'
                );
            });
    };

    return (
        <Container className={classes.container}>
            <Container className={classes.selectorContainer}>
                <Title>Lubrificação</Title>
                <GrupoLubMachineSelector
                    grupos={grupos}
                    setGrupos={setGrupos}
                    selectedGrupo={selectedGrupo}
                    setSelectedGrupo={setSelectedGrupo}
                    setSelectedLubMachineId={setSelectedLubMachineId}
                />
                <LubMachineSelector
                    lubMachinesDoGrupo={lubMachinesDoGrupo}
                    grupo={selectedGrupo}
                    setLubMachinesDoGrupo={setLubMachinesDoGrupo}
                    selectedLubMachineId={selectedLubMachineId}
                    setSelectedLubMachineId={setSelectedLubMachineId}
                    setSelectedLubMachine={setSelectedLubMachine}
                />
            </Container>
            <StepperLubrificacao
                className={clsx(classes.selector, selectedLubMachineId === '' && classes.hide)}
                selectedLubMachine={selectedLubMachine}
                setSelectedLubMachine={setSelectedLubMachine}
                sendReportToServer={sendReportToServer}
                handleReportComments={handleReportComments}
                reportComments={reportComments}
            />
            <Container className={isRequestSent ? undefined : classes.hide}>
                <Alert variant="filled" severity={isNullOrUndefined(errorMessage) ? 'success' : 'error'}>
                    {errorMessage || 'Checklist enviado com sucesso'}
                </Alert>
            </Container>
        </Container>
    );
};

export default Lubrificacao;
