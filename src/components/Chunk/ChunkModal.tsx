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
import { Editor_A as EditorAComponent } from '../Editor/Editor_A';
import { Editor_B as EditorBComponent } from '../Editor/Editor_B';
import { closeTagEvent, Tag_A as TagComponent } from '../Tag/Tag_A';
import '../../styles/main.scss';

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

type updateChunkModal = {
  title: string;
  description: string;
  link: string;
};

function DeleteChunkModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    console.log('123');

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
            <Button variant="contained" color="primary">
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

function UpdateChunkModal({ title, description, link }: updateChunkModal) {
  const sectionBtnClasses = sectionBtnStyles();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            <form>
              <header className="popup-bookmark__header">
                <TagComponent />
              </header>
              <main>
                <section>
                  <EditorAComponent
                    url={link}
                    profile="./img/moaka_logo.png"
                    title={title}
                    description={description}
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

function MakeChunkModal() {
  const sectionBtnClasses = sectionBtnStyles();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className={sectionBtnClasses.btn}
      >
        링크 추가
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
          <div className="popup-bookmark" onClick={closeTagEvent}>
            <form>
              <header className="popup-bookmark__header">
                <TagComponent />
              </header>
              <main>
                <section>
                  <EditorBComponent profile="./img/moaka_logo.png" />
                </section>
              </main>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export { DeleteChunkModal, UpdateChunkModal, MakeChunkModal };
