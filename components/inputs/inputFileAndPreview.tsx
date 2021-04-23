import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';
import DeleteIcon from '@material-ui/icons/Delete';

import style from './inputFileAndPreview.module.scss';
import { CommentsTypes } from '../';


type Props = {
    attachmentsMax: number,
    name?: string,
    feedBack: any,
}

export default function InputFileAndPreview({ attachmentsMax, name, feedBack } : Props) {

    const fileInputRef = useRef(null);
    const attachmentsRef = useRef(null);

    const [attachments, setAttachments] = useState<CommentsTypes.attachmentType[]>([]),
        [errorRaised, setErrorRaised] = useState(""),
        [successIterator, setSuccessIterator] = useState(0);


    //Files management
    const openFiles = () => {
        fileInputRef.current.click();
        setErrorRaised(null);
    }

    //process selected files to get a preview
    const addAttachments = (event: any) => {

        const files: FileList = event.target.files;

        if (files.length + successIterator > attachmentsMax) {
            setErrorRaised(attachmentsMax+" photos maximum");
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
                if (filesIndex < files.length) {
                    readFile(files[filesIndex]);
                } else {
                    const newAttachments = attachments;
                    for (const attachment of attachmentsList) {
                        newAttachments.push(attachment);
                    }
                    setAttachments(newAttachments);
                    setAttachments(attachments.filter((value, index, array) => array.findIndex(instance => (instance.src === value.src)) === index));
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
        const newAttachments = attachments.slice();
        newAttachments.splice(attachment, 1);
        setAttachments(newAttachments);
        setErrorRaised("");
    }

    //Update successIterator
    useEffect(() => {
        feedBack(attachments)
        setSuccessIterator(attachments.length);
    }, [attachments])

    //Adapt the scroll to overflowX
    const rotateScroll = (event: WheelEvent) => {
        if (event.deltaY !== undefined) {
            attachmentsRef.current.scrollLeft += (event.deltaY * 20);
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


    return (
        <div className={style.file_input_and_preview}>

            <div className={style.first_row}>
                <div className={style.add_photo} onClick={openFiles}>
                    <PhotoCameraOutlinedIcon fontSize="default" />
                    <input className={style.input} type="file" multiple={attachmentsMax > 1} ref={fileInputRef} onChange={addAttachments} />
                    <div className={style.header}>{name}</div>
                </div>
            </div>
            {
                (attachments.length > 0 || (errorRaised !== null && errorRaised !== "")) &&
                <>
                    <div className={style.separating_line} />

                    <div className={style.second_row}>
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
                </>
            }
        </div>
    );
}

InputFileAndPreview.defaultProps = {
    name: "",
}