import React, { FC, useEffect, useContext } from "react";
import {
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import axios from "axios";
import stylesLimpezaInspecao from "../../styles/limpezaInspecao";
import { Equipamento } from "../../types";
import UserData from "../../contexts/UserData";

interface PropsEquipamentoSelector {
  grupo: string;
  equipamentosDoGrupo: Equipamento[] | undefined;
  setEquipamentosDoGrupo: React.Dispatch<
    React.SetStateAction<Equipamento[] | undefined>
  >;
  selectedEquipamentoId: string;
  setSelectedEquipamentoId: React.Dispatch<React.SetStateAction<string>>;
  setSelectedEquipamento: React.Dispatch<
    React.SetStateAction<Equipamento | undefined>
  >;
}
type AllProps = PropsEquipamentoSelector;

const EquipamentoSelector: FC<AllProps> = (props: AllProps) => {
  const classes = stylesLimpezaInspecao();
  const userData = useContext(UserData);

  useEffect(() => {
    axios
      .get(
        `/equip/indexbyequip?field=${userData.user?.field}&group=${props.grupo}`
      )
      .then((response) => {
        if (response.data) {
          response.data.map((equipamento: Equipamento) => {
            equipamento.procedures.map(
              (procedure) => (procedure.checked = false)
            );
          });
          props.setEquipamentosDoGrupo(response.data);
        }
      })
      .catch((e) => {
        console.error("Não foi possível listar os equipamentos", e);
      });
  }, [props.grupo, userData.user.field]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.setSelectedEquipamentoId(event.target.value as string);
    props.setSelectedEquipamento(
      props.equipamentosDoGrupo?.filter(
        (equi) => equi._id === (event.target.value as string)
      )[0]
    );
  };

  return (
    <FormControl className={classes.selector} variant="outlined">
      <Select
        value={props.selectedEquipamentoId}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Selecione
        </MenuItem>
        {props.equipamentosDoGrupo?.length !== 0?
         props.equipamentosDoGrupo?.map((equipamento, index) => (
              <MenuItem
                key={"equipamento-limp-insp-" + index}
                value={equipamento._id}
              >
                {equipamento.name +
                  " (" +
                  equipamento.period +
                  " " +
                  equipamento.frequency +
                  "x)"}
              </MenuItem>
            ))
          : props.grupo?
          <MenuItem
                key={"equipamento-concluído"}
                value=""
                disabled
              >
                Todos os checks previstos até o momento foram realizados
              </MenuItem>
              :
              ""
      }
      </Select>
      <FormHelperText>Selecione um Equipamento</FormHelperText>
    </FormControl>
  );
};

export default EquipamentoSelector;
