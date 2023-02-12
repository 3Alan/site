import React, { FC } from 'react';
import BaseXarrow, { xarrowPropsType } from 'react-xarrows';

interface XarrowProps extends Omit<xarrowPropsType, 'labels'> {
  label?: string;
  isLabelEnd?: boolean;
}

const Xarrow: FC<XarrowProps> = props => {
  const { isLabelEnd, showXarrow } = props;

  if (!showXarrow) {
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
      labels={
        isLabelEnd
          ? { end: <span style={{ fontSize: 12 }}>{props.label}</span> }
          : { start: <span style={{ fontSize: 12 }}>{props.label}</span> }
      }
    />
  );
};

export default Xarrow;
