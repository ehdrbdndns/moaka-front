import { makeStyles } from '@material-ui/core';
import React from 'react';

const archiveHeaderStyles = makeStyles(theme => ({
  archiveProfile: {
    backgroundColor: 'white',
    backgroundImage: 'radial-gradient(#7a84dc 10%, transparent 0%)',
    backgroundPosition: '0 0, 30px 30px',
    backgroundSize: '10px 10px',
    width: '100%',
    height: '200px',
    opacity: '0.8',
    textAlign: 'center',
  },
  archiveTitle: {
    position: 'relative',
    top: '50px',
    fontSize: '30px',
  },
  archiveDesc: {
    position: 'relative',
    top: '50px',
  },
}));

function ArchiveHeaderForm() {
  const classes = archiveHeaderStyles();

  return (
    <div className={classes.archiveProfile}>
      <div className={classes.archiveTitle}>개발자들을 위한 꿀팁</div>
      <div className={classes.archiveDesc}>
        개발자들을 위한 꿀팁을 모아둔 아카이브 입니다. 누구나 참여 가능합니다.
      </div>
    </div>
  );
}

export default ArchiveHeaderForm;
