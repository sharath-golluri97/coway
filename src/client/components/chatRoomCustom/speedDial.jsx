import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        transform: 'translateZ(0px)',
        flexGrow: 1,
    },
    // exampleWrapper: {
    //     position: 'relative',
    //     marginTop: theme.spacing(3),
    //     height: 380,
    // },
    radioGroup: {
        margin: theme.spacing(1, 0),
    },
    speedDial: {
        position: 'absolute',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
    },
}));


export default function SpeedDials(props) {
    const classes = useStyles();
    const [direction, setDirection] = React.useState('up');
    const [open, setOpen] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);

    const actions = [
        { icon: <FileCopyIcon />, name: 'Copy'},
        { icon: <SaveIcon />, name: 'Save' },
        { icon: <PrintIcon />, name: 'Print' },
        { icon: <ShareIcon />, name: 'Share' },
        { icon: <FavoriteIcon />, name: 'Like' },
        { icon: <Link to={{ pathname:'/chatCustom/chat', data: props.groupName}}><ChatIcon/></Link>, name: 'Char'}
    ];

    const handleDirectionChange = (event) => {
        setDirection(event.target.value);
    };

    const handleHiddenChange = (event) => {
        setHidden(event.target.checked);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChatClick = () => {

    }
    return (
        <div className={classes.exampleWrapper}>
            <SpeedDial
                ariaLabel="SpeedDial example"
                className={classes.speedDial}
                hidden={hidden}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction={direction}
            >
                {actions.map((action,i) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={()=>{console.log("pressed")}}
                    >

                    </SpeedDialAction>
                ))}
            </SpeedDial>
        </div>

    );
}
