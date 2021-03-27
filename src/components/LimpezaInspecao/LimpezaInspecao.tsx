import React, { useState, useContext } from 'react';
import { Container } from '@material-ui/core';
import { GrupoEquipamento, Equipamento, LimpezaInspecaoInfo, Procedimento } from '../../types';
import stylesLimpezaInspecao from '../../styles/limpezaInspecao';
import GrupoEquipamentoSelector from './GrupoEquipamentoSelector';
import EquipamentoSelector from './EquipamentoSelector';
import StepperLimpezaInspecao from './StepperLimpezaInspecao';
import clsx from 'clsx';
import Title from '../ui/Title';
import UserData from '../../contexts/UserData';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import { isNullOrUndefined } from 'util';

const LimpezaInspecao = () => {
    const classes = stylesLimpezaInspecao();
    const userData = useContext(UserData);

    const [grupos, setGrupos] = useState<GrupoEquipamento[] | undefined>(undefined);
    const [selectedGrupo, setSelectedGrupo] = useState('');

    const [equipamentosDoGrupo, setEquipamentosDoGrupo] = useState<Equipamento[] | undefined>([]);
    const [selectedEquipamentoId, setSelectedEquipamentoId] = useState<string>('');
    const [selectedEquipamento, setSelectedEquipamento] = useState<Equipamento | undefined>({} as Equipamento);
    const [reportComments, setReportComments] = useState('');

    const [isRequestSent, setIsRequestSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const handleReportComments = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setReportComments(event.currentTarget.value);
    };

    const sendReportToServer = () => {
        const dados: LimpezaInspecaoInfo = {
            period: selectedEquipamento?.period || '',
            frequency: selectedEquipamento?.frequency || -1,
            arrayAllPages: [selectedEquipamento?.procedures] as Procedimento[][],
            date: new Date(),
            userId: userData.user.name || '',
            field: userData.user.field || '',
            machineName: selectedEquipamento?.name || '',
            report: reportComments,
            lineWasUp: (selectedEquipamento?.lineWasUp ? true : false)
        };
        axios
            .post('/check/create', dados)
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
                <Title>Limpeza e Inspeção</Title>
                <GrupoEquipamentoSelector
                    grupos={grupos}
                    setGrupos={setGrupos}
                    selectedGrupo={selectedGrupo}
                    setSelectedGrupo={setSelectedGrupo}
                    setSelectedEquipamentoId={setSelectedEquipamentoId}
                />
                <EquipamentoSelector
                    equipamentosDoGrupo={equipamentosDoGrupo}
                    grupo={selectedGrupo}
                    setEquipamentosDoGrupo={setEquipamentosDoGrupo}
                    selectedEquipamentoId={selectedEquipamentoId}
                    setSelectedEquipamentoId={setSelectedEquipamentoId}
                    setSelectedEquipamento={setSelectedEquipamento}
                />
            </Container>
            <StepperLimpezaInspecao
                className={clsx(classes.selector, selectedEquipamentoId === '' && classes.hide)}
                selectedEquipamento={selectedEquipamento}
                setSelectedEquipamento={setSelectedEquipamento}
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

export default LimpezaInspecao;
