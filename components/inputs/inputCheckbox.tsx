import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

type Props = {
  state: boolean;
  onChange: any;
}

export default function InputCheckbox({ state, onChange }: Props) {

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={state}
          onChange={onChange}
          name="checkBox"
          color="secondary"
        />
      }
      label="Remember me"
    />
  );
}

InputCheckbox.defaultProps = {
  state: "false",
  onChange: () => { },
}