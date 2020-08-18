import React, { FC, useState } from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import { isNullOrUndefined } from 'util';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import styleImportCsv from '../../styles/ui/importCsv';

interface State {
    alertIsOn: boolean;
    error: boolean;
    file: FormData | undefined;
}

interface PropsImportCsv {
    url: string;
    reloadCallback?: (value: boolean) => void;
}
type AllProps = PropsImportCsv;

const ImportCsv: FC<AllProps> = (props: AllProps) => {
    const classes = styleImportCsv();
    const [state, setState] = useState<State>({ alertIsOn: false, error: false, file: undefined });

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isNullOrUndefined(event.target.files)) {
            const formData = new FormData();
            formData.append('csv', event.target.files[0]);
            setState({ ...state, file: formData });
        }
    };

    const onSubmit = () => {
        if (!isNullOrUndefined(state.file)) {
            axios
                .post(props.url, state.file, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then(() => {
                    setState({ ...state, alertIsOn: true, error: false });
                    if (!isNullOrUndefined(props.reloadCallback)) props.reloadCallback(true);
                })
                .catch((e) => {
                    setState({ ...state, alertIsOn: true, error: true });
                    console.error(e);
                });
        }
    };

    return (
        <Container className={classes.container}>
            <Typography>Importar arquivo .csv</Typography>
            <input onChange={onChange} accept=".csv" id="raised-button-file" type="file" />
            <Button className={classes.button} variant="contained" color="primary" onClick={onSubmit}>
                Upload
            </Button>
            <Alert
                onClose={() => {
                    setState({ ...state, alertIsOn: false });
                }}
                className={state.alertIsOn ? undefined : classes.hide}
                variant="filled"
                severity={state.error ? 'error' : 'success'}
            >
                {state.error
                    ? 'Falha no upload do arquivo! Poderia tentar novamente?'
                    : 'Upload de arquivo concluído com sucesso!'}
            </Alert>
        </Container>
    );
};

export default ImportCsv;
