---
summary: >-
  这个页面是 Alan Wang 的个人主页。他是一位前端开发人员，技术栈包括 React、Typescript、Sass 和
  Node。他也是一位开源爱好者。主页上展示了他的项目、最近的博客文章以及社交媒体链接。用户可以点击按钮访问他的 GitHub
  和博客，也可以点击语言按钮切换语言。
---
import React from 'react';
import { VscGithubInverted, VscNotebook } from 'react-icons/vsc';
import './index.scss';
import Projects from '../components/homPageProjects';
import RecentBlogs, { RecentBlogItem } from '../components/homePageRecentBlogs';
import { useAllPluginInstancesData } from '@docusaurus/useGlobalData';
import Typed from 'typed.js';
import Button from '../components/button';
import { FaLanguage } from 'react-icons/fa';
import { useLocation } from '@docusaurus/router';
import Translate from '@docusaurus/Translate';

const cls = 'home-page';

function Intro(): JSX.Element {
  const location = useLocation();
  const typingElement = React.useRef(null);
  const descElement = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(typingElement.current, {
      stringsElement: descElement.current,
      typeSpeed: 35,
      loop: true,
      backDelay: 1500
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  const toggleLanguage = () => {
    window.location.href = location.pathname === '/' ? '/en/' : '/';
  };

  return (
    <div className={`${cls}-me`}>
      <h1>
        <span className={`${cls}-info`}>
          <span>👋</span> <Translate id="home.intro.info">Hello, 我是</Translate>
        </span>
        <span className={`${cls}-name`}>ALAN WANG</span>
      </h1>

      <span className={`${cls}-desc`} ref={typingElement} />

      <div ref={descElement} className={`${cls}-desc-list`}>
        <span>
          <Translate id="home.intro.desc1">前端开发</Translate>
        </span>
        {'  '}
        <span>
          <Translate id="home.intro.desc2">技术栈： React, Typescript, Sass, Node</Translate>
        </span>
        {'  '}
        <span>
          <Translate id="home.intro.desc3">开源爱好者</Translate>
        </span>
      </div>

      <div className={`${cls}-links`}>
        <Button
          href="https://github.com/3Alan"
          trackName="github-link"
          icon={<VscGithubInverted size={14} />}
          target="_blank"
        >
          Github
        </Button>
        <Button href="/blog" icon={<VscNotebook size={14} />}>
          Blog
        </Button>
        <Button
          ariaLabel="language"
          icon={<FaLanguage size={18} />}
          onClick={toggleLanguage}
        ></Button>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { blog } = useAllPluginInstancesData('docusaurus-plugin-content-blog') as {
    blog: { recentBlogs: RecentBlogItem[] };
  };

  return (
    <div className={cls}>
      <main>
        <Intro />
        <Projects />
        <RecentBlogs items={blog.recentBlogs} className={`${cls}-blog`} />
      </main>
    </div>
  );
}
