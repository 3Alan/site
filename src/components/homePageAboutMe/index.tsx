import clsx from 'clsx';
import React, { FC } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import './index.scss';

const cls = 'hp-about-me';

export interface AboutMeProps {
  className?: string;
}

const AboutMe: FC<AboutMeProps> = ({ className }) => {
  return (
    <section className={clsx(cls, className)}>
      <h2 id='about-me' className={`${cls}-title`}>关于我</h2>

      <div className={`${cls}-wrap`}>
        <img src={useBaseUrl('/img/avatar1.png')} alt="" />

        <div>
          <p>
            Hi, 我是 Alan，目前是一名前端工程师，主要的技术栈是 React + Typescript
            + Sass，2019 年开始从事前端的工作。
          </p>
          <p>
            业余时间会开发一些开源项目，以下是我的一些开源项目，欢迎大家 star
            和奉献。
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
