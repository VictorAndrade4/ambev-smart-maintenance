import React, { FC, useState, useEffect, useContext } from 'react';
import { Equipamento, Procedimento, Check } from '../../types';
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    TextField,
    Container,
    FormControl,
    RadioGroup,
    Radio,
    FormControlLabel,
    FormLabel,
    Divider,
} from '@material-ui/core';
import axios from 'axios';
import stylesTabelaChecks from '../../styles/tabelaChecks';
import { isNullOrUndefined } from 'util';
import ListaProcedimentos from './ListaProcedimentos';
import UserData from '../../contexts/UserData';

interface PropsCheckDetalhes {
    equip: Equipamento | Check | undefined;
    open: boolean;
    onClose: () => void;
    url: string;
}

type AllProps = PropsCheckDetalhes;

const CheckDetalhesDialog: FC<AllProps> = (props: AllProps) => {
    const classes = stylesTabelaChecks();
    const userData = useContext(UserData);
    const [newCheck, setNewCheck] = useState<Check>((props.equip as Check) || ({} as Check));

    const handleSaveButton = () => {
        console.log(props.equip);
        console.log(newCheck);
        axios
            .post(props.url, newCheck)
            .then(() => {
                props.onClose();
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const handleChangeProcedures = (value: Procedimento[]) => {
        setNewCheck({ ...newCheck, procedures: value });
    };

    useEffect(() => {
        if (!isNullOrUndefined(props.equip)) {
            isNullOrUndefined(props.equip.period)
                ? setNewCheck({ ...(props.equip as Check), period: 'diário' })
                : setNewCheck(props.equip as Check);
        } else {
            setNewCheck({
                date: '',
                field: userData.user.field as string,
                frequency: 0,
                period: 'diário',
                name: '',
                procedures: [],
                typeEquip: '',
                userId: '',
                link: '',
            } as Check);
        }
    }, [props.equip, userData.user.field]);

    return (
        <Dialog maxWidth="lg" className={classes.dialogContainer} onClose={props.onClose} open={props.open}>
            <DialogTitle>Editar Check</DialogTitle>
            <Container maxWidth="lg">
                <TextField
                    className={classes.dialogField}
                    required
                    variant="outlined"
                    label="Tipo/grupo do equipamento"
                    value={newCheck?.typeEquip || ' '}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setNewCheck({ ...newCheck, typeEquip: event.currentTarget.value });
                    }}
                />
                <TextField
                    className={classes.dialogField}
                    required
                    variant="outlined"
                    label="Nome do equipamento"
                    value={newCheck?.name || ' '}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setNewCheck({ ...newCheck, name: event.currentTarget.value });
                    }}
                />
                <TextField
                    className={classes.dialogField}
                    variant="outlined"
                    label="Área"
                    disabled
                    value={newCheck?.field || ' '}
                />
                <TextField
                    className={classes.dialogField}
                    required
                    variant="outlined"
                    label="Frequência"
                    type="number"
                    value={newCheck?.frequency || 0}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setNewCheck({ ...newCheck, frequency: +event.currentTarget.value });
                    }}
                />
                <TextField
                    label="Data Inicial"
                    type="date"
                    required
                    value={newCheck?.date?.split('T')[0]}
                    variant="outlined"
                    className={classes.dialogField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setNewCheck({
                            ...newCheck,
                            date: event.currentTarget.value,
                        });
                    }}
                />
                <FormControl className={classes.dialogField} component="fieldset">
                    <FormLabel component="legend">Período:</FormLabel>
                    <RadioGroup
                        value={newCheck?.period}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                            setNewCheck({
                                ...newCheck,
                                period: event.currentTarget.value,
                            });
                        }}
                    >
                        <FormControlLabel label="Diário" control={<Radio />} value="diário" />
                        <FormControlLabel label="Semanal" control={<Radio />} value="semanal" />
                        <FormControlLabel label="Quinzenal" control={<Radio />} value="quinzenal" />
                        <FormControlLabel label="Mensal" control={<Radio />} value="mensal" />
                    </RadioGroup>
                </FormControl>
                <TextField
                    label="Link para sharepoint"
                    value={newCheck?.link || ' '}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setNewCheck({
                            ...newCheck,
                            link: event.currentTarget.value.trim(),
                        });
                    }}
                />
                <Divider />
                <ListaProcedimentos procedures={newCheck.procedures} handleChangeProcedures={handleChangeProcedures} />
            </Container>
            <DialogActions>
                <Button
                    className={classes.cancelButton}
                    variant="outlined"
                    onClick={() => {
                        props.onClose();
                    }}
                >
                    Cancelar
                </Button>
                <Button onClick={handleSaveButton} variant="outlined" color="primary">
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CheckDetalhesDialog;
