import React, { useEffect } from 'react';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import ArchiveCardForm from '../components/Archive/ArchiveCardForm';
import { RootState } from '../modules';
import { archiveInfo, searchArchive } from '../modules/archive';
import queryString from 'query-string';

function Search() {
  const location = useLocation();
  const query = queryString.parse(location.search);

  const dispatch = useDispatch();
  const archive_info = useSelector((state: RootState) => state.archive);

  useEffect(() => {
    query.p && dispatch(searchArchive(query.p + ''));
  }, [dispatch, query.p]);

  return (
    <Box my={2}>
      {archive_info.loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {archive_info.data?.map((archive: archiveInfo) => (
            <Grid key={archive.no} item lg={3} sm={6} xs={12}>
              <ArchiveCardForm archive_info={archive} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Search;
