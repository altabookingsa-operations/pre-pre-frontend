import React from 'react';
import Skeleton from 'react-loading-skeleton';

const MapLoader = () => {
  return (
    <div className="googleMapCustome">
      <Skeleton style={{ width: '99%', height: '100%' }} />
    </div>
  );
};

export default MapLoader;
