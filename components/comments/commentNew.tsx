import { useState } from 'react';
import { useSession } from 'next-auth/client';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import style from './commentNew.module.scss';
import { CommentInput, ClassicButton, CommentsTypes } from '..';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            width: "40px",
            height: "40px",
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.secondary.main,
        },
    }),
);


type Props = {
    isMain: boolean,
    feedBack: any,
}

export default function CommentNew({ isMain, feedBack }: Props) {

    const classes = useStyles()

    const [shouldSend, setShouldSend] = useState(false);

    const [session, loading] = useSession();

    const send = () => {
        setShouldSend(true);
    }

    const hasBeenSent = (success: boolean, args?: CommentsTypes.answerType | CommentsTypes.commentType) => {
        setShouldSend(false);
        if (success) {
            if (args && args !== null) {
                feedBack(args);
            } else {
                feedBack();
            }
        }
    }

    const getUserInfo = () => {
        if (!loading && session !== null && session.user !== null) {
            const userInfo: CommentsTypes.userType = {
                name: session.user.name,
                avatar: session.user.image,
                role: "",
            }
            return userInfo;
        }
        return {
            name: null,
            avatar: null,
            role: null,
        };
    }

    return (
        <div className={style.my_answer}>
            <div className={style.avatar}>
                <Avatar alt={!loading && session !== null && session.user !== null && session.user.name !== null ? session.user.name : "avatar"} src={!loading && session !== null && session.user !== null && session.user.name !== null ? session.user.image : ""} className={classes.avatar}>
                    {!loading && session !== null && session.user !== null && session.user.email !== null ? session.user.email.charAt(0).toUpperCase() : "A"}
                </Avatar>
            </div>
            <div className={style.input_field}>
                <CommentInput isMain={isMain} shouldSend={shouldSend} feedBack={hasBeenSent} userInfo={getUserInfo()}/>
            </div>
            <div className={style.validation_button}>
                <ClassicButton onClick={send}>
                    send
                </ClassicButton>
            </div>
        </div>
    );
}

CommentNew.defaultProps = {
    feedBack: () => { },
}