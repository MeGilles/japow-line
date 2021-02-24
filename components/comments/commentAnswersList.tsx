import MessageIcon from '@material-ui/icons/Message';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';

import style from './commentAnswersList.module.scss';
import { CommentAnswer, CommentsTypes } from '../';

type Props = {
    answers: CommentsTypes.answerType[],
    expand: boolean,
    expandFunc: any,
    shrinkFunc: any,
}

export default function CommentAnswersList({ answers, expand, expandFunc, shrinkFunc }: Props) {

    return (
        <div className={style.comment_answers_list}>
            {   answers.length > 0 && (
                expand
                    ? <div className={style.comments_list}>
                        {
                            answers.map((answer, index) => {
                                return (
                                    <CommentAnswer answer={answer} key={index} />
                                )
                            })
                        }
                        <div className={style.shrink_accordion} onClick={shrinkFunc}>
                            <SpeakerNotesOffIcon />
                            <div className={style.label}>
                                Shrink answers
                        </div>
                        </div>
                    </div>
                    : <div className={style.expand_accordion} onClick={expandFunc}>
                        <MessageIcon />
                        <div className={style.label}>
                            Display answers
                        </div>
                    </div>
            )
            }
        </div>
    );
}

CommentAnswersList.defaultProps = {
    answers: [],
    expand: false,
    expandFunc: () => { },
    shrinkFunc: () => { },
}