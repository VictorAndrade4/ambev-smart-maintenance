import React, { FC, useState, useEffect } from 'react';
import { Procedimento } from '../../types';
import {
    Container,
    List,
    IconButton,
    TextField,
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Typography,
} from '@material-ui/core';
import stylesTabelaChecks from '../../styles/tabelaChecks';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Title from '../ui/Title';
import clsx from 'clsx';

interface PropsListaProcedimentos {
    procedures: Procedimento[];
    handleChangeProcedures: (value: Procedimento[]) => void;
}

type AllProps = PropsListaProcedimentos;

const getInitialProcedure = (): Procedimento => {
    return {
        condition: 'PARADA',
        description: '',
        item: '',
        location: '',
        method: '',
        point: 0,
    } as Procedimento;
};

const ListaProcedimentos: FC<AllProps> = (props: AllProps) => {
    const classes = stylesTabelaChecks();

    const [procedureAdded, setProcedureAdded] = useState<Procedimento>(getInitialProcedure());

    useEffect(() => {
        setProcedureAdded(getInitialProcedure()); // reset procedure
    }, [props.procedures]);

    return (
        <List>
            {props.procedures?.map((value, index) => (
                <Container
                    className={clsx(classes.listItem, index % 2 === 0 && classes.listItemColored)}
                    key={`item-lista-procedimento-${index}`}
                >
                    <Title>{`Procedimento ${index + 1}`}</Title>
                    <TextField
                        className={classes.textFieldLista}
                        variant="outlined"
                        label="Descrição"
                        multiline
                        value={value.description || ' '}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                            const newProcedures = [...props.procedures];
                            newProcedures[index] = {
                                ...newProcedures[index],
                                description: event.currentTarget.value,
                            };
                            props.handleChangeProcedures(newProcedures);
                        }}
                    />
                    <TextField
                        className={classes.textFieldLista}
                        variant="outlined"
                        label="Método"
                        multiline
                        value={value.method || ' '}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                            const newProcedures = [...props.procedures];
                            newProcedures[index] = {
                                ...newProcedures[index],
                                method: event.currentTarget.value,
                            };
                            props.handleChangeProcedures(newProcedures);
                        }}
                    />
                    <TextField
                        className={classes.textFieldLista}
                        variant="outlined"
                        label="Localização da máquina"
                        value={value.location}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                            const newProcedures = [...props.procedures];
                            newProcedures[index] = {
                                ...newProcedures[index],
                                location: event.currentTarget.value,
                            };
                            props.handleChangeProcedures(newProcedures);
                        }}
                    />
                    <TextField
                        className={classes.textFieldSecondary}
                        variant="outlined"
                        label="Pontos"
                        type="number"
                        value={value.point}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                            const newProcedures = [...props.procedures];
                            newProcedures[index] = {
                                ...newProcedures[index],
                                point: +event.currentTarget.value,
                            };
                            props.handleChangeProcedures(newProcedures);
                        }}
                    />
                    <TextField
                        className={classes.textFieldSecondary}
                        variant="outlined"
                        label="Item"
                        value={value.item || ' '}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                            const newProcedures = [...props.procedures];
                            newProcedures[index] = {
                                ...newProcedures[index],
                                item: event.currentTarget.value,
                            };
                            props.handleChangeProcedures(newProcedures);
                        }}
                    />
                    <FormControl className={classes.textFieldSecondary} component="fieldset">
                        <FormLabel component="legend">Condição da Máquina:</FormLabel>
                        <RadioGroup
                            value={value.condition}
                            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                const newProcedures = [...props.procedures];
                                newProcedures[index] = {
                                    ...newProcedures[index],
                                    condition: event.currentTarget.value as 'PARADA' | 'RODANDO',
                                };
                                props.handleChangeProcedures(newProcedures);
                            }}
                        >
                            <FormControlLabel label="Parada" control={<Radio />} value="PARADA" />
                            <FormControlLabel label="Rodando" control={<Radio />} value="RODANDO" />
                        </RadioGroup>
                    </FormControl>
                    <IconButton
                        onClick={() => {
                            const newProcedures = [...props.procedures];
                            newProcedures.splice(index, 1);
                            props.handleChangeProcedures(newProcedures);
                        }}
                        edge="start"
                        aria-label="comments"
                    >
                        <Typography>Deletar</Typography>
                        <DeleteForeverIcon />
                    </IconButton>
                </Container>
            ))}

            {/** Sessão de add novo procedimento*/}
            <Container className={classes.listItem}>
                <Title>Adicionar Novo Procedimento</Title>
                <TextField
                    className={classes.textFieldLista}
                    variant="outlined"
                    label="Descrição"
                    multiline
                    value={procedureAdded.description || ' '}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setProcedureAdded({
                            ...procedureAdded,
                            description: event.currentTarget.value,
                        });
                    }}
                />
                <TextField
                    className={classes.textFieldLista}
                    variant="outlined"
                    label="Método"
                    multiline
                    value={procedureAdded.method || ' '}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setProcedureAdded({
                            ...procedureAdded,
                            method: event.currentTarget.value,
                        });
                    }}
                />
                <TextField
                    className={classes.textFieldLista}
                    variant="outlined"
                    label="Localização da máquina"
                    value={procedureAdded.location || ' '}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setProcedureAdded({
                            ...procedureAdded,
                            location: event.currentTarget.value,
                        });
                    }}
                />
                <TextField
                    className={classes.textFieldSecondary}
                    variant="outlined"
                    label="Pontos"
                    type="number"
                    value={procedureAdded.point || 0}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setProcedureAdded({
                            ...procedureAdded,
                            point: +event.currentTarget.value,
                        });
                    }}
                />
                <TextField
                    className={classes.textFieldSecondary}
                    variant="outlined"
                    label="Item"
                    value={procedureAdded.item || ' '}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setProcedureAdded({
                            ...procedureAdded,
                            item: event.currentTarget.value,
                        });
                    }}
                />
                <FormControl className={classes.textFieldSecondary} component="fieldset">
                    <FormLabel component="legend">Condição da Máquina:</FormLabel>
                    <RadioGroup
                        value={procedureAdded.condition}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                            setProcedureAdded({
                                ...procedureAdded,
                                condition: event.currentTarget.value as 'PARADA' | 'RODANDO',
                            });
                        }}
                    >
                        <FormControlLabel label="Parada" control={<Radio />} value="PARADA" />
                        <FormControlLabel label="Rodando" control={<Radio />} value="RODANDO" />
                    </RadioGroup>
                </FormControl>
                <IconButton
                    onClick={() => {
                        const newProcedures = [...props.procedures];
                        newProcedures.push(procedureAdded);
                        props.handleChangeProcedures(newProcedures);
                    }}
                    edge="start"
                    aria-label="comments"
                >
                    <Typography>Adicionar</Typography>
                    <AddCircleIcon />
                </IconButton>
            </Container>
        </List>
    );
};

export default ListaProcedimentos;
