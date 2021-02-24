import { makeStyles, createStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';

import style from './likesLabel.module.scss';
import { materialLikeColor } from '../../styles/materialColors';

const useStyles = makeStyles(() =>
    createStyles({
        favorite: {
            color: materialLikeColor,
        }
    }),
);

type Props = {
    likesCount: number,
}

export default function LikesLabel({ likesCount }: Props) {

    const classes = useStyles();

    return (
        <div className={style.likes_label}>
            <div className={style.icon}>
                <FavoriteIcon className={classes.favorite} fontSize="default" />
            </div>
            <div className={style.label}>
                {likesCount}
            </div>
        </div>
    );
}

LikesLabel.defaultProps = {
    likesCount: 0,
}