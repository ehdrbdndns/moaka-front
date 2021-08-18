import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import '../../styles/main.scss';
import { loginStyles } from './styles';
import { useState } from 'react';
import { LoginProps } from './types';
import { CircularProgress } from '@material-ui/core';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { googleUserInfo } from '../../modules/auth';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        moaka.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function LoginForm({
  localLoginRedux,
  isLoading,
  isLogin,
  googleLoginRedux,
}: LoginProps) {
  const classes = loginStyles();

  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');

  const { push } = useHistory();

  useEffect(() => {
    if (isLogin) {
      push('/');
    }
  }, [isLogin, push]);

  const setIdEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const setPwdEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(e.target.value);
  };

  const localLoginEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(id);
    console.log(pwd);
    localLoginRedux({
      id,
      pwd,
    });
  };

  const successGoogleEvent = (response: any) => {
    console.log('success');
    console.log(response);
    const user = response.profileObj;
    const googleUserInfo: googleUserInfo = {
      no: 0,
      id: user.email,
      name: user.familyName,
      sub: user.googleId,
      profile: user.imageUrl,
      auth_type: 'google',
    };
    googleLoginRedux(googleUserInfo);
  };

  const errorGoogleEvent = (response: any) => {
    console.log('error');
    console.log(response);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <img
            className={classes.logo}
            src="./img/moaka_logo.png"
            alt="모아카 로고"
          />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <form className={classes.form} onSubmit={localLoginEvent}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            autoFocus
            value={id}
            onChange={setIdEvent}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={pwd}
            onChange={setPwdEvent}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                로그인
              </Button>
              <GoogleLogin
                clientId="1082912120178-ea629dedjv1s0jehssqh2bhq11ttr047.apps.googleusercontent.com"
                render={renderProps => (
                  <Button
                    type="button"
                    fullWidth
                    variant="outlined"
                    className={classes.submit}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    구글 로그인
                  </Button>
                )}
                onSuccess={successGoogleEvent}
                onFailure={errorGoogleEvent}
                cookiePolicy={'single_host_origin'}
              />
            </>
          )}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default LoginForm;
