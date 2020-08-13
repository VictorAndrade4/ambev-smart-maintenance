/* eslint-disable react/display-name */
import React, { useState, useContext, useEffect } from 'react';
import MaterialTable, { Column } from 'material-table';
import tableIcons from './tableIcons';
import UserData from '../../contexts/UserData';
import axios from 'axios';
import { Operarios } from '../../types';
import { Container } from '@material-ui/core';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';
import stylesTabelaChecks from '../../styles/tabelaChecks';
import { isNullOrUndefined } from 'util';
import OperariosDetalhesDialog from './OperariosDetalhes';
import ViewListIcon from '@material-ui/icons/ViewList';
import trataRequisicao from '../../utils/trataRequisicao';
interface TableState {
    columns: Array<Column<Operarios>>;
    rows: Operarios[];
}

const TabelaChecks = () => {
    const classes = stylesTabelaChecks();

    const userData = useContext(UserData);
    const [failMessage, setFailMessage] = useState<string | undefined>(undefined);
    const [successMessage, setSuccesMessage] = useState<string | undefined>(undefined);
    const [alertIsOn, setAlertIsOn] = useState(false);
    const [reloadComponent, setReload] = useState(false);

    // CheckDetalhes
    const [selectedOperarios, setSelectedOperarios] = useState<Operarios | undefined>(undefined);
    const [openDialog, setOpenDialog] = useState(false);
    const [url, setUrl] = useState<string>('');

    const [tableState, setTableState] = useState<TableState>({
        columns: [
            { title: 'Nome', field: 'name' },
            { title: 'Admin?', field: 'admin' },
            { title: 'Área', field: 'field' },
            { title: 'ID', field: 'userId' },
        ],
        rows: [],
    });

    const handleCloseDialog = () => {
        setSelectedOperarios(undefined);
        setOpenDialog(false);
        setReload(!reloadComponent);
    };

    useEffect(() => {
        axios.get(`/users/index?field=${userData.user.field}`).then((response) => {
            const operarios = trataRequisicao<Operarios>('Operarios', response);
            setTableState({ ...tableState, rows: operarios });
        });
    }, [reloadComponent]);

    return (
        <Container maxWidth="lg">
            <MaterialTable
                title="Operarios"
                columns={tableState.columns}
                data={tableState.rows}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <AddIcon />,
                        tooltip: 'Add',
                        isFreeAction: true,
                        onClick: () => {
                            setSelectedOperarios(undefined);
                            setOpenDialog(true);
                            setUrl('/users/create');
                        },
                    },

                    (rowData) => ({
                        icon: () => <Edit />,
                        tooltip: 'Editar',
                        onClick: () => {
                            setSelectedOperarios(rowData);
                            setOpenDialog(true);
                            setUrl(`/users/delete/${rowData["_id"]}`);
                        },
                    }),
                    (rowData) => ({
                        icon: () => <DeleteOutline />,
                        tooltip: 'Deletar',
                        onClick: () => {
                            axios
                                .delete(`/users/delete/${rowData["_id"]}`)
                                .then(() => {
                                    setAlertIsOn(true);
                                    setSuccesMessage('Operário deletado com sucesso!');
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
            <OperariosDetalhesDialog operario={selectedOperarios} open={openDialog} onClose={handleCloseDialog} url={url} />
        </Container>
    );
};

export default TabelaChecks;
