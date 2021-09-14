import React, { useEffect, useRef, useState } from 'react';
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
import { userListType } from '../../apis/user/types';
import { archiveInfo } from '../../modules/archive';
import { insertArchiveRequest } from '../../apis/archives/types';

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

type MakeArchiveModalProps = {
  search_user_loading: boolean;
  search_user_list: Array<userListType>;
  search_user_error: string;
  searchUserListRedux: (id: string) => void;
  insertArchiveRedux: (insertArchiveRequest: insertArchiveRequest) => void;
};

function MakeArchiveModal({
  search_user_loading,
  search_user_list,
  search_user_error,
  searchUserListRedux,
  insertArchiveRedux,
}: MakeArchiveModalProps) {
  const archiveBtnClasses = ArchiveBtnStyles();

  // 모달창 ON/OFF
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [thumbnailFile, setThumbnailFile] = useState<File>();
  // 아카이브 태그
  const tagId = useRef<number>(0);
  const [tag, setTag] = useState<string>('');
  const [tagList, setTagList] = useState<Array<tagType>>([]);
  // 아키이브 공개 여부
  const [privacy, setPrivacy] = useState('private');
  // 그룹에 사용자 초대할 때 검색하는 ID
  const [userId, setUserId] = useState('');
  // 그룹 초대 사용자 리스트
  const [groupUserList, setGroupUserList] = useState<Array<userListType>>([]);
  // 이미 그룹에 초대되어있는지 확인
  const isExistUser = useRef<boolean>(false);

  useEffect(() => {
    search_user_list &&
      search_user_list.map(search_user => {
        setGroupUserList(groupUserList => [...groupUserList, search_user]);
      });
  }, [search_user_list]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setTitleEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const setDescriptionEvent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
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

  const searchUserListEvent = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      isExistUser.current = false;

      groupUserList.map(groupUser => {
        if (groupUser.id === userId) {
          isExistUser.current = true;
          return false;
        }
        return true;
      });

      !isExistUser.current && searchUserListRedux(userId);
    }
  };

  const deleteSearchUserEvent = (user_no: number) => {
    setGroupUserList(
      groupUserList.filter(groupUser => groupUser.no !== user_no),
    );
  };

  const setThunmbnailFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files && Array.from(e.target.files)[0];
    files && setThumbnailFile(files);
  };

  const insertArchiveEvent = () => {
    const tag_list: string[] = [];
    tagList.map(tag => {
      tag_list.push(tag.tag);
    });
    const group_list: number[] = [];
    groupUserList.map(user => {
      group_list.push(user.no);
    });
    if (thumbnailFile != null) {
      const insertArchiveRequest: insertArchiveRequest = {
        info: {
          title: title,
          description: description,
          tag_list: tag_list,
          group_no_list: group_list,
          privacy_type: privacy,
        },
        thumbnailFile: thumbnailFile,
      };

      insertArchiveRedux(insertArchiveRequest);
    } else {
      alert('저장소 이미지를 설정해주세요.');
    }

    setTitle('');
    setDescription('');
    setTagList([]);
    setGroupUserList([]);
    setThumbnailFile(undefined);

    handleClose();
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
                value={title}
                onChange={setTitleEvent}
                className={archiveBtnClasses.input}
              />
              <TextField
                label="설명"
                multiline
                fullWidth
                required
                rows={4}
                variant="outlined"
                value={description}
                onChange={setDescriptionEvent}
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
                <label htmlFor="thumbnail">저장소 썸네일 설정</label>
                <input
                  type="file"
                  id="thumbnailFile"
                  onChange={setThunmbnailFile}
                  className="px-mb-12"
                />
              </Box>
              <TextField
                label="초대할 친구 이메일"
                variant="outlined"
                value={userId}
                className={archiveBtnClasses.input}
                onChange={setUserIdEvent}
                onKeyPress={searchUserListEvent}
              />
              <Grid item xs={12}>
                <Typography variant="h6">초대된 친구</Typography>
                <div className={archiveBtnClasses.demo}>
                  <List dense={true}>
                    {groupUserList.map(groupUser => (
                      <ListItem key={groupUser.no}>
                        <ListItemAvatar>
                          <Avatar
                            alt={groupUser.name}
                            src={groupUser.profile}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={groupUser.name}
                          secondary={groupUser.id}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => deleteSearchUserEvent(groupUser.no)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
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
                  onClick={insertArchiveEvent}
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