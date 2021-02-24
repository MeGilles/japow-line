import { useState, useRef } from 'react';

import style from './comment.module.scss';
import {
    CommentHeader,
    CommentReactions,
    CommentAttachments,
    CommentAnswersList,
    CommentNew,
    CommentsTypes
} from '../';

type Props = {
    comment: CommentsTypes.commentType,
}

export default function Comment({ comment }: Props) {

    const commentRef = useRef(null);

    const [expandAnswers, setExpandAnswers] = useState(false),
        [openInput, setOpenInput] = useState(false);

    const toggleAnswers = () => {
        setExpandAnswers(!expandAnswers);
    }

    const toggleMessageInput = () => {
        if (!openInput) {
            setTimeout(() => scrollTo(commentRef), 1);
        }
        setOpenInput(!openInput);
    }

    const validateAnswer = (args?: CommentsTypes.answerType) => {
        setOpenInput(false);
        if (args && args !== null) {
            comment.answers.push(args);
        }
    }

    const scrollTo = (ref: React.MutableRefObject<HTMLElement>) => {
        ref.current.scrollIntoView();
    }

    return (
        <div className={style.comment}>

            <div className={style.main_comment}>
                <CommentHeader user={comment.user} />

                <div className={style.content} dangerouslySetInnerHTML={{__html: comment.content}} />

                <CommentAttachments images={comment.attachments} />

                <CommentReactions answerToggled={openInput} numberOfLikes={comment.likesCount} numberOfAnswers={comment.answers.length} commentClickFunc={toggleMessageInput} />
            </div>

            <CommentAnswersList answers={comment.answers} expand={expandAnswers} expandFunc={toggleAnswers} shrinkFunc={toggleAnswers} />

            <div ref={commentRef} style={{ display: openInput ? 'block' : 'none' }}>
                <CommentNew isMain={false} feedBack={validateAnswer} />
            </div>
        </div>
    );
}