import React, { useRef, useState } from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  Button,
  Backdrop,
  TextField,
  Box,
  Modal,
  Fade,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { userInfo } from '../../modules/auth';

const ArchiveBtnStyles = makeStyles((theme: Theme) =>
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
      width: '100%',
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
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

type tagType = {
  id: number;
  tag: string;
};

function MakeArchiveModal() {
  const archiveBtnClasses = ArchiveBtnStyles();

  const [open, setOpen] = useState(false);
  const tagId = useRef<number>(0);
  const [tagList, setTagList] = useState<Array<tagType>>([]);
  const [tag, setTag] = useState<string>('');
  const [privacy, setPrivacy] = useState('private');
  const [userList, setUserList] = useState<Array<userInfo>>([]);
  const [userId, setUserId] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrivacy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacy((event.target as HTMLInputElement).value);
  };

  const setTagListEvent = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      tag &&
        setTagList([
          ...tagList,
          {
            id: ++tagId.current,
            tag,
          },
        ]);
      setTag('');
    }
  };

  const setTagEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const removeTagListEvent = (tagId: number) => {
    setTagList(tagList?.filter(tagItem => tagItem.id !== tagId));
  };

  const setUserIdEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };
  return (
    <div className={archiveBtnClasses.btn__box}>
      <Button
        onClick={handleOpen}
        className={archiveBtnClasses.btn}
        variant="outlined"
      >
        저장소 생성하기
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={archiveBtnClasses.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={archiveBtnClasses.paper}>
            <h2 id="transition-modal-title">저장소 생성</h2>
            <p id="transition-modal-description">
              저장소를 생성할 정보를 입력하세요.
            </p>
            <form>
              <TextField
                label="제목"
                variant="outlined"
                fullWidth
                required
                className={archiveBtnClasses.input}
              />
              <TextField
                id="outlined-multiline-static"
                label="설명"
                multiline
                fullWidth
                required
                rows={4}
                variant="outlined"
                className={archiveBtnClasses.input}
              />
              <Box className={archiveBtnClasses.tagBox}>
                {tagList &&
                  tagList.map(tagItem => (
                    <Box
                      key={tagItem.id}
                      className={archiveBtnClasses.tag}
                      component="span"
                      onClick={() => removeTagListEvent(tagItem.id)}
                    >
                      {tagItem.tag}
                    </Box>
                  ))}
              </Box>
              <TextField
                label="태그"
                variant="outlined"
                value={tag}
                onKeyPress={setTagListEvent}
                onChange={setTagEvent}
                className={archiveBtnClasses.input}
              />
              <Box>
                <label htmlFor="thumbnail">저장소 이미지 설정</label>
                <input type="file" id="thumbnail" className="px-mb-12" />
              </Box>
              <TextField
                label="초대할 친구 이메일"
                variant="outlined"
                value={userId}
                className={archiveBtnClasses.input}
                onChange={setUserIdEvent}
              />
              <Grid item xs={12}>
                <Typography variant="h6">초대된 친구</Typography>
                <div className={archiveBtnClasses.demo}>
                  <List dense={true}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Single-line item"
                        secondary="Secondary text"
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Single-line item"
                        secondary="Secondary text"
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </div>
              </Grid>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="privacy"
                  name="privacy"
                  value={privacy}
                  onChange={handlePrivacy}
                >
                  <FormControlLabel
                    value="public"
                    control={<Radio />}
                    label="공개"
                  />
                  <FormControlLabel
                    value="private"
                    control={<Radio />}
                    label="비공개"
                  />
                </RadioGroup>
              </FormControl>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  startIcon={<SaveIcon />}
                >
                  저장
                </Button>
              </Box>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export { MakeArchiveModal };
