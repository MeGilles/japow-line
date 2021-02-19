import { useState } from 'react';
import Image from 'next/image';
import { ThemeProvider } from '@material-ui/styles';
import AppsIcon from '@material-ui/icons/Apps';

import theme from "../../styles/materialTheme";
import style from "./fullScreenSlider.module.scss";
import ArrowLeft from './arrowRight';
import ArrowRight from './arrowLeft';
import CloseCross from './closeCross';

export default function FullScreenSlider({images, currentImage, nextImageFunc, prevImageFunc, closeFunc, goToImageFunc}) {


    const [isGalleryDisplayed, setIsGalleryDisplayed] = useState(false);

    const toggleGallery = () => {
        setIsGalleryDisplayed(!isGalleryDisplayed);
    }

    const askedToSlide = (func) => {
        setIsGalleryDisplayed(false);
        func();
    }

    return (
        <div className={style.fullscreen_slider}>
            <CloseCross onClick={() => askedToSlide(closeFunc)} />
            <ArrowLeft onClick={() => askedToSlide(nextImageFunc)} />
            <ArrowRight onClick={() => askedToSlide(prevImageFunc)} />
            <div className={style.main_image_viewport}>
                <Image
                    className={style.main_image}
                    src={images[currentImage].src}
                    alt={"image-" + currentImage}
                    layout="fill" />
            </div>
            <div className={style.toggle_button}>
                <ThemeProvider theme={theme}>
                    <AppsIcon onClick={toggleGallery} fontSize="large" color="primary" />
                </ThemeProvider>
            </div>
            <div className={isGalleryDisplayed ? style.gallery_extended : style.gallery_list}>
                {
                    images.map((image, index) => {
                        return (
                            <div
                                className={index === currentImage
                                    ? [style.gallery_image_container, style.gallery_image_container_active].join(" ")
                                    : style.gallery_image_container}
                                onClick={() => goToImageFunc(index)}
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