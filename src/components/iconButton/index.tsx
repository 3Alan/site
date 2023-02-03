import React, { FC, PropsWithChildren } from 'react';
import './index.scss';

const cls = 'icon-btn';

interface IconButtonProps extends PropsWithChildren {
  disabled?: boolean;
  onClick?: () => void;
}

const IconButton: FC<IconButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default IconButton;
