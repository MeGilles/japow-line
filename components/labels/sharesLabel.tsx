import { makeStyles, createStyles } from '@material-ui/core/styles';
import ShareIcon from '@material-ui/icons/Share';

import style from './sharesLabel.module.scss';
import { materialShareColor } from '../../styles/materialColors';

const useStyles = makeStyles(() =>
    createStyles({
        share: {
            color: materialShareColor,
        }
    }),
);


type Props = {
    sharesCount: number,
}

export default function SharesLabel({ sharesCount }: Props) {

    const classes = useStyles();

    return (
        <div className={style.shares_label}>
            <div className={style.icon}>
                <ShareIcon className={classes.share} fontSize="default" />
            </div>
            <div className={style.label}>
                {sharesCount}
            </div>
        </div>
    );
}

SharesLabel.defaultProps = {
    sharesCount: 0,
}