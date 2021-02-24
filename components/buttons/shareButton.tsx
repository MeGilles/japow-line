import ShareIcon from '@material-ui/icons/Share';

import style from './shareButton.module.scss';

type Props = {
    onClick: () => boolean,
}

export default function ShareButton({ onClick }: Props) {

    return (
        <div className={style.share_button} onClick={onClick}>
            <div className={style.icon}>
                <ShareIcon fontSize="default" />
            </div>
            <div className={style.label}>
                share
            </div>
        </div>
    );
}

ShareButton.defaultProps = {
    onClick: () => false,
}