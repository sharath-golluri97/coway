import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  searchBar:{
    marginTop:'0.8vh',
    position:'fixed',
    background:'white',
    zIndex:2
  },
  eventList:{
    marginTop:'10vh'
  }
}));

export default useStyles;
