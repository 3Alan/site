import React from 'react';
import './index.scss';

const cls = 'icon-btn';

const IconButton = ({ children }) => {
  return <button className={cls}>{children}</button>;
};

export default IconButton;
