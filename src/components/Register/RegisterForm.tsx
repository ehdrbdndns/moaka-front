import React, { useCallback } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { registerStyles } from './styles';
import { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { localRegisterInfo } from '../../modules/auth';
import { initialState as mailInfo, mailState } from '../../modules/mail';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export type registerParams = {
  loading: boolean;
  error: string | null;
  mailInfo: mailInfo;
  localRegister: (localRegisterInfo: localRegisterInfo) => void;
  insertRegisterMailCodeRedux: (mailState: mailState) => void;
  expireRegisterMailCodeRedux: (mail_no: number) => void;
  sendRegisterMailCodeRedux: (mailState: mailState) => void;
};

function RegisterForm({
  loading,
  error,
  mailInfo,
  localRegister,
  insertRegisterMailCodeRedux,
  expireRegisterMailCodeRedux,
  sendRegisterMailCodeRedux,
}: registerParams) {
  const classes = registerStyles();

  const { push } = useHistory();

  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const nameError = useRef<boolean>(false);
  const [id, setId] = useState('');
  const idError = useRef<boolean>(false);
  const [pwd, setPwd] = useState('');
  const pwdError = useRef<boolean>(false);
  const [rePwd, setRePwd] = useState('');
  const rePwdError = useRef<boolean>(false);

  const prevRegisterLoading = useRef<boolean>();
  const prevMailLoading = useRef<boolean>();

  useEffect(() => {
    if (prevRegisterLoading.current) {
      error || push('/login');
    } else {
      prevRegisterLoading.current = loading;
    }
  }, [loading, error, push]);

  // 타이머 생성
  let timer: { current: NodeJS.Timeout | null } = useRef(null);
  let isRunning = useRef<boolean>();
  const startTimer = useCallback(
    (count: number, display: HTMLElement, button: HTMLButtonElement) => {
      button.disabled = true;

      let minutes, seconds;
      timer.current = setInterval(function () {
        minutes = Math.floor(count / 60);
        seconds = Math.floor(count % 60);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        display.innerText = minutes + ':' + seconds;

        // 타이머 끝
        if (--count < 0 && timer.current != null) {
          clearInterval(timer.current);
          expireRegisterMailCodeRedux(mailInfo.data.no);
          display.innerText = '시간초과';
          const idInput = document.querySelector('#email') as HTMLInputElement;
          idInput.disabled = false;
          button.disabled = false;
          isRunning.current = false;
        }
      }, 1000);

      isRunning.current = true;
    },
    [mailInfo.data.no, expireRegisterMailCodeRedux],
  );

  useEffect(() => {
    if (
      prevMailLoading.current &&
      !mailInfo.loading &&
      mailInfo.data.address !== '' &&
      mailInfo.error === null &&
      !mailInfo.data.auth
    ) {
      // 메일 인증 코드 생성 성공
      // 인증 시간
      const leftSec = 15;
      // 타이머 보여주는 엘리먼트
      const display: HTMLElement = document.querySelector(
        '#timerText',
      ) as HTMLElement;
      // 타이머 버튼
      const timerBtn = document.querySelector('#timerBtn') as HTMLButtonElement;
      // 타이머 실행
      startTimer(leftSec, display, timerBtn);
    } else {
      // 이미 존재하는 아이디이거나 서버 오류
      const idInput = document.querySelector('#email') as HTMLInputElement;
      idInput.disabled = false;
    }
    prevMailLoading.current = mailInfo.loading;
  }, [
    mailInfo.loading,
    mailInfo.error,
    startTimer,
    mailInfo.data.auth,
    mailInfo.data.address,
  ]);

  // 코드 인증이 성공할 경우 타이머 중지
  useEffect(() => {
    if (mailInfo.data.auth) {
      timer.current && clearInterval(timer.current);

      const display: HTMLElement = document.querySelector(
        '#timerText',
      ) as HTMLElement;
      display.innerText = '인증 성공';
    }
  }, [mailInfo.data.auth]);

  // 컴포넌트가 사라질 때 타이머 삭제
  useEffect(() => {
    return () => {
      timer.current && clearInterval(timer.current);
    };
  }, []);

  // 코드 전송
  const sendRegisterMailCodeEvent = () => {
    const mailState: mailState = {
      no: mailInfo.data.no,
      address: mailInfo.data.address,
      code: parseInt(code),
      auth: false,
    };

    sendRegisterMailCodeRedux(mailState);
  };

  // 코드 생성
  const insertMailCodeEvent = () => {
    if (id !== '' && !idError.current) {
      const mailState: mailState = {
        no: 0,
        address: id,
        code: 0,
        auth: false,
      };

      const timerText: HTMLElement = document.querySelector(
        '#timerText',
      ) as HTMLElement;
      const idInput = document.querySelector('#email') as HTMLInputElement;
      timerText.innerText = '';
      idInput.disabled = true;

      insertRegisterMailCodeRedux(mailState);
    }
  };

  // 특수 문자 및 공백 체크
  const checkSpecialPattern = (str: string) => {
    const regExp = /[~!@#$%^&*()_+|<>?:{}]/;
    if (regExp.test(str) || str.search(/\s/) !== -1) {
      return true;
    } else {
      return false;
    }
  };

  // 비밀번호 패턴 체크 (8자 이상, 문자, 숫자, 특수문자 포함여부 체크)
  const checkPasswordPattern = (str: string) => {
    var pattern1 = /[0-9]/; // 숫자
    var pattern2 = /[a-zA-Z]/; // 문자
    var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
    if (
      !pattern1.test(str) ||
      !pattern2.test(str) ||
      !pattern3.test(str) ||
      str.length < 8
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkEmailPattern = (str: string) => {
    var regExp =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (!regExp.test(str)) {
      return true;
    } else {
      return false;
    }
  };

  const setNameEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length < 20) {
      checkSpecialPattern(value)
        ? (nameError.current = true)
        : (nameError.current = false);

      setName(e.target.value);
    }
  };

  const setIdEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    checkEmailPattern(value)
      ? (idError.current = true)
      : (idError.current = false);
    setId(e.target.value);
  };

  const setPwdEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length < 30) {
      checkPasswordPattern(value)
        ? (pwdError.current = true)
        : (pwdError.current = false);
      setPwd(value);
    }
  };

  const setRePwdEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (pwd !== value) {
      rePwdError.current = true;
    } else {
      rePwdError.current = false;
    }
    setRePwd(value);
  };

  const setCodeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const localRegisterEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !idError.current &&
      !pwdError.current &&
      !nameError.current &&
      mailInfo.data.auth
    ) {
      localRegister({
        id: id,
        pwd: pwd,
        name: name,
        auth_type: 'local',
      });
    }
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
          회원가입
        </Typography>
        <form className={classes.form} onSubmit={localRegisterEvent}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="이름"
                autoFocus
                value={name}
                onChange={setNameEvent}
                {...(nameError.current && {
                  helperText: '공백 및 특수문자는 사용하실 수 없습니다.',
                  error: true,
                })}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일"
                name="email"
                type="email"
                autoComplete="email"
                value={id}
                onChange={setIdEvent}
                {...(idError.current && {
                  helperText: '올바른 이메일 형식을 입력해주세요.',
                  error: true,
                })}
              />
            </Grid>
            <Grid item xs={4}>
              {mailInfo.loading ? (
                <CircularProgress />
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  id="timerBtn"
                  onClick={insertMailCodeEvent}
                >
                  코드 전송
                </Button>
              )}
              <span id="timerText" style={{ color: 'red' }}></span>
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="인증 번호"
                type="text"
                value={code}
                onChange={setCodeEvent}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={sendRegisterMailCodeEvent}
              >
                인증 확인
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="비밀번호"
                type="password"
                autoComplete="current-password"
                value={pwd}
                onChange={setPwdEvent}
                {...(pwdError.current && {
                  helperText:
                    '비밀번호는 8자리 이상 문자, 숫자, 특수문자로 구성하여야 합니다.',
                  error: true,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="비밀번호 재확인"
                type="password"
                autoComplete="current-password"
                value={rePwd}
                onChange={setRePwdEvent}
                {...(rePwdError.current && {
                  helperText: '비밀번호가 일치하지 않습니다.',
                  error: true,
                })}
              />
            </Grid>
          </Grid>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              회원가입
            </Button>
          )}
          {error && <Typography>{error}</Typography>}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default RegisterForm;
