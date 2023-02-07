import React, { forwardRef, PropsWithChildren, useEffect } from 'react';
import './index.scss';
import Stack from '../stack';
import Node from '../node';

const cls = 'pb-center';

export interface EventItemProps {
  content: string;
  active?: boolean;
  delay?: number;
}

interface EventItem {
  [eventName: string]: EventItemProps[];
}

export interface EventCenterProps extends PropsWithChildren {
  option: EventItem;
  active?: boolean;
  className?: string;
}

const EventCenter = forwardRef<HTMLDivElement, EventCenterProps>((props, ref) => {
  const { option, active } = props;

  return (
    <Node ref={ref} active={active} className={`${cls}-center`}>
      <i>EventCenter</i>
      <div className={`${cls}-center-content`}>
        {option &&
          Object.keys(option).map(key => <Stack key={key} title={key} list={option[key]} />)}
      </div>
    </Node>
  );
});

export default EventCenter;
