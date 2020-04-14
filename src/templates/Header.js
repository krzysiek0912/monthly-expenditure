import React from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DialogAdd from 'components/molecules/DialogAdd';
import { getCountExpensesToConfirmed } from 'redux/expensesReducer';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
}));
const Header = ({ open, handleDrawerOpen, count }) => {
  const classes = useStyles();
  let history = useHistory();
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleToggleDialogAdd = () => {
    setOpenDialog(!openDialog);
  };
  const handleGoToConfirm = () => {
    history.push('/confirm');
  };
  return (
    <>
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton onClick={handleToggleDialogAdd} color="inherit">
            <AddCircleIcon color="inherit"></AddCircleIcon>
          </IconButton>
          <IconButton onClick={handleGoToConfirm} color="inherit">
            {count > 0 ? (
              <Badge badgeContent={count} color="secondary">
                <NotificationsIcon />
              </Badge>
            ) : (
              <NotificationsIcon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogAdd onClose={handleToggleDialogAdd} selectedValue open={openDialog}></DialogAdd>
    </>
  );
};

const mapStateToProps = (state) => ({
  count: getCountExpensesToConfirmed(state),
});

export default connect(mapStateToProps)(Header);
