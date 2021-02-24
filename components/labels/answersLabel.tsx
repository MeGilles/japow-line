import { makeStyles, createStyles } from '@material-ui/core/styles';
import CommentIcon from '@material-ui/icons/Comment';

import style from './answersLabel.module.scss';
import { materialCommentColor } from '../../styles/materialColors';

const useStyles = makeStyles(() =>
    createStyles({
        comment: {
            color: materialCommentColor,
        }
    }),
);

type Props = {
    answersCount: number,
}

export default function AnswersLabel({ answersCount }: Props) {

    const classes = useStyles();

    return (
        <div className={style.answers_label}>
            <div className={style.icon}>
                <CommentIcon className={classes.comment} fontSize="default" />
            </div>
            <div className={style.label}>
                {answersCount}
            </div>
        </div>
    );
}

AnswersLabel.defaultProps = {
    answersCount: 0,
}