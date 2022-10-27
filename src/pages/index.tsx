import React from 'react';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';

import './index.scss';
import Skills from '../components/homePageSkills';
import AboutMe from '../components/homePageAboutMe';
import Projects from '../components/homPageProjects';

const cls = 'home-page';

function Intro(): JSX.Element {
  return (
    <div className={`${cls}-intro`}>
      <div className={`container ${cls}-intro-wrap`}>
        <div className={`${cls}-me`}>
          <p>
            <span className={`${cls}-hello`}>👋</span> Hello, 我是
          </p>
          <h1>ALAN WANG</h1>
        </div>

        <CodeBlock className={`${cls}-code`} language="js">
          {`class Developer {
  constructor(name, skills) {
    this.name = name;
    this.skills = skills;
  }
}

new Developer('Alan', 'React,Typescript,Node.js');
`}
        </CodeBlock>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout description="一个专注于前端开发的小白，分享前端开发知识/教程">
      <div className={cls}>
        <main className="container">
          <Intro />
          <AboutMe className={`${cls}-section`} />
          <Projects className={`${cls}-section`} />
          <Skills className={`${cls}-last-section`} />
          {/* TODO: 需要通过扩展插件来实现
          <div>最近博文： 查看更多</div> */}
        </main>
      </div>
    </Layout>
  );
}
