import { useState, useEffect } from 'react';
import Image from 'next/image';
import AppsIcon from '@material-ui/icons/Apps';

import style from "./fullScreenSlider.module.scss";
import ArrowLeft from './arrowRight';
import ArrowRight from './arrowLeft';
import CloseCross from './closeCross';

type Props = {
    shouldOpen: boolean,
    images: { src: string }[],
    SyncCurrentImage?: number,
    SyncNextImageFunc?: () => void,
    SyncPrevImageFunc?: () => void,
    SyncCloseFunc: () => void,
    SyncGoToImageFunc?: (image: number) => void,
}

export default function FullScreenSlider({ shouldOpen, images, SyncCurrentImage, SyncNextImageFunc, SyncPrevImageFunc, SyncCloseFunc, SyncGoToImageFunc }: Props) {

    const length = images.length;
    const [isOpened, setIsOpened] = useState(false),
        [currentImage, setCurrentImage] = useState(0),
        [isGalleryDisplayed, setIsGalleryDisplayed] = useState(false);

    const lockScroll = () => {
        if (typeof document !== 'undefined') {
            const html = document.documentElement;
            const { body } = document;
            body.style.overflowY = 'hidden';
            html.style.overflowY = 'hidden';
        }
    }

    const unlockScroll = () => {
        if (typeof document !== 'undefined') {
            const html = document.documentElement;
            const { body } = document;
            body.style.overflowY = 'auto';
            html.style.overflowY = 'auto';
        }
    }

    useEffect(() => {
        setIsOpened(shouldOpen);
    }, [shouldOpen])

    useEffect(() => {
        if (isOpened) {
            lockScroll();
        }
    }, [isOpened])

    useEffect(() => {
        setCurrentImage(SyncCurrentImage);
    }, [SyncCurrentImage])

    const nextImage = () => {
        const newImage = currentImage === length - 1 ? 0 : currentImage + 1;
        setCurrentImage(newImage);
        setIsGalleryDisplayed(false);
        if (SyncNextImageFunc !== undefined) {
            SyncNextImageFunc();
        }
    }

    const prevImage = () => {
        const newImage = currentImage === 0 ? length - 1 : currentImage - 1;
        setCurrentImage(newImage);
        setIsGalleryDisplayed(false);
        if (SyncPrevImageFunc !== undefined) {
            SyncPrevImageFunc();
        }
    }

    const goToImage = (image: number) => {
        setCurrentImage(image);
        setIsGalleryDisplayed(false);
        if (SyncGoToImageFunc !== undefined) {
            SyncGoToImageFunc(image);
        }
    }

    const close = () => {
        setIsOpened(false);
        setIsGalleryDisplayed(false);
        unlockScroll();
        SyncCloseFunc();
    }

    const toggleGallery = () => {
        setIsGalleryDisplayed(!isGalleryDisplayed);
    }

    if (!Array.isArray(images) || images.length <= 0 || !isOpened) {
        return null;
    }

    return (
        <div className={style.fullscreen_slider}>
            <CloseCross onClick={close} />
            <ArrowLeft onClick={nextImage} />
            <ArrowRight onClick={prevImage} />
            <div className={style.main_image_viewport}>
                <Image
                    className={style.main_image}
                    src={images[currentImage].src}
                    alt={"image-" + currentImage}
                    layout="fill" />
            </div>
            <div className={style.toggle_button}>
                <AppsIcon onClick={toggleGallery} fontSize="large" color="primary" />
            </div>
            <div className={isGalleryDisplayed ? style.gallery_extended : style.gallery_list}>
                {
                    images.map((image, index) => {
                        return (
                            <div
                                className={index === currentImage
                                    ? [style.gallery_image_container, style.gallery_image_container_active].join(" ")
                                    : style.gallery_image_container}
                                onClick={() => goToImage(index)}
                                key={index}
                            >
                                <Image className={style.image} src={image.src} alt={"gallery-image-" + currentImage} layout="fill" />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}