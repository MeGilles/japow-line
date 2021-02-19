import { ThemeProvider } from '@material-ui/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import theme from "../../styles/materialTheme";
import style from './arrowRight.module.scss';

export default function ArrowRight({ onClick }) {

    return (
        <div className={style.arrow_right} onClick={onClick}>
            <ThemeProvider theme={theme}>
                <ArrowForwardIcon fontSize="large" color="primary" />
            </ThemeProvider>
        </div>
    );
}