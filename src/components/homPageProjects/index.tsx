import clsx from 'clsx';
import React, { FC } from 'react';
import Card from '../card';
import './index.scss';

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
  return (
    <section className={clsx(cls, className)}>
      <h2 id="my-projects" className={`${cls}-title`}>
        我的项目
      </h2>

      <div className={`${cls}-wrap`}>
        {projectList.map(item => (
          <Card key={item.name} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
