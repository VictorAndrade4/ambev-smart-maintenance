import React, { FC } from 'react';
import { Relatorio } from '../../types';
import { Container, Dialog, DialogTitle, TextField } from '@material-ui/core';
import stylesFiltroLimpezaInspecao from '../../styles/filtroLimpezaInspecao';

interface PropsDialogFitroLimpezaInsp {
    checklist: Relatorio;
    onClose: () => void;
}
type AllProps = PropsDialogFitroLimpezaInsp;
const DialogFiltroLimpezaInspecao: FC<AllProps> = (props: AllProps) => {
    const classes = stylesFiltroLimpezaInspecao();

    return (
        <Dialog
            className={classes.dialogContainer}
            onClose={props.onClose}
            open={true}
            PaperProps={{ classes: { root: classes.paperDialog } }}
        >
            <DialogTitle>Checklist</DialogTitle>
            <Container className={classes.listItem}>
                <TextField
                    className={classes.textFieldLista}
                    variant="outlined"
                    disabled
                    label="Nome da máquina"
                    value={props.checklist.machineName || ' '}
                />
                <TextField
                    className={classes.textFieldLista}
                    variant="outlined"
                    disabled
                    type="date"
                    label="Data"
                    value={props.checklist.date?.toString().split('T')[0] || ' '}
                />
                <TextField
                    className={classes.textFieldLista}
                    variant="outlined"
                    disabled
                    label="Área"
                    value={props.checklist.field || ' '}
                />
                <TextField
                    className={classes.textFieldLista}
                    variant="outlined"
                    disabled
                    label="ID do Operador responsável"
                    value={props.checklist.userId || ' '}
                />
                <TextField
                    className={classes.textFieldLista}
                    variant="outlined"
                    disabled
                    label="Frequência (Turnos)"
                    value={props.checklist.frequency || ' '}
                />
                <TextField
                    className={classes.textFieldLista}
                    variant="outlined"
                    disabled
                    multiline
                    label="Feedback (Report)"
                    value={props.checklist.report || ' '}
                />
            </Container>
        </Dialog>
    );
};

export default DialogFiltroLimpezaInspecao;
