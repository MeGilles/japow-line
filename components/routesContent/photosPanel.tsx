import { useState } from 'react';

import style from './photosPanel.module.scss';
import { Carousel, FileInput, CommentsTypes } from '../';

type Props = {
    photos: CommentsTypes.attachmentType[],
}

export default function PhotosPanel({ photos } : Props) {

    const [images, setImages] = useState<CommentsTypes.attachmentType[]>(photos),
        [importError, setImportError] = useState<String>("");

    const setCarousel = (files: CommentsTypes.attachmentType[], error?: String) => {
        if (error) {
            setImportError(error);
        } else {
            const newImages = images.slice();
            for (const file of files) {
                newImages.push(file);
            }
            setImages(newImages);
            setImportError("");
            
        }
    }

    const removeImage = (index: number) => {
        const newImages = images.slice();
        newImages.splice(index, 1);
        setImages(newImages);
    }

    return (
        <div className={style.photos_panel}>
            {
                images.length > 0 ?
                    <Carousel images={images} height={"55vh"} feedBack={removeImage} />
                    :
                    <div className={style.empty}>
                        No photos
                    </div>
            }
        </div>
    );
}

