import makeStyles from "@material-ui/core/styles/makeStyles";
import Black from "@material-ui/core/colors/red";

const EventCardStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 500,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: Black[500],
    },
    pendingRequestExpandedArea : {
        maxHeight: '20vh',
        overflowY: 'scroll',
        padding:0
      },

    headerFont: {
      fontSize: 'small'
    }

  }));

export default EventCardStyles;
