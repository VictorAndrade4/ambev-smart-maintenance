import React, { FC, useState, useEffect, useContext } from 'react';
import { Operarios, Check } from '../../types';
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
import UserData from '../../contexts/UserData';

interface PropsCheckDetalhes {
    operario: Operarios | Check | undefined;
    open: boolean;
    onClose: () => void;
    url: string;
}

type AllProps = PropsCheckDetalhes;

const OperarioDetalhesDialog: FC<AllProps> = (props: AllProps) => {
    const classes = stylesTabelaChecks();
    const userData = useContext(UserData);
    const [newOperario, setNewOperario] = useState((props.operario as Operarios) || ({} as Operarios));

    const handleSaveButton = async () => {
        const data: any = {
            userId: newOperario.userId,
            fields: [newOperario.field],
            admin: newOperario.admin,
            name: newOperario.name,
            password: newOperario.password,
        };

        const response: any = await axios.post<Operarios[]>(props.url, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            props.onClose();
        }
    };

    useEffect(() => {
        if (props.operario) {
            setNewOperario({ ...props.operario as Operarios })
        } else {
            setNewOperario({
                admin: false,
                name: '',
                field: userData.user.field as string,
                userId: '',
                password: '',
            } as Operarios);
        }
    }, [props.operario]);

    return (
        <Dialog maxWidth="lg" className={classes.dialogContainer} onClose={props.onClose} open={props.open}>
            <DialogTitle>Editar Operário</DialogTitle>
            <Container maxWidth="lg">
                <TextField
                    className={classes.dialogField}
                    required
                    variant="outlined"
                    label="Nome do operário"
                    value={newOperario?.name || ''}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setNewOperario({ ...newOperario, name: event.currentTarget.value });
                    }}
                />
                <TextField
                    className={classes.dialogField}
                    required
                    variant="outlined"
                    label="ID do operário"
                    value={newOperario?.userId || ''}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setNewOperario({ ...newOperario, userId: event.currentTarget.value });
                    }}
                />
                <TextField
                    className={classes.dialogField}
                    required
                    variant="outlined"
                    label="Senha"
                    type="number"
                    value={newOperario?.password || ''}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setNewOperario({ ...newOperario, password: event.currentTarget.value });
                    }}
                />
                <FormControl className={classes.dialogField} component="fieldset">
                    <FormLabel component="legend">Admin?</FormLabel>
                    <RadioGroup
                        value={newOperario?.admin}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {

                            setNewOperario({
                                ...newOperario,
                                admin: event.target.value === "true",

                            });
                        }}
                    >
                        <FormControlLabel label="Sim" control={<Radio />} value={true} />
                        <FormControlLabel label="Não" control={<Radio />} value={false} />
                    </RadioGroup>
                </FormControl>
                <Divider />
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

export default OperarioDetalhesDialog;
