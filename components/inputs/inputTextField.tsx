import React from 'react';
import TextField from '@material-ui/core/TextField';


type Props = {
    name: string,
    required: boolean,
    type: string,
    value: string,
    onChange: any,
}

export default function InputTextField({ name, required, type, value, onChange }: Props) {

    return (
        <TextField label={name} required={required} variant="outlined" color="secondary" value={value} onChange={onChange} type={type} />
    );
}

InputTextField.defaultProps = {
    name: "unnamed",
    required: false,
    type: "text",
    value: "",
    onChange: () => { }
}