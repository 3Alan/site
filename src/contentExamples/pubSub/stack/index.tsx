import clsx from 'clsx';
import React, { forwardRef, PropsWithChildren } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.scss';

const cls = 'pb-stack';

export interface StackProps extends PropsWithChildren {
  className?: string;
  title: string;
  list?: string[];
}

const Stack = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  const { className, title, list = [] } = props;

  return (
    <motion.div ref={ref} className={clsx(cls, className)}>
      <div className={`${cls}-title`}>{title}</div>
      {list.map(item => (
        <motion.div initial={{ x: -10, opacity: 0 }} className={`${cls}-node`} animate={{ x: 0, opacity: 1 }} transition={{delay: 0.5}}>
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
});

export default Stack;
