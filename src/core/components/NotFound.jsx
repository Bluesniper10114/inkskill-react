import React from 'react';
import { Link } from 'core/components';

const NotFound = ({ message = 'Not Found' }) => (
  <div className="error-screen">
    <h1>{message}</h1>
    <Link to="/">Go to the home page</Link>
  </div>
);

export default NotFound;
