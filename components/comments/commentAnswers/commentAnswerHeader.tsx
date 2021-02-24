import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import style from './commentAnswerHeader.module.scss';
import { CommentsTypes } from '../../';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            width: "35px",
            height: "35px",
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.secondary.main,
        },
    }),
);

type Props = {
    user: CommentsTypes.userType,
}

export default function CommentAnswerHeader({ user }: Props) {

    const classes = useStyles()

    return (
        <div className={style.comment_answer_header}>
            <div className={style.avatar}>
                <Avatar alt={user.name} src={user.avatar} className={classes.avatar}>
                    {user.name.charAt(0)}
                </Avatar>
            </div>
            <div className={style.textual_data}>
                <div className={style.name}>
                    {user.name}
                </div>
                <div className={style.role}>
                    {user.role}
                </div>
            </div>
        </div>
    );
}

CommentAnswerHeader.defaultProps = {
    user: {
        name: "Anonymous",
        avatar: "",
        role: "Rider"
    }
}