/* eslint-disable react/display-name */
import React, { useState, useContext, useEffect } from 'react';
import MaterialTable, { Column } from 'material-table';
import tableIcons from '../ui/tableIcons';
import UserData from '../../contexts/UserData';
import axios from 'axios';
import { Equipamento } from '../../types';
import { Container } from '@material-ui/core';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';
import stylesTabelaChecks from '../../styles/tabelaChecks';
import { isNullOrUndefined } from 'util';
import CheckDetalhesDialog from './CheckDetalhes';
import ViewListIcon from '@material-ui/icons/ViewList';

interface TableState {
    columns: Array<Column<Equipamento>>;
    rows: Equipamento[];
}

const TabelaChecks = () => {
    const classes = stylesTabelaChecks();

    const userData = useContext(UserData);
    const [failMessage, setFailMessage] = useState<string | undefined>(undefined);
    const [successMessage, setSuccesMessage] = useState<string | undefined>(undefined);
    const [alertIsOn, setAlertIsOn] = useState(false);
    const [reloadComponent, setReload] = useState(false);

    // CheckDetalhes
    const [selectedEquipamento, setSelectedEquipamento] = useState<Equipamento | undefined>(undefined);
    const [openDialog, setOpenDialog] = useState(false);
    const [url, setUrl] = useState<string>('');

    const [tableState, setTableState] = useState<TableState>({
        columns: [
            { title: 'Nome', field: 'name' },
            { title: 'Criado em', field: 'date' },
            { title: 'Área', field: 'field' },
            { title: 'Período', field: 'period' },
            { title: 'Frequência', field: 'frequency' },
        ],
        rows: [],
    });

    const handleCloseDialog = () => {
        setSelectedEquipamento(undefined);
        setOpenDialog(false);
        setReload(!reloadComponent);
    };

    useEffect(() => {
        axios.get(`/machines/index?field=${userData.user.field}`).then((response) => {
            setTableState({ ...tableState, rows: response.data as Equipamento[] });
        });
    }, [reloadComponent]);

    return (
        <Container maxWidth="lg">
            <MaterialTable
                title="Checklists"
                columns={tableState.columns}
                data={tableState.rows}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <AddIcon />,
                        tooltip: 'Add',
                        isFreeAction: true,
                        onClick: () => {
                            setSelectedEquipamento(undefined);
                            setOpenDialog(true);
                            setUrl('/machines/create');
                        },
                    },
                    (rowData) => ({
                        icon: () => <ViewListIcon />,
                        tooltip: '.csv',
                        onClick: () => {
                            window.open(
                                `${axios.defaults.baseURL}/backup?name=${rowData.name}&type=checks&field=${userData.user.field}`
                            );
                        },
                    }),
                    (rowData) => ({
                        icon: () => <Edit />,
                        tooltip: 'Editar',
                        onClick: () => {
                            setSelectedEquipamento(rowData);
                            setOpenDialog(true);
                            setUrl(
                                `/machines/modify?name=${selectedEquipamento?.name}&period=${selectedEquipamento?.period}&frequency=${selectedEquipamento?.frequency}`
                            );
                        },
                    }),
                    (rowData) => ({
                        icon: () => <DeleteOutline />,
                        tooltip: 'Deletar',
                        onClick: () => {
                            axios
                                .get(
                                    `/machines/delete?name=${rowData.name}&period=${rowData.period}&frequency=${rowData.frequency}`
                                )
                                .then(() => {
                                    setAlertIsOn(true);
                                    setSuccesMessage('Check deletado com sucesso!');
                                    setFailMessage(undefined);
                                    setReload(!reloadComponent);
                                })
                                .catch(() => {
                                    setAlertIsOn(true);
                                    setFailMessage('Algo deu errado! Pode tentar novamente?');
                                    setSuccesMessage(undefined);
                                });
                        },
                    }),
                ]}
            />
            <Alert
                onClose={() => {
                    setAlertIsOn(false);
                }}
                className={alertIsOn ? undefined : classes.hide}
                variant="filled"
                severity={isNullOrUndefined(failMessage) ? 'success' : 'error'}
            >
                {failMessage || successMessage}
            </Alert>
            <CheckDetalhesDialog equip={selectedEquipamento} open={openDialog} onClose={handleCloseDialog} url={url} />
        </Container>
    );
};

export default TabelaChecks;
