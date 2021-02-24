import style from './photosPanel.module.scss';
import { Carousel } from '../';

export default function PhotosPanel() {

    return (
        <div className={style.photos_panel}>
            <Carousel images={fakeImages} height={400} />
        </div>
    );
}

const fakeImages = [
    {
        src: '/images/one_man_walking.jpg'
    },
    {
        src: '/images/one_man_walking_large_landscape.jpg'
    },
    {
        src: '/images/one_man_standing.jpg'
    },
    {
        src: '/images/login_bg.jpg'
    },
]