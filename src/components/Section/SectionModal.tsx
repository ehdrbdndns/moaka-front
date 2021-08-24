import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  createStyles,
  Fade,
  makeStyles,
  Modal,
  TextField,
  Theme,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import React, { useRef, useState } from 'react';
import { sectionInfo } from '../../modules/section/types';
import * as testAPI from '../../apis/section/section';
import { useEffect } from 'react';

const sectionBtnStyles = makeStyles((theme: Theme) =>
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
      background: 'none',
      outline: 'none',
      border: '1px solid black',
      padding: '10px 20px',
      marginBottom: '12px',
      cursor: 'pointer',
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

type tagType = {
  id: number;
  tag: string;
};

type makeSectionModalProps = {
  archive_no: number;
  loading: boolean;
  makeSectionRedux: (sectionInfo: sectionInfo) => void;
};

type deleteSectionModalProps = {
  section_no: number;
  loading: boolean;
  deleteSectionRedux: (section_no: number) => void;
};

type modifySectionModalProps = {
  section_no: number;
  loading: boolean;
  title_prop: string;
  description_prop: string;
  tag_list: Array<string>;
  modifySectionRedux: (sectionInfo: sectionInfo) => void;
};

export function MakeSectionModal({
  archive_no,
  loading,
  makeSectionRedux,
}: makeSectionModalProps) {
  const sectionBtnClasses = sectionBtnStyles();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const tagId = useRef<number>(0);
  const [tagList, setTagList] = useState<Array<tagType>>([]);
  const [tag, setTag] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const removeTagListEvent = (tagId: number) => {
    setTagList(tagList?.filter(tagItem => tagItem.id !== tagId));
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

  const setTitleEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const setDescriptionEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const makeSection = () => {
    const tag_list = new Array<string>();
    for (let i = 0; i < tagList.length; i++) {
      tag_list.push(tagList[i].tag);
    }
    const sectionInfo: sectionInfo = {
      no: undefined,
      title: title,
      archive_no: archive_no,
      description: description,
      tag_list,
      regdate: undefined,
    };
    makeSectionRedux(sectionInfo);
    setTitle('');
    setDescription('');
    setTagList([]);
    handleClose();
  };

  return (
    <div className={sectionBtnClasses.btn__box}>
      <button
        type="button"
        onClick={handleOpen}
        className={sectionBtnClasses.btn}
      >
        섹션 생성하기
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={sectionBtnClasses.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={sectionBtnClasses.paper}>
            <h2 id="transition-modal-title">섹션 생성</h2>
            <p id="transition-modal-description">
              섹션을 생성할 정보를 입력하세요.
            </p>
            <form>
              <TextField
                label="제목"
                variant="outlined"
                fullWidth
                required
                className={sectionBtnClasses.input}
                value={title}
                onChange={setTitleEvent}
              />
              <TextField
                id="outlined-multiline-static"
                label="설명"
                multiline
                fullWidth
                required
                rows={4}
                variant="outlined"
                className={sectionBtnClasses.input}
                value={description}
                onChange={setDescriptionEvent}
              />
              <Box className={sectionBtnClasses.tagBox}>
                {tagList &&
                  tagList.map(tagItem => (
                    <Box
                      key={tagItem.id}
                      className={sectionBtnClasses.tag}
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
                className={sectionBtnClasses.input}
              />
              <Box>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    startIcon={<SaveIcon />}
                    onClick={makeSection}
                  >
                    저장
                  </Button>
                )}
              </Box>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export function DeleteSectionModal({
  section_no,
  loading,
  deleteSectionRedux,
}: deleteSectionModalProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteSectionEvent = () => {
    deleteSectionRedux(section_no);
    handleClose();
  };

  const sectionBtnClasses = sectionBtnStyles();

  return (
    <div className={sectionBtnClasses.btn__box}>
      <button
        type="button"
        onClick={handleOpen}
        className={sectionBtnClasses.btn}
      >
        섹션 삭제하기
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={sectionBtnClasses.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={sectionBtnClasses.paper}>
            <h2 id="transition-modal-title">섹션 삭제</h2>
            <p id="transition-modal-description">
              정말 섹션을 삭제하시겠습니까?
            </p>
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <Button
                  onClick={deleteSectionEvent}
                  variant="contained"
                  color="primary"
                >
                  예
                </Button>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  color="secondary"
                >
                  아니요
                </Button>
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export function ModifySectionModal({
  section_no,
  loading,
  title_prop,
  description_prop,
  tag_list,
  modifySectionRedux,
}: modifySectionModalProps) {
  const sectionBtnClasses = sectionBtnStyles();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const tagId = useRef<number>(0);
  const [tagList, setTagList] = useState<Array<tagType>>([]);
  const [tag, setTag] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    for (let i = 0; i < tag_list.length; i++) {
      setTagList([
        ...tagList,
        {
          id: ++tagId.current,
          tag: tag_list[i],
        },
      ]);
    }
    setTitle(title_prop);
    setDescription(description_prop);
  }, [tag_list]);

  const removeTagListEvent = (tagId: number) => {
    setTagList(tagList?.filter(tagItem => tagItem.id !== tagId));
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

  const setTitleEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const setDescriptionEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const makeSection = () => {
    const tag_list = new Array<string>();
    for (let i = 0; i < tagList.length; i++) {
      tag_list.push(tagList[i].tag);
    }
    const sectionInfo: sectionInfo = {
      no: section_no,
      title: title,
      archive_no: 0,
      description: description,
      tag_list,
      regdate: undefined,
    };
    modifySectionRedux(sectionInfo);
    setTitle('');
    setDescription('');
    setTagList([]);
    handleClose();
  };

  return (
    <div className={sectionBtnClasses.btn__box}>
      <button
        type="button"
        onClick={handleOpen}
        className={sectionBtnClasses.btn}
      >
        섹션 수정하기
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={sectionBtnClasses.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={sectionBtnClasses.paper}>
            <h2 id="transition-modal-title">섹션 수정</h2>
            <p id="transition-modal-description">
              섹션을 수정할 정보를 입력하세요.
            </p>
            <form>
              <TextField
                label="제목"
                variant="outlined"
                fullWidth
                required
                className={sectionBtnClasses.input}
                value={title}
                onChange={setTitleEvent}
              />
              <TextField
                id="outlined-multiline-static"
                label="설명"
                multiline
                fullWidth
                required
                rows={4}
                variant="outlined"
                className={sectionBtnClasses.input}
                value={description}
                onChange={setDescriptionEvent}
              />
              <Box className={sectionBtnClasses.tagBox}>
                {tagList &&
                  tagList.map(tagItem => (
                    <Box
                      key={tagItem.id}
                      className={sectionBtnClasses.tag}
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
                className={sectionBtnClasses.input}
              />
              <Box>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    startIcon={<SaveIcon />}
                    onClick={makeSection}
                  >
                    저장
                  </Button>
                )}
              </Box>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
