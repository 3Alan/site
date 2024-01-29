import React, { forwardRef, HTMLAttributeAnchorTarget, PropsWithChildren, ReactNode } from 'react';
import './index.scss';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

const cls = 'btn';

interface ButtonProps extends PropsWithChildren {
  ariaLabel?: string;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  trackName?: string;
  target?: HTMLAttributeAnchorTarget;
}

const Button = forwardRef<any, ButtonProps>(
  ({ children, href, onClick, disabled, ariaLabel, icon, trackName, target = '_self' }, ref) => {
    if (href) {
      return (
        <Link
          ref={ref}
          href={href}
          target={target}
          data-umami-event={trackName}
          className={`${cls} ${cls}-anchor`}
        >
          <span className={`${cls}-icon`}>{icon}</span>
          {children && <span className={clsx({ [`${cls}-text-gap`]: icon })}>{children}</span>}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        data-umami-event={trackName}
        aria-label={ariaLabel}
        className={cls}
        onClick={onClick}
        disabled={disabled}
      >
        <span className={`${cls}-icon`}>{icon}</span>
        {children && <span className={clsx({ [`${cls}-text-gap`]: icon })}>{children}</span>}
      </button>
    );
  }
);

export default Button;
