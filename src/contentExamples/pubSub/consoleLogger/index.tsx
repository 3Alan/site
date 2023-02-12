import React from 'react';
import './index.scss';

const cls = 'pb-logger';

const ConsoleLogger = props => {
  return (
    <div className={cls}>
      <span className={`${cls}-prefix`}>log: </span>
      <span dangerouslySetInnerHTML={{__html: props.children}}></span>
    </div>
  );
};

export default ConsoleLogger;
