/* eslint-disable react/display-name */
import React, { FC, useState } from 'react';
import { Relatorio } from '../../types';
import MaterialTable, { Column } from 'material-table';
import VisibilityIcon from '@material-ui/icons/Visibility';
import tableIcons from '../ui/tableIcons';
import DialogFiltroLimpezaInspecao from './DialogFiltroLimpezaInspecao';
import { Container } from '@material-ui/core';
import { isNullOrUndefined } from 'util';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import stylesFiltroLimpezaInspecao from '../../styles/filtroLimpezaInspecao';

interface PropsTabelaChecklistsLimpInsp {
    checklists: Relatorio[];
    reloadTable: () => void;
}

interface StateTabela {
    columns: Array<Column<Relatorio>>;
    rows: Relatorio[];
}

type AllProps = PropsTabelaChecklistsLimpInsp;
const TabelaChecklistsLimpInsp: FC<AllProps> = (props: AllProps) => {
    const classes = stylesFiltroLimpezaInspecao();
    const [selectedChecklist, setSelectedChecklist] = useState<Relatorio | undefined>(undefined);
    const [alertOn, setAlertStatus] = useState(false);
    const [deleteError, setDeleteError] = useState(false);

    const [tableState] = useState<StateTabela>({
        columns: [
            { title: 'Nome da Máquina', field: 'machineName' },
            { title: 'Data', field: 'date' },
            { title: 'Frequência', field: 'frequency' },
            { title: 'Período', field: 'period' },
            { title: 'ID Operador', field: 'userId' },
        ],
        rows: props.checklists,
    });

    const onDialogClose = () => {
        setSelectedChecklist(undefined);
    };

    return (
        <Container>
            <MaterialTable
                title="Checklists"
                columns={tableState.columns}
                data={tableState.rows}
                icons={tableIcons}
                actions={[
                    (rowData) => ({
                        icon: () => <VisibilityIcon />,
                        tooltip: 'Abrir check',
                        onClick: () => {
                            setSelectedChecklist(rowData);
                        },
                    }),
                    (rowData) => ({
                        icon: () => <DeleteOutline />,
                        tooltip: 'Deletar',
                        onClick: () => {
                            axios
                                .delete(`/check/delete/${rowData._id}`)
                                .then(() => {
                                    setDeleteError(false);
                                    setAlertStatus(true);
                                    props.reloadTable();
                                })
                                .catch(() => {
                                    setDeleteError(true);
                                    setAlertStatus(true);
                                });
                        },
                    }),
                ]}
            />
            <Alert
                onClose={() => {
                    setAlertStatus(false);
                }}
                className={alertOn ? undefined : classes.hide}
                variant="filled"
                severity={deleteError ? 'error' : 'success'}
            >
                {deleteError ? 'Algo deu errado, pode tentar novamente?' : 'Deletado com sucesso!'}
            </Alert>

            {isNullOrUndefined(selectedChecklist) ? undefined : (
                <DialogFiltroLimpezaInspecao checklist={selectedChecklist} onClose={onDialogClose} />
            )}
        </Container>
    );
};

export default TabelaChecklistsLimpInsp;
