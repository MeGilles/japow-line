import { makeStyles, createStyles } from '@material-ui/core/styles';
import ReportIcon from '@material-ui/icons/Report';

import style from './reportButton.module.scss';

const useStyles = makeStyles(() =>
    createStyles({
        report: {
            marginTop: "5px",
        },
    }),
);

type Props = {
    reportFunc: () => any,
}

export default function ReportButton({ reportFunc }: Props) {

    const classes = useStyles();

    return (
        <div className={style.report_button} onClick={reportFunc}>
            <div className={style.icon}>
                <ReportIcon className={classes.report} fontSize="default" />
            </div>
            <div className={style.label}>
                report
            </div>
        </div>
    );
}

ReportButton.defaultProps = {
    reportFunc: () => {},
}