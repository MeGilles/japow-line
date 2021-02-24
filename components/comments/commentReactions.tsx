import { useState } from 'react';

import style from './commentReactions.module.scss';
import { LikeButton, AnswerButton, ShareButton, LikesLabel, SharesLabel, AnswersLabel } from '../';

type Props = {
    likeToggled: boolean,
    answerToggled: boolean,
    numberOfLikes: number,
    numberOfAnswers: number
    numberOfShares: number,
    commentClickFunc: any,
}

export default function CommentReactions({ likeToggled, answerToggled, numberOfLikes, numberOfAnswers, numberOfShares, commentClickFunc }: Props) {

    const [likeCounter, setLikeCounter] = useState(numberOfLikes);

    const newLike = (b: boolean) => {
        if (!likeToggled) {
            if (b) {
                setLikeCounter(likeCounter+1);
            } else {
                setLikeCounter(likeCounter-1);
            }
        }
    }

    return (
        <div className={style.comment_reactions}>
            <div className={style.separating_line} />
            <div className={style.reaction_buttons}>
                <LikeButton isLiked={likeToggled} onClick={newLike} />
                <AnswerButton isToggled={answerToggled} onClick={commentClickFunc} />
                <ShareButton />
            </div>
            <div className={style.reaction_data}>
                <LikesLabel likesCount={likeCounter} />
                <AnswersLabel answersCount={numberOfAnswers} />
                <SharesLabel sharesCount={numberOfShares} />
            </div>
        </div>
    );
}

CommentReactions.defaultProps = {
    likeToggled: false,
    answerToggled: false,
    numberOfLikes: 0,
    numberOfAnswers: 0,
    numberOfShares: 0,
    commentClickFunc: () => {},
}