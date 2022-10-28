import React, { FC, MouseEventHandler, PropsWithChildren } from 'react';
import Link from '@docusaurus/Link';
import './index.scss';
import clsx from 'clsx';

const cls = 'card';

interface CardProps extends PropsWithChildren {
  name: string;
  url: string;
  description?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const Card: FC<CardProps> = props => {
  const { name, description, url, className, children, onClick } = props;

  return (
    <div className={clsx(`${className}`, `${cls}`)} onClick={onClick}>
      <Link to={url}>{name}</Link>

      {description && <p>{description}</p>}
      {children}
    </div>
  );
};

Card.defaultProps = {
  className: ''
}

export default Card;
