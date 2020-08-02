import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  searchBar:{
    marginTop:'0.8vh',
    position:'fixed',
    background:'white',
    zIndex:2,
    width: 'calc(90% + 12px)'
  },
  eventList:{
    marginTop:'10vh'
  }
}));

export default useStyles;
