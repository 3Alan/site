import clsx from 'clsx';
import React, { FC } from 'react';
import './index.scss';

const cls = 'hp-skills';

interface SkillItem {
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  title: string;
}

export interface SkillsProps {
  className?: string;
}

const skillList: SkillItem[] = [
  {
    Svg: require('@site/static/img/vue.svg').default,
    title: 'vue'
  },
  {
    Svg: require('@site/static/img/jest.svg').default,
    title: 'jest'
  },
  {
    Svg: require('@site/static/img/storybook.svg').default,
    title: 'storybook'
  },
  {
    Svg: require('@site/static/img/webpack.svg').default,
    title: 'webpack'
  },
  {
    Svg: require('@site/static/img/nextjs.svg').default,
    title: 'next.js'
  }
];

const highLightSkillList: SkillItem[] = [
  {
    Svg: require('@site/static/img/typescript.svg').default,
    title: 'typescript'
  },
  {
    Svg: require('@site/static/img/react.svg').default,
    title: 'react'
  },
  {
    Svg: require('@site/static/img/sass.svg').default,
    title: 'sass'
  },
  {
    Svg: require('@site/static/img/node.svg').default,
    title: 'node'
  }
];

const Skills: FC<SkillsProps> = ({ className }) => {
  return (
    <section className={clsx(cls, className)}>
      <h2 className={`${cls}-title`}>我的技术栈</h2>
      <div className="row">
        {highLightSkillList.map(({ Svg, title }) => (
          <span key={title} className={`${cls}-hl-svg`} title={title}>
            <Svg />
          </span>
        ))}
      </div>

      <div className={`row ${cls}-skill-wrap`}>
        {skillList.map(({ Svg, title }) => (
          <span key={title} className={`${cls}-svg`} title={title}>
            <Svg />
          </span>
        ))}
      </div>
    </section>
  );
};

export default Skills;
