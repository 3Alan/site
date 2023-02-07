import React, { FC } from 'react';
import BaseXarrow, { xarrowPropsType } from 'react-xarrows';

interface XarrowProps extends Omit<xarrowPropsType, 'labels'> {
  label?: string;
}

const Xarrow: FC<XarrowProps> = props => {
  if (!props.showXarrow) {
    return null;
  }

  return (
    <BaseXarrow
      animateDrawing={0.5}
      strokeWidth={2}
      path="smooth"
      showTail
      tailShape="circle"
      tailSize={4}
      {...props}
      labels={{ start: <span style={{ fontSize: 12 }}>{props.label}</span> }}
    />
  );
};

export default Xarrow;
