import ForwardIcon from '@material-ui/icons/Forward';
import ClearIcon from '@material-ui/icons/Clear';

import style from './routesLinks.module.scss';
import { TopBanner, RouteNavigationPanel } from '../';

export default function RoutesLinks({ currentPath, routes, locations }) {

    return (
        <>
            <TopBanner />
            <RouteNavigationPanel path={currentPath} />
            <div className={style.routes_links}>
                <div className={style.title}>
                    {currentPath[currentPath.length - 1]}
                </div>
                <div className={style.description}>
                    Content about the route
                </div>
                <div className={style.next_links}>


                    <div className={style.locations}>
                        <div className={style.subtitle}>
                            Locations
                    </div>
                        <div className={style.list}>
                            {
                                locations !== null && locations.length > 0 ?
                                    locations.map((location: { name: string, path: string[] }, index: number) => {
                                        return (
                                            <div className={style.link} key={location.name + index}>
                                                <ForwardIcon fontSize="large" />
                                                <span className="global_link">
                                                    <a href={"/routes" + makeLinkFrom(location.path)}>{location.name}</a>
                                                </span>
                                            </div>
                                        )
                                    })
                                    : <div className={style.empty}>
                                        <ClearIcon fontSize="large" />
                                        No sub-locations in here
                                      </div>
                            }
                        </div>
                    </div>
                    <div className={style.routes}>
                        <div className={style.subtitle}>
                            Routes
                    </div>
                        <div className={style.list}>
                            {
                                routes !== null && routes.length > 0 ?
                                    routes.map((route: { name: string, path: string[] }, index: number) => {
                                        return (
                                            <div className={style.link} key={route.name + index}>
                                                <ForwardIcon fontSize="large" />
                                                <span className="global_link">
                                                    <a href={"/routes" + makeLinkFrom(route.path)}>{route.name}</a>
                                                </span>
                                            </div>
                                        )
                                    })
                                    : <div className={style.empty}>
                                        <ClearIcon fontSize="large" />
                                        No routes directly in here
                                      </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function makeLinkFrom(tab: string[]): string {
    let res = "";
    for (let i = 0; i < (tab ? tab.length : 0); i++) {
        res += "/" + tab[i];
    }
    return res;
}