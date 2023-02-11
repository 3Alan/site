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

export interface EventBusProps extends PropsWithChildren {
  option: EventItem;
  active?: boolean;
  title?: string;
  className?: string;
}

const EventBus = forwardRef<HTMLDivElement, EventBusProps>((props, ref) => {
  const { option, active, title = 'EventBus' } = props;

  return (
    <Node ref={ref} active={active} className={`${cls}-center`}>
      <i>{title}</i>
      <div className={`${cls}-center-content`}>
        {option &&
          Object.keys(option).map(key => <Stack key={key} title={key} list={option[key]} />)}
      </div>
    </Node>
  );
});

export default EventBus;
