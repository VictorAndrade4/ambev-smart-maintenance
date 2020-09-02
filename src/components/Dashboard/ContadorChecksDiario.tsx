import React, { useEffect, useState, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Title from '../ui/Title';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import stylesContadorChecksDiarios from '../../styles/contadorChecksDiarios';
import ReplayIcon from '@material-ui/icons/Replay';
import UserData from '../../contexts/UserData';

interface State {
    quantidade: number;
    reload: boolean;
}

const ContadorChecksDiario = () => {
    const userData = useContext(UserData);
    const classes = stylesContadorChecksDiarios();
    const [state, setState] = useState<State>({ quantidade: 0, reload: false });

    const onClickReload = () => {
        setState({ ...state, reload: !state.reload });
    };

    useEffect(() => {
        axios.get(`/check/getAmountOfChecksToday?field=${userData.user.field}`).then((response) => {
            setState({ ...state, quantidade: response.data });
        });
    }, [state.reload]);

    return (
        <React.Fragment>
            <Title>Checks realizados hoje - {userData.user.field}</Title>
            <Typography component="p" variant="h4">
                {`${state.quantidade} checks`}
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                {`em ${new Date().toISOString().split('T')[0]}`}
            </Typography>
            <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<ReplayIcon />}
                onClick={onClickReload}
            >
                Recarregar
            </Button>
        </React.Fragment>
    );
};
export default ContadorChecksDiario;
