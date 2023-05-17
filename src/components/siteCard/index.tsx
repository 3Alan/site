import Link from '@docusaurus/Link';
import React from 'react';
import './index.scss';

interface SiteCardProps {
  key: string;
  url: string;
  title: string;
  description: string;
  img: string;
}

const cls = 'site-card';

export default function SiteCard({ url, title, description, img, key }: SiteCardProps) {
  return (
    <Link
      className={cls}
      href={url}
      rel="external nofollow noopener noreferrer"
      data-umami-event="site-card"
      data-umami-event-site={key}
    >
      <div className={`${cls}-img-wrap`}>
        <img src={img} alt={title} />
      </div>
      <div className={`${cls}-content`}>
        <span>{title}</span>
        <span className={`${cls}-desc`} title={description}>
          {description}
        </span>
      </div>
    </Link>
  );
}
