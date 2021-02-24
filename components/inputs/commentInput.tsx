import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import AttachmentIcon from '@material-ui/icons/Attachment';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';
import DeleteIcon from '@material-ui/icons/Delete';

import 'emoji-mart/css/emoji-mart.css'
import { Picker, Emoji } from 'emoji-mart-next'

import style from './commentInput.module.scss';
import { OutsideClickWrapper, CommentsTypes } from '../';


type Props = {
    isMain: boolean,
    shouldSend: boolean,
    feedBack: any,
}

export default function CommentInput({ isMain, shouldSend, feedBack }: Props) {

    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const attachmentsRef = useRef(null);

    const [commentString, setCommentString] = useState(""),
        [attachments, setAttachments] = useState<CommentsTypes.attachmentType[]>([]),
        [errorRaised, setErrorRaised] = useState(""),
        [successIterator, setSuccessIterator] = useState(0),
        [currentPlace, setCurrentPlace] = useState(0),
        [commentRows, setCommentRows] = useState(1),
        [displayEmojiPicker, setDisplayEmojiPicker] = useState(false);


    //++++++++++++++++++++++++++++++++++++++++++++++

    //Textarea management
    const handleKeyDown = (event: React.KeyboardEvent) => {

        setCurrentPlace(currentPlace + 1);

        //Tabulation indent
        if (event.key === "Tab") {
            event.preventDefault();
            let val = commentString,
                start = textareaRef.current.selectionStart,
                end = textareaRef.current.selectionEnd;
            setCommentString(val.substring(0, start) + '\t' + val.substring(end));
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 1;
        }
    }

    //Take note of cursor position
    const handleClick = () => {
        setCurrentPlace(textareaRef.current.selectionStart);
    }

    //Adapt textarea size to its content
    const inputComment = useCallback((event) => {

        const rowHeight = 19;
        const maxRows = 10;
        event.target.rows = 1;

        const currentRows = ~~((event.target.scrollHeight - 10) / rowHeight);

        event.target.rows = currentRows;
        if (currentRows >= maxRows) {
            event.target.rows = maxRows;
        }

        setCommentRows(currentRows > maxRows ? maxRows : currentRows);

        setCommentString(event.target.value);
    }, [commentString])


    //++++++++++++++++++++++++++++++++++++++++++++++

    //Emojis management    
    const toggleDisplayEmojiPicker = () => {
        setDisplayEmojiPicker(!displayEmojiPicker);
    }

    const closeEmojiPicker = () => {
        setDisplayEmojiPicker(false);
    }

    //Adding the emoji to the string thanks to the cursor position
    const addEmoji = (emoji: typeof Emoji) => {
        var start = textareaRef.current.selectionStart,
            end = textareaRef.current.selectionEnd;
        setCommentString(
            commentString.substring(0, start) + emoji.native + commentString.substring(end, commentString.length)
        );
        setCurrentPlace(currentPlace + emoji.native.length);
    }

    //++++++++++++++++++++++++++++++++++++++++++++++

    //Files management
    const openFiles = () => {
        fileInputRef.current.click();
        setErrorRaised(null);
    }

    //process selected files to get a preview
    const addAttachments = (event: any) => {

        const files: FileList = event.target.files;

        if (files.length + successIterator > 15) {
            setErrorRaised("Too many attachments");
            return;
        }

        const acceptedFormats = [
            "jpg",
            "jpeg",
            "png",
            "gif",
            "bmp",
        ];

        let filesIndex = 0;
        let currSuccessIterator = 0;

        const attachmentsList: CommentsTypes.attachmentType[] = [];

        function readFile(file: File) {

            const parts = file.name.split('.');
            const extension = parts[parts.length - 1];

            if (!acceptedFormats.includes(extension)) {
                setErrorRaised("Selection contains unaccepted format (image only)");

                filesIndex++
                if (filesIndex < files.length) {
                    readFile(files[filesIndex]);
                }

                return;
            }

            const fr = new FileReader();

            fr.onloadend = () => {

                const url = fr.result;
                if (typeof url === 'string') {
                    attachmentsList.push({ src: fr.result.toString() });
                }

                filesIndex++
                currSuccessIterator++;
                if (filesIndex < files.length) {
                    readFile(files[filesIndex]);
                } else {
                    const newAttachments = attachments;
                    for (const attachment of attachmentsList) {
                        newAttachments.push(attachment);
                    }
                    setSuccessIterator(successIterator +  currSuccessIterator);
                    setAttachments(newAttachments);
                }
            }

            fr.onerror = () => {
                setErrorRaised(fr.error.toString());
            }

            fr.readAsDataURL(file)
        }

        readFile(files[filesIndex]);
    }

    //Remove an image
    const removeAttachment = (attachment: number) => {
        const newAttachments = attachments;
        newAttachments.splice(attachment, 1);
        setAttachments(newAttachments);
        setSuccessIterator(successIterator - 1);
        setErrorRaised("");
    }

    //Adapt the scroll to overflowX
    const rotateScroll = (event: WheelEvent) => {
        if (event.deltaY !== undefined) {
            attachmentsRef.current.scrollLeft -= (event.deltaY * 10);
        }
        event.preventDefault();
    }

    //Listeners
    const modifyScroll = () => {
        attachmentsRef.current.addEventListener("wheel", rotateScroll, false);
    }

    const cancelScrollModifications = () => {
        attachmentsRef.current.removeEventListener("wheel", rotateScroll, false);
    }

    //++++++++++++++++++++++++++++++++++++++++++++++

    //Submission management
    const handleSubmit = () => {
        //TO DO something with the database
        if (commentString !== null && commentString.length > 0) {
            feedBack(createComment());
            reset();
        } else {
            setErrorRaised("You cannot send a blank message.");
        }
    }

    //Build a new comment from inputed data
    const createComment = () => {
        if (isMain) {
            const newComment = {
                user: {
                    name: "TODO-WITH-SESSION",
                    avatar: "TODO-WITH-SESSION",
                    role: "TODO-WITH-SESSION",
                },
                content: parseToHTML(commentString),
                attachments: attachments,
                answers: [],
                likesCount: 0,
            }
            return newComment;
        } else {
            const newComment = {
                user: {
                    name: "TODO-WITH-SESSION",
                    avatar: "TODO-WITH-SESSION",
                    role: "TODO-WITH-SESSION",
                },
                content: parseToHTML(commentString),
                attachments: attachments,
                likesCount: 0,
            }
            return newComment;
        }
    }

    const reset = () => {
        setCommentString("");
        setAttachments([]);
        setErrorRaised("");
        setSuccessIterator(0);
        setCurrentPlace(0);
        setCommentRows(1);
        setDisplayEmojiPicker(false);
    }

    useEffect(() => {
        if (shouldSend) {
            handleSubmit();
        }
    }, [shouldSend])

    return (
        <div className={style.comment_input}>

            <div className={style.first_row}>
                <div className={style.text_field}>

                    <textarea
                        className={style.input}
                        placeholder="write a comment..."
                        rows={commentRows}
                        onChange={inputComment}
                        onKeyDown={handleKeyDown}
                        onClick={handleClick}
                        value={commentString}
                        ref={textareaRef}
                    />
                </div>

                <OutsideClickWrapper func={closeEmojiPicker}>

                    <div className={style.add_emoji}>
                        <div className={style.button} onClick={toggleDisplayEmojiPicker}>
                            <EmojiEmotionsOutlinedIcon />
                        </div>

                        <div className={style.emoji_picker}>
                            {
                                displayEmojiPicker &&
                                <Picker
                                    darkMode={false}
                                    color="#26a6e5"
                                    onSelect={addEmoji}
                                />
                            }
                        </div>
                    </div>

                </OutsideClickWrapper>

                <div className={style.add_photo} onClick={openFiles}>
                    <PhotoCameraOutlinedIcon fontSize="default" />
                    <input className={style.input} type="file" multiple ref={fileInputRef} onChange={addAttachments} />
                </div>

            </div>

            <div className={style.separating_line} />

            {
                (attachments.length > 0 || (errorRaised !== null && errorRaised !== "")) &&
                <div className={style.second_row}>
                    <div className={style.header}>
                        <AttachmentIcon fontSize="default" />
                    </div>
                    <div className={style.content}>
                        {
                            errorRaised !== null && errorRaised !== ""
                                ?
                                <div className={style.error}>
                                    <ErrorIcon fontSize="default" />
                                    <br />
                                    Error:{' ' + errorRaised}
                                </div>
                                : <div className={style.success}>
                                    <DoneIcon fontSize="large" />
                                    <br />
                                    {successIterator}
                                </div>
                        }
                        <div className={style.attachments_container} ref={attachmentsRef} onMouseEnter={modifyScroll} onMouseLeave={cancelScrollModifications} >
                            {
                                attachments.map((image, index) => {
                                    return (
                                        <div className={style.image_container} key={index} onClick={() => removeAttachment(index)}>
                                            <Image className={style.image} src={image.src} alt={"image-" + index} layout="fill" />
                                            <div className={style.delete_icon}>
                                                <DeleteIcon fontSize="default" color="secondary" />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

CommentInput.defaultProps = {
    shouldSend: false,
    feedBack: () => { },
}

function parseToHTML(text: string) {
    const paraphStart = '<div>';
    const paraphEnd = '</div>';
    const simpleLineBreak = '<br/>';

    const tabIndenterStart = '<span style="margin-left: 25px">';
    const tabIndenterEnd = '</span>';

    let selectionStart = 0;

    text = paraphStart.concat(text);

    let shouldCloseIndenter = 0;

    let i = 0;
    while (i < text.length) {
        switch (text.charAt(i)) {
            case '\n':
                if (shouldCloseIndenter > 0) {
                    text = text.substring(selectionStart, i) + tabIndenterEnd + text.substring(i, text.length);
                    i += tabIndenterEnd.length;
                    shouldCloseIndenter--;
                }

                if (text.charAt(i + 1) !== null && text.charAt(i + 1) === '\n') {
                    text = text.substring(selectionStart, i) + simpleLineBreak + text.substring(i + 1, text.length);
                } else {
                    text = text.substring(selectionStart, i) + paraphEnd + paraphStart + text.substring(i + 1, text.length);
                }
                break;

            case '\t':
                if (text.charAt(i + 1) !== null && text.charAt(i + 1) !== '\n') {
                    text = text.substring(selectionStart, i) + tabIndenterStart + text.substring(i + 1, text.length);
                    shouldCloseIndenter++;
                    i += tabIndenterStart.length;
                }
                break;
        }
        i++;
    }

    for (let i = 0; i < shouldCloseIndenter; i++) {
        text = text.concat(tabIndenterEnd);
    }


    text = text.concat(paraphEnd);

    console.log(text);


    return text;
}