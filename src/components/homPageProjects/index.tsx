import clsx from 'clsx';
import React, { FC } from 'react';
import Card from '../card';
import './index.scss';
import Translate from '@docusaurus/Translate';

const cls = 'hp-projects';

export interface ProjectsProps {
  className?: string;
}

interface ProjectItem {
  name: string;
  description: string;
  url: string;
}

const projectList: ProjectItem[] = [
  {
    name: '🤖 DocsMind',
    description: '基于 OpenAI 实现的文档问答应用，支持 md、pdf格式文件',
    url: 'https://github.com/3Alan/DocsMind'
  },
  {
    name: '🏡 仿 Airbnb',
    description: '基于 Expo + MongoDB 开发的仿 Airbnb 全栈移动端应用',
    url: 'https://github.com/3Alan/airbnb-clone'
  },
  {
    name: '🤖 docs-ai-bot',
    description: '基于 Probot 开发的 Github 机器人，为博客自动生成文章总结',
    url: 'https://github.com/3Alan/docs-ai-bot'
  },
  {
    name: '🎨 alan-ui',
    description: '基于 React 开发的手绘风格组件库',
    url: 'https://github.com/3Alan/alan-ui'
  },
  {
    name: '🕷️ search-engines-urls-push',
    description: 'Github Action: 提交网站 sitemap 中的 url 到搜索引擎，以加快搜索引擎的收录',
    url: 'https://github.com/3Alan/search-engines-urls-push'
  }
];

const Projects: FC<ProjectsProps> = ({ className }) => {
  const handleClick = (item: ProjectItem) => {
    window.open(item.url);
  };

  return (
    <section className={clsx(cls, className)}>
      <h2 id="my-projects" className={`${cls}-title`}>
        <Translate id="home.projects.title">项目</Translate>
      </h2>

      <div className={`${cls}-wrap`}>
        {projectList.map(item => (
          <Card key={item.name} {...item} onClick={() => handleClick(item)} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
