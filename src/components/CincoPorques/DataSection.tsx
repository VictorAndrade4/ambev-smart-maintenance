import React, { FC } from "react";
import { CincoPorquesInfo } from "../../types";
import DateFnsUtils from "@date-io/date-fns";
import { Container } from "@material-ui/core";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import stylesCincoPorques from "../../styles/cincoPorques";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
interface PropsDateSection {
  dados: CincoPorquesInfo;
  setDados: React.Dispatch<React.SetStateAction<CincoPorquesInfo>>;
}

type AllProps = PropsDateSection;

const DataSection: FC<AllProps> = (props: AllProps) => {
  const classes = stylesCincoPorques();
  /* function dataDefaultValue(): string {
    const date: Date = new Date();
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate();
    const year: number = date.getFullYear();

    return `${year}-${month}-${day}`;
  } */
  const handleDataChange = (event: MaterialUiPickersDate) => {
    props.setDados({
      ...props.dados,
      date: event ? new Date(event?.toString()) : new Date(),
    });
  };
  return (
    <Container className={classes.container}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDateTimePicker
          value={props.dados.date}
          format="dd-MM-yyyy HH:mm"
          label="Data"
          className={classes.item}
          helperText="Digite a data e hora da realização deste 5W"
          onChange={handleDataChange}
        />
      </MuiPickersUtilsProvider>
    </Container>
  );
};
export default DataSection;
