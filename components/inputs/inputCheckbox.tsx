
import { ThemeProvider } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import theme from "../../styles/materialTheme";

type Props = {
  state: boolean;
  onChange: any;
}

export default function InputCheckbox({ state, onChange }: Props) {

  return (
    <ThemeProvider theme={theme}>
      <FormControlLabel
        control={
          <Checkbox
            checked={state}
            onChange={onChange}
            name="checkBox"
            color="primary"
          />
        }
        label="Remember me"
      />
    </ThemeProvider>
  );
}

InputCheckbox.defaultProps = {
  state: "false",
  onChange: () => { },
}