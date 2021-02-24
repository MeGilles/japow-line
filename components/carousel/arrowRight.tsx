import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import style from './arrowRight.module.scss';

export default function ArrowRight({ onClick }) {

    return (
        <div className={style.arrow_right} onClick={onClick}>
            <ArrowForwardIcon fontSize="large" color="primary" />
        </div>
    );
}