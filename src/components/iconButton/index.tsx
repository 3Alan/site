import React, { forwardRef, PropsWithChildren } from 'react';
import './index.scss';

const cls = 'icon-btn';

interface IconButtonProps extends PropsWithChildren {
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, href, onClick, disabled }, ref) => {
    return (
      <button ref={ref} type="button" className={cls} onClick={onClick} disabled={disabled}>
        {href ? (
          <a className={cls} href={href} rel="noopener noreferrer" target="__blank">
            {children}
          </a>
        ) : (
          children
        )}
      </button>
    );
  }
);

export default IconButton;
