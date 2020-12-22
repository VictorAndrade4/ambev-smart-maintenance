import React, { FC, useEffect, useContext, useState } from 'react';
import { CincoPorquesInfo, GrupoEquipamento } from '../../types';
import { Container, TextField, FormControl, Select, MenuItem, FormHelperText } from '@material-ui/core';
import stylesCincoPorques from '../../styles/cincoPorques';
import axios from 'axios';
import UserData from '../../contexts/UserData';

interface PropsEquipamentoSection {
    dados: CincoPorquesInfo;
    setDados: React.Dispatch<React.SetStateAction<CincoPorquesInfo>>;
}

type AllProps = PropsEquipamentoSection;

const EquipamentoSection: FC<AllProps> = (props: AllProps) => {
    const classes = stylesCincoPorques();
    const userData = useContext(UserData);
    const [equipamentos, setEquipamentos] = useState<string[]>([]);

    const handleTagChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        props.setDados({ ...props.dados, tag: event.currentTarget.value });
    };

    const handleEquipChange = (
        event: React.ChangeEvent<{
            name?: string | undefined;
            value: unknown;
        }>
    ) => {
        props.setDados({ ...props.dados, equip: event.target.value as string });
    };

    const handleShiftChange = (
        event: React.ChangeEvent<{
            name?: string | undefined;
            value: unknown;
        }>
    ) => {
        props.setDados({ ...props.dados, shift: event.target.value as string });
    };

    useEffect(() => {
        axios
            .get(`/equip/index?field=${userData.user.field}`)
            .then((response) => {
                setEquipamentos([...response.data.map((e: GrupoEquipamento) => e.title)]);
            })
            .catch((e) => {
                console.error('Não foi possível listar os equipamentos', e);
            });
    }, []);

    return (
        <Container className={classes.container}>
            <TextField
                value={props.dados.tag}
                className={classes.item}
                variant="outlined"
                placeholder="123456"
                helperText= {userData.user.field === "Almoxarifado" ? "Pedido / Material" : "Tag" } 
                onChange={handleTagChange}
            />
            <FormControl className={classes.item} variant="outlined">
                <Select onChange={handleShiftChange} value={props.dados.shift} displayEmpty>
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem>
                </Select>
                <FormHelperText>Turno</FormHelperText>
            </FormControl>
            <FormControl className={classes.item} variant="outlined">
                <Select onChange={handleEquipChange} value={props.dados.equip} displayEmpty>
                    <MenuItem value="" disabled>
                        Nenhum
                    </MenuItem>
                    {equipamentos.map((equip) => (
                        <MenuItem key={`equipamento-5w-${equip}`} value={equip}>
                            {equip}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText> Equipamento</FormHelperText>
            </FormControl>
        </Container>
    );
};

export default EquipamentoSection;
