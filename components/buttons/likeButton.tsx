import { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import style from './likeButton.module.scss';
import { materialBlackColor, materialLikeColor } from '../../styles/materialColors';

const useStyles = makeStyles(() =>
    createStyles({
        favoriteActive: {
            color: materialLikeColor,
        },
        favoriteInactive: {
            color: materialBlackColor,
        },
    }),
);

type Props = {
    isLiked: boolean,
    onClick: any,
}

export default function LikeButton({ isLiked, onClick }: Props) {

    const [isToggled, setIsToggled] = useState(isLiked);

    const classes = useStyles();

    const toggle = () => {
        if (onClick !== undefined) {
            onClick(!isToggled);
        }
        setIsToggled(!isToggled);
    }

    return (
        <div className={style.like_button} onClick={toggle}>
            <div className={isToggled ? [style.icon, style.should_animate].join(" ") : style.icon}>
                {
                    isToggled
                        ? <FavoriteIcon className={isToggled ? classes.favoriteActive : classes.favoriteInactive} fontSize="default" />
                        : <FavoriteBorderIcon className={isToggled ? classes.favoriteActive : classes.favoriteInactive} fontSize="default" />
                }
            </div>
            <div className={style.label} style={{ color: isToggled ? materialLikeColor : "" }}>
                {
                    isToggled
                        ? "liked"
                        : "like"
                }
            </div>
        </div>
    );
}

LikeButton.defaultProps = {
    isLiked: false,
    onClick: () => { },
}