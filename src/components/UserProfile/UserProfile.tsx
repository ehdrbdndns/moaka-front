import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { profileStyles } from './styles';

export default function UserProfile() {
  const classes = profileStyles();
  const [state, setState] = React.useState({
    marketing: true,
    development: false,
    planning: false,
    gastroventure: false,
    job_preparation: true,
  });
  const [editState, setEditState] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleEdit = () => {
    setEditState(false);
    console.log(editState);
  };
  const handleSaveButton = () => {
    setEditState(true);
    console.log(editState);
  };
  const { marketing, development, planning, gastroventure, job_preparation } =
    state;
  const error =
    [marketing, development, planning, gastroventure, job_preparation].filter(
      v => v,
    ).length < 1;

  return (
    <div className={classes.root}>
      <div>
        <FormControl
          required
          error={error}
          component="fieldset"
          className={classes.formControl}
          disabled={editState}
        >
          <FormLabel component="legend">관심 분야를 설정해주세요.</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={marketing}
                  onChange={handleChange}
                  name="marketing"
                />
              }
              label="마케팅"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={development}
                  onChange={handleChange}
                  name="development"
                />
              }
              label="개발"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={planning}
                  onChange={handleChange}
                  name="planning"
                />
              }
              label="기획"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={gastroventure}
                  onChange={handleChange}
                  name="gastroventure"
                />
              }
              label="맛집"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={job_preparation}
                  onChange={handleChange}
                  name="job_preparation"
                />
              }
              label="취준"
            />
          </FormGroup>
          {error ? (
            <FormHelperText>
              최소한 하나의 관심분야를 선택하셔야 합니다.
            </FormHelperText>
          ) : (
            <div></div>
          )}
        </FormControl>
      </div>
      <div>
        {!editState ? (
          <Button
            className={classes.saveButton}
            variant="outlined"
            size="small"
            color="primary"
            onClick={handleSaveButton}
            disabled={error}
          >
            저장
          </Button>
        ) : (
          <IconButton
            className={classes.editButton}
            aria-label="delete"
            size="small"
            onClick={handleEdit}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        )}
      </div>
    </div>
  );
}
