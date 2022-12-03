import React, { FC, ReactNode } from 'react';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import { VscGithubInverted } from 'react-icons/vsc';
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
            <VscGithubInverted size={24} className={`${cls}-github`} />
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
