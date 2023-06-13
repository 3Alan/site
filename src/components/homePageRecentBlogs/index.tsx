import React from 'react';
import Link from '@docusaurus/Link';
import './index.scss';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';

export interface RecentBlogItem {
  id: string;
  date: string;
  formattedDate: string;
  title: string;
  readingTime: number;
  permalink: string;
}

interface RecentBlogsProps {
  items: RecentBlogItem[];
  className?: string;
}

const cls = 'hp-blog';

function Date({ date, formattedDate }: { date: string; formattedDate: string }) {
  return (
    <time dateTime={date} itemProp="datePublished">
      {formattedDate}
    </time>
  );
}

const RecentBlogs = ({ items, className }: RecentBlogsProps) => {
  return (
    <section className={clsx(cls, className)}>
      <div className={`${cls}-title`}>
        <h2 id="recent-blogs">
          <Translate id="home.blogs.title">最新博文</Translate>
        </h2>
        <Link to="/blog">
          <Translate id="home.blogs.viewMore">查看全部 →</Translate>
        </Link>
      </div>

      <div className={`${cls}-wrap`}>
        {items.map(({ permalink, title, date, formattedDate }) => (
          <div className={`${cls}-item`} key={permalink}>
            <a href={permalink}>{title}</a>

            <Date date={date} formattedDate={formattedDate} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentBlogs;
