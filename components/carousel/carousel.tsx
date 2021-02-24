import { useState } from 'react';
import Image from 'next/image';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';

import style from './carousel.module.scss';
import FullScreenSlider from './fullScreenSlider';
import ArrowLeft from './arrowRight';
import ArrowRight from './arrowLeft';

type Props = {
    images: { src: string }[],
    height: number
}

export default function Carousel({ images, height }: Props) {


    const length = images.length;
    const [currentImage, setCurrentImage] = useState(0),
        [shouldDisplayFullscreen, setShouldDisplayFullscreen] = useState(false),
        [fullscreenImage, setFullscreenImage] = useState(0);


    if (!Array.isArray(images) || images.length <= 0) {
        return null;
    }

    const nextImage = () => {
        const newImage = currentImage === length - 1 ? 0 : currentImage + 1;
        setCurrentImage(newImage);
        setFullscreenImage(newImage);
    }

    const prevImage = () => {
        const newImage = currentImage === 0 ? length - 1 : currentImage - 1;
        setCurrentImage(newImage);
        setFullscreenImage(newImage);
    }

    const getNextImage = (image: number) => {
        return image === length - 1 ? 0 : image + 1;
    }

    const getPrevImage = (image: number) => {
        return image === 0 ? length - 1 : image - 1;
    }

    const goToImage = (image: number) => {
        setCurrentImage(image);
        setFullscreenImage(image);
    }

    const displayFullSize = (image: number) => {
        setCurrentImage(image);
        setFullscreenImage(image);
        setShouldDisplayFullscreen(true);
    }

    const hideFullSize = () => {
        setShouldDisplayFullscreen(false);
    }

    const getClass = (index: number) => {
        //Classes of the slots depending on the number of images
        if (length === 1) {
            return [style.image_container, style.active_image].join(" ");
        } else if (length <= 2) {
            if (currentImage === index) {
                return [style.image_container, style.active_image].join(" ");
            } else {
                return [style.image_container, style.back_image].join(" ");
            }
        } else if (length === 4) {
            if (currentImage === index) {
                return [style.image_container, style.active_image].join(" ");
            } else if (index === getNextImage(currentImage)) {
                return [style.image_container, style.side_image_right].join(" ");
            } else if (index === getPrevImage(currentImage)) {
                return [style.image_container, style.side_image_left].join(" ");
            } else {
                return [style.image_container, style.back_image].join(" ");
            }
        } else {
            if (currentImage === index) {
                return [style.image_container, style.active_image].join(" ");
            } else if (index === getNextImage(currentImage)) {
                return [style.image_container, style.side_image_right].join(" ");
            } else if (index === getPrevImage(currentImage)) {
                return [style.image_container, style.side_image_left].join(" ");
            } else if (index === getNextImage(getNextImage(currentImage))) {
                return [style.image_container, style.outside_side_image_right].join(" ");
            } else if (index === getPrevImage(getPrevImage(currentImage))) {
                return [style.image_container, style.outside_side_image_left].join(" ");
            } else {
                return [style.image_container, style.inactive_image].join(" ");
            }
        }
    }

    return (
        <div className={style.carousel} style={{ height: height }}>
            <ArrowLeft onClick={nextImage} />
            <ArrowRight onClick={prevImage} />
            <div className={style.wrapper}>
                {
                    images.map((image, index) => {
                        return (
                            <div className={getClass(index)} key={index} onClick={() => displayFullSize(index)}>
                                <Image className={style.image} src={image.src} alt={"image-" + currentImage} layout="fill" />
                                <div className={style.icon}>
                                    <SettingsOverscanIcon fontSize="large" color="secondary" />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
                <FullScreenSlider
                    shouldOpen={shouldDisplayFullscreen}
                    images={images}
                    SyncCurrentImage={fullscreenImage}
                    SyncNextImageFunc={nextImage}
                    SyncPrevImageFunc={prevImage}
                    SyncCloseFunc={hideFullSize}
                    SyncGoToImageFunc={goToImage}
                />
            }
        </div>
    );
}