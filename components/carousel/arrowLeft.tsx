import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import style from './arrowLeft.module.scss';

export default function ArrowLeft({ onClick }) {

    return (
        <div className={style.arrow_left} onClick={onClick}>
            <ArrowBackIcon fontSize="large" color="primary" />
        </div>
    );
}