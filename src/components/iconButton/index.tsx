import React, { forwardRef, PropsWithChildren } from 'react';
import './index.scss';

const cls = 'icon-btn';

interface IconButtonProps extends PropsWithChildren {
  ariaLabel: string;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, href, onClick, disabled, ariaLabel }, ref) => {
    return (
      <button ref={ref} type="button" aria-label={ariaLabel} className={cls} onClick={onClick} disabled={disabled}>
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
