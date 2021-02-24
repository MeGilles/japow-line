import { useState } from 'react';

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
            paddingTop: "5px"
        },
    }),
);


type Props = {
    isMain: boolean,
    name: string,
    image: string,
    feedBack: any,
}

export default function CommentNew({ isMain, name, image, feedBack }: Props) {

    const classes = useStyles()

    const [shouldSend, setShouldSend] = useState(false);

    const send = () => {
        setShouldSend(true);
    }

    const hasBeenSent = (args?: CommentsTypes.answerType | CommentsTypes.commentType) => {
        setShouldSend(false);
        if (args && args !== null) {
            feedBack(args);
        } else {
            feedBack();
        }
    }

    return (
        <div className={style.my_answer}>
            <div className={style.avatar}>
                <Avatar alt={name} src={image} className={classes.avatar}>
                    {name.charAt(0)}
                </Avatar>
            </div>
            <div className={style.input_field}>
                <CommentInput isMain={isMain} shouldSend={shouldSend} feedBack={hasBeenSent} />
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
    name: "Anonymous",
    image: "",
    feedBack: () => { },
}