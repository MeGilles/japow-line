import DOMPurify from 'dompurify'

import style from './commentAnswer.module.scss';
import { CommentAnswerHeader, LikeButton, ReportButton, CommentsTypes } from '../../';
import CommentAttachments from '../commentAttachments';

type Props = {
    answer: CommentsTypes.answerType,
}

export default function CommentAnswer({ answer }: Props) {

    return (
        <div className={style.comment_answer}>

            <CommentAnswerHeader user={answer.user} />

            <div className={style.content} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(answer.content) }} />

            <CommentAttachments images={answer.attachments} />

            <div className={style.options}>

                <div className={style.left_buttons}>
                    <LikeButton />
                </div>

                <div className={style.right_buttons}>
                    <ReportButton />
                </div>
            </div>

            <div className={style.separating_line} />

        </div>
    );
}

CommentAnswer.defaultProps = {
    answer: {
        name: "anonymous",
        role: "no role",
        avatar: "",
        content: "",
        attachments: [],
        likesCount: 0,
    },
}