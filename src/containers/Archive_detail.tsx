import React from 'react';
import ArchiveBar from '../components/Archive_bar/ArchiveBar';
import Section from './Section';

function Archive_detail() {
  return (
    <div>
      <ArchiveBar view="detail" />
      <Section />
    </div>
  );
}

export default Archive_detail;
