import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

import theme from "../../styles/materialTheme";

type Props = {
    name: string,
    required: boolean,
    type: string,
    value: string,
    onChange: any, 
}

export default function InputTextField({name, required, type, value, onChange}: Props) {

    return (
        <ThemeProvider theme={theme}>
            <TextField label={name} required={required} variant="outlined" color="secondary" value={value} onChange={onChange} type={type}/>
        </ThemeProvider>
    );
}

InputTextField.defaultProps = {
    name: "unnamed",
    required: false,
    type: "text",
    value: "",
    onChange: () => {}
}