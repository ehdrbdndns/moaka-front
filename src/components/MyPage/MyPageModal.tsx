import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Backdrop,
  Button,
  createStyles,
  Fade,
  makeStyles,
  Modal,
  TextField,
} from '@material-ui/core';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { authState } from '../../modules/auth';
import { updateUserRequest } from '../../apis/auth/types';

const myPageStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: '350px',
    },
    avatar: {
      width: '96px',
      height: '96px',
      borderRadius: '100%',
      cursor: 'Pointer',
    },
    btn__box: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    btn: {
      backgroundColor: 'white',
      color: '#7a84dc',
      fontSize: '14px',
      width: '138px',
      height: '34px',
    },
    form: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    input: {
      marginBottom: '1rem',
    },
    tagBox: {
      marginBottom: '1rem',
    },
    tag: {
      border: '1px solid black',
      padding: '0.5rem',
      background: 'pink',
      borderRadius: '50%',
      cursor: 'pointer',
      marginRight: '0.5rem',
      marginBottom: '0.5rem',
      display: 'inline-block',
    },
  }),
);

type MypageModalProps = {
  authInfo: authState;
  logoutRedux: () => void;
  updateUserRedux: (userInfo: updateUserRequest) => void;
};

const names = ['개발', '기획', '디자인', '마케팅', '스타트업'];

function getStyles(name: string, category: readonly string[], theme: Theme) {
  return {
    fontWeight:
      category.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function MypageModal({
  authInfo,
  logoutRedux,
  updateUserRedux,
}: MypageModalProps) {
  const [open, setOpen] = useState(false);
  const classes = myPageStyles();

  const theme = useTheme();
  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [category, setcategory] = useState<string[]>([]);
  const [profileFile, setProfileFile] = useState<File>();
  const [profile, setProfile] = useState<string>('');

  useEffect(() => {
    setId(authInfo.id);
    setcategory(authInfo.category);
    setName(authInfo.name);
    setProfile(authInfo.profile);
  }, [authInfo.category, authInfo.name, authInfo.profile, authInfo.id]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent<typeof category>) => {
    const {
      target: { value },
    } = event;
    setcategory(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const openProfileInputEvent = () => {
    document.getElementById('profileFileInput')?.click();
  };

  const changeProfileInputEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = () => {
      setProfile(reader.result + '');
    };

    const file = e.target.files && e.target.files[0];
    if (file) {
      reader.readAsDataURL(file);
      setProfileFile(file);
    }
  };

  const setNameEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const updateUserEvent = () => {
    const userInfo: updateUserRequest = {
      info: {
        id: id,
        name: name,
        profile: profile,
        categoryList: category,
      },
      profileFile: profileFile || null,
    };

    handleClose();
    updateUserRedux(userInfo);
  };

  return (
    <>
      <div onClick={handleOpen} className={classes.btn__box}>
        <Avatar src={authInfo.profile} />
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">내 정보</h2>
            <p id="transition-modal-description">변경할 정보를 입력하세요.</p>
            <form>
              <TextField
                label="이메일"
                disabled
                variant="outlined"
                fullWidth
                required
                value={authInfo.id}
                className={classes.input}
              />
              <TextField
                label="이름"
                variant="outlined"
                fullWidth
                required
                onChange={setNameEvent}
                value={name}
                className={classes.input}
              />
              <img
                id="profile"
                className={classes.avatar}
                src={profile}
                onClick={openProfileInputEvent}
                alt="사용자 프로파일"
              />
              <input
                type="file"
                hidden
                id="profileFileInput"
                onChange={changeProfileInputEvent}
                accept="image/*"
              />
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">
                  관심 카테고리
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={category}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="관심 카테고리"
                    />
                  }
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map(name => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, category, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                onClick={updateUserEvent}
                fullWidth
                variant="contained"
                color="primary"
              >
                저장
              </Button>
              <Button
                onClick={logoutRedux}
                fullWidth
                variant="contained"
                color="secondary"
              >
                로그아웃
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default MypageModal;
