import React, { useState } from 'react';
import { AddContentStyles } from './styles';

export default function AddContentModal() {
  const classes = AddContentStyles();
  return (
    <div className={classes.modalBox}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );
}
