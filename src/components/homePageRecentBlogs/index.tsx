import React from 'react';
import Link from '@docusaurus/Link';
import './index.scss';
import clsx from 'clsx';

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
        <h2 id="recent-blogs">最新博文</h2>
        <Link to="/blog">查看全部 →</Link>
      </div>

      <div className={`${cls}-wrap`}>
        {items.map(({ permalink, title, date, formattedDate, readingTime }) => (
          <div className={`${cls}-item`}>
            <a href={permalink}>{title}</a>

            <Date date={date} formattedDate={formattedDate} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentBlogs;
