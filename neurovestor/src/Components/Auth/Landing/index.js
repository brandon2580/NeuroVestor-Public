import React from 'react';
import OverviewPageImage from './img/OverviewPageImage.PNG';

const Landing = () => (
  <div className="row margin-banner">
    <div className="col-lg-3" style={{ 'marginLeft': '5%' }}>
      <h1>NeuroVestor</h1>
      <h3>A Modern Day Analysis Platform</h3>
    </div>
    <div className="col-lg-6" style={{ 'marginRight': '1px' }}>
      <img src={OverviewPageImage} style={{ 'width': '135%', 'borderRadius': '10px', 'outline': '2px solid rgb(36, 145, 255)' }} />
    </div>
  </div>
);

export default Landing;
