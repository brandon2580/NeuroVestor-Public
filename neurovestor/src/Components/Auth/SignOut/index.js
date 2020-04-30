import React from 'react';
import { withFirebase } from '../Firebase';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const SignOutButton = ({ firebase }) => (
  <Link className="nav-link">
    <Button type="default" onClick={firebase.doSignOut} className="TabItem">Sign Out</Button>
  </Link>
);

export default withFirebase(SignOutButton);
