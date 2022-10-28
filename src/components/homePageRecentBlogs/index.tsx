import React from 'react';
import { translate } from '@docusaurus/Translate';
import { usePluralForm } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import Card from '../card';
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

function useReadingTimePlural() {
  const { selectMessage } = usePluralForm();
  return (readingTimeFloat: number) => {
    const readingTime = Math.ceil(readingTimeFloat);
    return selectMessage(
      readingTime,
      translate(
        {
          id: 'theme.blog.post.readingTime.plurals',
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One min read|{readingTime} min read'
        },
        { readingTime }
      )
    );
  };
}

function ReadingTime({ readingTime }: { readingTime: number }) {
  const readingTimePlural = useReadingTimePlural();
  return <>{readingTimePlural(readingTime)}</>;
}

function Date({
  date,
  formattedDate
}: {
  date: string;
  formattedDate: string;
}) {
  return (
    <time dateTime={date} itemProp="datePublished">
      {formattedDate}
    </time>
  );
}

function Spacer() {
  return <>{' · '}</>;
}

const RecentBlogs = ({ items, className }: RecentBlogsProps) => {
  return (
    <section className={clsx(cls, className)}>
      <div className={`${cls}-title`}>
        <h2 id='recent-blogs'>最新博文</h2>
        <Link to="/blog">查看全部 →</Link>
      </div>

      <div className={`${cls}-wrap`}>
        {items.map(({ permalink, title, date, formattedDate, readingTime }) => (
          <Card key={permalink} url={permalink} name={title}>
            <span className={`${cls}-content`}>
              <Date date={date} formattedDate={formattedDate} />
              {typeof readingTime !== 'undefined' && (
                <>
                  <Spacer />
                  <ReadingTime readingTime={readingTime} />
                </>
              )}
            </span>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RecentBlogs;
