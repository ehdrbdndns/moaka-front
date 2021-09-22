import {
  Backdrop,
  Button,
  createStyles,
  Fade,
  makeStyles,
  Modal,
  Theme,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Editor_B as EditorBComponent } from '../Editor/Editor_B';
import { closeTagEvent, Tag_A as TagAComponent } from '../Tag/Tag_A';
import '../../styles/main.scss';
import { chunkInfo } from '../../modules/section';
import { useEffect } from 'react';

const sectionBtnStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    updateModal: {
      width: '375px',
      background: 'white',
      padding: '0px 20px 18px 35px',
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
      // width: '138px',
      // height: '34px',
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

type updateChunkModalProps = {
  chunk_no: number;
  _title: string;
  _description: string;
  _url: string;
  chunk_tag_list: string[];
  section_tag_list: string[];
  section_no: number;
  updateChunkRedux: (chunkInfo: chunkInfo) => void;
};

type deleteChunkModalProps = {
  deleteChunk: () => void;
};

type makeChunkModalProps = {
  section_no: number;
  section_tag_list: string[];
  makeChunkRedux: (chunkInfo: chunkInfo) => void;
};

function DeleteChunkModal({ deleteChunk }: deleteChunkModalProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sectionBtnClasses = sectionBtnStyles();

  return (
    <>
      <div onClick={handleOpen}>삭제</div>
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
            <h2 id="transition-modal-title">링크 삭제</h2>
            <p id="transition-modal-description">
              정말 링크를 삭제하시겠습니까?
            </p>
            <Button variant="contained" color="primary" onClick={deleteChunk}>
              예
            </Button>
            <Button onClick={handleClose} variant="contained" color="secondary">
              아니요
            </Button>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

function UpdateChunkModal({
  chunk_no,
  _title,
  _description,
  _url,
  chunk_tag_list,
  section_tag_list,
  section_no,
  updateChunkRedux,
}: updateChunkModalProps) {
  const sectionBtnClasses = sectionBtnStyles();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tagList, setTagList] = useState<Array<string>>([]);

  useEffect(() => {
    setTitle(_title);
    setUrl(_url);
    setDescription(_description);
  }, [_title, _url, _description]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateChunkSubmitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // LINK PREVIEW에게 가지고 온 정보
    const link_title: string = (
      document.getElementsByClassName('Title')[0] as HTMLElement
    )?.innerText;

    // TODO LINK PREVIEW가 업데이트 됐는지 확인
    if (link_title !== undefined) {
      const link_description: string = (
        document.getElementsByClassName('Description')[0] as HTMLElement
      )?.innerText;
      const backgroundImage = (
        document.getElementsByClassName('Image')[0] as HTMLElement
      )?.style.backgroundImage;
      const thumbnail = backgroundImage
        ? backgroundImage.slice(4, -1).replace(/["']/g, '')
        : '';

      const chunkInfo: chunkInfo = {
        no: chunk_no,
        section_no: section_no,
        title: title,
        description: description,
        tag_list: tagList,
        link: url,
        link_description: link_description ? link_description : '',
        link_title: link_title,
        thumbnail: thumbnail,
        regdate: '',
        bookmark_no: 0,
        bookmark_loading: false,
        like_no: 0,
        like_loading: false,
      };

      updateChunkRedux(chunkInfo);
    }
  };

  return (
    <>
      <span onClick={handleOpen}>수정</span>
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
          <div className="popup-bookmark" onClick={closeTagEvent}>
            <form onSubmit={updateChunkSubmitEvent}>
              <header className="popup-bookmark__header">
                <TagAComponent
                  chunk_tag_list={chunk_tag_list}
                  section_tag_list={section_tag_list}
                  tag_list={tagList}
                  setTagList={setTagList}
                />
              </header>
              <main>
                <section>
                  <EditorBComponent
                    profile="./img/moaka_logo.png"
                    url={url}
                    title={title}
                    description={description}
                    setTitle={setTitle}
                    setUrl={setUrl}
                    setDescription={setDescription}
                  />
                </section>
              </main>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

function MakeChunkModal({
  section_no,
  section_tag_list,
  makeChunkRedux,
}: makeChunkModalProps) {
  const sectionBtnClasses = sectionBtnStyles();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tagList, setTagList] = useState<Array<string>>([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const makeChunkSubmitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // LINK PREVIEW에게 가지고 온 정보
    const link_title: string = (
      document.getElementsByClassName('Title')[0] as HTMLElement
    )?.innerText;

    // TODO LINK PREVIEW가 업데이트 됐는지 확인
    if (link_title !== undefined) {
      const link_description: string = (
        document.getElementsByClassName('Description')[0] as HTMLElement
      )?.innerText;
      const backgroundImage = (
        document.getElementsByClassName('Image')[0] as HTMLElement
      )?.style.backgroundImage;
      const thumbnail = backgroundImage
        ? backgroundImage.slice(4, -1).replace(/["']/g, '')
        : '';

      const chunkInfo: chunkInfo = {
        no: 0,
        section_no: section_no,
        title: title,
        description: description,
        tag_list: tagList,
        link: url,
        link_description: link_description ? link_description : '',
        link_title: link_title,
        thumbnail: thumbnail,
        regdate: '',
        bookmark_no: 0,
        bookmark_loading: false,
        like_no: 0,
        like_loading: false,
      };

      makeChunkRedux(chunkInfo);
    }
  };

  return (
    <>
      <div className={sectionBtnClasses.btn__box}>
        <Button
          onClick={handleOpen}
          className={sectionBtnClasses.btn}
          variant="outlined"
        >
          컨텐츠 추가
        </Button>
      </div>
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
          <div className="popup-bookmark" onClick={closeTagEvent}>
            <form onSubmit={makeChunkSubmitEvent}>
              <header className="popup-bookmark__header">
                <TagAComponent
                  section_tag_list={section_tag_list}
                  tag_list={tagList}
                  setTagList={setTagList}
                  chunk_tag_list={[]}
                />
              </header>
              <main>
                <section>
                  <EditorBComponent
                    profile="./img/moaka_logo.png"
                    url={url}
                    title={title}
                    description={description}
                    setTitle={setTitle}
                    setUrl={setUrl}
                    setDescription={setDescription}
                  />
                </section>
              </main>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

function MakeRelativeChunkModal() {
  const sectionBtnClasses = sectionBtnStyles();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const makeChunkSubmitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className={sectionBtnClasses.btn__box}>
        <Button
          onClick={handleOpen}
          className={sectionBtnClasses.btn}
          variant="outlined"
        >
          관련 컨텐츠 추가
        </Button>
      </div>
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
          <div className="popup-bookmark" onClick={closeTagEvent}>
            <form onSubmit={makeChunkSubmitEvent}>
              <header className="popup-bookmark__header"></header>
              <main>
                <section>
                  <EditorBComponent
                    profile="./img/moaka_logo.png"
                    url={url}
                    title={title}
                    description={description}
                    setTitle={setTitle}
                    setUrl={setUrl}
                    setDescription={setDescription}
                  />
                </section>
              </main>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export {
  DeleteChunkModal,
  UpdateChunkModal,
  MakeChunkModal,
  MakeRelativeChunkModal,
};
