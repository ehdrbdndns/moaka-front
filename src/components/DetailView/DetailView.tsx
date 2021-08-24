import React from 'react';

import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import Modal from '@material-ui/core/Modal';
import { detailStyles } from './styles';
import { detailProps, ChipData } from './types';
import Button from '@material-ui/core/Button';
import AddContentModal from '../AddContent/AddContentModal';

export default function DetailView(props: detailProps) {
  const classes = detailStyles();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [chipData, setChipData] = React.useState<ChipData[]>([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };

  return (
    <div className={classes.detailViewLayout}>
      <div className={classes.detailHeader}>
        <h3 className={'folderName'}>FolderName</h3>
        <Button
          className={classes.addContentButton}
          variant="outlined"
          onClick={handleModalOpen}
        >
          Add Content
        </Button>
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <AddContentModal />
        </Modal>
      </div>
      <Divider />
      <div className={classes.contentsTag}>
        <Paper component="ul" className={classes.chipRoot}>
          {chipData.map(data => {
            let icon;

            if (data.label === 'React') {
              icon = <TagFacesIcon />;
            }

            return (
              <li key={data.key}>
                <Chip
                  icon={icon}
                  label={data.label}
                  onDelete={
                    data.label === 'React' ? undefined : handleDelete(data)
                  }
                  className={classes.chip}
                />
              </li>
            );
          })}
        </Paper>
      </div>
      <Divider />
      <div className={classes.contents}>contents</div>
    </div>
  );
}
