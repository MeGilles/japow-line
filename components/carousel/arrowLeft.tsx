import { ThemeProvider } from '@material-ui/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import theme from "../../styles/materialTheme";
import style from './arrowLeft.module.scss';

export default function ArrowLeft({ onClick }) {

    return (
        <div className={style.arrow_left} onClick={onClick}>
            <ThemeProvider theme={theme}>
                <ArrowBackIcon fontSize="large" color="primary" />
            </ThemeProvider>
        </div>
    );
}