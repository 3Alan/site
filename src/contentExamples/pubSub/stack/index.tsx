import clsx from 'clsx';
import React, { forwardRef, PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import './index.scss';
import Node from '../node';
import { EventItemProps } from '../eventCenter';

const cls = 'pb-stack';

export interface StackProps extends PropsWithChildren {
  className?: string;
  title: string;
  list?: EventItemProps[];
}

const Stack = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  const { className, title, list = [] } = props;

  return (
    <motion.div ref={ref} className={clsx(cls, className)}>
      <div className={`${cls}-title`}>{title}</div>
      {list.map(item => (
        <Node
          key={item.content}
          className={`${cls}-node`}
          animate={{ x: 0, opacity: 1 }}
          active={item.active}
          transition={{ delay: item.delay !== undefined ? item.delay : 0.5 }}
          activeAnimate={{ backgroundColor: 'rgba(187, 128, 9, 0.15)' }}
        >
          {item.content}
        </Node>
      ))}
    </motion.div>
  );
});

export default Stack;
