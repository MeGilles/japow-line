import { useState } from 'react';

import CommentIcon from '@material-ui/icons/Comment';

import style from './answerButton.module.scss';
import { materialBlackColor, materialCommentColor } from '../../styles/materialColors';

type Props = {
    isToggled: boolean,
    onClick: any,
}

export default function AnswerButton({ isToggled, onClick }: Props) {


    const toggle = () => {
        if (onClick !== undefined) {
            onClick();
        }
    }

    return (
        <div className={style.answer_button} onClick={toggle} style={{ color: isToggled ? materialCommentColor : materialBlackColor }}>
            <div className={style.icon}>
                <CommentIcon fontSize="default" />
            </div>
            <div className={style.label}>
                comment
            </div>
        </div>
    );
}

AnswerButton.defaultProps = {
    isToggled: false,
    onClick: () => false,
}