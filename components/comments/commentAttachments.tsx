import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

import style from './commentAttachments.module.scss';
import { FullScreenSlider, CommentsTypes } from '../';

const imageWidth = 100;
const imageMargin = 1;

type Props = {
    images: CommentsTypes.attachmentType[],
}

export default function CommentAttachments({ images }: Props) {

    const length = images.length;

    if (length === 0) {
        return null;
    }

    const [shouldDisplayFullScreen, setShouldDisplayFullScreen] = useState(false),
        [imageToDisplay, setImageToDisplay] = useState(0),
        [maxImageDisplay, setMaxImageDisplay] = useState(0);

    const globalDiv = useRef(null);

    useEffect(() => {

        adjustNumberOfDisplayableImages();

        function adjustNumberOfDisplayableImages() {
            setMaxImageDisplay(Math.floor(globalDiv.current.offsetWidth / (imageWidth + 2 * imageMargin)));
        }

        window.addEventListener("resize", adjustNumberOfDisplayableImages);
        return () => window.removeEventListener("resize", adjustNumberOfDisplayableImages);
    }, [globalDiv])

    const display = (image: number) => {
        setImageToDisplay(image);
        setShouldDisplayFullScreen(true);
    }

    const close = () => {
        setShouldDisplayFullScreen(false);
    }

    return (
        <div className={style.comment_attachments} ref={globalDiv}>
            {
                images.map((image, index) => {
                    return (
                        index <= maxImageDisplay - 1 && (
                            index !== maxImageDisplay - 1
                                ?
                                <div className={style.image_container} key={index} onClick={() => display(index)}>
                                    <Image className={style.image} src={image.src} alt={"image-" + index} layout="fill" />
                                </div>
                                :
                                <div className={style.end_of_images} key={index} onClick={() => display(index)}>
                                    +{(length - maxImageDisplay) + 1}
                                </div>
                        )
                    )
                })
            }
            {
                <FullScreenSlider shouldOpen={shouldDisplayFullScreen} images={images} SyncCurrentImage={imageToDisplay} SyncCloseFunc={close} />
            }
        </div>
    );
}

CommentAttachments.defaultProps = {
    images: [],
}