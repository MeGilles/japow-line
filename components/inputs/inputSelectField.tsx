import { useState } from 'react';

import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            width: '100%',
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
            fontSize: '1rem',
        },
    }),
);


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
    getContentAnchorEl: () => null,
};

type Props = {
    name: string,
    list: string[],
    selection: string[],
    multiple?: boolean,
    value: string[],
    onChange?: any,
}

export default function InputSelectField({ name, list, selection, multiple, value, onChange }: Props) {

    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <InputLabel
                variant='standard'
                color='secondary'
            >
                {name}
            </InputLabel>
            <Select
                multiple={multiple}
                value={value}
                onChange={onChange}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {(selected as string[]).map((value) => (
                            <Chip key={value} label={value} className={classes.chip} />
                        ))}
                    </div>
                )}
                MenuProps={MenuProps}
                color='secondary'
            >
                {list.map((element) => (
                    <MenuItem key={element} value={element}>
                        <Checkbox checked={selection.indexOf(element) > -1} />
                        <ListItemText primary={element} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

InputSelectField.defaultProps = {
    multiple: false,
    onChange: () => { },
}