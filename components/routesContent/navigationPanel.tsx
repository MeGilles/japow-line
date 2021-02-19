import Link from 'next/link';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import style from './navigationPanel.module.scss';

type Props = {
    path: string[]
}
export default function NavigationPanel({ path }: Props) {

    let url = '/routes/';

    return (
        <div className={style.navigation}>
            <div className={style.breadcrumbs}>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}>
                    {path.map((category, index) => {

                        url += category + "/";

                        return (
                            <div className={style.text} key={index}>
                                <Link href={url}>
                                    {category}
                                </Link>
                            </div>
                        );
                    })}
                </Breadcrumbs>
            </div>
        </div>
    );
}

NavigationPanel.defaultProps = {
    path: []
}