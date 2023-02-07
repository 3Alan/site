import clsx from 'clsx';
import React, { forwardRef, PropsWithChildren, useEffect } from 'react';
import { motion, AnimationProps, useAnimationControls } from 'framer-motion';
import './index.scss';

const cls = 'pb-node';

export interface NodeProps extends PropsWithChildren, AnimationProps {
  active?: boolean;
  className?: string;
}

const Node = forwardRef<HTMLDivElement, NodeProps>((props, ref) => {
  const { className, active, animate } = props;
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      backgroundColor: active ? 'rgba(187, 128, 9, 0.15)' : '#222f43',
      borderColor: active ? 'rgba(187, 128, 9, 0.4)' : 'rgba(56, 139, 253, 0.4)'
    });
  }, [active]);

  return (
    <motion.div
      ref={ref}
      className={clsx(cls, className)}
      animate={controls}
      transition={{ delay: 0.5 }}
    >
      {props.children}
    </motion.div>
  );
});

export default Node;
