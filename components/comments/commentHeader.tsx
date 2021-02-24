import { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import style from './commentHeader.module.scss';
import { CommentsTypes } from '../';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            width: "40px",
            height: "40px",
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.secondary.main,
        },
        moreVertIcon: {
            color: "darkgrey",
            borderRadius: "5px",
            '&:hover': {
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.secondary.main
            },
            transition: "0.2s ease-out"
        }
    }),
);

type Props = {
    user: CommentsTypes.userType,
}

export default function CommentHeader({ user }: Props) {

    const classes = useStyles()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={style.comment_header}>
            <div className={style.user_information}>
                <div className={style.avatar}>
                    <Avatar alt={user.name} src={user.avatar} className={classes.avatar}>
                        {user.name.charAt(0)}
                    </Avatar>
                </div>
                <div className={style.textual_data}>
                    <div className={style.name}>
                        {user.name}
                    </div>
                    <div className={style.role}>
                        {user.role}
                    </div>
                </div>
            </div>
            <div className={style.actions}>
                <div className={style.button} onClick={handleClick}>
                    <MoreVertIcon fontSize="large" className={classes.moreVertIcon} />
                </div>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Report</MenuItem>
                    <MenuItem onClick={handleClose}>Delete</MenuItem>
                </Menu>
            </div>
        </div>
    );
}

CommentHeader.defaultProps = {
    user: {
        name: "Anonymous",
        avatar: "",
        role: "Rider"
    }
}