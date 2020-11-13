import "date-fns";
import React from "react";
import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  Container,
  Grid,
  Card,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import stylesGraphsByMachine from "../../styles/graphsByMachine";
import UserData from "../../contexts/UserData";
import Title from "../ui/Title";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MakeEquipamentList from "../GraphsByMachine/MakeEquipamentList";
import MachinePieGraphic from "../GraphsByMachine/MachinePieGraphic";

const GraphsByMachine = () => {
  const classes = stylesGraphsByMachine();
  const userData = React.useContext(UserData);
  const [allChecks, setAllChecks] = React.useState<any | null>([]);
  const [equipamento, setEquipamento] = React.useState<string | unknown>("");
  const [
    selectedInicialDate,
    setSelectedInicialDate,
  ] = React.useState<Date | null>(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState<Date | null>(
    new Date()
  );

  const handleChangeInicialDate = (date: Date | null) => {
    setSelectedInicialDate(date);
    setAllChecks([]);
  };

  const handleChangeEndDate = (date: Date | null) => {
    setSelectedEndDate(date);
    setAllChecks([]);
  };

  const handleClick = () => {
    let inicial = selectedInicialDate?.toISOString().split("T")[0];
    let final = selectedEndDate?.toISOString().split("T")[0];
    axios
      .get(
        `/check/getCheckByDate?begin=${inicial}&end=${final}&field=${userData.user?.field}`
      )
      .then((response) => {
        if (response.data) setAllChecks(response.data);
      });
  };

  const handleSelectEquip = (equip: string | unknown) => {
    if (equip) {
      setEquipamento(equip);
    }
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Title>Checks por equipamentos - Área : {userData.user.field}</Title>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
        className={classes.title}
      >
        Filtros
      </Typography>
      <Card className={classes.card}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <KeyboardDatePicker
              inputVariant="outlined"
              autoOk={true}
              animateYearScrolling={false}
              margin="normal"
              id="initial-date-dialog"
              label="Data inicial"
              format="dd/MM/yyyy"
              disableFuture={true}
              value={selectedInicialDate}
              onChange={(date) => handleChangeInicialDate(date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardDatePicker
              inputVariant="outlined"
              autoOk={true}
              animateYearScrolling={false}
              margin="normal"
              id="end-date-dialog"
              label="Data Final"
              format="dd/MM/yyyy"
              disableFuture={true}
              value={selectedEndDate}
              onChange={(date) => handleChangeEndDate(date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <Button
              variant="contained"
              onClick={handleClick}
              style={{ padding: "0.8rem" }}
              color="primary"
            >
              Pesquisar
            </Button>
          </Grid>
        </MuiPickersUtilsProvider>
        {allChecks.length < 1 ? (
          ""
        ) : (
          <>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-equips">Equipamentos</InputLabel>
                <Select
                  defaultValue="Selecione"
                  value={equipamento}
                  label="Equipamentos"
                  onChange={(equip) => handleSelectEquip(equip.target.value)}
                  inputProps={{
                    id: "outlined-equips",
                  }}
                >
                  <MenuItem aria-label="None" value="Selecione" />
                  {Object.keys(allChecks).map((key, index) => {
                    return (
                      <MenuItem key={index} value={key}>
                        {key}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </>
        )}
      </Card>
      {(equipamento !== "" && allChecks) ? (
        <>
        {/* <MachinePieGraphic initialDate={String(selectedInicialDate?.toLocaleDateString('pt-BR'))} endDate={String(selectedEndDate?.toLocaleDateString('pt-BR'))} data={allChecks[String(equipamento)]} /> */}
        <MakeEquipamentList dados={allChecks[String(equipamento)]} />
        </>
      ) : (
        ""
      )}
    </Container>
  );
};

export default GraphsByMachine;
