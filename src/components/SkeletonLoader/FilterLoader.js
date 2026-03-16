import { Button, DialogActions, DialogContent } from '@mui/material';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const FilterLoader = () => {
  return (
    <>
      <DialogContent dividers className="dialog-content-filter pb-3">
        <div className="row">
          <div className="col-12">
            {[1, 2, 3, 4, 5].map(i => (
              <>
                <Skeleton animation="wave" />
                <Skeleton animation="wave" width={800} />
                <Skeleton animation="wave" width={650} />
                <Skeleton animation="wave" width={450} />
                <Skeleton animation="wave" width={150} />
              </>
            ))}
          </div>
        </div>
      </DialogContent>
    </>
  );
};

export default FilterLoader;
