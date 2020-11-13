/* eslint-disable react/display-name */
import React, { useState, useContext, useEffect } from 'react';
import MaterialTable, { Column } from 'material-table';
import tableIcons from '../ui/tableIcons';
import UserData from '../../contexts/UserData';
import axios from 'axios';
import { LubMachine } from '../../types';
import { Container } from '@material-ui/core';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';
import stylesTabelaChecks from '../../styles/tabelaChecks';
import { isNullOrUndefined } from 'util';
import CheckDetalhesDialog from './LubDetalhes';
import ViewListIcon from '@material-ui/icons/ViewList';
import ImportCsv from '../ui/ImportCsv';

interface TableState {
    columns: Array<Column<LubMachine>>;
    rows: LubMachine[];
}

const TabelaChecks = () => {
    const classes = stylesTabelaChecks();

    const userData = useContext(UserData);
    const [failMessage, setFailMessage] = useState<string | undefined>(undefined);
    const [successMessage, setSuccesMessage] = useState<string | undefined>(undefined);
    const [alertIsOn, setAlertIsOn] = useState(false);
    const [reloadComponent, setReload] = useState(false);

    // CheckDetalhes
    const [selectedEquipamento, setSelectedEquipamento] = useState<LubMachine | undefined>(undefined);
    const [openDialog, setOpenDialog] = useState(false);
    const [url, setUrl] = useState<string>('');

    const [tableState, setTableState] = useState<TableState>({
        columns: [
            { title: 'Nome', field: 'name' },
            { title: 'Criado em', field: 'date' },
            { title: 'Área', field: 'field' },
            { title: 'Período', field: 'period' },
        ],
        rows: [],
    });

    const handleCloseDialog = () => {
        setSelectedEquipamento(undefined);
        setOpenDialog(false);
        setReload(!reloadComponent);
    };

    useEffect(() => {
        axios.get(`/lubMachines/index?field=${userData.user.field}`).then((response) => {
            setTableState({ ...tableState, rows: response.data as LubMachine[] });
        });
    }, [reloadComponent]);

    return (
        <Container maxWidth="lg">
            <MaterialTable
                title="Lubrificação"
                columns={tableState.columns}
                data={tableState.rows}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <AddIcon />,
                        tooltip: 'Novo check de lubrificação',
                        isFreeAction: true,
                        onClick: () => {
                            setSelectedEquipamento(undefined);
                            setOpenDialog(true);
                            setUrl('/lubMachines/create');
                        },
                    },
                    (rowData) => ({
                        icon: () => <ViewListIcon />,
                        tooltip: '.csv',
                        onClick: () => {
                            // Este passo só precisar ser feito pq estamos usando o proxy https cors-anywhere
                            // sem ele basta usar o axios.defaults.baseURL
                            const url = axios.defaults.baseURL?.replace('https://cors-anywhere.herokuapp.com/', '');
                            window.open(`${url}/backup?name=${rowData.name}&type=lubrification&field=${userData.user.field}`);
                        },
                    }),
                    (rowData: LubMachine) => ({
                        icon: () => <Edit />,
                        tooltip: 'Editar',
                        onClick: () => {
                            setSelectedEquipamento(rowData);
                            setOpenDialog(true);
                            setUrl(`/lubMachines/modify?_id=${rowData?._id}`);
                        },
                    }),
                    (rowData) => ({
                        icon: () => <DeleteOutline />,
                        tooltip: 'Deletar',
                        onClick: () => {
                            axios
                                .delete(`/lubMachines/${rowData._id}`)
                                .then(() => {
                                    setAlertIsOn(true);
                                    setSuccesMessage('Lubrificação deletado com sucesso!');
                                    setFailMessage(undefined);
                                    setReload(!reloadComponent);
                                })
                                .catch(() => {
                                    setAlertIsOn(true);
                                    setFailMessage('Ops! Tivemos um problema Houston, tente novamente em 1 minuto');
                                    setSuccesMessage(undefined);
                                });
                        },
                    }),
                ]}
            />
            <ImportCsv url={`/fileupload/lub?field=${userData.user.field}`} reloadCallback={setReload} />
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
