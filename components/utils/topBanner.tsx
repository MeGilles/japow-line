import Image from 'next/image';

import style from './topBanner.module.scss';

export default function TopBanner() {

    return (
        <div className={style.top_banner}>
            <Image src={"/images/snowy_mountains.jpg"} layout="fill" />
        </div>
    );
}