import React, { useContext, useEffect, useState ,useRef} from 'react'
import { AuthContext } from '../context/authContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import {Grid,Paper} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import bcg from '../assets/bcg.jpeg'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh'
    },
    image: {
      backgroundImage: `url(${bcg})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(10, 12),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', 
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor:'#9C81E8'
    },
  }));
  
export const AuthPage=()=>{
    const ref = useRef(null)
    const classes = useStyles();
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request,error ,clearError} = useHttp()
    const [form,setForm] = useState({
        email:'',
        password:''
    })

  
    const changeHandler =event=>{
        setForm({
            ...form,
            [event.target.name]:event.target.value
        })
    } 
    const registerHandler =async()=>{
        try{
            const data = await request('/api/auth/register','POST',{...form})
            message(data.message)
        }catch(e){
        }
    }
    const loginHandler =async()=>{
        try{
            const data = await request('/api/auth/login','POST',{...form})
            auth.login(data.token,data.userId)
            
        }catch(e){
        }
    }
    useEffect(()=>{
        message(error)
        clearError()
    },[error,message,clearError])
    

    return(
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={8} className={classes.image} />
            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={20} square>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Авторизация
                </Typography>
                <form className={classes.form} noValidate style={{padding:10}}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Login"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={changeHandler}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={changeHandler}
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    disabled={loading}
                    onClick={loginHandler}
                  >
                    Войти
                  </Button>
                  <Button
                    ref={ref}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={registerHandler}
                    disabled="true"
                  >
                    Авторизация
                  </Button>
                </form>
              </div>
            </Grid>
          </Grid>
    )
}