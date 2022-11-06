import React, { FC, ReactNode } from 'react';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';

import './index.scss';
import Skills from '../components/homePageSkills';
import AboutMe from '../components/homePageAboutMe';
import Projects from '../components/homPageProjects';
import RecentBlogs, { RecentBlogItem } from '../components/homePageRecentBlogs';
import { useAllPluginInstancesData } from '@docusaurus/useGlobalData';
import clsx from 'clsx';
import Wave from '../components/ware';

const cls = 'home-page';

interface HomePageSectionProps {
  content: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  hasWave?: boolean;
}

const HomePageSection: FC<HomePageSectionProps> = ({
  content,
  header,
  footer,
  hasWave
}) => {
  return (
    <>
      {hasWave && <Wave className={`${cls}-t-wave`} />}
      <div className={clsx({ [`${cls}-wave-bg`]: hasWave })}>
        {header}
        <div className="container">{content}</div>
        {footer}
      </div>
      {hasWave && <Wave isBottom className={`${cls}-b-wave`} />}
    </>
  );
};

function Intro(): JSX.Element {
  return (
    <div className={`${cls}-intro`}>
      <div className={`container ${cls}-intro-wrap`}>
        <div className={`${cls}-me`}>
          <p>
            <span className={`${cls}-info`}>👋</span> Hello, 我是
          </p>
          <h1>ALAN WANG</h1>
          <a
            href="https://github.com/3Alan"
            target="_blank"
            className={`button button--secondary ${cls}-gh-btn`}
          >
            <img
              width={24}
              height={24}
              src="data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'/%3E%3C/svg%3E"
              alt="GitHub profile"
            />
            <span>Github</span>
          </a>
        </div>

        <CodeBlock className={`${cls}-code`} language="js" showLineNumbers>
          {`const siteInfo = {
  maintainer: {
    name: 'Alan',
    github: 'https://github.com/3Alan',
    stacks: ['React', 'Typescript', 'Sass', 'Node']
  },
  category: 'blog',
  stacks: ['Docusaurus', 'Algolia', 'Vercel']
}
`}
        </CodeBlock>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { blog } = useAllPluginInstancesData(
    'docusaurus-plugin-content-blog'
  ) as { blog: { recentBlogs: RecentBlogItem[] } };

  return (
    <Layout description="一个专注于前端开发的小白，分享前端开发知识/教程">
      <div className={cls}>
        <main>
          <Intro />
          <HomePageSection content={<AboutMe />} hasWave />
          <HomePageSection content={<Projects />} />
          <HomePageSection content={<Skills />} hasWave />
          <HomePageSection
            content={
              <RecentBlogs items={blog.recentBlogs} className={`${cls}-blog`} />
            }
          />
        </main>
      </div>
    </Layout>
  );
}
