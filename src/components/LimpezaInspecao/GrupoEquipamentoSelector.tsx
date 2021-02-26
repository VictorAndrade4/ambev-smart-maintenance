import React, { FC, useEffect, useContext } from 'react';
import { Select, FormControl, MenuItem, FormHelperText } from '@material-ui/core';
import axios from 'axios';
import { GrupoEquipamento } from '../../types';
import stylesLimpezaInspecao from '../../styles/limpezaInspecao';
import UserData from '../../contexts/UserData';

interface PropsEquipamentoSelector {
    grupos: GrupoEquipamento[] | undefined;
    setGrupos: React.Dispatch<React.SetStateAction<GrupoEquipamento[] | undefined>>;
    setSelectedGrupo: React.Dispatch<React.SetStateAction<string>>;
    setSelectedEquipamentoId: React.Dispatch<React.SetStateAction<string>>;
    selectedGrupo: string;
}

type AllProps = PropsEquipamentoSelector;

const GrupoEquipamentoSelector: FC<AllProps> = (props: AllProps) => {
    const classes = stylesLimpezaInspecao();
    const userData = useContext(UserData);

    useEffect(() => {
        axios
            .get(`/equip/index?field=${userData.user.field}`)
            .then((response) => {
                props.setGrupos(response.data);
            })
            .catch((e) => {
                console.error('Não foi possível listar os equipamentos', e);
            });
        return function () {
            props.setSelectedEquipamentoId(''); // callback para zerar equipamento selecionado
        };
    }, [props.selectedGrupo]);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        props.setSelectedGrupo(event.target.value as string);
    };

    return (
        <FormControl className={classes.selector} variant="outlined">
            <Select value={props.selectedGrupo} onChange={handleChange} displayEmpty>
                <MenuItem value="" disabled>
                    Selecione
                </MenuItem>
                {props.grupos?.map((data, index) => (
                    <MenuItem key={'grupoequipamento-limp-insp-' + index} value={data.title}>
                        {data.title}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>Selecione um Grupo</FormHelperText>
        </FormControl>
    );
};

export default GrupoEquipamentoSelector;
