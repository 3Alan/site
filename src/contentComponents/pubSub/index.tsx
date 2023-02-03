import React from 'react';
import { FaUndo } from 'react-icons/fa';
import IconButton from '../../components/iconButton';
import './index.scss';

const cls = 'a-content-wrap';

const PubSub = () => {
  return <div className={cls}>
    <div className={`${cls}-content`}>content</div>
    <div className={`${cls}-menu`}>
      <IconButton>
        <FaUndo />
      </IconButton>
      <IconButton>
        <FaUndo />
      </IconButton>
    </div>
  </div>;
};

export default PubSub;
