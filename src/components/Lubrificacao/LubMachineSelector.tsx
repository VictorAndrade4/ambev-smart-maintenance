import React, { FC, useEffect, useContext } from 'react';
import { Select, FormControl, MenuItem, FormHelperText } from '@material-ui/core';
import axios from 'axios';
import stylesLimpezaInspecao from '../../styles/limpezaInspecao';
import { LubMachine } from '../../types';
import UserData from '../../contexts/UserData';

interface PropsLubMachineSelector {
    grupo: string;
    lubMachinesDoGrupo: LubMachine[] | undefined;
    setLubMachinesDoGrupo: React.Dispatch<React.SetStateAction<LubMachine[] | undefined>>;
    selectedLubMachineId: string;
    setSelectedLubMachineId: React.Dispatch<React.SetStateAction<string>>;
    setSelectedLubMachine: React.Dispatch<React.SetStateAction<LubMachine | undefined>>;
}
type AllProps = PropsLubMachineSelector;

const LubMachineSelector: FC<AllProps> = (props: AllProps) => {
    const classes = stylesLimpezaInspecao();
    const userData = useContext(UserData);

    useEffect(() => {
        axios
            .get(`/lubEquip/indexbyequip?field=${userData.user?.field}&group=${props.grupo}`)
            .then((response) => {
                response.data.map((lubMachine: LubMachine) => {
                    lubMachine.procedures.map((procedure) => (procedure.checked = false));
                });
                props.setLubMachinesDoGrupo(response.data);
            })
            .catch((e) => {
                console.error('Não foi possível listar os checks de lubrificação', e);
            });
    }, [props.grupo, userData.user.field]);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        props.setSelectedLubMachineId(event.target.value as string);
        props.setSelectedLubMachine(
            props.lubMachinesDoGrupo?.filter((equi) => equi._id === (event.target.value as string))[0]
        );
    };  

    return (
        <FormControl className={classes.selector} variant="outlined">
            <Select value={props.selectedLubMachineId} onChange={handleChange} displayEmpty>
                <MenuItem value="" disabled>
                    Nenhum
                </MenuItem>
                {props.lubMachinesDoGrupo?.map((lubMachine, index) => {
                    return(
                    <MenuItem key={'lubMachine-' + index} value={lubMachine._id}>
                        {lubMachine.name + ' (' + lubMachine.period + ' ' + lubMachine.frequency + 'x)'}
                    </MenuItem>)
                })}
            </Select>
            <FormHelperText>Selecione um Equipamento para Lubrificação</FormHelperText>
        </FormControl>
    );
};

export default LubMachineSelector;
