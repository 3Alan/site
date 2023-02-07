import clsx from 'clsx';
import React, { forwardRef, PropsWithChildren, useEffect } from 'react';
import { motion, AnimationProps, TargetAndTransition, Target, Transition } from 'framer-motion';
import './index.scss';

const cls = 'pb-node';

export interface NodeProps extends PropsWithChildren, AnimationProps {
  active?: boolean;
  initial?: Target;
  animate?: TargetAndTransition;
  activeAnimate?: TargetAndTransition;
  transition?: Transition;
  className?: string;
}

const Node = forwardRef<HTMLDivElement, NodeProps>((props, ref) => {
  const { className, active, initial, transition, activeAnimate, animate } = props;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      className={clsx(cls, className)}
      animate={active ? activeAnimate : animate}
      transition={{ delay: 0.5, ...transition }}
    >
      {props.children}
    </motion.div>
  );
});

Node.defaultProps = {
  activeAnimate: {
    backgroundColor: 'rgba(187, 128, 9, 0.15)',
    borderColor: 'rgba(187, 128, 9, 0.4)'
  }
};

export default Node;
