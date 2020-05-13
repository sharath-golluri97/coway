import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        height: 100+'%',
    },
    headButton: {
        // position: 'sticky',
    },
    container: {
        height: `calc(100vh - ${theme.spacing(10)}px)`,
        position: 'sticky'
        // position: 'sticky',
    },
    header: {
        position: 'sticky',
        height: '10%',
        padding: '0px !important'
    },
    content: {
        position: 'relative',
        overflowY:'scroll',
        height: '80%'
    },
    footer: {
        position: 'sticky',
        height:'10%'
    },
    messageMe: {
        // marginLeft: '40%',
        // maxWidth: '60%',
        // marginTop: '20px',
        // marginBottom: '20px',
        padding: '5px',
        // borderRadius: '5px',
        backgroundColor: 'lightcyan'
    },
    messageOther: {
        // marginRight: '40%',
        // maxWidth: '60%',
        // marginTop: '20px',
        // marginBottom: '20px',
        padding: '5px',
        // borderRadius: '5px',
        backgroundColor: 'blanchedalmond'
    },
    messageContainer: {
        marginTop: '15px',
        marginBottom: '15px'
    }
}));

export default useStyles;
