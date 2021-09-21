import React, { useContext ,useState} from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import logo from '../assets/logo2.svg'
import Toolbar from '@material-ui/core/Toolbar';
import {NavLink, useHistory} from 'react-router-dom';
import { AuthContext } from '../context/authContext'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { createBrowserHistory } from "history";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import PaymentIcon from '@material-ui/icons/Payment'
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import LogOutIcon from '@material-ui/icons/ExitToApp'
import { Router, Route, Link } from "react-router-dom";
import menu_1 from '../assets/new_menu_1.svg' 
import menu_2 from '../assets/new_menu_2.svg' 
import menu_3 from '../assets/new_menu_3.svg' 
import menu_4 from '../assets/new_menu_4.svg' 
import menu_5 from '../assets/new_menu_5.svg'

const drawerWidth = 240;
const history = createBrowserHistory();
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex'
    },
    appBar: {
      backgroundColor: 'white'
    },
    appBarShift: {
      marginLeft: drawerWidth
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      [theme.breakpoints.down('sm')]: {
        display:'none'
      },
    },
    logo: {
        maxWidth: 100,
      },
    list:{
        backgroundColor:'white',
        color: 'black',
    }
  }));

export const BottomNavBar = props => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logoutHandler = event =>{
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    const classes = useStyles();
    const [open, setOpen] = useState(false);
  
    return (
        <div className={classes.root}>
        <AppBar
          elevation={3}
          boxShadow={3}
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <img src={logo} alt="EB!" className={classes.logo} />
            </Toolbar>
          </AppBar>
            <div className='bottom-nav'>
                <div className='bn-tab'>
                    <ListItem
                        button
                        key="create"
                        component={NavLink} to="/create"
                        style={{padding:0}}
                        >
                        <img src={menu_1}/>
                    </ListItem>
                </div>
                <div className='bn-tab'>
                    <ListItem
                        button
                        key="links"
                        // component={NavLink} to="/links"
                        style={{padding:0}}
                        >
                        <img src={menu_2}/>
                    </ListItem>
                </div>
                <div className='bn-tab'>
                    <ListItem
                        button
                        key="links"
                        component={NavLink} to="/cards"
                        style={{padding:0}}
                        >
                         <img src={menu_3}/>
                    </ListItem>
                </div>
                <div className='bn-tab'>
                    <ListItem
                        button
                        key="links"
                        style={{padding:0}}
                        >
                          <img src={menu_4}/>
                    </ListItem>
                </div>
                <div className='bn-tab'>
                    <ListItem
                        button
                        key="logout"
                        style={{padding:0}}
                        onClick={logoutHandler}
                        >
                          <img src={menu_5}/>
                    </ListItem>
                </div>
            </div>
        </div>
        
    )
}
