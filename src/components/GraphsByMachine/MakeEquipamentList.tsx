import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardHeader,
  CardContent,
  Divider,
  List,
  ListItem,
} from "@material-ui/core";
import stylesMakeEquipament from "../../styles/makeEquipamentList";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const MakeEquipamentList = (props: any) => {
  const classes = stylesMakeEquipament();
  const [state, setState] = React.useState<any | null>([]);
  React.useEffect(() => {
    if (props) setState(props.dados);
  }, [props]);
  
  const handleComplete = (value: any) =>{
    let conclued = 0;
    value.procedures.forEach((procedure: any) => {
      if(procedure.checked){
        conclued++;
      }
    });
      return (conclued/value.procedures.length*100);
  }  

  return (
    <>
      {(state!==undefined)&& state!== '' && state?.map((value: any, index: any) => (
        <Card key={`${index}`} className={classes.AcordionNode} elevation={6} >
          <Accordion TransitionProps={{ unmountOnExit: true }} >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
            >
              <CardHeader className={classes.content}
                disableTypography={true}
                title={<div className={classes.content}>
                <p className={classes.line}><span className={classes.destaque}>Período: </span><span className={classes.margin}>{value.period}</span>
                <span className={classes.destaque}>Data: </span><span className={classes.margin}> {new Date(value.date).toLocaleDateString()}</span></p>
                <p className={classes.line}><span className={classes.destaque}>Operador: </span><span className={classes.margin}>{value.userId}</span>
                <span className={classes.destaque}>Execução: </span><span className={classes.margin}>{handleComplete(value).toFixed(2)} %</span></p></div>}
              />  
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <CardContent>
                <List key={`${index * 10}`}>
                  <ListItem key={value.userId + index}>
                  
                  </ListItem>
                  <ListItem key={value.report + index}>
                  <p className={classes.destaque}>Feedback - </p> {value.report}
                  </ListItem>
                </List>

                {value.procedures.map((value: any, index: any) => (
                  <List key={`${index}`}>
                    <ListItem key={value.item + index}>
                     <p className={classes.destaque}>Item {value.item}</p> - <p>{value.description}</p>
                     {value.checked ? (                        
                        <p><CheckIcon htmlColor="green" fontSize="small" /></p>
                      ) : (
                        <p><CloseIcon htmlColor="red" fontSize="small" /></p>
                      )}
                    </ListItem>
                  </List>
                ))}
              </CardContent>
            </AccordionDetails>
          </Accordion>
        </Card>
      ))}
    </>
  );
};
export default MakeEquipamentList;
