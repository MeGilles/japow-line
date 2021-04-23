import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';


const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiFilledInput-root": {
            background: theme.palette.secondary.light,
        }
    }
}));

type Props = {
    name: string,
    required: boolean,
    type: string,
    variant?: 'standard' | 'filled' | 'outlined',
    multiline?: boolean,
    endAdornment?: any,
    value: string,
    onChange: any,
    error?: boolean,
    helperText?: string,
    className?: string,
}

export default function InputTextField({ name, required, type, variant, multiline, endAdornment, value, onChange, error, helperText, className }: Props) {

    const classes = useStyles();

    return (
        endAdornment ?
            <TextField
                label={name}
                required={required}
                variant={variant}
                color="secondary"
                fullWidth
                multiline={multiline}
                rowsMax={10}
                InputProps={{
                    endAdornment: <InputAdornment position="start">{endAdornment}</InputAdornment>
                }}
                value={value}
                onChange={onChange}
                error={error}
                helperText={helperText}
                type={type}
                className={[className, classes.root].join("")}
            />
            :
            <TextField
                label={name}
                required={required}
                variant={variant}
                color="secondary"
                fullWidth
                multiline={multiline}
                rowsMax={10}
                value={value}
                onChange={onChange}
                error={error}
                helperText={helperText}
                type={type}
                className={[className, classes.root].join("")}
            />
    );
}

InputTextField.defaultProps = {
    name: "unnamed",
    required: false,
    type: "text",
    variant: "standard",
    multiline: false,
    startAdornment: "",
    value: "",
    onChange: () => { },
    error: false,
    helperText: "",
}