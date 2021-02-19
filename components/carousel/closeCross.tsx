import CloseIcon from '@material-ui/icons/Close';

import style from './closeCross.module.scss';

export default function CloseCross({ onClick }) {

    return (
        <div className={style.close_cross}>
            <CloseIcon fontSize="large" color="primary" onClick={onClick} />
        </div>
    );
}