import React, { forwardRef, PropsWithChildren, useEffect } from 'react';
import './index.scss';
import Stack from '../stack';
import Node from '../node';

const cls = 'pb-center';

interface EventItem {
  [eventName: string]: string[];
}

export interface EventCenterProps extends PropsWithChildren {
  option: EventItem;
  className?: string;
}

const EventCenter = forwardRef<HTMLDivElement, EventCenterProps>((props, ref) => {
  const { className, option } = props;

  return (
    <Node ref={ref} className={`${cls}-center`}>
      <i>EventCenter</i>
      <div className={`${cls}-center-content`}>
        {Object.keys(option).map(key => (
          <Stack title={key} list={option[key]} />
        ))}
      </div>
    </Node>
  );
});

export default EventCenter;
