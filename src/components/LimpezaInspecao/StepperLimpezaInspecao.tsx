import React, { FC } from 'react';
import {
    Container,
    Typography,
    StepLabel,
    Step,
    Button,
    Stepper,
    Paper,
    AccordionSummary,
    Accordion,
    AccordionDetails,
    Checkbox,
    Divider,
    List,
    ListItem,
    ListItemText,
    TextField,
} from '@material-ui/core';
import { Equipamento, Procedimento } from '../../types';
import stylesLimpezaInspecao from '../../styles/limpezaInspecao';
import { isNullOrUndefined } from 'util';
import clsx from 'clsx';
import Title from '../ui/Title';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useHistory } from 'react-router-dom';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// Cada passo terá 5 procedimentos
const numberOfProceduresPerStep = 5;
const getSteps = (procedures: Procedimento[]) => {
    if (isNullOrUndefined(procedures)) return [];
    let numberOfSteps = procedures.length / numberOfProceduresPerStep;
    numberOfSteps = numberOfSteps < 1 ? 1 : Math.ceil(numberOfSteps);

    const steps: string[] = [];
    for (let index = 0; index <= numberOfSteps; index++) {
        if (index === numberOfSteps) {
            steps.push('Revisão');
        } else {
            steps.push(`Passo ${index + 1}`);
        }
    }
    return steps;
};

// Secondary Component
interface PropsStepperSummary {
    equipamento: Equipamento;
}
type AllSummaryProps = PropsStepperSummary;
const StepperSummary: FC<AllSummaryProps> = (props: AllSummaryProps) => {
    const classes = stylesLimpezaInspecao();
    return (
        <Container>
            <Title>Resumo da Inspeção</Title>
            <List>
                {props.equipamento?.procedures?.map((procedure) => (
                    <ListItem
                        className={clsx(classes.listItem, !procedure.checked && classes.uncheckedListItem)}
                        key={`procedures-review-${procedure._id}`}
                    >
                        <ListItemText primary={procedure.description} secondary={procedure.method} />
                        <Typography variant="body2">{procedure.point}</Typography>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

// Primary Component
interface PropsStepperLimpezaInspecao {
    selectedEquipamento: Equipamento | undefined;
    setSelectedEquipamento: React.Dispatch<React.SetStateAction<Equipamento | undefined>>;
    className: string;
    sendReportToServer: () => void;
    handleReportComments: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    reportComments: string;
}
type AllProps = PropsStepperLimpezaInspecao;

const StepperLimpezaInspecao: FC<AllProps> = (props: AllProps) => {
    const classes = stylesLimpezaInspecao();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps(props.selectedEquipamento?.procedures as []);
    const history = useHistory();

    const handleNext = () => {
        if (activeStep >= steps.length - 1) {
            // enviar dados pro servidor
            props.sendReportToServer();
            setTimeout(() => {
                history.push('/');
            }, 1500);
            setActiveStep(0);
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // inner component
    const ProceduresContent = (
        step: number,
        procedures: Procedimento[],
        setSelectedEquipamento: React.Dispatch<React.SetStateAction<Equipamento | undefined>>,
        selectedEquipamento: Equipamento
    ) => {
        const from = numberOfProceduresPerStep * step;
        const to = from + numberOfProceduresPerStep;
        const slicedProcedures = procedures.slice(from, to);
        return (
            <React.Fragment>
                {slicedProcedures?.map((procedure) => (
                    <Container className={classes.accordion} key={`procedimento-${procedure._id}`}>
                        <Accordion className={procedure.checked ? classes.markedAccordion : undefined}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Title>{`Item ${procedure.item} -  ${procedure.description}`}</Title>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Container>
                                    <Typography>{`Método: ${procedure.method}`}</Typography>
                                    <Divider className={classes.procedureDivider} />
                                    <Typography className={classes.procedureAttribute}>
                                        {`- Condições da Máquina: ${procedure.condition}`}
                                    </Typography>
                                    <Typography className={classes.procedureAttribute}>
                                        {`- Pontos: ${procedure.point}`}
                                    </Typography>
                                    <Typography className={classes.procedureAttribute}>
                                        {`- Local: ${procedure.location}`}
                                    </Typography>
                                </Container>
                                <Checkbox
                                    className={classes.checkbox}
                                    checked={procedure.checked}
                                    icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
                                    color="primary"
                                    onChange={() => {
                                        const novoEquipamento = selectedEquipamento;
                                        selectedEquipamento.procedures.map((p) => {
                                            if (p._id === procedure._id) p.checked = !p.checked;
                                        });
                                        setSelectedEquipamento({ ...novoEquipamento });
                                    }}
                                />
                            </AccordionDetails>
                        </Accordion>
                    </Container>
                ))}
            </React.Fragment>
        );
    };

    return (
        <Paper className={props.className}>
            <div className={classes.stepperRoot}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps?.map((label, index) => (
                        <Step key={`step-limpeza-inspecao-${index}`}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {steps.map((step, stepIndex) => (
                    <div
                        key={`proceduresContent=${step}`}
                        className={clsx(classes.container, activeStep !== stepIndex && classes.hide)}
                    >
                        {ProceduresContent(
                            stepIndex,
                            props.selectedEquipamento?.procedures as [],
                            props.setSelectedEquipamento,
                            props.selectedEquipamento as Equipamento
                        )}
                    </div>
                ))}
                <Container>
                    <Title>Feedback da inspeção</Title>
                    <TextField
                        className={classes.reportComments}
                        placeholder="Houve algum problema durante a inspeção/limpeza? Conte-nos"
                        variant="outlined"
                        multiline
                        rows={6}
                        value={props.reportComments}
                        onChange={props.handleReportComments}
                    />
                </Container>
                {props?.selectedEquipamento?.link && (
                    <Button
                        onClick={() => {
                            window.open(props.selectedEquipamento?.link);
                        }}
                        className={classes.procedimentoButton}
                        variant="contained"
                        color="primary"
                    >
                        Acessar Procedimento
                    </Button>
                )}
                <div>
                    {activeStep === steps?.length - 1 ? (
                        <Container>
                            <StepperSummary equipamento={props.selectedEquipamento as Equipamento} />
                            <div className={classes.stepperButtonDiv}>
                                <Button
                                    variant="contained"
                                    onClick={handleBack}
                                    className={clsx(undefined, activeStep === 0 && classes.hide)}
                                >
                                    Voltar
                                </Button>
                                <Button
                                    className={classes.stepperNextButton}
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                >
                                    Enviar
                                </Button>
                            </div>
                        </Container>
                    ) : (
                        <div className={classes.stepperButtonDiv}>
                            <Button
                                variant="contained"
                                onClick={handleBack}
                                className={clsx(undefined, activeStep === 0 && classes.hide)}
                            >
                                Voltar
                            </Button>
                            <Button
                                className={classes.stepperNextButton}
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                            >
                                Próximo
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Paper>
    );
};

export default StepperLimpezaInspecao;
